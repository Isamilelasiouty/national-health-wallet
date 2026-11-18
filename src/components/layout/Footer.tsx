import React from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { HospitalIcon, ShieldSecurityIcon } from '../common/CustomSVGIcons';
import { ShieldCheck, HeartHandshake, Phone, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePortal, setIsRegistrationModalOpen, setIsEmergencyCardOpen, setIsDoctorVerificationOpen } =
    useHealthWallet();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white dark:bg-[#0E1B14] border-t border-[#E1EFE6] dark:border-[#1E3B2C] pt-14 pb-8 transition-colors text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: System Title & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF5EF] dark:bg-[#162E21] border border-[#CDE5D6] dark:border-[#224A35] flex items-center justify-center text-[#1B6B46] dark:text-[#4EAD80]">
                <HospitalIcon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1B6B46] dark:text-[#4EAD80]">
                  منظومة المحفظة الصحية القومية المشفرة للمريض
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  National Secure Patient Health Wallet System — جمهورية مصر العربية
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              نظام ويب متكامل متجاوب يعتمد على التصفح الأفقي السلس بدلاً من القوائم الجانبية المزدحمة، مع توحيد الهوية البصرية بالكامل في درجات الأخضر الطبي الهادئ والأبيض النقي لربط القطاعين الحكومي والخاص بسجل مشفر يملكه المريض.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#2D8259] dark:text-[#78C79B]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#1B6B46] dark:text-[#4EAD80]" />
              <span>تشفير طرفي كامل (End-to-End Encryption) ورموز وصول مؤقتة (QR / OTP)</span>
            </div>
          </div>

          {/* Col 2: Operational Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white border-r-2 border-[#1B6B46] pr-2.5">
              البوابات التشغيلية الثلاث
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <button
                  onClick={() => setActivePortal('patient')}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors"
                >
                  بوابة المريض والمرافق العائلي
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePortal('doctor')}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors"
                >
                  بوابة الطبيب والروشتة الإلكترونية
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePortal('moh')}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors"
                >
                  بوابة وزارة الصحة والحوكمة
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePortal('overview')}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors"
                >
                  الواجهة الافتتاحية ودليل المعمارية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Tools & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white border-r-2 border-[#2D8259] pr-2.5">
              الخدمات العامة والطوارئ
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <button
                  onClick={() => setIsDoctorVerificationOpen(true)}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors text-right"
                >
                  أداة «تحقق من طبيبك»
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEmergencyCardOpen(true)}
                  className="text-red-600 dark:text-red-400 font-semibold hover:underline text-right"
                >
                  بطاقة الطوارئ المنقذة للحياة
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsRegistrationModalOpen(true)}
                  className="hover:text-[#1B6B46] dark:hover:text-[#4EAD80] transition-colors text-right"
                >
                  إنشاء محفظة صحية لمريض جديد
                </button>
              </li>
              <li>
                <a
                  href="tel:123"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 font-medium pt-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>طوارئ الإسعاف: 123</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            وثيقة المعمارية الكاملة وتصميم الواجهات (UI/UX & System Architecture) — الدليل الشامل لهيكل المنظومة v2
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#EBF5EF] dark:hover:bg-[#162E21] hover:text-[#1B6B46] text-gray-700 dark:text-gray-300 font-medium transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>العودة للأعلى</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
