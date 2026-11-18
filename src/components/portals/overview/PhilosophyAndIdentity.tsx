import React from 'react';
import { Palette, Layout, Shield, Check, Eye } from 'lucide-react';

export const PhilosophyAndIdentity: React.FC = () => {
  const colorCards = [
    {
      title: 'الخلفية العامة',
      hex: '#F5F9F6',
      rgb: '245, 249, 246',
      description: 'أبيض نعناعي ناعم مريح للعين، يقلل الإجهاد البصري للمرضى وكبار السن.',
      bgClass: 'bg-[#F5F9F6]',
      borderClass: 'border-[#D1E5D9]',
      textDark: true,
    },
    {
      title: 'البطاقات والهيدر',
      hex: '#FFFFFF',
      rgb: '255, 255, 255',
      description: 'أبيض نقي مع حدود خضراء فاتحة وظلال ناعمة تمنح عمقاً بصرياً هادئاً.',
      bgClass: 'bg-[#FFFFFF]',
      borderClass: 'border-[#E1EFE6]',
      textDark: true,
    },
    {
      title: 'الأخضر الداكن (الأساسي)',
      hex: '#1B6B46',
      rgb: '27, 107, 70',
      description: 'اللون الأساسي للعناوين والأزرار التفاعلية الرئيسية ورمز بوابة المريض.',
      bgClass: 'bg-[#1B6B46]',
      borderClass: 'border-[#155336]',
      textDark: false,
    },
    {
      title: 'درجات الأخضر (الزمردي والمريمي)',
      hex: '#2D8259 / #43936B',
      rgb: '45, 130, 89 | 67, 147, 107',
      description: 'أخضر زمردي لبوابة الطبيب، وأخضر مريمي لبوابة وزارة الصحة والحوكمة.',
      bgClass: 'bg-linear-to-r from-[#2D8259] to-[#43936B]',
      borderClass: 'border-[#2D8259]',
      textDark: false,
    },
  ];

  return (
    <div className="space-y-16">
      {/* 1. Architecture Philosophy Section */}
      <section id="philosophy" className="py-12 border-b border-[#E1EFE6] dark:border-[#1E3B2C] text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
              أ) الفلسفة العامة والمعمارية للمنصة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              الفلسفة التصميمية والمعمارية للمنظومة
            </h2>
          </div>

          <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 sm:p-8 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm leading-relaxed space-y-6">
            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200">
              تُبنى المنصة كنظام ويب متكامل متجاوب (Responsive Web Platform) يعتمد على{' '}
              <strong className="text-[#1B6B46] dark:text-[#4EAD80]">
                التصفح الأفقي السلس (Horizontal Navbar Architecture)
              </strong>{' '}
              بدلاً من القوائم الجانبية المزدحمة، مع توحيد الهوية البصرية بالكامل في درجات الأخضر الطبي الهادئ مع الأبيض النقي لتوفير بيئة بصرية مريحة للمرضى والأطباء في المستشفيات دون أي تشتيت لوني.
            </p>

            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200">
              تنقسم المنصة إلى واجهة رئيسية موحدة تتفرع إلى{' '}
              <strong className="text-[#1B6B46] dark:text-[#4EAD80]">
                3 بوابات تشغيلية محمية (المريض، الطبيب، ووزارة الصحة)
              </strong>{' '}
              تتكامل لحظياً عبر التشفير الطرفي ورموز الوصول المؤقتة (QR / OTP).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-3 p-3.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                <Layout className="w-5 h-5 text-[#1B6B46] dark:text-[#4EAD80] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">تصفح أفقي بلا قوائم جانبية</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    يمنح الشاشة مساحة عرض كاملة ويمنع التشتت والازدحام.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                <Eye className="w-5 h-5 text-[#2D8259] dark:text-[#78C79B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">راحة العين وسهولة الاستخدام</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    خط Cairo واضح بأحجام مريحة (لا تقل عن 17px) مع تباين عالي WCAG AA.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                <Shield className="w-5 h-5 text-[#43936B] dark:text-[#A3BFB0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">تكامل لحظي مؤمن</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    رموز جلسة QR/OTP مؤقتة لمدة 30 دقيقة مع إمكانية السحب الفوري.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Identity Section */}
      <section id="visual-identity" className="py-12 border-b border-[#E1EFE6] dark:border-[#1E3B2C] text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
              ب) الهوية البصرية الموحدة ونظام التنقل
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              لوحة الألوان الطبية المعتمدة (Pure Medical Green Shades & Crisp White)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              هوية لونية طبية موحدة هادئة تبتعد عن الألوان الصارخة، وتخصص اللون الأحمر لبطاقة الطوارئ المنقذة للحياة فقط.
            </p>
          </div>

          {/* Color Palette Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {colorCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#12241A] rounded-2xl overflow-hidden border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col"
              >
                {/* Color Swatch */}
                <div
                  className={`h-28 w-full ${card.bgClass} border-b ${card.borderClass} flex items-end p-3 transition-transform`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                      card.textDark
                        ? 'bg-black/10 text-gray-900 border border-black/10'
                        : 'bg-white/20 text-white backdrop-blur-xs'
                    }`}
                  >
                    {card.hex}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{card.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-mono text-gray-400">
                    RGB: {card.rgb}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Header & Sub-Navbar Architecture Diagram */}
          <div className="mt-8 bg-[#F5F9F6] dark:bg-[#162E21] p-6 rounded-2xl border border-[#D5E7DC] dark:border-[#1E3B2C]">
            <h3 className="text-base font-bold text-[#1B6B46] dark:text-[#4EAD80] mb-3">
              2. هيكل الهيدر العلوي والناف بار الأفقي الثابت (Sticky Top Header & Sub-Navbar)
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              <div className="p-3 bg-white dark:bg-[#12241A] rounded-xl border border-gray-200 dark:border-gray-700">
                <strong className="text-gray-900 dark:text-white">الهيدر العلوي (Top Header):</strong>{' '}
                [أيقونة المستشفى 🏥 + اسم المنظومة] | أزرار التنقل بين البوابات: (الرئيسية • بوابة المريض • بوابة الطبيب • بوابة وزارة الصحة) | [زر: ➕ تسجيل مريض جديد] [زر: 🚨 بطاقة الطوارئ]
              </div>
              <div className="p-3 bg-white dark:bg-[#12241A] rounded-xl border border-gray-200 dark:border-gray-700">
                <strong className="text-gray-900 dark:text-white">الناف بار الأفقي الفرعي (Horizontal Sub-Navbar):</strong>{' '}
                شريط أفقي ثابت أسفل الهيدر يعرض تبويبات كل بوابة جنباً إلى جنب بدرجات الأخضر الطبي مع تمييز التبويب النشط ومنح مساحة عرض كاملة للمحتوى.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
