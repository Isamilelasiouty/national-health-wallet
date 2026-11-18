import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { Award, CheckCircle, ShieldCheck, FileCheck, CreditCard, GraduationCap } from 'lucide-react';

export const CredentialsAndVerification: React.FC = () => {
  const { doctor } = useHealthWallet();

  const documents = [
    {
      title: 'بطاقة الرقم القومي المصرية',
      icon: CreditCard,
      status: doctor.documents.nationalId.status,
      date: doctor.documents.nationalId.date,
      details: 'تمت مطابقة الهوية والربط الرقمي المباشر بقاعدة بيانات قطاع مصلحة الأحوال المدنية.',
    },
    {
      title: 'شهادة التخرج وبكالوريوس الطب والجراحة',
      icon: GraduationCap,
      status: doctor.documents.graduationCert.status,
      date: doctor.documents.graduationCert.date,
      details: 'تم توثيق المؤهل التخصصي من المجلس الأعلى للجامعات وقطاع التدريب والبحوث الصحية.',
    },
    {
      title: 'كارنيه نقابة الأطباء (ترخيص مزاولة المهنة)',
      icon: Award,
      status: doctor.documents.syndicateCard.status,
      date: doctor.documents.syndicateCard.date,
      details: `ساري ومعتمد برقم قيد نقابي (#${doctor.licenseNumber}) مع منح صلاحية التوقيع والختم الإلكتروني.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              حالة الاعتماد والوثائق الرسمية (Credentials & Verification)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              توثيق مستندات الطبيب الإلزامية الثلاثة لدى وزارة الصحة لمنح صلاحية التوقيع الرقمي
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>طبيب معتمد وموثق رقمياً</span>
        </div>
      </div>

      {/* 3 Mandatory Documents Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documents.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-900/60 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 font-semibold">{doc.date}</span>
                </div>

                <h4 className="text-base font-bold text-gray-900 dark:text-white">{doc.title}</h4>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-900">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{doc.status}</span>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                  {doc.details}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400 font-medium">
                مفتاح التوقيع الرقمي: مفعل ونشط ✔
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
