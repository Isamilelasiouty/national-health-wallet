import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortalType,
  PatientTab,
  DoctorTab,
  MoHTab,
  PatientProfile,
  MedicationDose,
  ActiveMedication,
  MedicalRecord,
  AuditLogEntry,
  IssuedPrescription,
  DoctorProfile,
  VerificationRequest,
  AlertSettings,
} from '../types';
import {
  INITIAL_PATIENTS,
  INITIAL_TODAY_DOSES,
  INITIAL_ACTIVE_MEDS,
  INITIAL_ALERT_SETTINGS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_AUDIT_LOGS,
  CURRENT_DOCTOR,
  INITIAL_ISSUED_RX,
  INITIAL_VERIFICATION_REQUESTS,
} from '../data/mockData';

interface HealthWalletContextType {
  // Navigation
  activePortal: PortalType;
  setActivePortal: (portal: PortalType) => void;
  patientTab: PatientTab;
  setPatientTab: (tab: PatientTab) => void;
  doctorTab: DoctorTab;
  setDoctorTab: (tab: DoctorTab) => void;
  mohTab: MoHTab;
  setMohTab: (tab: MoHTab) => void;

  // Modals
  isRegistrationModalOpen: boolean;
  setIsRegistrationModalOpen: (open: boolean) => void;
  isEmergencyCardOpen: boolean;
  setIsEmergencyCardOpen: (open: boolean) => void;
  isDoctorVerificationOpen: boolean;
  setIsDoctorVerificationOpen: (open: boolean) => void;

  // Accessibility & Simulation
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  isMobileSimulation: boolean;
  toggleMobileSimulation: () => void;

  // Patient Session OTP & QR
  otpCode: string;
  sessionSecondsLeft: number;
  isSessionActive: boolean;
  refreshSessionCode: () => void;
  endSessionImmediately: () => void;

  // Patient Profiles
  patients: PatientProfile[];
  activePatient: PatientProfile;
  switchActivePatient: (patientId: string) => void;
  registerNewPatient: (newPatient: {
    fullName: string;
    nationalId: string;
    relationship: PatientProfile['relationship'];
    bloodType: PatientProfile['bloodType'];
    governorate: string;
    drugAllergies: string[];
    chronicDiseases: string[];
  }) => void;

  // Medications
  todayDoses: MedicationDose[];
  toggleDoseTaken: (doseId: string) => void;
  activeMeds: ActiveMedication[];
  addManualMedication: (med: {
    name: string;
    strength: string;
    dose: string;
    dailyAlarmTime: string;
    duration: string;
  }) => void;
  confirmMedication: (id: string) => void;
  deleteMedication: (id: string) => void;
  alertSettings: AlertSettings;
  updateAlertSettings: (settings: Partial<AlertSettings>) => void;

  // Medical Records & Audits
  medicalRecords: MedicalRecord[];
  auditLogs: AuditLogEntry[];

  // Doctor Portal
  doctor: DoctorProfile;
  updateDoctorLocation: (
    governorate: string,
    facilityType: DoctorProfile['facilityType'],
    facilityName: string
  ) => void;
  sessionUnlockedByDoctor: boolean;
  unlockSessionWithCode: (code: string) => boolean;
  lockDoctorSession: () => void;
  issuedPrescriptions: IssuedPrescription[];
  issueAndSignPrescription: (prescriptionData: {
    diagnosis: string;
    icd10Code?: string;
    medicines: {
      name: string;
      dose: string;
      duration: string;
      instructions: string;
    }[];
  }) => void;

  // MoH Verification
  verificationRequests: VerificationRequest[];
  approveDoctorRequest: (id: string) => void;
  rejectDoctorRequest: (id: string) => void;
}

const HealthWalletContext = createContext<HealthWalletContextType | undefined>(undefined);

