import React from 'react';
import { ShieldCheck, Lock, Clock, History, KeyRound, Eye, CheckCircle2 } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'التشفير الطرفي الكامل (End-to-End Encryption)',
      subtitle: 'البيانات ملك المريض وحده',
      description:
        'تُشفر كافة السجلات الطبية والروشتات والتحاليل بمفاتيح تشفير متقدمة خاصة بالمريض ولا يمكن لأي خادم أو جهة الاطلاع عليها دون مفتاح فك التشفير المصرح به.',
      badges: ['تشفير بمفتاح المريض', 'عدم تخزين نصوص صريحة', 'مطابقة معايير الأمن السيبراني القومي'],
    },
    {
      icon: Clock,
      title: 'الوصول المؤقت المحدد زمنياً (Time-Gated Access)',
      subtitle: 'جلسات QR / OTP مدتها 30 دقيقة فقط',
      description:
        'لا يمنح المريض صلاحية دائمة لأي طبيب، بل يولد رمزاً مؤقتاً ينتهي تلقائياً بعد 30 دقيقة، مع صلاحية مطلقة للمريض لإنهاء الجلسة وسحب الصلاحية فوراً بضغطة واحدة.',
      badges: ['صلاحية 30 دقيقة للزيارة', 'زر إنهاء فوري لحظي', 'منع استبقاء الجلسات المفتوحة'],
    },
    {
      icon: History,
      title: 'السجل الرقابي الشفاف (Transparency Audit Log)',
      subtitle: 'توثيق كل حركة قراءة أو كتابة',
      description:
        'يسجل النظام بدقة متناهية كل عملية دخول على ملف المريض موضحاً التاريخ، الساعة، اسم الطبيب، المنشأة، المحافظة، وطريقة المصادقة ونوع الإجراء المتخذ، دون إمكانية التعديل.',
      badges: ['سجل تدقيق غير قابل للتغيير', 'إشعار فوري عند الفتح', 'رقابة كاملة للمواطن'],
    },
  ];

  return (
    <section id="security" className="py-16 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
            ز) معمارية الأمان والخصوصية
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            ركائز الأمان الثلاث وحماية البيانات الصحية للمواطن
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            تم تصميم المنظومة وفق أعلى معايير الخصوصية والأمن القومي لحفظ أسرار المرضى وتأمين الربط بين المستشفيات الحكومية والخاصة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#12241A] rounded-2xl p-7 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm hover:border-[#1B6B46] dark:hover:border-[#4EAD80] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#2D8259] dark:text-[#78C79B] block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                  {pillar.badges.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B6B46] dark:text-[#4EAD80] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
