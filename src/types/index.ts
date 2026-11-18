export type PortalType = 'overview' | 'patient' | 'doctor' | 'moh';

export type PatientTab =
  | 'dashboard'
  | 'records'
  | 'meds'
  | 'family'
  | 'audit';

export type DoctorTab =
  | 'consultation'
  | 'facility'
  | 'issued-rx'
  | 'credentials';

export type MoHTab =
  | 'epidemiology'
  | 'physicians'
  | 'facilities';

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type RelationType =
  | 'مريض مستقل'
  | 'أب'
  | 'أم'
  | 'ابن'
  | 'ابنة'
  | 'زوجة'
  | 'زوج';

export interface PatientProfile {
  id: string;
  fullName: string;
  nationalId: string;
  relationship: RelationType;
  bloodType: BloodType;
  governorate: string;
  drugAllergies: string[];
  chronicDiseases: string[];
  activeMedsCount: number;
  isSelf: boolean;
}

export interface MedicationDose {
  id: string;
  medicationName: string;
  strength: string;
  scheduledTime: string;
  doseInstruction: string;
  isTakenToday: boolean;
  takenAt?: string;
  source: 'روشتة طبيب' | 'إضافة شخصية';
}

export interface ActiveMedication {
  id: string;
  name: string;
  strength: string;
  dose: string;
  dailyAlarmTime: string;
  duration: string;
  source: 'روشتة طبيب' | 'إضافة شخصية';
  doctorName?: string;
  facilityName?: string;
  dateAdded: string;
  isConfirmed: boolean;
}

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'روشتة إلكترونية' | 'تحليل معملي' | 'أشعة تشخيصية';
  date: string;
  governorate: string;
  facilityName: string;
  facilityType: 'مستشفى حكومي' | 'مستشفى خاص' | 'معمل تحاليل' | 'مركز أشعة' | 'عيادة خاصة';
  doctorName: string;
  diagnosis: string;
  details: string;
  prescriptionItems?: {
    medicine: string;
    dose: string;
    duration: string;
  }[];
}

export interface AuditLogEntry {
  id: string;
  dateTime: string;
  doctorName: string;
  specialty: string;
  governorate: string;
  facilityName: string;
  authMethod: 'رمز QR الجلسة' | 'رمز OTP المؤقت';
  actionType: string;
}

export interface IssuedPrescription {
  id: string;
  rxNumber: string;
  date: string;
  patientName: string;
  patientNationalId: string;
  governorate: string;
  facilityName: string;
  diagnosis: string;
  icd10Code?: string;
  medicines: {
    name: string;
    dose: string;
    duration: string;
    instructions: string;
  }[];
  transferStatus: 'تم الترحيل للمحفظة المشفرة بنجاح' | 'قيد المزامنة';
}

export interface DoctorProfile {
  name: string;
  specialty: string;
  licenseNumber: string;
  isVerified: boolean;
  governorate: string;
  facilityType: 'مستشفى حكومي' | 'مستشفى خاص' | 'عيادة خاصة';
  facilityName: string;
  documents: {
    nationalId: { status: 'معتمد وموثق بالسجل المدني'; date: string };
    graduationCert: { status: 'موثق من المجلس الأعلى للجامعات'; date: string };
    syndicateCard: { status: 'ساري ومعتمد بنقابة الأطباء'; date: string };
  };
}

export interface EarlyWarningItem {
  id: string;
  diseaseName: string;
  icd10Code: string;
  highestGovernorates: string[];
  reportedCases: number;
  trend: 'مرتفع' | 'مستقر' | 'تحت المراقبة';
  alertLevel: 'تنبيه موسمي' | 'تحت المتابعة الدقيقة' | 'طبيعي';
}

export interface VerificationRequest {
  id: string;
  doctorName: string;
  nationalId: string;
  syndicateNumber: string;
  graduationYear: string;
  university: string;
  governorate: string;
  specialty: string;
  status: 'قيد المراجعة' | 'معتمد' | 'مرفوض';
}

export interface AlertSettings {
  reminderAdvanceMinutes: '0' | '10' | '15' | '30';
  enableSms: boolean;
  enableWhatsApp: boolean;
  notifyCompanionOnMissedDose: boolean;
  notifyUpcomingConsultation: boolean;
  notifyImmediateFileAccess: boolean;
}