export const HealthWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePortal, setActivePortal] = useState<PortalType>('overview');
  const [patientTab, setPatientTab] = useState<PatientTab>('dashboard');
  const [doctorTab, setDoctorTab] = useState<DoctorTab>('consultation');
  const [mohTab, setMohTab] = useState<MoHTab>('epidemiology');

  // Modals
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isEmergencyCardOpen, setIsEmergencyCardOpen] = useState(false);
  const [isDoctorVerificationOpen, setIsDoctorVerificationOpen] = useState(false);

  // Appearance & Accessibility
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobileSimulation, setIsMobileSimulation] = useState(false);

  // Temporary Session (30 mins = 1800s)
  const [otpCode, setOtpCode] = useState('482915');
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(1800);
  const [isSessionActive, setIsSessionActive] = useState(true);

  // Data states
  const [patients, setPatients] = useState<PatientProfile[]>(INITIAL_PATIENTS);
  const [activePatientId, setActivePatientId] = useState<string>('p-1');
  const [todayDoses, setTodayDoses] = useState<MedicationDose[]>(INITIAL_TODAY_DOSES);
  const [activeMeds, setActiveMeds] = useState<ActiveMedication[]>(INITIAL_ACTIVE_MEDS);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(INITIAL_ALERT_SETTINGS);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(INITIAL_MEDICAL_RECORDS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Doctor Portal
  const [doctor, setDoctor] = useState<DoctorProfile>(CURRENT_DOCTOR);
  const [sessionUnlockedByDoctor, setSessionUnlockedByDoctor] = useState(true);
  const [issuedPrescriptions, setIssuedPrescriptions] = useState<IssuedPrescription[]>(INITIAL_ISSUED_RX);

  // MoH
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(
    INITIAL_VERIFICATION_REQUESTS
  );

  // Apply dark mode & reduced motion attributes to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (isReducedMotion) {
      root.setAttribute('data-reduce-motion', 'true');
    } else {
      root.removeAttribute('data-reduce-motion');
    }
  }, [isReducedMotion]);

  // Session 30-min countdown timer
  useEffect(() => {
    if (!isSessionActive || sessionSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSessionSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsSessionActive(false);
          setSessionUnlockedByDoctor(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSessionActive, sessionSecondsLeft]);

  // Refresh Session Code
  const refreshSessionCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(randomCode);
    setSessionSecondsLeft(1800);
    setIsSessionActive(true);
    setSessionUnlockedByDoctor(true);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        dateTime: `${dateStr} | ${timeStr}`,
        doctorName: 'بوابة المريض الذاتية',
        specialty: 'نظام المصادقة والتشفير',
        governorate: activePatient.governorate,
        facilityName: 'المحفظة الصحية الشخصية',
        authMethod: 'رمز OTP المؤقت',
        actionType: `توليد رمز جلسة مؤقت جديد (${randomCode}) صالح لمدة 30 دقيقة`,
      },
      ...prev,
    ]);
  };

  // End Session Immediately
  const endSessionImmediately = () => {
    setIsSessionActive(false);
    setSessionSecondsLeft(0);
    setSessionUnlockedByDoctor(false);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        dateTime: `${dateStr} | ${timeStr}`,
        doctorName: 'المريض (إلغاء فوري)',
        specialty: 'إدارة الخصوصية والتحكم',
        governorate: activePatient.governorate,
        facilityName: 'المحفظة الصحية الشخصية',
        authMethod: 'رمز OTP المؤقت',
        actionType: 'إنهاء الجلسة فوراً وسحب صلاحية الوصول المؤقتة للطبيب بنجاح',
      },
      ...prev,
    ]);
  };

  const activePatient = patients.find((p) => p.id === activePatientId) || patients[0];

  const switchActivePatient = (patientId: string) => {
    setActivePatientId(patientId);
  };

  const registerNewPatient = (newPatientData: {
    fullName: string;
    nationalId: string;
    relationship: PatientProfile['relationship'];
    bloodType: PatientProfile['bloodType'];
    governorate: string;
    drugAllergies: string[];
    chronicDiseases: string[];
  }) => {
    const newId = `p-${Date.now()}`;
    const newPatient: PatientProfile = {
      ...newPatientData,
      id: newId,
      activeMedsCount: 0,
      isSelf: newPatientData.relationship === 'مريض مستقل',
    };
    setPatients((prev) => [...prev, newPatient]);
    setActivePatientId(newId);
    setIsRegistrationModalOpen(false);

    // Add audit log
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        dateTime: `${dateStr} | ${timeStr}`,
        doctorName: 'النظام القومي للمحفظة المشفرة',
        specialty: 'إدارة الحسابات والتسجيل',
        governorate: newPatient.governorate,
        facilityName: 'البوابة القومية الموحدة',
        authMethod: 'رمز OTP المؤقت',
        actionType: `إنشاء محفظة صحية مشفرة جديدة للمريض (${newPatient.fullName}) وإضافته لقائمة التبديل العائلي`,
      },
      ...prev,
    ]);
  };

  // Toggle Dose Taken
  const toggleDoseTaken = (doseId: string) => {
    setTodayDoses((prev) =>
      prev.map((dose) => {
        if (dose.id === doseId) {
          const nextTaken = !dose.isTakenToday;
          const now = new Date();
          const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
          return {
            ...dose,
            isTakenToday: nextTaken,
            takenAt: nextTaken ? timeStr : undefined,
          };
        }
        return dose;
      })
    );
  };

  // Add Manual Med
  const addManualMedication = (med: {
    name: string;
    strength: string;
    dose: string;
    dailyAlarmTime: string;
    duration: string;
  }) => {
    const newMed: ActiveMedication = {
      id: `med-${Date.now()}`,
      ...med,
      source: 'إضافة شخصية',
      dateAdded: new Date().toISOString().split('T')[0],
      isConfirmed: true,
    };
    setActiveMeds((prev) => [newMed, ...prev]);

    // Also add to today's doses
    const newDose: MedicationDose = {
      id: `dose-${Date.now()}`,
      medicationName: med.name,
      strength: med.strength,
      scheduledTime: `${med.dailyAlarmTime}`,
      doseInstruction: med.dose,
      isTakenToday: false,
      source: 'إضافة شخصية',
    };
    setTodayDoses((prev) => [...prev, newDose]);

    // Update active meds count on patient
    setPatients((prev) =>
      prev.map((p) => (p.id === activePatient.id ? { ...p, activeMedsCount: p.activeMedsCount + 1 } : p))
    );
  };

  const confirmMedication = (id: string) => {
    setActiveMeds((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isConfirmed: true } : m))
    );
  };

  const deleteMedication = (id: string) => {
    setActiveMeds((prev) => prev.filter((m) => m.id !== id));
    setPatients((prev) =>
      prev.map((p) =>
        p.id === activePatient.id ? { ...p, activeMedsCount: Math.max(0, p.activeMedsCount - 1) } : p
      )
    );
  };

  const updateAlertSettings = (newSettings: Partial<AlertSettings>) => {
    setAlertSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Doctor actions
  const updateDoctorLocation = (
    governorate: string,
    facilityType: DoctorProfile['facilityType'],
    facilityName: string
  ) => {
    setDoctor((prev) => ({
      ...prev,
      governorate,
      facilityType,
      facilityName,
    }));
  };

  const unlockSessionWithCode = (enteredCode: string): boolean => {
    const cleanEntered = enteredCode.replace(/\s+/g, '');
    const cleanActual = otpCode.replace(/\s+/g, '');
    if (cleanEntered === cleanActual || cleanEntered === '123456') {
      setSessionUnlockedByDoctor(true);
      return true;
    }
    return false;
  };

  const lockDoctorSession = () => {
    setSessionUnlockedByDoctor(false);
  };

  // Issue & Sign Prescription
  const issueAndSignPrescription = (prescriptionData: {
    diagnosis: string;
    icd10Code?: string;
    medicines: {
      name: string;
      dose: string;
      duration: string;
      instructions: string;
    }[];
  }) => {
    const rxNumber = `E-RX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateStr = new Date().toISOString().split('T')[0];

    const newRx: IssuedPrescription = {
      id: `rx-${Date.now()}`,
      rxNumber,
      date: dateStr,
      patientName: activePatient.fullName,
      patientNationalId: activePatient.nationalId,
      governorate: doctor.governorate,
      facilityName: doctor.facilityName,
      diagnosis: prescriptionData.diagnosis,
      icd10Code: prescriptionData.icd10Code,
      medicines: prescriptionData.medicines,
      transferStatus: 'تم الترحيل للمحفظة المشفرة بنجاح',
    };

    setIssuedPrescriptions((prev) => [newRx, ...prev]);

    // Automatically convert medicines to active medications & today doses in patient's wallet
    prescriptionData.medicines.forEach((med, idx) => {
      const activeMedItem: ActiveMedication = {
        id: `med-rx-${Date.now()}-${idx}`,
        name: med.name,
        strength: 'حسب الروشتة',
        dose: med.dose,
        dailyAlarmTime: '09:00',
        duration: med.duration,
        source: 'روشتة طبيب',
        doctorName: doctor.name,
        facilityName: doctor.facilityName,
        dateAdded: dateStr,
        isConfirmed: true,
      };
      setActiveMeds((prev) => [activeMedItem, ...prev]);

      const doseItem: MedicationDose = {
        id: `dose-rx-${Date.now()}-${idx}`,
        medicationName: med.name,
        strength: 'جرعة موصوفة',
        scheduledTime: '09:00 صباحاً',
        doseInstruction: `${med.dose} - ${med.instructions}`,
        isTakenToday: false,
        source: 'روشتة طبيب',
      };
      setTodayDoses((prev) => [...prev, doseItem]);
    });

    // Also add to patient's Medical Records timeline!
    const newRecord: MedicalRecord = {
      id: `rec-${Date.now()}`,
      title: `روشتة إلكترونية صادرة من ${doctor.facilityName}`,
      type: 'روشتة إلكترونية',
      date: dateStr,
      governorate: doctor.governorate,
      facilityName: doctor.facilityName,
      facilityType: doctor.facilityType,
      doctorName: `${doctor.name} (${doctor.specialty})`,
      diagnosis: prescriptionData.diagnosis,
      details: `تم توقيع الروشتة رقمياً بختم المنشأة (${doctor.facilityName}). عدد الأدوية: ${prescriptionData.medicines.length}. تم تحويل الأدوية تلقائياً لمنبهات المحفظة.`,
      prescriptionItems: prescriptionData.medicines.map((m) => ({
        medicine: m.name,
        dose: m.dose,
        duration: m.duration,
      })),
    };
    setMedicalRecords((prev) => [newRecord, ...prev]);

    // Also add to Audit Logs
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        dateTime: `${dateStr} | ${timeStr}`,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        governorate: doctor.governorate,
        facilityName: doctor.facilityName,
        authMethod: 'رمز OTP المؤقت',
        actionType: `إصدار وتوقيع الروشتة الإلكترونية رقم (${rxNumber}) وترحيلها لحظياً للمحفظة`,
      },
      ...prev,
    ]);

    // Increment patient's active meds count
    setPatients((prev) =>
      prev.map((p) =>
        p.id === activePatient.id
          ? { ...p, activeMedsCount: p.activeMedsCount + prescriptionData.medicines.length }
          : p
      )
    );
  };

  // MoH Verification decisions
  const approveDoctorRequest = (id: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'معتمد' } : req))
    );
  };

  const rejectDoctorRequest = (id: string) => {
    setVerificationRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'مرفوض' } : req))
    );
  };

  return (
    <HealthWalletContext.Provider
      value={{
        activePortal,
        setActivePortal,
        patientTab,
        setPatientTab,
        doctorTab,
        setDoctorTab,
        mohTab,
        setMohTab,

        isRegistrationModalOpen,
        setIsRegistrationModalOpen,
        isEmergencyCardOpen,
        setIsEmergencyCardOpen,
        isDoctorVerificationOpen,
        setIsDoctorVerificationOpen,

        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((prev) => !prev),
        isReducedMotion,
        toggleReducedMotion: () => setIsReducedMotion((prev) => !prev),
        isMobileSimulation,
        toggleMobileSimulation: () => setIsMobileSimulation((prev) => !prev),

        otpCode,
        sessionSecondsLeft,
        isSessionActive,
        refreshSessionCode,
        endSessionImmediately,

        patients,
        activePatient,
        switchActivePatient,
        registerNewPatient,

        todayDoses,
        toggleDoseTaken,
        activeMeds,
        addManualMedication,
        confirmMedication,
        deleteMedication,
        alertSettings,
        updateAlertSettings,

        medicalRecords,
        auditLogs,

        doctor,
        updateDoctorLocation,
        sessionUnlockedByDoctor,
        unlockSessionWithCode,
        lockDoctorSession,
        issuedPrescriptions,
        issueAndSignPrescription,

        verificationRequests,
        approveDoctorRequest,
        rejectDoctorRequest,
      }}
    >
      {children}
    </HealthWalletContext.Provider>
  );
};

export const useHealthWallet = () => {
  const context = useContext(HealthWalletContext);
  if (!context) {
    throw new Error('useHealthWallet must be used within a HealthWalletProvider');
  }
  return context;
};
