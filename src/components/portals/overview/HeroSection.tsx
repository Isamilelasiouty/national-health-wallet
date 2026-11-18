import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { ECGPulseLine } from '../../common/CustomSVGIcons';
import { UserPlus, ShieldCheck, ArrowLeft, Stethoscope, User, Building2, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActivePortal, setIsRegistrationModalOpen } = useHealthWallet();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#E1EFE6] dark:border-[#1E3B2C]">
      {/* Background soft medical glow (Stripe inspired) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D8259]/8 dark:bg-[#2D8259]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#43936B]/8 dark:bg-[#43936B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Official Blueprint Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF5EF] dark:bg-[#162E21] border border-[#CDE5D6] dark:border-[#224A35] text-[#1B6B46] dark:text-[#4EAD80] text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1B6B46] dark:bg-[#4EAD80] animate-pulse" />
            <span>وثيقة المعمارية الكاملة وتصميم الواجهات (UI/UX & System Architecture)</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-[1.25] tracking-tight">
            منظومة <span className="text-[#1B6B46] dark:text-[#4EAD80]">المحفظة الصحية القومية</span> المشفرة للمريض
          </h1>

          {/* Core Vision Subtitle */}
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            ربط القطاعين الحكومي والخاص بسجل طبي رقمي موحد ومشفر يملكه المريض بالكامل، مع تكامل لحظي عبر التشفير الطرفي ورموز الوصول المؤقتة (QR / OTP).
          </p>

          {/* ECG Pulse Line */}
          <div className="flex justify-center py-2 opacity-85">
            <ECGPulseLine width={280} height={40} className="text-[#2D8259] dark:text-[#4EAD80]" />
          </div>

          {/* Main Hero Call to Action Button */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="px-7 py-3.5 rounded-2xl bg-[#1B6B46] hover:bg-[#155336] text-white font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2.5"
            >
              <UserPlus className="w-5 h-5" />
              <span>إنشاء محفظة صحية لمريض جديد</span>
            </button>
            <a
              href="#end-to-end-flow"
              className="px-6 py-3.5 rounded-2xl bg-white dark:bg-[#13261C] border border-[#CDE5D6] dark:border-[#1E3B2C] text-[#2D8259] dark:text-[#78C79B] hover:bg-[#F5F9F6] font-bold text-base shadow-xs transition-all flex items-center gap-2"
            >
              <span>دورة التكامل اللحظي (End-to-End)</span>
              <ArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80]" />
              <span>تصفح أفقي سلس (Horizontal Navbar)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80]" />
              <span>أخضر طبي هادئ وأبيض نقي</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80]" />
              <span>سحب الصلاحية فوراً بضغطة واحدة</span>
            </span>
          </div>
        </div>

        {/* 3 Portal Entry Cards Section */}
        <div id="portals" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Patient Portal (Dark Green #1B6B46) */}
          <div
            onClick={() => setActivePortal('patient')}
            className="group relative bg-white dark:bg-[#12241A] rounded-2xl p-7 border-2 border-[#1B6B46]/30 hover:border-[#1B6B46] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-right flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1B6B46] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <User className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
                  البوابة الأولى (أخضر غامق)
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  بوابة المريض والمرافق العائلي
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                لوحة متابعة الجلسة المؤقتة (QR / OTP)، جدول جرعات اليوم وتأكيد الالتزام، السجل الطبي الموحد، أدويتي والتنبيهات، والمرضى التابعون.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[#1B6B46] dark:text-[#4EAD80] font-bold text-sm">
              <span>دخول بوابة المريض (5 تبويبات)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Doctor Portal (Emerald Green #2D8259) */}
          <div
            onClick={() => setActivePortal('doctor')}
            className="group relative bg-white dark:bg-[#12241A] rounded-2xl p-7 border-2 border-[#2D8259]/30 hover:border-[#2D8259] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-right flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#2D8259] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2D8259] dark:text-[#78C79B] uppercase tracking-wider block mb-1">
                  البوابة الثانية (أخضر زمردي)
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  بوابة الطبيب والروشتة الإلكترونية
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                بوابة فتح الجلسة المؤقتة، شريط التنبيه الطبي الحرج للحساسية، محرر الروشتة الذكي المعتمد، واختيار المنشأة والمحافظة من محافظات مصر الـ 27.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[#2D8259] dark:text-[#78C79B] font-bold text-sm">
              <span>دخول بوابة الطبيب (4 تبويبات)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: MoH Portal (Sage Green #43936B) */}
          <div
            onClick={() => setActivePortal('moh')}
            className="group relative bg-white dark:bg-[#12241A] rounded-2xl p-7 border-2 border-[#43936B]/30 hover:border-[#43936B] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-right flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#43936B] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#43936B] dark:text-[#A3BFB0] uppercase tracking-wider block mb-1">
                  البوابة الثالثة (أخضر مريمي)
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  بوابة وزارة الصحة والحوكمة
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                لوحة الترصد الوبائي اللحظي ومؤشرات الأداء العليا (KPIs)، مركز اعتماد تراخيص الأطباء الجدد، ومتابعة التدقيق الأمني للمنشآت الصحية.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[#43936B] dark:text-[#A3BFB0] font-bold text-sm">
              <span>دخول بوابة الوزارة (3 تبويبات)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
