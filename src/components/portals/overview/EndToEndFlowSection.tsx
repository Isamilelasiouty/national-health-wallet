import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import {
  User,
  Stethoscope,
  Building2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileCheck,
  BellRing,
  Activity,
  QrCode,
} from 'lucide-react';

export const EndToEndFlowSection: React.FC = () => {
  const { setActivePortal, setPatientTab, setDoctorTab, setMohTab } = useHealthWallet();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      step: 1,
      actor: 'المريض والمرافق العائلي',
      portalId: 'patient',
      badge: 'بوابة المريض',
      color: '#1B6B46',
      icon: User,
      title: 'تسجيل البيانات وتوليد كود الجلسة (QR / OTP)',
      description:
        'يُسجّل المريض بياناته أو يضيف تابعيه في بوابة المريض ويولّد رمز QR وكود OTP مؤقتاً من 6 أرقام صالحاً لمدة 30 دقيقة للجلسة الواحدة لتقديمه للطبيب المعالج.',
      actionLabel: 'الانتقال لتجربة بوابة المريض',
      onNavigate: () => {
        setActivePortal('patient');
        setPatientTab('dashboard');
      },
      indicators: [
        'رمز OTP مؤقت 6 أرقام لمدة 30 دقيقة',
        'صلاحية إلغاء فورية لسحب الوصول',
        'تشفير كامل لكافة البيانات المنقولة',
      ],
    },
    {
      step: 2,
      actor: 'الطبيب المعالج والمنشأة الطبية',
      portalId: 'doctor',
      badge: 'بوابة الطبيب',
      color: '#2D8259',
      icon: Stethoscope,
      title: 'فتح الجلسة المؤقتة، فحص التنبيه الحرج، وكتابة الروشتة',
      description:
        'يفتح الطبيب الجلسة في بوابة الطبيب بعد تحديد محافظته ومنشأته (من محافظات مصر الـ 27)، فيظهر له تنبيه الحساسية الحرج فوراً، ثم يكتب الروشتة ويفحص تعارض الأدوية ويوقعها رقمياً.',
      actionLabel: 'الانتقال لتجربة بوابة الطبيب',
      onNavigate: () => {
        setActivePortal('doctor');
        setDoctorTab('consultation');
      },
      indicators: [
        'تنبيه حرج فوري لحساسية البنسلين والأمراض المزمنة',
        'محرر روشتة ذكي مع فحص فوري للتعارضات الدوائية',
        'ختم المنشأة والتوقيع الرقمي المعتمد',
      ],
    },
    {
      step: 3,
      actor: 'المحفظة الذاتية + وزارة الصحة',
      portalId: 'moh',
      badge: 'تكامل المحفظة والوزارة',
      color: '#43936B',
      icon: Building2,
      title: 'الترحيل اللحظي لمنبهات المريض والترصد الوبائي المجهول',
      description:
        'تُرحل الروشتة لحظياً إلى محفظة المريض وتتحول تلقائياً إلى جدول منبهات دوائية مع إشعار المرافق، بينما تظهر مؤشراتها التشخيصية (مجهولة الهوية تماماً ICD-10) في لوحة الترصد الوبائي لوزارة الصحة.',
      actionLabel: 'الانتقال لتجربة بوابة وزارة الصحة',
      onNavigate: () => {
        setActivePortal('moh');
        setMohTab('epidemiology');
      },
      indicators: [
        'تحويل تلقائي لجرعات اليوم والمنبهات بالمحفظة',
        'تشفير الاسم وإخفاء الهوية الكامل في تقارير الوزارة',
        'تحديث مؤشرات الإنذار المبكر والترصد الوبائي لحظياً',
      ],
    },
  ];

  return (
    <section id="end-to-end-flow" className="py-16 border-b border-[#E1EFE6] dark:border-[#1E3B2C] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] uppercase tracking-wider block mb-1">
            دورة التكامل الشاملة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            ملخص دورة التكامل اللحظي (End-to-End Flow) داخل المنصة
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            مخطط تدفق البيانات المشفرة بين المريض والطبيب والوزارة خطوة بخطوة كما ورد في الصفحة الرابعة من الوثيقة المعمارية.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {steps.map((st) => {
            const Icon = st.icon;
            const isSelected = activeStep === st.step;
            return (
              <button
                key={st.step}
                onClick={() => setActiveStep(st.step)}
                className={`p-5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-[#12241A] border-[#1B6B46] shadow-md ring-2 ring-[#1B6B46]/20'
                    : 'bg-[#F5F9F6] dark:bg-[#162E21] border-[#E1EFE6] dark:border-[#1E3B2C] hover:bg-white dark:hover:bg-[#13261C]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: st.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isSelected
                        ? 'bg-[#1B6B46] text-white'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    الخطوة {st.step}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-0.5">
                    {st.badge}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">{st.actor}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase */}
        {(() => {
          const current = steps.find((s) => s.step === activeStep)!;
          const Icon = current.icon;
          return (
            <div className="bg-white dark:bg-[#12241A] rounded-3xl p-8 border border-[#D5E7DC] dark:border-[#1E3B2C] shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Text explanation */}
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-2xs"
                      style={{ backgroundColor: current.color }}
                    >
                      {current.badge}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      مسار التدفق: الخطوة {current.step} من 3
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {current.indicators.map((ind, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80] shrink-0" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={current.onNavigate}
                      className="px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                      style={{ backgroundColor: current.color }}
                    >
                      <span>{current.actionLabel}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      {activeStep > 1 && (
                        <button
                          onClick={() => setActiveStep((p) => p - 1)}
                          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          السابق
                        </button>
                      )}
                      {activeStep < 3 && (
                        <button
                          onClick={() => setActiveStep((p) => p + 1)}
                          className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          الخطوة التالية
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visual Card / Simulation mockup */}
                <div className="lg:col-span-4 bg-[#F5F9F6] dark:bg-[#162E21] p-6 rounded-2xl border border-[#D5E7DC] dark:border-[#1E3B2C] text-center space-y-4">
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: current.color }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-base">
                      {current.actor}
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      تشفير طرفي كامل ومطابقة فورية
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-[#12241A] rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-right space-y-1 font-mono">
                    <div className="text-gray-500">حالة الربط: <span className="text-emerald-600 font-bold">نشط ومؤمن ✔</span></div>
                    <div className="text-gray-500">بروتوكول المصادقة: <span className="text-gray-800 dark:text-gray-200">E2EE + Time-gated OTP</span></div>
                    <div className="text-gray-500">زمن الاستجابة: <span className="text-gray-800 dark:text-gray-200">&lt; 150ms</span></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
