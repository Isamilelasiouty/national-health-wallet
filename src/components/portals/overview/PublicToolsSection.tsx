import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { UserPlus, ShieldAlert, UserCheck, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

export const PublicToolsSection: React.FC = () => {
  const { setIsRegistrationModalOpen, setIsEmergencyCardOpen, setIsDoctorVerificationOpen } = useHealthWallet();

  return (
    <section id="public-tools" className="py-14 border-b border-[#E1EFE6] dark:border-[#1E3B2C] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
            ج) الصفحة الرئيسية والخدمات العامة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            الخدمات العامة والأدوات المتاحة للمواطنين
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            أدوات تفاعلية عامة متاحة دون الحاجة لتسجيل دخول معقد، لحماية المرضى ودعم فرق الإسعاف في الحالات الحرجة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 1: Patient Registration Modal Trigger */}
          <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                نافذة تسجيل مريض جديد
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                نموذج تفاعلي لإدخال: الاسم الرباعي، الرقم القومي (14 رقماً)، نوع الحساب/صلة القرابة (مريض مستقل أو مرافق عائلي: أب/أم/ابن/زوجة)، فصيلة الدم، المحافظة، الحساسية الدوائية، والأمراض المزمنة.
              </p>
              <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-lg text-xs text-[#2D8259] dark:text-[#78C79B] font-medium flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>ينشئ محفظة صحية مشفرة فوراً ويضيف المريض لقائمة التبديل العائلي.</span>
              </div>
            </div>

            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>فتح نافذة التسجيل الفوري</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 2: Public Doctor Verification Tool */}
          <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#162E21] text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                خدمة «تحقق من طبيبك»
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                أداة استعلام عامة تتيح لأي مواطن إدخال رقم القيد النقابي أو اسم الطبيب للتأكد من اعتماده رسمياً لدى وزارة الصحة قبل الكشف، لمنع انتحال الصفة الطبية.
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>ربط فوري بقاعدة بيانات الأطباء المعتمدين والمستندات الموثقة.</span>
              </div>
            </div>

            <button
              onClick={() => setIsDoctorVerificationOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2D8259] hover:bg-[#236846] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>تجربة استعلام الأطباء</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tool 3: Emergency Card Modal Trigger */}
          <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border-2 border-red-200 dark:border-red-900/60 shadow-sm flex flex-col justify-between space-y-4 animate-emergency-pulse">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                بطاقة الطوارئ الذكية
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                نافذة طوارئ سريعة متاحة من الهيدر تعرض لفرق الإسعاف البيانات المنقذة للحياة فقط (الاسم، الرقم القومي، فصيلة الدم، الحساسية الحرجة، والأمراض المزمنة) دون كشف باقي السجل المرضي.
              </p>
              <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-lg text-xs text-red-800 dark:text-red-300 font-medium flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>متاحة بضغطة زر وتدعم الاتصال بإسعاف مصر (123).</span>
              </div>
            </div>

            <button
              onClick={() => setIsEmergencyCardOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <span>عرض بطاقة الطوارئ الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
