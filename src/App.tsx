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
} from 'lucide-react';

export default function App() {
  // Navigation & Interactive States
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPhoneMode, setIsPhoneMode] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('482915');
  const [doseTaken, setDoseTaken] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Modals
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [showVerifyDoctorModal, setShowVerifyDoctorModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  // Doctor search state
  const [doctorSearch, setDoctorSearch] = useState<string>('');

  // Register form state
  const [regName, setRegName] = useState<string>('أحمد محمد محمود السيد');
  const [regNid, setRegNid] = useState<string>('28910150102345');
  const [regBlood, setRegBlood] = useState<string>('A+');
  const [regGov, setRegGov] = useState<string>('القاهرة');
  const [regAllergy, setRegAllergy] = useState<string>('البنسلين ومشتقاته');
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  const appRef = useRef<HTMLDivElement>(null);

  // Dark Mode Class Handling
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  // Phone simulation body class
  useEffect(() => {
    if (isPhoneMode) {
      document.body.classList.add('ph');
    } else {
      document.body.classList.remove('ph');
    }
  }, [isPhoneMode]);

  // Scroll Progress Tracking
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

  // Generate new OTP
  const generateNewOtp = () => {
    let count = 0;
    const interval = setInterval(() => {
      setOtpCode(Math.floor(100000 + Math.random() * 900000).toString());
      count++;
      if (count > 8) clearInterval(interval);
    }, 45);
  };

  // Doctors Database
  const doctorsList = [
    {
      name: 'د. كريم عبد الرحمن حسن',
      syndicateId: '84219',
      specialty: 'استشاري باطنة وقلب وأوعية دموية',
      hospital: 'مستشفى قصر العيني التعليمي - القاهرة',
      status: 'معتمد وموثق رسمياً من وزارة الصحة',
    },
    {
      name: 'د. نهى إبراهيم صقر',
      syndicateId: '79450',
      specialty: 'استشاري التحاليل الطبية والإكلينيكية',
      hospital: 'معامل البرج المركزية - الجيزة',
      status: 'معتمد وموثق رسمياً من وزارة الصحة',
    },
    {
      name: 'د. هشام طلعت زكي',
      syndicateId: '68112',
      specialty: 'استشاري أمراض القلب وقسطرة الشرايين',
      hospital: 'مركز النيل التخصصي - القاهرة',
      status: 'معتمد وموثق رسمياً من وزارة الصحة',
    },
    {
      name: 'د. وائل سامي منصور',
      syndicateId: '73940',
      specialty: 'استشاري طب وجراحة العيون',
      hospital: 'مستشفى رمد الإسكندرية التخصصي',
      status: 'معتمد وموثق رسمياً من وزارة الصحة',
    },
  ];

  const filteredDoctors = doctorsList.filter(
    (d) =>
      d.name.includes(doctorSearch.trim()) ||
      d.syndicateId.includes(doctorSearch.trim()) ||
      d.specialty.includes(doctorSearch.trim())
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setShowRegisterModal(false);
    }, 1500);
  };

  return (
    <div className="stage">
      <div className="phone">
        <div className="app-wrapper" ref={appRef} id="app">
          {/* Scroll progress bar */}
          <div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7CE0A9] to-white z-60 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Sticky Header */}
          <header className="sticky top-0 z-50 bg-[#0E3B28]/95 dark:bg-[#08150E]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3 text-white border-b border-white/10 shadow-xs">
            {/* Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[#7CE0A9] flex items-center justify-center text-[#0E3B28] shadow-xs">
                <Shield className="w-5 h-5 fill-current" />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-sm sm:text-base block tracking-tight">
                  المحفظة الصحية القومية
                </span>
                <span className="text-[11px] text-[#CFE8DA] hidden sm:block">
                  جمهورية مصر العربية
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#CFE8DA] overflow-x-auto">
              <a href="#s0" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                الرئيسية
              </a>
              <a href="#s1" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                الهوية البصرية
              </a>
              <a href="#s2" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                الخدمات
              </a>
              <a href="#s3" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                بوابة المريض
              </a>
              <a href="#s4" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                بوابة الطبيب
              </a>
              <a href="#s5" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                وزارة الصحة
              </a>
              <a href="#s6" className="px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors">
                الأمان والتشفير
              </a>
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowVerifyDoctorModal(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-[#CFE8DA] transition-colors"
                title="تحقق من اعتماد طبيبك لدى وزارة الصحة"
              >
                <Search className="w-3.5 h-3.5" />
                <span>تحقق من طبيبك</span>
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#2D8259] hover:bg-[#236846] text-white transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>تسجيل مريض</span>
              </button>

              {/* Emergency SOS Button */}
              <button
                onClick={() => setShowEmergencyModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#E5484D] hover:bg-[#c9353a] text-white text-xs font-extrabold shadow-sm transition-all animate-sos-pulse whitespace-nowrap flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>بطاقة الطوارئ</span>
              </button>

              {/* Dark mode toggle */}
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

          {/* Hero Section (#s0) */}
          <section id="s0" className="hero-gradient relative text-white px-5 sm:px-12 py-16 sm:py-24 overflow-hidden">
            {/* Ambient Blobs */}
            <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#43936B] blur-3xl opacity-35 pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-[#7CE0A9] blur-3xl opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-7 space-y-6 text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-[#D3EBDD] border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#7CE0A9] animate-pulse" />
                  <span>المنظومة الوطنية للسجل الطبي المشفر الموحد</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black leading-tight sm:leading-snug text-white">
                  سجلك الطبي كله في <span className="text-[#7CE0A9]">محفظة واحدة</span> مشفرة
                </h1>

                <p className="text-base sm:text-lg text-[#D3EBDD] leading-relaxed max-w-xl">
                  منصة ويب متجاوبة تربط المستشفيات والأطباء ووزارة الصحة بسجل واحد يملكه المريض بالكامل، ويفتحه للطبيب بكود مؤقت (QR / OTP) لمدة 30 دقيقة فقط مع إمكانية سحب الصلاحية فوراً.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#s3"
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 text-[#1B6B46] font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105"
                  >
                    اكتشف بوابة المريض
                  </a>
                  <a
                    href="#s6"
                    className="px-6 py-3.5 rounded-full bg-transparent hover:bg-white/15 text-white border-2 border-white/40 font-extrabold text-sm sm:text-base transition-all"
                  >
                    كيف نحمي بياناتك
                  </a>
                </div>
              </div>

              {/* Right Column: 3D Floating Health Wallet Card */}
              <div className="lg:col-span-5 flex justify-center relative py-6">
                {/* Floating Top Badge */}
                <div className="absolute top-2 right-2 sm:right-6 bg-white dark:bg-[#12281D] text-[#1B6B46] dark:text-[#7CE0A9] font-extrabold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border border-white/20 z-20 animate-float">
                  كود الجلسة: 30 دقيقة مؤقتة
                </div>

                {/* Main Wallet Card */}
                <div className="w-full max-w-[310px] bg-white dark:bg-[#12281D] text-[#10241A] dark:text-white rounded-3xl p-6 shadow-2xl border border-white/30 space-y-4 animate-float">
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">اسم المريض</span>
                      <span className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9]">
                        أحمد محمود السيد
                      </span>
                    </div>
                    <span className="font-mono text-sm font-black bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-xl">
                      O+
                    </span>
                  </div>

                  {/* ECG Heartbeat Line */}
                  <div className="py-1">
                    <svg className="w-full h-12" viewBox="0 0 260 60" fill="none">
                      <path
                        d="M0 30h60l10-22 14 44 12-30 8 8h156"
                        stroke="#2D8259"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-draw-ecg"
                      />
                    </svg>
                  </div>

                  {/* Allergy Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-gray-400 block font-semibold">تنبيهات حيوية:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                        حساسية البنسلين
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DFF1E7] text-[#1B6B46] dark:bg-[#163223] dark:text-[#7CE0A9]">
                        السكري
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DFF1E7] text-[#1B6B46] dark:bg-[#163223] dark:text-[#7CE0A9]">
                        ارتفاع الضغط
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-gray-400 border-t border-gray-100 dark:border-gray-800 text-center">
                    الرقم القومي: 14 رقماً مشفراً
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div
                  className="absolute bottom-2 left-2 sm:left-6 bg-white dark:bg-[#12281D] text-[#1B6B46] dark:text-[#7CE0A9] font-extrabold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border border-white/20 z-20 animate-float"
                  style={{ animationDelay: '-2.5s' }}
                >
                  تم تأكيد جرعة اليوم ✔
                </div>
              </div>
            </div>
          </section>

          {/* Marquee Ticker */}
          <div className="bg-[#0E3B28] text-[#9FD6B7] overflow-hidden whitespace-nowrap py-3 font-extrabold text-xs sm:text-sm select-none border-y border-white/10">
            <div className="animate-marquee">
              تشفير طرفي كامل (E2EE) &nbsp;◆&nbsp; كود وصول مؤقت 30 دقيقة (QR / OTP) &nbsp;◆&nbsp; السجل الطبي الموحد &nbsp;◆&nbsp; تنبيهات الأدوية وإشعار المرافق &nbsp;◆&nbsp; محفظة العائلة وكبار السن &nbsp;◆&nbsp; ترصد وبائي لحظي مجهول الهوية &nbsp;◆&nbsp; حوكمة وزارة الصحة &nbsp;◆&nbsp;
              تشفير طرفي كامل (E2EE) &nbsp;◆&nbsp; كود وصول مؤقت 30 دقيقة (QR / OTP) &nbsp;◆&nbsp; السجل الطبي الموحد &nbsp;◆&nbsp; تنبيهات الأدوية وإشعار المرافق &nbsp;◆&nbsp; محفظة العائلة وكبار السن &nbsp;◆&nbsp; ترصد وبائي لحظي مجهول الهوية &nbsp;◆&nbsp; حوكمة وزارة الصحة &nbsp;◆&nbsp;
            </div>
          </div>

          {/* Section 1: الهوية البصرية (#s1) */}
          <section id="s1" className="px-5 sm:px-12 py-16 sm:py-20 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] mb-2">
                  الهوية البصرية ونظام التنقل
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  درجات الأخضر الطبي المهدئ مع الأبيض النقي، لتوفير بيئة بصرية مريحة للعين في المستشفيات دون أي تشتيت لوني.
                </p>
              </div>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl p-6 text-white bg-[#1B6B46] shadow-sm flex flex-col justify-between min-h-[140px] hover:scale-105 transition-transform">
                  <span className="font-extrabold text-base">الأخضر الداكن</span>
                  <div>
                    <span className="font-mono text-xs opacity-90 block">#1B6B46</span>
                    <span className="text-[11px] opacity-80">العناوين والأزرار وبوابة المريض</span>
                  </div>
                </div>

                <div className="rounded-2xl p-6 text-white bg-[#2D8259] shadow-sm flex flex-col justify-between min-h-[140px] hover:scale-105 transition-transform">
                  <span className="font-extrabold text-base">أخضر زمردي</span>
                  <div>
                    <span className="font-mono text-xs opacity-90 block">#2D8259</span>
                    <span className="text-[11px] opacity-80">بوابة الطبيب والروشتة الإلكترونية</span>
                  </div>
                </div>

                <div className="rounded-2xl p-6 text-white bg-[#43936B] shadow-sm flex flex-col justify-between min-h-[140px] hover:scale-105 transition-transform">
                  <span className="font-extrabold text-base">أخضر مريمي</span>
                  <div>
                    <span className="font-mono text-xs opacity-90 block">#43936B</span>
                    <span className="text-[11px] opacity-80">بوابة وزارة الصحة والحوكمة</span>
                  </div>
                </div>

                <div className="rounded-2xl p-6 text-[#1B6B46] bg-[#F5F9F6] border border-[#D5E6DC] shadow-sm flex flex-col justify-between min-h-[140px] hover:scale-105 transition-transform">
                  <span className="font-extrabold text-base">الخلفية العامة</span>
                  <div>
                    <span className="font-mono text-xs opacity-90 block">#F5F9F6</span>
                    <span className="text-[11px] text-[#5B7367]">أبيض نعناعي ناعم مريح للعين</span>
                  </div>
                </div>
              </div>

              {/* Horizontal Navbar Blueprint Mockup */}
              <div className="bg-white dark:bg-[#12281D] rounded-2xl border border-[#D5E6DC] dark:border-[#21412F] overflow-hidden shadow-sm">
                <div className="bg-[#1B6B46] text-white px-5 py-3 flex items-center justify-between text-xs sm:text-sm font-extrabold">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>الهيدر العلوي الثابت: [أيقونة المستشفى + اسم المنظومة + البوابات + تسجيل مريض + بطاقة الطوارئ]</span>
                  </div>
                  <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs">ثابت بالقمة</span>
                </div>
                <div className="bg-[#0E3B28] px-4 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-bold text-[#CFE8DA]">
                  <span className="bg-[#43936B] text-white px-3 py-1 rounded-lg">لوحة المتابعة</span>
                  <span className="px-3 py-1 rounded-lg opacity-80">السجل الطبي الموحد</span>
                  <span className="px-3 py-1 rounded-lg opacity-80">أدويتي والتنبيهات</span>
                  <span className="px-3 py-1 rounded-lg opacity-80">المرضى والمرافقون</span>
                  <span className="px-3 py-1 rounded-lg opacity-80">سجل الخصوصية</span>
                </div>
                <div className="p-5 text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                  الناف بار الأفقي الفرعي يمنح مساحة عرض كاملة للشاشة ويستبدل القوائم الجانبية المزدحمة، مع تمييز التبويب النشط بإضاءة خضراء مريحة.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: الصفحة الرئيسية والخدمات العامة (#s2) */}
          <section id="s2" className="px-5 sm:px-12 py-16 sm:py-20 bg-[#DFF1E7]/50 dark:bg-[#163223]/30 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] mb-2">
                  الصفحة الرئيسية والخدمات العامة
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  تعريف مختصر بالرؤية وثلاث بطاقات دخول للبوابات، إلى جانب خدمات عامة للمواطنين وفرق الإسعاف.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Card 1 */}
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm hover:-translate-y-1 transition-transform flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#1B6B46] dark:text-[#7CE0A9] flex items-center justify-center">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9]">
                      الواجهة الافتتاحية
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                      رؤية المنظومة وثلاث بطاقات رئيسية: المريض (أخضر غامق)، الطبيب (زمردي)، والوزارة (مريمي).
                    </p>
                  </div>
                  <a href="#s3" className="text-xs font-bold text-[#1B6B46] dark:text-[#7CE0A9] flex items-center gap-1 hover:underline">
                    <span>استعراض البوابات</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm hover:-translate-y-1 transition-transform flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#1B6B46] dark:text-[#7CE0A9] flex items-center justify-center">
                      <UserPlus className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9]">
                      تسجيل مريض جديد
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                      الاسم الرباعي، الرقم القومي 14 رقماً، صلة القرابة، فصيلة الدم، المحافظة، الحساسية والأمراض المزمنة.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="text-xs font-bold text-[#1B6B46] dark:text-[#7CE0A9] flex items-center gap-1 hover:underline text-right"
                  >
                    <span>فتح نافذة التسجيل</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm hover:-translate-y-1 transition-transform flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#1B6B46] dark:text-[#7CE0A9] flex items-center justify-center">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9]">
                      خدمة «تحقق من طبيبك»
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                      أداة استعلام عامة للمواطنين بالاسم أو رقم القيد النقابي للتأكد من اعتماده رسمياً ومنع انتحال الصفة.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowVerifyDoctorModal(true)}
                    className="text-xs font-bold text-[#1B6B46] dark:text-[#7CE0A9] flex items-center gap-1 hover:underline text-right"
                  >
                    <span>تجربة الاستعلام</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-red-200 dark:border-red-900/60 shadow-sm hover:-translate-y-1 transition-transform flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <h3 className="font-extrabold text-base text-red-600 dark:text-red-400">
                      بطاقة الطوارئ الذكية
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                      نافذة سريعة لفرق الإسعاف تعرض الاسم والرقم القومي وفصيلة الدم والحساسية الحرجة فقط.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowEmergencyModal(true)}
                    className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 hover:underline text-right"
                  >
                    <span>عرض بطاقة الإسعاف</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: بوابة المريض والمرافق العائلي (#s3) */}
          <section id="s3" className="px-5 sm:px-12 py-16 sm:py-20 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] mb-2">
                  بوابة المريض والمرافق العائلي (5 تبويبات)
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  تنقل بسلاسة بين التبويبات الخمسة المحددة في الوثيقة دون ازدحام أو تعقيد.
                </p>
              </div>

              {/* Horizontal Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  '1. لوحة المتابعة',
                  '2. السجل الطبي الموحد',
                  '3. أدويتي والتنبيهات',
                  '4. المرضى والمرافقون',
                  '5. سجل الخصوصية',
                ].map((tabLabel, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all ${
                      activeTab === idx
                        ? 'bg-[#1B6B46] text-white shadow-md scale-105'
                        : 'bg-white dark:bg-[#12281D] text-[#5B7367] dark:text-[#9DB8A8] border border-[#D5E6DC] dark:border-[#21412F] hover:border-[#1B6B46]'
                    }`}
                  >
                    {tabLabel}
                  </button>
                ))}
              </div>

              {/* Tab 0: لوحة المتابعة */}
              {activeTab === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#0E3B28] to-[#1B6B46] text-white rounded-3xl p-6 text-center space-y-4 shadow-lg">
                    <span className="text-xs font-bold text-[#7CE0A9] block">بطاقة الجلسة المؤقتة (QR / OTP)</span>

                    {/* Circular 30-min Countdown Ring */}
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 150 150">
                        <circle cx="75" cy="75" r="65" stroke="rgba(255,255,255,0.2)" strokeWidth="10" fill="none" />
                        <circle
                          cx="75"
                          cy="75"
                          r="65"
                          stroke="#7CE0A9"
                          strokeWidth="10"
                          fill="none"
                          strokeLinecap="round"
                          className="animate-countdown-circle"
                        />
                      </svg>
                      <div className="absolute text-center">
                        <span className="font-mono text-2xl font-black block">30:00</span>
                        <span className="text-[10px] text-[#D3EBDD]">متبقي للجلسة</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-[#D3EBDD] block">كود OTP الخاص بالطبيب:</span>
                      <span className="font-mono text-3xl font-black tracking-widest text-[#7CE0A9]">
                        {otpCode}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={generateNewOtp}
                        className="flex-1 py-2 px-3 rounded-xl bg-white text-[#1B6B46] text-xs font-extrabold flex items-center justify-center gap-1 hover:bg-gray-100"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>تحديث الكود</span>
                      </button>
                      <button
                        onClick={() => setOtpCode('000000')}
                        className="py-2 px-3 rounded-xl bg-red-500/30 text-white text-xs font-bold hover:bg-red-500/50"
                      >
                        إنهاء الجلسة فوراً
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-white dark:bg-[#12281D] p-5 rounded-2xl border border-[#D5E6DC] dark:border-[#21412F] shadow-xs flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-400 block font-semibold">جرعة اليوم المقررة:</span>
                        <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                          كونكور 5 مجم (Concor) — 08:00 صباحاً
                        </span>
                      </div>
                      <button
                        onClick={() => setDoseTaken(!doseTaken)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                          doseTaken
                            ? 'bg-emerald-600 text-white'
                            : 'border border-[#1B6B46] text-[#1B6B46] dark:text-[#7CE0A9] hover:bg-[#DFF1E7]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{doseTaken ? 'تم التأكيد ✔' : 'تأكيد الجرعة'}</span>
                      </button>
                    </div>

                    <div className="bg-white dark:bg-[#12281D] p-5 rounded-2xl border border-[#D5E6DC] dark:border-[#21412F] shadow-xs space-y-2">
                      <span className="text-xs font-bold text-[#1B6B46] dark:text-[#7CE0A9] block">
                        ملخص الحالة الحيوية للمريض:
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8]">
                        <li>• الاسم الرباعي: أحمد محمود السيد (الرقم القومي: 28910150102345)</li>
                        <li>• فصيلة الدم: O+ إيجابي</li>
                        <li className="text-red-600 dark:text-red-400 font-bold">• تنبيه الحساسية الحرجة: البنسلين ومشتقاته</li>
                        <li>• الأمراض المزمنة: السكري النوع الثاني، ارتفاع ضغط الدم</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 1: السجل الطبي الموحد */}
              {activeTab === 1 && (
                <div className="bg-white dark:bg-[#12281D] rounded-3xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-xs space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <span className="font-extrabold text-base text-gray-900 dark:text-white">
                      جدول زمني يجمع كافة السجلات من المستشفيات الحكومية والعيادات والمعامل
                    </span>
                    <div className="flex gap-1.5 text-xs font-bold">
                      <span className="px-3 py-1 bg-[#1B6B46] text-white rounded-full">الكل</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">روشتات</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">تحاليل</span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">أشعات</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-[#1B6B46] dark:text-[#7CE0A9] block">
                          كشف باطنة وقلب + روشتة إلكترونية
                        </span>
                        <span className="text-gray-500">مستشفى قصر العيني التعليمي (القاهرة) — د. كريم عبد الرحمن</span>
                      </div>
                      <span className="font-mono text-gray-400 text-xs">2026-10-15</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-[#1B6B46] dark:text-[#7CE0A9] block">
                          تحاليل وظائف كبد وسكر تراكمي HbA1c
                        </span>
                        <span className="text-gray-500">معامل البرج المركزية (الجيزة) — د. نهى صقر</span>
                      </div>
                      <span className="font-mono text-gray-400 text-xs">2026-10-10</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-extrabold text-[#1B6B46] dark:text-[#7CE0A9] block">
                          أشعة موجات صوتية على القلب (Echo)
                        </span>
                        <span className="text-gray-500">مركز النيل التخصصي (القاهرة) — د. هشام طلعت</span>
                      </div>
                      <span className="font-mono text-gray-400 text-xs">2026-08-22</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: أدويتي والتنبيهات */}
              {activeTab === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#12281D] rounded-3xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-xs space-y-4">
                    <span className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9] block">
                      إضافة دواء يدوياً وإعدادات التنبيه
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8]">
                      <li>• إضافة الأدوية والفيتامينات بالاسم والتركيز والجرعة ووقت المنبه.</li>
                      <li>• التذكير المسبق: في الموعد أو قبل 10 أو 15 أو 30 دقيقة.</li>
                      <li>• تفعيل تنبيهات SMS وواتساب لتجنب نسيان الجرعات.</li>
                      <li>• إشعار المرافق العائلي تلقائياً عند نسيان تناول الجرعة.</li>
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-[#12281D] rounded-3xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-xs space-y-3">
                    <span className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9] block">
                      جدول الأدوية المفعلة
                    </span>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">كونكور 5 مجم</span>
                        <span className="text-gray-500">روشتة طبيب • قرص صباحاً</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md text-[11px] font-bold">
                        مفعل
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">أوميجا 3 بلس</span>
                        <span className="text-gray-500">إضافة شخصية • كبسولة مساءً</span>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-600 text-white rounded-md text-[11px] font-bold">
                        مفعل
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: المرضى والمرافقون */}
              {activeTab === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-white dark:bg-[#12281D] rounded-2xl p-5 border-2 border-[#1B6B46] shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1B6B46] text-white">حسابي</span>
                      <span className="font-mono text-xs font-bold text-red-600">O+</span>
                    </div>
                    <span className="font-extrabold text-base text-gray-900 dark:text-white block">
                      أحمد محمود السيد
                    </span>
                    <span className="text-xs text-gray-500 block">3 أدوية نشطة • القاهرة</span>
                  </div>

                  <div className="bg-white dark:bg-[#12281D] rounded-2xl p-5 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">الأم (مرافق)</span>
                      <span className="font-mono text-xs font-bold text-red-600">A+</span>
                    </div>
                    <span className="font-extrabold text-base text-gray-900 dark:text-white block">
                      فاطمة إبراهيم الشناوي
                    </span>
                    <span className="text-xs text-gray-500 block">4 أدوية نشطة • كبار السن</span>
                  </div>

                  <div className="bg-white dark:bg-[#12281D] rounded-2xl p-5 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">الابن (مرافق)</span>
                      <span className="font-mono text-xs font-bold text-red-600">O+</span>
                    </div>
                    <span className="font-extrabold text-base text-gray-900 dark:text-white block">
                      يوسف أحمد محمود
                    </span>
                    <span className="text-xs text-gray-500 block">دواء واحد • أطفال</span>
                  </div>
                </div>
              )}

              {/* Tab 4: سجل الخصوصية */}
              {activeTab === 4 && (
                <div className="bg-white dark:bg-[#12281D] rounded-3xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-xs space-y-4">
                  <span className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9] block">
                    سجل رقابي شفاف يوثق كل عملية وصول بالدقيقة
                  </span>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span>د. كريم عبد الرحمن حسن (مستشفى قصر العيني) — فتح السجل وتوقيع روشتة</span>
                      <span className="font-mono text-gray-400 text-xs">2026-10-15 | 11:32 ص (OTP)</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span>د. نهى صقر (معامل البرج) — إرفاق نتائج تحاليل معملية مشفرة</span>
                      <span className="font-mono text-gray-400 text-xs">2026-10-10 | 09:15 ص (QR)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: بوابة الطبيب والروشتة الإلكترونية (#s4) */}
          <section id="s4" className="px-5 sm:px-12 py-16 sm:py-20 bg-[#DFF1E7]/50 dark:bg-[#163223]/30 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#2D8259] dark:text-[#7CE0A9] mb-2">
                  بوابة الطبيب والروشتة الإلكترونية
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  يدخل الطبيب بعد التحقق من اعتماده وتحديد محافظته من محافظات مصر الـ 27، ويفتح الملف بكود المريض المؤقت فقط.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#2D8259] dark:text-[#7CE0A9] flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">التحقق من الاعتماد</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    مراجعة مستندات الطبيب الثلاثة (الرقم القومي + شهادة التخرج + كارنيه النقابة) وتصريح مزاولة المهنة قبل الكشف.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#2D8259] dark:text-[#7CE0A9] flex items-center justify-center">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">بوابة الجلسة والتنبيه الحرج</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    إدخال كود OTP أو مسح QR لفتح الملف مؤقتاً، مع شريط تحذير علوي فوري من أي حساسية دوائية كالبنسلين.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#DFF1E7] dark:bg-[#163223] text-[#2D8259] dark:text-[#7CE0A9] flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">إصدار الروشتات والتوقيع</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    كتابة الروشتة وتحديد الجرعات وختمها بختم المنشأة والمحافظة، وترحيلها لحظياً لمحفظة المريض ومنبهاته.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: بوابة وزارة الصحة والحوكمة (#s5) */}
          <section id="s5" className="px-5 sm:px-12 py-16 sm:py-20 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#43936B] dark:text-[#7CE0A9] mb-2">
                  بوابة وزارة الصحة والحوكمة
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  غرفة القيادة المركزية لمتابعة الترصد الوبائي، اعتماد تراخيص الأطباء، والتدقيق الأمني للمنشآت.
                </p>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  * الأرقام أدناه توضيحية استرشادية لأغراض العرض التقديمي المعماري.
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] block">
                    27
                  </span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white block">محافظة مصرية</span>
                  <p className="text-xs text-gray-500">لوحة تتبع لكل محافظة ومنشأة صحية على مستوى الجمهورية.</p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#2D8259] dark:text-[#7CE0A9] block">
                    14
                  </span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white block">رقماً قومياً موحداً</span>
                  <p className="text-xs text-gray-500">هوية صحية موحدة لكل مواطن تمنع ازدواجية الملفات.</p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#43936B] dark:text-[#7CE0A9] block">
                    84,320
                  </span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white block">طبيب معتمد رقمياً</span>
                  <p className="text-xs text-gray-500">موثقون بنقابة الأطباء ومصلحة السجل المدني.</p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] block">
                    142,650
                  </span>
                  <span className="font-bold text-sm text-gray-900 dark:text-white block">روشتة إلكترونية</span>
                  <p className="text-xs text-gray-500">ترحيل مشفر لحظي لمحفظة المريض ولوحة الوبائيات.</p>
                </div>
              </div>

              {/* Early Warning ICD-10 Table Preview */}
              <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-3">
                <span className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white block">
                  لوحة الترصد الوبائي والإنذار المبكر (ICD-10 مجهول الهوية)
                </span>
                <p className="text-xs text-gray-500">
                  رصد التصنيفات المرضية الأكثر تسجيلاً بالمحافظات (مثل J06.9 و A09 و J10) لاكتشاف الأوبئة الموسمية مبكراً دون كشف هوية المرضى.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: مسار التكامل والأمان (#s6) */}
          <section id="s6" className="px-5 sm:px-12 py-16 sm:py-20 bg-[#DFF1E7]/50 dark:bg-[#163223]/30 border-b border-[#D5E6DC] dark:border-[#21412F] text-right">
            <div className="max-w-6xl mx-auto space-y-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B6B46] dark:text-[#7CE0A9] mb-2">
                  دورة التكامل اللحظي (End-to-End Flow) والأمان
                </h2>
                <p className="text-sm sm:text-base text-[#5B7367] dark:text-[#9DB8A8] max-w-2xl leading-relaxed">
                  تشفير طرفي كامل، وصول مؤقت محدد زمنياً، وسجل رقابي شفاف لا يمكن تعديله.
                </p>
              </div>

              {/* Flow Steps Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 my-4">
                <div className="w-full md:flex-1 text-center bg-white dark:bg-[#12281D] border-2 border-[#1B6B46] rounded-2xl p-4 font-extrabold text-sm text-[#1B6B46] dark:text-[#7CE0A9] shadow-xs">
                  1. المريض يسجل ويولّد كود (QR / OTP)
                </div>
                <div className="h-6 w-1 md:h-1 md:flex-[0.3] bg-[#2D8259] rounded-full" />
                <div className="w-full md:flex-1 text-center bg-white dark:bg-[#12281D] border-2 border-[#2D8259] rounded-2xl p-4 font-extrabold text-sm text-[#2D8259] dark:text-[#7CE0A9] shadow-xs">
                  2. الطبيب يفتح الجلسة ويفحص الحساسية
                </div>
                <div className="h-6 w-1 md:h-1 md:flex-[0.3] bg-[#43936B] rounded-full" />
                <div className="w-full md:flex-1 text-center bg-white dark:bg-[#12281D] border-2 border-[#43936B] rounded-2xl p-4 font-extrabold text-sm text-[#43936B] dark:text-[#7CE0A9] shadow-xs">
                  3. ترحيل الروشتة للمحفظة وترصد مجهول بالوزارة
                </div>
              </div>

              {/* Security Pillars Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2.5">
                  <h3 className="font-extrabold text-base text-[#1B6B46] dark:text-[#7CE0A9]">تشفير طرفي (End-to-End)</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    البيانات مشفرة بمفتاح خاص بالمريض من جهازه حتى الطبيب المعتمد ولا يمكن لأي وسيط فك تشفيرها.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2.5">
                  <h3 className="font-extrabold text-base text-[#2D8259] dark:text-[#7CE0A9]">وصول مؤقت 30 دقيقة</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    تنتهي صلاحية الجلسة تلقائياً بعد 30 دقيقة مع زر مخصص لسحب الصلاحية والإنهاء الفوري بلحظة.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#12281D] rounded-2xl p-6 border border-[#D5E6DC] dark:border-[#21412F] shadow-sm space-y-2.5">
                  <h3 className="font-extrabold text-base text-[#43936B] dark:text-[#7CE0A9]">مراقبة وسجل شفاف</h3>
                  <p className="text-xs sm:text-sm text-[#5B7367] dark:text-[#9DB8A8] leading-relaxed">
                    توثيق كل حركة بالدقيقة: اسم الطبيب، المنشأة، نوع الإجراء، وطريقة المصادقة دون إمكانية التعديل.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Clean Footer */}
          <footer className="bg-[#0E3B28] text-[#9FD6B7] text-center px-6 py-10 text-xs sm:text-sm space-y-2 border-t border-white/10">
            <p className="font-extrabold text-base text-white">منظومة المحفظة الصحية القومية المشفرة للمريض</p>
            <p className="text-[#CFE8DA] opacity-80">
              National Secure Patient Health Wallet System — جمهورية مصر العربية
            </p>
            <p className="text-[11px] text-[#7CE0A9] pt-2">
              دليل المعمارية الكاملة وتصميم الواجهات (UI/UX Architecture v2)
            </p>
          </footer>
        </div>
      </div>

      {/* Floating "تجربة موبايل" Button (Shown on desktop/tablet screens) */}
      <button
        onClick={() => {
          setIsPhoneMode(!isPhoneMode);
          window.scrollTo(0, 0);
          if (appRef.current) appRef.current.scrollTop = 0;
        }}
        className="hidden sm:flex fixed bottom-5 left-5 z-50 border-0 cursor-pointer font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-[#1B6B46] to-[#43936B] px-5 py-3 rounded-full items-center gap-2 shadow-2xl hover:scale-105 transition-transform"
        title="معاينة الموقع كأنه تطبيق موبايل حقيقي داخل إطار هاتف"
      >
        <Smartphone className="w-4 h-4" />
        <span>{isPhoneMode ? 'عرض الموقع الكامل' : 'تجربة موبايل'}</span>
      </button>

      {/* Modal 1: Emergency SOS Modal */}
      {showEmergencyModal && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setShowEmergencyModal(false)}
        >
          <div
            className="bg-white dark:bg-[#12281D] text-[#10241A] dark:text-white rounded-3xl p-6 max-w-sm w-full border-t-8 border-[#E5484D] shadow-2xl space-y-4 text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg text-[#E5484D] flex items-center gap-1.5">
                <Heart className="w-5 h-5 fill-current" />
                <span>بطاقة الطوارئ الطبية</span>
              </span>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm bg-gray-50 dark:bg-[#0B1A13] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-400">الاسم:</span>
                <span className="font-bold">أحمد محمود السيد</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">الرقم القومي:</span>
                <span className="font-mono font-bold">28910150102345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">فصيلة الدم:</span>
                <span className="font-mono font-extrabold text-[#E5484D] text-base">O+</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400 font-bold">
                <span>حساسية حرجة:</span>
                <span>البنسلين ومشتقاته</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">أمراض مزمنة:</span>
                <span>سكري، ارتفاع ضغط الدم</span>
              </div>
            </div>

            <a
              href="tel:123"
              className="w-full py-3 rounded-xl bg-[#E5484D] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-red-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال بإسعاف مصر (123)</span>
            </a>

            <span className="text-[11px] text-gray-400 text-center block">
              بيانات منقذة للحياة فقط لفرق الإسعاف دون كشف باقي السجل.
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
            className="bg-white dark:bg-[#12281D] text-[#10241A] dark:text-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-right border border-[#D5E6DC] dark:border-[#21412F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg text-[#1B6B46] dark:text-[#7CE0A9] flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                <span>خدمة «تحقق من طبيبك»</span>
              </span>
              <button
                onClick={() => setShowVerifyDoctorModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#5B7367] dark:text-[#9DB8A8]">
              استعلام عام للتأكد من ترخيص واعتماد الطبيب لدى وزارة الصحة المصرية قبل الكشف.
            </p>

            <div className="relative">
              <input
                type="text"
                value={doctorSearch}
                onChange={(e) => setDoctorSearch(e.target.value)}
                placeholder="ابحث باسم الطبيب أو رقم القيد النقابي (مثال: 84219)..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13] text-xs sm:text-sm text-gray-900 dark:text-white focus:border-[#1B6B46]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {filteredDoctors.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#F5F9F6] dark:bg-[#0B1A13] border border-[#D5E6DC] dark:border-[#21412F] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-gray-900 dark:text-white text-sm">{doc.name}</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md text-[10px]">
                      قيد #{doc.syndicateId}
                    </span>
                  </div>
                  <div className="text-[#2D8259] dark:text-[#7CE0A9] font-medium">{doc.specialty}</div>
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
            className="bg-white dark:bg-[#12281D] text-[#10241A] dark:text-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-right border border-[#D5E6DC] dark:border-[#21412F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-lg text-[#1B6B46] dark:text-[#7CE0A9] flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                <span>تسجيل محفظة مريض جديد</span>
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
                <span>تم إنشاء المحفظة الصحية المشفرة بنجاح!</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold mb-1">الاسم الرباعي</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13]"
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
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13] font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">فصيلة الدم</label>
                  <select
                    value={regBlood}
                    onChange={(e) => setRegBlood(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13]"
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
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13]"
                  >
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الدقهلية">الدقهلية</option>
                    <option value="أسيوط">أسيوط</option>
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
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#F5F9F6] dark:bg-[#0B1A13]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white font-extrabold text-xs sm:text-sm mt-2 transition-colors"
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
