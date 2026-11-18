import React from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { HospitalIcon } from '../common/CustomSVGIcons';
import {
  UserPlus,
  ShieldAlert,
  Smartphone,
  Moon,
  Sun,
  EyeOff,
  UserCheck,
  Menu,
  X,
  Stethoscope,
  Building2,
  Home,
  User,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activePortal,
    setActivePortal,
    setIsRegistrationModalOpen,
    setIsEmergencyCardOpen,
    setIsDoctorVerificationOpen,
    isDarkMode,
    toggleDarkMode,
    isReducedMotion,
    toggleReducedMotion,
    isMobileSimulation,
    toggleMobileSimulation,
  } = useHealthWallet();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const portals = [
    { id: 'overview', label: 'الرئيسية', icon: Home },
    { id: 'patient', label: 'بوابة المريض', icon: User },
    { id: 'doctor', label: 'بوابة الطبيب', icon: Stethoscope },
    { id: 'moh', label: 'بوابة وزارة الصحة', icon: Building2 },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#12241A] border-b border-[#E1EFE6] dark:border-[#1E3B2C] shadow-xs transition-colors">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Platform Name */}
          <div
            onClick={() => setActivePortal('overview')}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
            role="button"
            tabIndex={0}
            aria-label="العودة للصفحة الرئيسية"
            onKeyDown={(e) => e.key === 'Enter' && setActivePortal('overview')}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5EF] dark:bg-[#162E21] border border-[#CDE5D6] dark:border-[#224A35] flex items-center justify-center text-[#1B6B46] dark:text-[#4EAD80] group-hover:scale-105 transition-transform">
              <HospitalIcon size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-black text-[#1B6B46] dark:text-[#4EAD80] tracking-tight">
                  المحفظة الصحية القومية
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] border border-[#D5E7DC] dark:border-[#224A35]">
                  جمهورية مصر العربية
                </span>
              </div>
              <p className="text-xs text-[#4B5563] dark:text-[#A3BFB0] font-medium hidden md:block">
                منظومة السجل الطبي المشفر الموحد للمريض
              </p>
            </div>
          </div>

          {/* Center: Horizontal Portal Navigation Buttons */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#F5F9F6] dark:bg-[#162E21] p-1.5 rounded-2xl border border-[#E1EFE6] dark:border-[#1E3B2C]">
            {portals.map((portal) => {
              const Icon = portal.icon;
              const isActive = activePortal === portal.id;
              return (
                <button
                  key={portal.id}
                  onClick={() => setActivePortal(portal.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#1B6B46] text-white shadow-xs'
                      : 'text-[#4B5563] dark:text-[#A3BFB0] hover:text-[#1B6B46] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1C3B2E]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{portal.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Doctor Verification Public Tool */}
            <button
              onClick={() => setIsDoctorVerificationOpen(true)}
              className="px-3.5 py-2 rounded-xl border border-[#CDE5D6] dark:border-[#1E3B2C] text-[#2D8259] dark:text-[#78C79B] hover:bg-[#EBF5EF] dark:hover:bg-[#162E21] text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="تحقق من اعتماد طبيبك لدى وزارة الصحة"
            >
              <UserCheck className="w-4 h-4" />
              <span className="hidden xl:inline">تحقق من طبيبك</span>
            </button>

            {/* Register Patient Button */}
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#2D8259] hover:bg-[#236846] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>تسجيل مريض جديد</span>
            </button>

            {/* Emergency Card Button */}
            <button
              onClick={() => setIsEmergencyCardOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all animate-emergency-pulse"
              title="بطاقة الطوارئ السريعة لفرق الإسعاف"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>بطاقة الطوارئ</span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* Mobile Experience Simulation Toggle */}
            <button
              onClick={toggleMobileSimulation}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                isMobileSimulation
                  ? 'bg-[#1B6B46] text-white border-[#1B6B46]'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isMobileSimulation ? 'العودة لعرض المتصفح الكامل' : 'تجربة تطبيق الموبايل (إطار هاتف حقيقي)'}
              aria-label="تبديل محاكي الموبايل"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
              title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
              aria-label="تبديل الوضع الداكن"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={toggleReducedMotion}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                isReducedMotion
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={isReducedMotion ? 'الحركة متوقفة (إمكانية الوصول)' : 'إيقاف الحركة والأنيميشن'}
              aria-label="إيقاف الحركة"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsEmergencyCardOpen(true)}
              className="p-2 rounded-xl bg-red-600 text-white animate-emergency-pulse"
              aria-label="بطاقة الطوارئ"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {portals.map((portal) => {
                const Icon = portal.icon;
                const isActive = activePortal === portal.id;
                return (
                  <button
                    key={portal.id}
                    onClick={() => {
                      setActivePortal(portal.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                      isActive
                        ? 'bg-[#1B6B46] text-white'
                        : 'bg-[#F5F9F6] dark:bg-[#162E21] text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{portal.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={() => {
                  setIsRegistrationModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#2D8259] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>تسجيل مريض جديد</span>
              </button>
              <button
                onClick={() => {
                  setIsDoctorVerificationOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>تحقق من طبيبك</span>
              </button>
              <button
                onClick={toggleMobileSimulation}
                className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                title="وضع الموبايل"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                title="الوضع الداكن"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
