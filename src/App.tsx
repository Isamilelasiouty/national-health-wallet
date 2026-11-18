import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Activity,
  Heart,
  Clock,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  UserPlus,
  Pill,
  Lock,
  Search,
  X,
  PhoneCall,
  Smartphone,
  Moon,
  Sun,
  Building2,
  FileText,
  Users,
  Eye,
  RefreshCw,
  Calendar,
  MapPin,
  Check,
  ChevronLeft,
  ArrowLeft,
  Send,
  Trash2,
  Award,
  Stethoscope,
  KeyRound,
  FileCheck,
  ExternalLink,
  ShieldCheck,
  Home,
  User,
  Sliders,
  CheckCircle,
} from 'lucide-react';

export default function App() {
  // Active Portal: 'home' (الرئيسية) | 'patient' (المريض) | 'doctor' (الطبيب) | 'moh' (وزارة الصحة)
  const [currentPortal, setCurrentPortal] = useState<'home' | 'patient' | 'doctor' | 'moh'>('home');

  // Sub-tabs for each portal
  const [patientTab, setPatientTab] = useState<number>(0);
  const [doctorTab, setDoctorTab] = useState<number>(0);
  const [mohTab, setMohTab] = useState<number>(0);

  // Appearance & Simulator
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Modals
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showVerifyDoctorModal, setShowVerifyDoctorModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  // Patient Portal State
  const [activePatientIndex, setActivePatientIndex] = useState<number>(0);
  const [otpCode, setOtpCode] = useState<string>('482915');
  const [sessionSeconds, setSessionSeconds] = useState<number>(1800);
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true);

  // Today's Doses State
  const [todayDoses, setTodayDoses] = useState([
    { id: 1, name: 'كونكور 5 مجم (Concor)', time: '08:00 صباحاً', taken: true, source: 'روشتة طبيب' },
    { id: 2, name: 'ميتفورمين 500 مجم (Glucophage)', time: '01:30 ظهراً', taken: false, source: 'روشتة طبيب' },
    { id: 3, name: 'أوميجا 3 بلس (Omega 3)', time: '08:30 مساءً', taken: false, source: 'إضافة شخصية' },
  ]);

  // Active Medications
  const [activeMedsList, setActiveMedsList] = useState([
    { id: 1, name: 'كونكور 5 مجم (Concor 5mg)', dose: 'قرص صباحاً بعد الإفطار', duration: 'علاج مستمر (3 أشهر)', source: 'روشتة طبيب', doctor: 'د. كريم عبد الرحمن' },
    { id: 2, name: 'جلوكوفاج 500 مجم (Glucophage)', dose: 'قرص ظهراً مع الغداء', duration: 'علاج مستمر (6 أشهر)', source: 'روشتة طبيب', doctor: 'د. كريم عبد الرحمن' },
    { id: 3, name: 'أوميجا 3 بلس (Omega 3 Plus)', dose: 'كبسولة مساءً بعد العشاء', duration: 'شهر واحد', source: 'إضافة شخصية', doctor: 'ذاتي' },
  ]);

  // Add Manual Med Inputs
  const [newMedName, setNewMedName] = useState<string>('');
  const [newMedDose, setNewMedDose] = useState<string>('');
  const [newMedTime, setNewMedTime] = useState<string>('09:00');
  const [medAddSuccess, setMedAddSuccess] = useState<string>('');

  // Doctor Portal State
  const [doctorSessionOtp, setDoctorSessionOtp] = useState<string>('482915');
  const [isDoctorSessionUnlocked, setIsDoctorSessionUnlocked] = useState<boolean>(true);
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('القاهرة');
  const [facilityType, setFacilityType] = useState<string>('مستشفى حكومي');
  const [facilityName, setFacilityName] = useState<string>('مستشفى قصر العيني التعليمي');

  // e-Rx Writer State
  const [rxDiagnosis, setRxDiagnosis] = useState<string>('ارتفاع ضغط الدم الشرياني ومتابعة دورية (I10)');
  const [rxMedName, setRxMedName] = useState<string>('');
  const [rxDose, setRxDose] = useState<string>('قرص يومياً صباحاً');
  const [rxDuration, setRxDuration] = useState<string>('3 أشهر');
  const [rxConflictWarning, setRxConflictWarning] = useState<string>('');
  const [rxSuccessMsg, setRxSuccessMsg] = useState<string>('');

  const [rxItems, setRxItems] = useState([
    { name: 'أميلوديبين 5 مجم (Amlodipine)', dose: 'قرص مساءً بعد الأكل', duration: '3 أشهر' },
  ]);

  // Issued Prescriptions Archive
  const [issuedRxList, setIssuedRxList] = useState([
    { id: 'E-RX-2026-89412', date: '2026-10-15', patient: 'أحمد محمود السيد', diagnosis: 'ارتفاع ضغط الدم (I10)', facility: 'مستشفى قصر العيني - القاهرة', status: 'تم الترحيل للمحفظة المشفرة بنجاح' },
    { id: 'E-RX-2026-89104', date: '2026-10-12', patient: 'محمود سعد الدين', diagnosis: 'التهاب الجيوب الأنفية (J01)', facility: 'مستشفى قصر العيني - القاهرة', status: 'تم الترحيل للمحفظة المشفرة بنجاح' },
  ]);

  // MoH State
  const [mohGovFilter, setMohGovFilter] = useState<string>('كل محافظات الجمهورية (27 محافظة)');
  const [doctorApplications, setDoctorApplications] = useState([
    { id: 1, name: 'د. هاني عادل سليمان', specialty: 'أخصائي جراحة العظام', nid: '29007180105632', syndicateId: '92144', univ: 'عين شمس (2015)', status: 'قيد المراجعة' },
    { id: 2, name: 'د. سارة محمود غنيم', specialty: 'أخصائي طب الأطفال', nid: '29311240109841', syndicateId: '96512', univ: 'الإسكندرية (2018)', status: 'قيد المراجعة' },
    { id: 3, name: 'د. مصطفى عبد الحليم بدوي', specialty: 'استشاري أمراض الصدر', nid: '28604150104478', syndicateId: '78231', univ: 'أسيوط (2010)', status: 'قيد المراجعة' },
  ]);

  // Doctor Verification Modal Search
  const [doctorSearch, setDoctorSearch] = useState<string>('');

  // Register Modal Form
  const [regFullName, setRegFullName] = useState<string>('أحمد محمد محمود السيد');
  const [regNid, setRegNid] = useState<string>('28910150102345');
  const [regRelation, setRegRelation] = useState<string>('مريض مستقل');
  const [regBlood, setRegBlood] = useState<string>('O+');
  const [regGov, setRegGov] = useState<string>('القاهرة');
  const [regAllergy, setRegAllergy] = useState<string>('البنسلين ومشتقاته');
  const [regChronic, setRegChronic] = useState<string>('السكري النوع الثاني، ارتفاع ضغط الدم');
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  const appRef = useRef<HTMLDivElement>(null);

  // All 27 Egyptian Governorates
  const egyptGovernorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحر الأحمر', 'البحيرة', 'الفيوم',
    'الغربية', 'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس',
    'أسوان', 'أسيوط', 'بني سويف', 'بورسعيد', 'دمياط', 'الشرقية', 'جنوب سيناء',
    'كفر الشيخ', 'مطروح', 'الأقصر', 'قنا', 'شمال سيناء', 'سوهاج'
  ];

  // Family Profiles Database
  const familyProfiles = [
    {
      id: 0,
      name: 'أحمد محمود السيد',
      relationship: 'حسابي الشخصي',
      nid: '28910150102345',
      blood: 'O+',
      gov: 'القاهرة',
      allergies: ['البنسلين ومشتقاته (Penicillin)'],
      chronic: ['ارتفاع ضغط الدم الشرياني', 'السكري من النوع الثاني'],
      activeMedsCount: 3,
    },
    {
      id: 1,
      name: 'فاطمة إبراهيم الشناوي',
      relationship: 'الأم (مرافق عائلي)',
      nid: '25408120101124',
      blood: 'A+',
      gov: 'القاهرة',
      allergies: ['الأسبرين (Aspirin)'],
      chronic: ['هشاشة العظام', 'قصور الغدة الدرقية'],
      activeMedsCount: 4,
    },
    {
      id: 2,
      name: 'يوسف أحمد محمود',
      relationship: 'الابن (مرافق عائلي)',
      nid: '31506190104567',
      blood: 'O+',
      gov: 'القاهرة',
      allergies: ['لا توجد حساسية دوائية مسجلة'],
      chronic: ['حساسية الصدر الموسمية (ربو أطفال)'],
      activeMedsCount: 1,
    },
    {
      id: 3,
      name: 'مريم عبد العزيز النجار',
      relationship: 'الزوجة (مرافق عائلي)',
      nid: '29204050103789',
      blood: 'B+',
      gov: 'القاهرة',
      allergies: ['لا توجد حساسية مسجلة'],
      chronic: ['أنيميا نقص الحديد المزمنة'],
      activeMedsCount: 2,
    },
  ];

  const currentPatient = familyProfiles[activePatientIndex];

  // Verified Doctors Database for Public Search
  const verifiedDoctorsDB = [
    {
      name: 'د. كريم عبد الرحمن حسن',
      syndicateId: '84219',
      specialty: 'استشاري أمراض الباطنة والقلب والأوعية الدموية',
      hospital: 'مستشفى قصر العيني التعليمي - القاهرة',
      status: 'ساري ومعتمد رسمياً من وزارة الصحة',
    },
    {
      name: 'د. نهى إبراهيم صقر',
      syndicateId: '79450',
      specialty: 'استشاري التحاليل الطبية والإكلينيكية',
      hospital: 'معامل البرج المركزية - الجيزة',
      status: 'ساري ومعتمد رسمياً من وزارة الصحة',
    },
    {
      name: 'د. هشام طلعت زكي',
      syndicateId: '68112',
      specialty: 'استشاري أمراض القلب وقسطرة الشرايين',
      hospital: 'مركز النيل التخصصي للقلب - القاهرة',
      status: 'ساري ومعتمد رسمياً من وزارة الصحة',
    },
    {
      name: 'د. وائل سامي منصور',
      syndicateId: '73940',
      specialty: 'استشاري طب وجراحة العيون والشبكية',
      hospital: 'مستشفى رمد الإسكندرية التخصصي',
      status: 'ساري ومعتمد رسمياً من وزارة الصحة',
    },
  ];

  const filteredDoctors = verifiedDoctorsDB.filter(
    (d) =>
      d.name.includes(doctorSearch.trim()) ||
      d.syndicateId.includes(doctorSearch.trim()) ||
      d.specialty.includes(doctorSearch.trim())
  );

  // Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Phone Simulation Body Class
  useEffect(() => {
    if (isPhoneMode) {
      document.body.classList.add('ph');
    } else {
      document.body.classList.remove('ph');
    }
  }, [isPhoneMode]);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollEl = isPhoneMode && appRef.current ? appRef.current : document.documentElement;
      const totalHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
      const progress = totalHeight > 0 ? (scrollEl.scrollTop / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    const appEl = appRef.current;
    if (appEl) appEl.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (appEl) appEl.removeEventListener('scroll', handleScroll);
    };
  }, [isPhoneMode]);

  // 30-min Timer countdown
  useEffect(() => {
    if (!isSessionActive || sessionSeconds <= 0) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSessionActive, sessionSeconds]);

  // OTP Regeneration
  const refreshOtp = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(newCode);
    setSessionSeconds(1800);
    setIsSessionActive(true);
  };

  // Immediate Session End
  const endSessionNow = () => {
    setIsSessionActive(false);
    setSessionSeconds(0);
    setOtpCode('000000');
  };

  // Toggle Dose Taken
  const toggleDose = (id: number) => {
    setTodayDoses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, taken: !d.taken } : d))
    );
  };

  // Add Medication
  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDose.trim()) return;

    const newMed = {
      id: Date.now(),
      name: newMedName.trim(),
      dose: newMedDose.trim(),
      duration: 'علاج شخصي',
      source: 'إضافة شخصية',
      doctor: 'ذاتي',
    };

    setActiveMedsList((prev) => [newMed, ...prev]);
    setTodayDoses((prev) => [
      ...prev,
      { id: Date.now(), name: newMedName.trim(), time: newMedTime, taken: false, source: 'إضافة شخصية' },
    ]);

    setMedAddSuccess('تمت إضافة الدواء بنجاح لجدول المنبهات والأدوية النشطة.');
    setTimeout(() => {
      setMedAddSuccess('');
      setNewMedName('');
      setNewMedDose('');
    }, 2000);
  };

  // Doctor allergy conflict check
  const handleRxMedNameChange = (val: string) => {
    setRxMedName(val);
    const lower = val.toLowerCase();
    if (
      val.includes('بنسلين') ||
      lower.includes('penicillin') ||
      lower.includes('augmentin') ||
      val.includes('أوجمنتين')
    ) {
      setRxConflictWarning('⚠️ تعارض حرج وفوري: المريض يعاني من حساسية مفرطة مسجلة من البنسلين ومشتقاته! يمنع وصف هذا المستحضر.');
    } else {
      setRxConflictWarning('');
    }
  };

  // Doctor Add Medicine to Rx
  const handleAddRxItem = () => {
    if (!rxMedName.trim() || rxConflictWarning) return;
    setRxItems((prev) => [
      ...prev,
      { name: rxMedName.trim(), dose: rxDose.trim(), duration: rxDuration.trim() },
    ]);
    setRxMedName('');
    setRxConflictWarning('');
  };

  // Sign & Transfer Prescription
  const handleSignRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (rxItems.length === 0) return;

    const newRxNumber = `E-RX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateStr = new Date().toISOString().split('T')[0];

    // Add to doctor archive
    setIssuedRxList((prev) => [
      {
        id: newRxNumber,
        date: dateStr,
        patient: currentPatient.name,
        diagnosis: rxDiagnosis,
        facility: `${facilityName} - ${selectedGovernorate}`,
        status: 'تم الترحيل للمحفظة المشفرة بنجاح',
      },
      ...prev,
    ]);

    // Automatically add to patient's active meds
    rxItems.forEach((item, idx) => {
      setActiveMedsList((prev) => [
        {
          id: Date.now() + idx,
          name: item.name,
          dose: item.dose,
          duration: item.duration,
          source: 'روشتة طبيب',
          doctor: 'د. كريم عبد الرحمن حسن',
        },
        ...prev,
      ]);

      setTodayDoses((prev) => [
        ...prev,
        { id: Date.now() + idx, name: item.name, time: '09:00 صباحاً', taken: false, source: 'روشتة طبيب' },
      ]);
    });

    setRxSuccessMsg(`تم توقيع الروشتة رقم (${newRxNumber}) إلكترونياً وترحيلها لحظياً لمحفظة المريض!`);
    setTimeout(() => {
      setRxSuccessMsg('');
      setRxItems([]);
    }, 2500);
  };

  // MoH Approve / Reject
  const handleMoHDecision = (id: number, status: string) => {
    setDoctorApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  // Handle Register Patient
  const handleRegisterModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setShowRegisterModal(false);
    }, 1500);
  };

  const takenCount = todayDoses.filter((d) => d.taken).length;
  const adherenceRate = todayDoses.length > 0 ? Math.round((takenCount / todayDoses.length) * 100) : 100;
  const timerMins = Math.floor(sessionSeconds / 60);
  const timerSecs = sessionSeconds % 60;

  return (
    <div className="stage">
      <div className="phone">
        <div className="app-wrapper" ref={appRef} id="app">
          {/* Scroll progress bar */}
          <div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#247D55] via-[#389F6F] to-emerald-300 z-60 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Top Institutional Header */}
          <header className="sticky top-0 z-50 bg-[#0F4C35]/95 dark:bg-[#0A1610]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between gap-3 text-white border-b border-[#247D55]/30 shadow-sm">
            {/* Logo & Republic Branding */}
            <div
              onClick={() => setCurrentPortal('home')}
              className="flex items-center gap-3 cursor-pointer select-none shrink-0"
              role="button"
              tabIndex={0}
            >
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300 shadow-xs">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base block tracking-tight leading-tight">
                  المحفظة الصحية القومية
                </span>
                <span className="text-[11px] text-[#CFE8DA] hidden sm:block">
                  جمهورية مصر العربية — التأمين الصحي الشامل
                </span>
              </div>
            </div>

            {/* Portal Switcher Tabs (Direct Access to Actual Working Portals) */}
            <nav className="flex items-center gap-1 bg-black/20 dark:bg-white/5 p-1 rounded-full border border-white/10 text-xs font-bold overflow-x-auto scrollbar-none">
              <button
                onClick={() => setCurrentPortal('home')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  currentPortal === 'home'
                    ? 'bg-white text-[#0F4C35] shadow-xs'
                    : 'text-[#D3EBDD] hover:bg-white/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>الرئيسية</span>
              </button>

              <button
                onClick={() => setCurrentPortal('patient')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  currentPortal === 'patient'
                    ? 'bg-white text-[#0F4C35] shadow-xs'
                    : 'text-[#D3EBDD] hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>بوابة المريض</span>
              </button>

              <button
                onClick={() => setCurrentPortal('doctor')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  currentPortal === 'doctor'
                    ? 'bg-white text-[#0F4C35] shadow-xs'
                    : 'text-[#D3EBDD] hover:bg-white/10'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>بوابة الطبيب</span>
              </button>

              <button
                onClick={() => setCurrentPortal('moh')}
                className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  currentPortal === 'moh'
                    ? 'bg-white text-[#0F4C35] shadow-xs'
                    : 'text-[#D3EBDD] hover:bg-white/10'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>وزارة الصحة</span>
              </button>
            </nav>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVerifyDoctorModal(true)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-[#D3EBDD] transition-colors"
                title="التحقق من ترخيص الطبيب لدى وزارة الصحة"
              >
                <Search className="w-3.5 h-3.5" />
                <span>تحقق من طبيبك</span>
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#247D55] hover:bg-[#1C6B4B] text-white transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>تسجيل مريض</span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#DC2626] hover:bg-red-700 text-white text-xs font-extrabold shadow-sm transition-all animate-sos-pulse whitespace-nowrap flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>بطاقة الطوارئ</span>
              </button>

              {/* Dark mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="تبديل الوضع الداكن"
                aria-label="تبديل الوضع الداكن"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* VIEW 1: HOME / PLATFORM LANDING (الواجهة الرئيسية الوطنية)                */}
          {/* ========================================================================= */}
          {currentPortal === 'home' && (
            <div className="space-y-16 pb-16">
              {/* Hero Section with Real Doctor/Patient Medical Photography */}
              <section className="relative text-white overflow-hidden min-h-[580px] sm:min-h-[640px] flex items-center">
                {/* Real Medical Photo Background from Unsplash */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="./images/doctor.webp"
                    alt="استشارة طبية ورعاية صحية متقدمة"
                    className="w-full h-full object-cover object-center filter brightness-50"
                  />
                  {/* Soothing Medical Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A261B] via-[#0F4C35]/90 to-[#166547]/75 backdrop-blur-[2px]" />
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-12 py-16 sm:py-20 relative z-10 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Text Column */}
                    <div className="lg:col-span-7 space-y-6 text-right">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-emerald-200 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>المنظومة الوطنية للسجل الطبي المشفر الموحد</span>
                      </div>

                      <h1 className="text-3xl sm:text-5xl font-black leading-tight sm:leading-snug text-white">
                        ملفك الطبي المشفر بين يديك.. <br />
                        <span className="text-emerald-300">تفتحه لمن تشاء، وتغلقه متى تشاء.</span>
                      </h1>

                      <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-xl">
                        منظومة وطنية متكاملة تربط مستشفيات القطاعين الحكومي والخاص بسجل رقمي واحد يملكه المريض، مع تشفير طرفي كامل وجلسات وصول مؤقتة (QR / OTP) مدتها 30 دقيقة تتيح لك سحب الصلاحية فوراً.
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => setCurrentPortal('patient')}
                          className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          <span>دخول بوابة المريض</span>
                        </button>

                        <button
                          onClick={() => setCurrentPortal('doctor')}
                          className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 font-extrabold text-sm sm:text-base transition-all flex items-center gap-2"
                        >
                          <Stethoscope className="w-4 h-4" />
                          <span>بوابة الطبيب والروشتة</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Health Wallet Card Mockup */}
                    <div className="lg:col-span-5 flex justify-center relative">
                      <div className="w-full max-w-[320px] bg-white dark:bg-[#112219] text-[#12261E] dark:text-white rounded-3xl p-6 shadow-2xl border border-white/40 space-y-4 animate-float">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                          <div>
                            <span className="text-[11px] text-gray-400 block font-medium">اسم المريض</span>
                            <span className="font-extrabold text-base text-[#0F4C35] dark:text-emerald-400">
                              أحمد محمود السيد
                            </span>
                          </div>
                          <span className="font-mono text-sm font-black bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-xl">
                            O+
                          </span>
                        </div>

                        {/* Animated ECG Pulse */}
                        <div className="py-1">
                          <svg className="w-full h-11" viewBox="0 0 260 60" fill="none">
                            <path
                              d="M0 30h60l10-22 14 44 12-30 8 8h156"
                              stroke="#247D55"
                              strokeWidth="3.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="animate-draw-ecg"
                            />
                          </svg>
                        </div>

                        {/* Critical Allergies */}
                        <div className="space-y-1.5 text-right">
                          <span className="text-[11px] text-gray-400 block font-semibold">تنبيهات حرجة:</span>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                              حساسية البنسلين
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F4EE] text-[#0F4C35] dark:bg-emerald-950/40 dark:text-emerald-300">
                              السكري
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F4EE] text-[#0F4C35] dark:bg-emerald-950/40 dark:text-emerald-300">
                              ضغط الدم
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-gray-500 border-t border-gray-100 dark:border-gray-800">
                          <span>الرقم القومي: 28910150102345</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">جلسة 30 دقيقة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3 Real Portal Gateway Cards with Real Photography */}
              <section className="max-w-6xl mx-auto px-5 sm:px-12 text-right">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                    البوابات التشغيلية الثلاث للمنظومة
                  </h2>
                  <p className="text-sm text-[#537063] dark:text-[#95B5A5] mt-1">
                    واجهات مخصصة لكل فئة مع مصادقة أمنية مزدوجة لحماية السجلات الطبية.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Gateway 1: Patient Portal */}
                  <div
                    onClick={() => setCurrentPortal('patient')}
                    className="group bg-white dark:bg-[#112219] rounded-3xl overflow-hidden border border-[#E1EDE6] dark:border-[#1C3829] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="./images/patient.webp"
                        alt="بوابة المريض والمرافق العائلي"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <span className="absolute bottom-3 right-4 font-black text-lg text-white">
                        بوابة المريض والمرافق العائلي
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-[#537063] dark:text-[#95B5A5] leading-relaxed">
                        توليد كود QR / OTP المؤقت لفتح الملف للطبيب لمدة 30 دقيقة، متابعة أدوية اليوم مع تأكيد الجرعات، السجل الطبي الموحد، وإدارة ملفات الأسرة.
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-[#0F4C35] dark:text-emerald-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>فتح بوابة المريض الآن</span>
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Gateway 2: Doctor Portal */}
                  <div
                    onClick={() => setCurrentPortal('doctor')}
                    className="group bg-white dark:bg-[#112219] rounded-3xl overflow-hidden border border-[#E1EDE6] dark:border-[#1C3829] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="./images/consultation.webp"
                        alt="بوابة الطبيب والروشتة الإلكترونية"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <span className="absolute bottom-3 right-4 font-black text-lg text-white">
                        بوابة الطبيب والروشتة الإلكترونية
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-[#537063] dark:text-[#95B5A5] leading-relaxed">
                        فك تشفير الملف بكود OTP الخاص بالمريض، فحص تنبيه حساسية البنسلين الحرج، وكتابة الروشتة وتوقيعها رقمياً بختم المنشأة وترحيلها لحظياً.
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-[#247D55] dark:text-emerald-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>فتح بوابة الطبيب الآن</span>
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Gateway 3: MoH Portal */}
                  <div
                    onClick={() => setCurrentPortal('moh')}
                    className="group bg-white dark:bg-[#112219] rounded-3xl overflow-hidden border border-[#E1EDE6] dark:border-[#1C3829] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src="./images/hospital.webp"
                        alt="بوابة وزارة الصحة والحوكمة"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <span className="absolute bottom-3 right-4 font-black text-lg text-white">
                        بوابة وزارة الصحة والحوكمة
                      </span>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-xs sm:text-sm text-[#537063] dark:text-[#95B5A5] leading-relaxed">
                        غرفة القيادة المركزية لمتابعة الترصد الوبائي والإنذار المبكر (ICD-10)، اعتماد تراخيص الأطباء الجدد، ومتابعة الربط المشفر للمستشفيات والمعامل.
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-[#389F6F] dark:text-emerald-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <span>دخول غرفة عمليات الوزارة</span>
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Public Citizen Tools Section */}
              <section className="max-w-6xl mx-auto px-5 sm:px-12 text-right">
                <div className="bg-[#E8F4EE]/60 dark:bg-[#112219] rounded-3xl p-6 sm:p-10 border border-[#E1EDE6] dark:border-[#1C3829] space-y-6">
                  <div className="max-w-2xl">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                      الخدمات العامة المباشرة للمواطنين وفرق الإسعاف
                    </h2>
                    <p className="text-xs sm:text-sm text-[#537063] dark:text-[#95B5A5] mt-1">
                      أدوات متاحة فوراً لحماية المريض من انتحال الصفة الطبية وإنقاذ الأرواح في الطوارئ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      onClick={() => setShowEmergencyModal(true)}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0A1610] border-2 border-red-200 dark:border-red-900/60 shadow-xs hover:border-red-500 text-right space-y-2 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
                        <Heart className="w-5 h-5 fill-current" />
                      </div>
                      <span className="font-extrabold text-sm block text-red-600 dark:text-red-400">
                        بطاقة الطوارئ الذكية
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        بيانات الإسعاف المنقذة للحياة فقط مع اتصال مباشر برقم 123.
                      </p>
                    </button>

                    <button
                      onClick={() => setShowVerifyDoctorModal(true)}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs hover:border-[#0F4C35] text-right space-y-2 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8F4EE] dark:bg-[#163223] text-[#0F4C35] dark:text-emerald-400 flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-sm block text-gray-900 dark:text-white">
                        تحقق من ترخيص طبيبك
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        استعلام بالاسم أو القيد للتأكد من اعتماده رسمياً ومنع انتحال الصفة.
                      </p>
                    </button>

                    <button
                      onClick={() => setShowRegisterModal(true)}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs hover:border-[#0F4C35] text-right space-y-2 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#E8F4EE] dark:bg-[#163223] text-[#0F4C35] dark:text-emerald-400 flex items-center justify-center">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <span className="font-extrabold text-sm block text-gray-900 dark:text-white">
                        إنشاء محفظة صحية جديدة
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        تسجيل مشفر يربط الرقم القومي بالسجل الموحد وحسابات الأسرة.
                      </p>
                    </button>
                  </div>
                </div>
              </section>

              {/* End-to-End Flow & Security */}
              <section className="max-w-6xl mx-auto px-5 sm:px-12 text-right">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                    دورة التكامل اللحظي (End-to-End Flow) والأمان
                  </h2>
                  <p className="text-xs sm:text-sm text-[#537063] dark:text-[#95B5A5] mt-1">
                    كيف تتدفق البيانات الطبية المشفرة بين المريض والطبيب وغرفة عمليات الوزارة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2">
                    <span className="w-7 h-7 rounded-full bg-[#0F4C35] text-white flex items-center justify-center text-xs font-bold">1</span>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">المريض يولد كود الجلسة</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      يولّد المريض رمز QR أو كود OTP من 6 أرقام صالح لمدة 30 دقيقة فقط لتقديمه للطبيب، مع إمكانية الإنهاء الفوري.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2">
                    <span className="w-7 h-7 rounded-full bg-[#247D55] text-white flex items-center justify-center text-xs font-bold">2</span>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">الطبيب يفحص ويكتب الروشتة</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      يفتح الطبيب الملف مؤقتاً، فيظهر له تنبيه حساسية البنسلين، ثم يكتب الأدوية ويوقعها بختم المنشأة الرقمي.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2">
                    <span className="w-7 h-7 rounded-full bg-[#389F6F] text-white flex items-center justify-center text-xs font-bold">3</span>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">الترحيل اللحظي والترصد المجهول</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      تتحول الروشتة تلقائياً لمنبهات دوائية بمحفظة المريض، بينما ترصد مؤشراتها التشخيصية مجهولة الهوية بلوحة الوزارة.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: PATIENT PORTAL (بوابة المريض والمرافق العائلي)                     */}
          {/* ========================================================================= */}
          {currentPortal === 'patient' && (
            <div className="max-w-6xl mx-auto px-5 sm:px-12 py-8 space-y-8 text-right">
              {/* Patient Top Identification Bar */}
              <div className="bg-white dark:bg-[#112219] rounded-3xl p-5 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F4EE] dark:bg-[#163223] text-[#0F4C35] dark:text-emerald-400 flex items-center justify-center font-black text-lg">
                    {currentPatient.name.slice(0, 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-gray-900 dark:text-white">{currentPatient.name}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                        {currentPatient.relationship}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      الرقم القومي: {currentPatient.nid} • {currentPatient.gov}
                    </span>
                  </div>
                </div>

                {/* Family Profile Switcher Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold">تبديل الملف العائلي:</span>
                  <select
                    value={activePatientIndex}
                    onChange={(e) => setActivePatientIndex(Number(e.target.value))}
                    className="text-xs font-bold px-3 py-2 rounded-xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-gray-300 dark:border-gray-700 text-[#0F4C35] dark:text-emerald-400"
                  >
                    {familyProfiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.relationship})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 5 Horizontal Sub-Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-none text-xs sm:text-sm font-bold">
                {[
                  '1. لوحة المتابعة اليومية',
                  '2. السجل الطبي الموحد',
                  '3. أدويتي والتنبيهات',
                  '4. المرضى والمرافقون',
                  '5. سجل الخصوصية والوصول',
                ].map((tabLabel, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPatientTab(idx)}
                    className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                      patientTab === idx
                        ? 'bg-[#0F4C35] text-white shadow-sm'
                        : 'bg-white dark:bg-[#112219] text-gray-600 dark:text-gray-300 border border-[#E1EDE6] dark:border-[#1C3829] hover:border-[#0F4C35]'
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              {/* Tab 0: Dashboard (Session Code + Doses + Summary) */}
              {patientTab === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Session Card (OTP & QR) */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#0A261B] to-[#0F4C35] text-white rounded-3xl p-6 text-center space-y-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300">رمز الجلسة المؤقت للزيارة</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${isSessionActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                        {isSessionActive ? 'صلاحية 30 دقيقة' : 'جلسة منتهية'}
                      </span>
                    </div>

                    {/* Circular Ring Timer */}
                    <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 150 150">
                        <circle cx="75" cy="75" r="65" stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none" />
                        <circle
                          cx="75"
                          cy="75"
                          r="65"
                          stroke="#34D399"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          className="animate-countdown-circle"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="font-mono text-xl font-black block">
                          {String(timerMins).padStart(2, '0')}:{String(timerSecs).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] text-emerald-100">الوقت المتبقي</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-emerald-100 block">كود OTP الخاص بالطبيب:</span>
                      <span className="font-mono text-3xl font-black tracking-widest text-emerald-300">
                        {otpCode}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={refreshOtp}
                        className="flex-1 py-2 px-3 rounded-xl bg-white text-[#0F4C35] text-xs font-bold flex items-center justify-center gap-1 hover:bg-gray-100"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>تحديث الكود</span>
                      </button>
                      <button
                        onClick={endSessionNow}
                        className="py-2 px-3 rounded-xl bg-red-500/30 text-white text-xs font-bold hover:bg-red-500/50"
                      >
                        إنهاء الجلسة فوراً
                      </button>
                    </div>
                  </div>

                  {/* Today Doses & Vitals */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* Doses Card */}
                    <div className="bg-white dark:bg-[#112219] p-6 rounded-3xl border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="font-black text-base text-gray-900 dark:text-white flex items-center gap-2">
                          <Pill className="w-5 h-5 text-[#0F4C35] dark:text-emerald-400" />
                          <span>جرعات الأدوية اليوم ومواعيدها</span>
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          الالتزام: {adherenceRate}%
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {todayDoses.map((dose) => (
                          <div
                            key={dose.id}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                              dose.taken
                                ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                                : 'bg-[#F5F9F6] dark:bg-[#0A1610] border-gray-200 dark:border-gray-800'
                            }`}
                          >
                            <div className="space-y-0.5">
                              <span className="font-extrabold text-sm text-gray-900 dark:text-white block">
                                {dose.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {dose.time} • {dose.source}
                              </span>
                            </div>

                            <button
                              onClick={() => toggleDose(dose.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                                dose.taken
                                  ? 'bg-emerald-600 text-white'
                                  : 'border border-[#0F4C35] text-[#0F4C35] dark:text-emerald-400 hover:bg-emerald-50'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{dose.taken ? 'تم أخذها ✔' : 'تأكيد الجرعة'}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vitals Summary */}
                    <div className="bg-white dark:bg-[#112219] p-5 rounded-3xl border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-2">
                      <span className="text-xs font-extrabold text-[#0F4C35] dark:text-emerald-400 block">
                        ملخص الحالة الصحية والتنبيهات:
                      </span>
                      <div className="flex flex-wrap gap-2 pt-1 text-xs">
                        <span className="px-3 py-1 rounded-xl bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300 font-bold">
                          الحساسية: {currentPatient.allergies.join('، ')}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-[#E8F4EE] text-[#0F4C35] dark:bg-emerald-950/40 dark:text-emerald-300 font-bold">
                          المزمنة: {currentPatient.chronic.join('، ')}
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold">
                          فصيلة الدم: {currentPatient.blood}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1: السجل الطبي الموحد */}
              {patientTab === 1 && (
                <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                  <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
                    <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                      السجل الطبي الموحد (مستشفيات حكومية وخاصة ومعامل)
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm">
                          كشف باطنة وقلب + روشتة إلكترونية
                        </span>
                        <span className="font-mono text-gray-400 text-xs">2026-10-15</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">مستشفى قصر العيني التعليمي (القاهرة) — د. كريم عبد الرحمن</p>
                      <p className="text-xs text-gray-500">التشخيص: ارتفاع ضغط الدم الأساسي (I10). تم تحديث جدول المنبهات.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm">
                          تحاليل وظائف كلى وسكر تراكمي HbA1c
                        </span>
                        <span className="font-mono text-gray-400 text-xs">2026-10-10</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">معامل البرج المركزية (الجيزة) — د. نهى صقر</p>
                      <p className="text-xs text-gray-500">النتيجة: HbA1c: 6.4% (منضبط)، الكرياتينين طبيعي.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm">
                          أشعة موجات صوتية على القلب (Echo)
                        </span>
                        <span className="font-mono text-gray-400 text-xs">2026-08-22</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">مركز النيل التخصصي للقلب — د. هشام طلعت زكي</p>
                      <p className="text-xs text-gray-500">النتيجة: كفاءة عضلة القلب EF = 64% (طبيعية جداً).</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: أدويتي والتنبيهات */}
              {patientTab === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Manual Med Add Form */}
                  <div className="lg:col-span-5 bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                    <span className="font-black text-sm text-gray-900 dark:text-white block">
                      إضافة دواء أو فيتامين يدوياً للمنبه
                    </span>

                    {medAddSuccess && (
                      <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                        {medAddSuccess}
                      </div>
                    )}

                    <form onSubmit={handleAddMed} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold mb-1">اسم الدواء</label>
                        <input
                          type="text"
                          required
                          value={newMedName}
                          onChange={(e) => setNewMedName(e.target.value)}
                          placeholder="مثال: فيتامين د3 أو بنادول"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">الجرعة</label>
                        <input
                          type="text"
                          required
                          value={newMedDose}
                          onChange={(e) => setNewMedDose(e.target.value)}
                          placeholder="قرص واحد بعد العشاء"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">وقت التنبيه اليومي</label>
                        <input
                          type="time"
                          value={newMedTime}
                          onChange={(e) => setNewMedTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#0F4C35] text-white font-bold hover:bg-[#0A3324] transition-colors"
                      >
                        + إدراج في المنبه والأدوية النشطة
                      </button>
                    </form>
                  </div>

                  {/* Active Meds Table */}
                  <div className="lg:col-span-7 bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                    <span className="font-black text-sm text-gray-900 dark:text-white block">
                      الأدوية المفعلة حالياً بالمحفظة ({activeMedsList.length})
                    </span>

                    <div className="space-y-2.5">
                      {activeMedsList.map((med) => (
                        <div
                          key={med.id}
                          className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] text-xs flex justify-between items-center"
                        >
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block text-sm">{med.name}</span>
                            <span className="text-gray-500">{med.dose} • {med.duration}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${med.source === 'روشتة طبيب' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'}`}>
                            {med.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: المرضى والمرافقون */}
              {patientTab === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {familyProfiles.map((p, idx) => (
                    <div
                      key={p.id}
                      onClick={() => setActivePatientIndex(idx)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                        activePatientIndex === idx
                          ? 'bg-white dark:bg-[#112219] border-2 border-[#0F4C35] shadow-md'
                          : 'bg-[#F5F9F6] dark:bg-[#0A1610] border-[#E1EDE6] dark:border-[#1C3829]'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#0F4C35] text-white">
                          {p.relationship}
                        </span>
                        <span className="font-mono text-xs font-black text-red-600">{p.blood}</span>
                      </div>
                      <span className="font-extrabold text-sm block text-gray-900 dark:text-white">{p.name}</span>
                      <span className="text-xs text-gray-400 block">{p.activeMedsCount} أدوية نشطة</span>
                      {activePatientIndex === idx && (
                        <span className="text-[11px] text-emerald-600 font-bold block pt-1">الملف المفتوح حالياً ✔</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: سجل الخصوصية */}
              {patientTab === 4 && (
                <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-5">
                  <div className="flex flex-col md:flex-row items-center gap-4 bg-[#F5F9F6] dark:bg-[#0A1610] p-4 rounded-2xl border border-[#E1EDE6] dark:border-[#1C3829]">
                    <div className="w-full md:w-36 h-24 rounded-xl overflow-hidden shrink-0">
                      <img
                        src="./images/medical-secure.webp"
                        alt="تشفير السجلات الطبية"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="font-black text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>سجل الخصوصية والوصول المشفر (تدقيق رقابي غير قابل للتعديل)</span>
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        كل عملية قراءة أو إضافة على ملفك الطبي تسجل بتوقيع زمني مشفر وهندسة صفرية الثقة (Zero-Trust)، ولا يمكن لأي جهة حذف أي إجراء أو تعديله بأثر رجعي.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex justify-between items-center border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-gray-800 dark:text-gray-200">د. كريم عبد الرحمن حسن (قصر العيني) — فتح السجل وإصدار روشتة</span>
                      </div>
                      <span className="font-mono text-gray-400">2026-10-15 | 11:32 ص (OTP)</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex justify-between items-center border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-gray-800 dark:text-gray-200">د. نهى صقر (معامل البرج) — إرفاق نتائج تحاليل معملية</span>
                      </div>
                      <span className="font-mono text-gray-400">2026-10-10 | 09:15 ص (QR)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: DOCTOR PORTAL (بوابة الطبيب والروشتة الإلكترونية)                  */}
          {/* ========================================================================= */}
          {currentPortal === 'doctor' && (
            <div className="max-w-6xl mx-auto px-5 sm:px-12 py-8 space-y-8 text-right">
              {/* Doctor Official Header */}
              <div className="bg-white dark:bg-[#112219] rounded-3xl p-5 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F4EE] dark:bg-[#163223] text-[#247D55] dark:text-emerald-400 flex items-center justify-center font-bold">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-gray-900 dark:text-white">د. كريم عبد الرحمن حسن</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                        ✔ معتمد من وزارة الصحة
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      استشاري أمراض الباطنة والقلب • قيد نقابي #84219 • {facilityName} ({selectedGovernorate})
                    </span>
                  </div>
                </div>

                {/* Facility Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">المنشأة:</span>
                  <span className="font-bold px-3 py-1.5 rounded-xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-gray-300 dark:border-gray-700">
                    {facilityName}
                  </span>
                </div>
              </div>

              {/* 4 Doctor Sub-Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-none text-xs sm:text-sm font-bold">
                {[
                  '1. شاشة الكشف والروشتة',
                  '2. المحافظة وجهة العمل',
                  '3. أرشيف الروشتات الصادرة',
                  '4. حالة الاعتماد والوثائق',
                ].map((tabLabel, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDoctorTab(idx)}
                    className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                      doctorTab === idx
                        ? 'bg-[#247D55] text-white shadow-sm'
                        : 'bg-white dark:bg-[#112219] text-gray-600 dark:text-gray-300 border border-[#E1EDE6] dark:border-[#1C3829] hover:border-[#247D55]'
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              {/* Tab 0: Consultation & e-Rx */}
              {doctorTab === 0 && (
                <div className="space-y-6">
                  {/* Critical Allergy Warning Bar */}
                  <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-red-500 text-red-900 dark:text-red-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                      <div>
                        <span className="font-black text-sm block">شريط التنبيه الطبي الحرج: المريض لديه حساسية من البنسلين ومشتقاته!</span>
                        <span className="text-xs">المريض: أحمد محمود السيد (فصيلة الدم: O+) • الأمراض المزمنة: السكري النوع الثاني والضغط.</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs bg-white dark:bg-black/40 px-2.5 py-1 rounded-lg text-red-600 font-bold shrink-0">
                      جلسة نشطة 30 دقيقة
                    </span>
                  </div>

                  {/* 2 Columns: Patient History (Right) & Smart Rx Writer (Left) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Medical History */}
                    <div className="lg:col-span-5 bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white block">
                        التاريخ المرضي السابق للمريض
                      </span>
                      <div className="space-y-3 text-xs">
                        <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] space-y-1">
                          <span className="font-bold text-emerald-800 dark:text-emerald-400 block">كشف باطنة وضغط</span>
                          <span className="text-gray-500">2026-10-15 • مستشفى قصر العيني</span>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] space-y-1">
                          <span className="font-bold text-emerald-800 dark:text-emerald-400 block">تحاليل سكر ووظائف كلى</span>
                          <span className="text-gray-500">2026-10-10 • معامل البرج المركزية</span>
                        </div>
                      </div>
                    </div>

                    {/* Smart Rx Writer */}
                    <div className="lg:col-span-7 bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                      <span className="font-extrabold text-sm text-gray-900 dark:text-white block">
                        محرر الروشتة الذكي المعتمد
                      </span>

                      {rxConflictWarning && (
                        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-200 text-xs font-bold flex items-center gap-2 animate-bounce">
                          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                          <span>{rxConflictWarning}</span>
                        </div>
                      )}

                      {rxSuccessMsg && (
                        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold">
                          {rxSuccessMsg}
                        </div>
                      )}

                      <form onSubmit={handleSignRx} className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold mb-1">التشخيص الطبي (نصي أو ICD-10)</label>
                          <input
                            type="text"
                            required
                            value={rxDiagnosis}
                            onChange={(e) => setRxDiagnosis(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                          />
                        </div>

                        {/* Add Medicine Inputs */}
                        <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-gray-200 dark:border-gray-800 space-y-3">
                          <span className="font-bold text-gray-700 dark:text-gray-300 block">إدراج دواء جديد:</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <input
                                type="text"
                                value={rxMedName}
                                onChange={(e) => handleRxMedNameChange(e.target.value)}
                                placeholder="اسم الدواء (جرب كتابة بنسلين للفحص)"
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#112219]"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={rxDose}
                                onChange={(e) => setRxDose(e.target.value)}
                                placeholder="الجرعة (قرص صباحاً)"
                                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#112219]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleAddRxItem}
                            disabled={!rxMedName || !!rxConflictWarning}
                            className="w-full py-2 bg-white dark:bg-[#112219] border border-[#247D55] text-[#247D55] font-bold rounded-xl hover:bg-[#247D55] hover:text-white transition-colors disabled:opacity-50"
                          >
                            + إضافة هذا الدواء للروشتة
                          </button>
                        </div>

                        {/* Prescribed Items List */}
                        <div className="space-y-2">
                          <span className="font-bold text-gray-600 block">الأدوية المعتمدة بالروشتة ({rxItems.length}):</span>
                          {rxItems.map((item, i) => (
                            <div key={i} className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-bold text-gray-900 dark:text-white block">{item.name}</span>
                                <span className="text-gray-500">{item.dose} • {item.duration}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setRxItems(rxItems.filter((_, idx) => idx !== i))}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          type="submit"
                          disabled={rxItems.length === 0}
                          className="w-full py-3 rounded-2xl bg-[#247D55] hover:bg-[#1C6B4B] text-white font-extrabold text-sm shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-5 h-5" />
                          <span>توقيع الروشتة إلكترونياً وترحيلها لحظياً للمحفظة</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1: Governorate & Facility */}
              {doctorTab === 1 && (
                <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4 max-w-xl mx-auto overflow-hidden">
                  <div className="relative -mx-6 -mt-6 mb-4 h-36 overflow-hidden">
                    <img
                      src="./images/clinic.webp"
                      alt="المنشأة الطبية وجهة العمل"
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                      <span className="font-black text-sm text-white block">
                        اعتماد المنشأة الطبية وجهة العمل الرسمية (27 محافظة)
                      </span>
                    </div>
                  </div>

                  <span className="font-black text-sm text-gray-900 dark:text-white block">
                    تحديد المنشأة والمحافظة من محافظات مصر الـ 27
                  </span>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold mb-1">المحافظة</label>
                      <select
                        value={selectedGovernorate}
                        onChange={(e) => setSelectedGovernorate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                      >
                        {egyptGovernorates.map((g) => (
                          <option key={g} value={g}>
                            محافظة {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">نوع المنشأة</label>
                      <select
                        value={facilityType}
                        onChange={(e) => setFacilityType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                      >
                        <option value="مستشفى حكومي">مستشفى حكومي</option>
                        <option value="مستشفى خاص">مستشفى خاص</option>
                        <option value="عيادة خاصة">عيادة خاصة</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">اسم المنشأة الطبية</label>
                      <input
                        type="text"
                        value={facilityName}
                        onChange={(e) => setFacilityName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Issued Prescriptions */}
              {doctorTab === 2 && (
                <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                  <span className="font-black text-sm text-gray-900 dark:text-white block">
                    أرشيف الروشتات الإلكترونية الصادرة والمرحلة
                  </span>

                  <div className="space-y-3 text-xs">
                    {issuedRxList.map((rx) => (
                      <div key={rx.id} className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex justify-between items-center">
                        <div>
                          <span className="font-extrabold text-sm text-gray-900 dark:text-white block">#{rx.id}</span>
                          <span className="text-gray-500">المريض: {rx.patient} • {rx.diagnosis}</span>
                        </div>
                        <span className="font-mono text-emerald-600 font-bold">{rx.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Credentials */}
              {doctorTab === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2 text-xs">
                    <span className="font-bold text-gray-900 dark:text-white block text-sm">1. بطاقة الرقم القومي</span>
                    <span className="text-emerald-600 font-bold block">موثق بالسجل المدني ✔</span>
                    <p className="text-gray-400">مطابقة رقم قومي 28104190102345</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2 text-xs">
                    <span className="font-bold text-gray-900 dark:text-white block text-sm">2. شهادة التخرج والماجستير</span>
                    <span className="text-emerald-600 font-bold block">موثق من المجلس الأعلى للجامعات ✔</span>
                    <p className="text-gray-400">طب قصر العيني (جامعة القاهرة)</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2 text-xs">
                    <span className="font-bold text-gray-900 dark:text-white block text-sm">3. كارنيه نقابة الأطباء</span>
                    <span className="text-emerald-600 font-bold block">ساري ومعتمد رسمي ✔</span>
                    <p className="text-gray-400">قيد استشاري رقم #84219</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: MoH COMMAND CENTER (بوابة وزارة الصحة والحوكمة)                  */}
          {/* ========================================================================= */}
          {currentPortal === 'moh' && (
            <div className="max-w-6xl mx-auto px-5 sm:px-12 py-8 space-y-8 text-right">
              {/* MoH Header Banner */}
              <div className="bg-white dark:bg-[#112219] rounded-3xl p-5 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F4EE] dark:bg-[#163223] text-[#389F6F] flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-black text-base text-gray-900 dark:text-white block">
                      غرفة العمليات المركزية والترصد الصحي — وزارة الصحة والسكان
                    </span>
                    <span className="text-xs text-gray-500">متابعة الحوكمة على مستوى كافة محافظات الجمهورية الـ 27</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-400">تصفية المحافظة:</span>
                  <select
                    value={mohGovFilter}
                    onChange={(e) => setMohGovFilter(e.target.value)}
                    className="font-bold px-3 py-1.5 rounded-xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-gray-300 dark:border-gray-700"
                  >
                    <option value="كل محافظات الجمهورية (27 محافظة)">كل محافظات الجمهورية (27 محافظة)</option>
                    {egyptGovernorates.map((g) => (
                      <option key={g} value={g}>
                        محافظة {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3 MoH Sub-Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-none text-xs sm:text-sm font-bold">
                {[
                  '1. الترصد الوبائي والإنذار المبكر',
                  '2. مركز اعتماد تراخيص الأطباء',
                  '3. التدقيق الأمني للمنشآت',
                ].map((tabLabel, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMohTab(idx)}
                    className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all ${
                      mohTab === idx
                        ? 'bg-[#389F6F] text-white shadow-sm'
                        : 'bg-white dark:bg-[#112219] text-gray-600 dark:text-gray-300 border border-[#E1EDE6] dark:border-[#1C3829] hover:border-[#389F6F]'
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              {/* Tab 0: Epidemiology */}
              {mohTab === 0 && (
                <div className="space-y-6">
                  {/* KPIs */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#0F4C35] dark:text-emerald-400 block">12,480,210</span>
                      <span className="font-bold text-xs text-gray-700 dark:text-gray-300 block">محفظة صحية نشطة</span>
                      <span className="text-[10px] text-gray-400">أرقام توضيحية للعرض</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#247D55] dark:text-emerald-400 block">84,320</span>
                      <span className="font-bold text-xs text-gray-700 dark:text-gray-300 block">طبيب معتمد رقمياً</span>
                      <span className="text-[10px] text-gray-400">أرقام توضيحية للعرض</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#389F6F] dark:text-emerald-400 block">142,650</span>
                      <span className="font-bold text-xs text-gray-700 dark:text-gray-300 block">روشتة إلكترونية اليوم</span>
                      <span className="text-[10px] text-gray-400">أرقام توضيحية للعرض</span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#0F4C35] dark:text-emerald-400 block">27</span>
                      <span className="font-bold text-xs text-gray-700 dark:text-gray-300 block">محافظة مغطاة</span>
                      <span className="text-[10px] text-gray-400">تغطية جغرافية كاملة</span>
                    </div>
                  </div>

                  {/* Early Warning Disease Monitoring Table */}
                  <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                    <span className="font-black text-sm text-gray-900 dark:text-white block">
                      جدول الإنذار المبكر للأمراض الموسمية والترصد الوبائي (ICD-10 مجهول الهوية)
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex justify-between items-center">
                        <div>
                          <span className="font-bold text-sm block">التهاب الجهاز التنفسي العلوي الحاد (J06.9)</span>
                          <span className="text-gray-500">المحافظات الأعلى تسجيلاً: القاهرة، الجيزة، الإسكندرية</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">تنبيه موسمي</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex justify-between items-center">
                        <div>
                          <span className="font-bold text-sm block">النزلات المعوية الحادة غير المحددة (A09)</span>
                          <span className="text-gray-500">المحافظات الأعلى تسجيلاً: أسيوط، سوهاج، المنيا</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold">تحت المتابعة</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1: Physician Verification Queue */}
              {mohTab === 1 && (
                <div className="bg-white dark:bg-[#112219] rounded-3xl p-6 border border-[#E1EDE6] dark:border-[#1C3829] shadow-xs space-y-4">
                  <span className="font-black text-sm text-gray-900 dark:text-white block">
                    طابور مراجعة تراخيص الأطباء الجدد ومطابقة المستندات الثلاثة
                  </span>

                  <div className="space-y-3 text-xs">
                    {doctorApplications.map((doc) => (
                      <div key={doc.id} className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900 dark:text-white">{doc.name}</span>
                            <span className="text-emerald-700 font-semibold">({doc.specialty})</span>
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${doc.status === 'معتمد' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'مرفوض' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                              {doc.status}
                            </span>
                          </div>
                          <span className="text-gray-400 text-[11px] block mt-0.5">
                            الرقم القومي: {doc.nid} • قيد نقابي #{doc.syndicateId} • {doc.univ}
                          </span>
                        </div>

                        {doc.status === 'قيد المراجعة' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoHDecision(doc.id, 'معتمد')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                            >
                              اعتماد ✔
                            </button>
                            <button
                              onClick={() => handleMoHDecision(doc.id, 'مرفوض')}
                              className="px-3 py-1.5 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200"
                            >
                              رفض ❌
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Security & Facilities Audit */}
              {mohTab === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-5 rounded-3xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2">
                    <span className="font-bold text-gray-900 dark:text-white block text-sm">المستشفيات الحكومية والجامعية</span>
                    <span className="font-mono text-emerald-600 font-bold block">638 من 642 متصلة (99.4% ربط مشفر)</span>
                    <p className="text-gray-400">قنوات اتصال مشفرة لحظياً E2EE ومطابقة للمواصفات.</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-white dark:bg-[#112219] border border-[#E1EDE6] dark:border-[#1C3829] space-y-2">
                    <span className="font-bold text-gray-900 dark:text-white block text-sm">معامل التحاليل ومراكز الأشعة</span>
                    <span className="font-mono text-emerald-600 font-bold block">1,716 من 1,730 متصلة (99.2% ربط مشفر)</span>
                    <p className="text-gray-400">ربط مؤمن مع قواعد بيانات تقارير الفحوصات الطبية.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Institutional Footer */}
          <footer className="bg-[#0A261B] text-[#9FD6B7] text-center px-6 py-10 text-xs sm:text-sm space-y-2 border-t border-white/10">
            <p className="font-extrabold text-base text-white">منظومة المحفظة الصحية القومية المشفرة للمريض</p>
            <p className="text-[#CFE8DA] opacity-80">
              National Secure Patient Health Wallet System — جمهورية مصر العربية
            </p>
            <p className="text-[11px] text-emerald-400 pt-2">
              وزارة الصحة والسكان • الهيئة العامة للرعاية الصحية • التأمين الصحي الشامل
            </p>
          </footer>
        </div>
      </div>

      {/* Floating Simulator Button on Desktop */}
      <button
        onClick={() => {
          setIsPhoneMode(!isPhoneMode);
          window.scrollTo(0, 0);
          if (appRef.current) appRef.current.scrollTop = 0;
        }}
        className="hidden sm:flex fixed bottom-5 left-5 z-50 border-0 cursor-pointer font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-[#0F4C35] to-[#247D55] px-5 py-3 rounded-full items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        title="معاينة المنظومة كأنك تستخدم هاتف ذكي حقيقي"
      >
        <Smartphone className="w-4 h-4" />
        <span>{isPhoneMode ? 'عرض الشاشة الكاملة' : 'تجربة الموبايل'}</span>
      </button>

      {/* Modal 1: Emergency SOS Modal */}
      {showEmergencyModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setShowEmergencyModal(false)}
        >
          <div
            className="bg-white dark:bg-[#112219] text-[#12261E] dark:text-white rounded-3xl p-6 max-w-sm w-full border-t-8 border-[#DC2626] shadow-2xl space-y-4 text-right overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative -mx-6 -mt-6 mb-3 h-28 overflow-hidden">
              <img
                src="./images/emergency.webp"
                alt="طوارئ الإسعاف الطبي"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                <span className="font-black text-base text-white flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
                  <span>بطاقة الطوارئ الطبية السريعة</span>
                </span>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="absolute top-3 left-3 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                aria-label="إغلاق النافذة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm bg-gray-50 dark:bg-[#0A1610] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-400">الاسم:</span>
                <span className="font-bold">{currentPatient.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الرقم القومي:</span>
                <span className="font-mono font-bold">{currentPatient.nid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">فصيلة الدم:</span>
                <span className="font-mono font-extrabold text-[#DC2626] text-base">{currentPatient.blood}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400 font-bold">
                <span>حساسية حرجة:</span>
                <span>{currentPatient.allergies.join('، ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">أمراض مزمنة:</span>
                <span>{currentPatient.chronic.join('، ')}</span>
              </div>
            </div>

            <a
              href="tel:123"
              className="w-full py-3 rounded-xl bg-[#DC2626] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-red-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال بإسعاف مصر (123)</span>
            </a>

            <span className="text-[11px] text-gray-400 text-center block">
              بيانات الإسعاف المنقذة للحياة فقط دون كشف باقي السجل المرضي الخاص.
            </span>
          </div>
        </div>
      )}

      {/* Modal 2: Doctor Verification Modal */}
      {showVerifyDoctorModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setShowVerifyDoctorModal(false)}
        >
          <div
            className="bg-white dark:bg-[#112219] text-[#12261E] dark:text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-right border border-[#E1EDE6] dark:border-[#1C3829]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg text-[#0F4C35] dark:text-emerald-400 flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                <span>خدمة «تحقق من طبيبك» المعتمد</span>
              </span>
              <button
                onClick={() => setShowVerifyDoctorModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#537063] dark:text-[#95B5A5]">
              استعلام عام فوري للمواطنين للتأكد من اعتماد الطبيب رسمياً لدى وزارة الصحة قبل الكشف لمنع انتحال الصفة.
            </p>

            <div className="relative">
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="ابحث باسم الطبيب أو رقم القيد النقابي (مثال: 84219)..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610] text-xs sm:text-sm focus:border-[#0F4C35]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#F5F9F6] dark:bg-[#0A1610] border border-[#E1EDE6] dark:border-[#1C3829] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-gray-900 dark:text-white text-sm">{doc.name}</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md text-[10px]">
                      قيد #{doc.syndicateId}
                    </span>
                  </div>
                  <div className="text-[#247D55] dark:text-emerald-400 font-medium">{doc.specialty}</div>
                  <div className="text-gray-400 text-[11px]">{doc.hospital}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Patient Registration Modal */}
      {showRegisterModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setShowRegisterModal(false)}
        >
          <div
            className="bg-white dark:bg-[#112219] text-[#12261E] dark:text-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right border border-[#E1EDE6] dark:border-[#1C3829]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg text-[#0F4C35] dark:text-emerald-400 flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span>إنشاء محفظة صحية مشفرة جديدة</span>
              </span>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {regSuccess && (
              <div className="p-3 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم إنشاء المحفظة المشفرة بنجاح وإضافتها للقائمة العائلية!</span>
              </div>
            )}

            <form onSubmit={handleRegisterModalSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold mb-1">الاسم الرباعي</label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الرقم القومي (14 رقماً)</label>
                <input
                  type="text"
                  required
                  maxLength={14}
                  value={regNid}
                  onChange={(e) => setRegNid(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">فصيلة الدم</label>
                  <select
                    value={regBlood}
                    onChange={(e) => setRegBlood(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">المحافظة</label>
                  <select
                    value={regGov}
                    onChange={(e) => setRegGov(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                  >
                    {egyptGovernorates.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">الحساسية الدوائية الحرجة</label>
                <input
                  type="text"
                  value={regAllergy}
                  onChange={(e) => setRegAllergy(e.target.value)}
                  placeholder="مثال: البنسلين ومشتقاته"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الأمراض المزمنة</label>
                <input
                  type="text"
                  value={regChronic}
                  onChange={(e) => setRegChronic(e.target.value)}
                  placeholder="مثال: السكري، ارتفاع ضغط الدم"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0A1610]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0F4C35] hover:bg-[#0A3324] text-white font-extrabold text-xs sm:text-sm mt-2 transition-colors"
              >
                تأكيد وإنشاء المحفظة المشفرة
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
