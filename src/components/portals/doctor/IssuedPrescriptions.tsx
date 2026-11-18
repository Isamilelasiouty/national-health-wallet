import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { Archive, ShieldCheck, Calendar, User, Building, Pill, FileText, CheckCircle2 } from 'lucide-react';

export const IssuedPrescriptions: React.FC = () => {
  const { issuedPrescriptions, doctor } = useHealthWallet();

  return (
    <div className="space-y-6 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] flex items-center justify-center">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              أرشيف الروشتات الصادرة (Issued e-Prescriptions)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              سجل رقمي بالروشتات الموقعة رقمياً من الطبيب والمرحلة لحظياً لمحفظة المريض
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-xs font-bold text-[#2D8259] dark:text-[#78C79B] border border-[#CDE5D6] dark:border-[#2E543F]">
          <ShieldCheck className="w-4 h-4" />
          <span>إجمالي الروشتات الموقعة: {issuedPrescriptions.length}</span>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {issuedPrescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-4"
          >
            {/* Top Bar: Rx Number, Date, Transfer Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-[#2D8259] dark:text-[#78C79B] bg-[#EBF5EF] dark:bg-[#162E21] px-3 py-1 rounded-lg border border-[#CDE5D6] dark:border-[#2E543F]">
                  #{rx.rxNumber}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{rx.date}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{rx.transferStatus}</span>
              </div>
            </div>

            {/* Patient & Facility Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#FAFCFA] dark:bg-[#162E21] rounded-xl flex items-center gap-2">
                <User className="w-4 h-4 text-[#2D8259] shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">اسم المريض</span>
                  <span className="font-bold text-gray-900 dark:text-white">{rx.patientName}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAFCFA] dark:bg-[#162E21] rounded-xl flex items-center gap-2">
                <Building className="w-4 h-4 text-[#2D8259] shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 block">المنشأة والمحافظة</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {rx.facilityName} ({rx.governorate})
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="text-xs">
              <span className="font-bold text-gray-800 dark:text-gray-200">التشخيص الطبي: </span>
              <span className="text-gray-600 dark:text-gray-300">{rx.diagnosis}</span>
            </div>

            {/* Medicines in this Rx */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">
                الأدوية والجرعات المدرجة:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {rx.medicines.map((m, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[#F5F9F6] dark:bg-[#15281E] border border-gray-200 dark:border-gray-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block">{m.name}</span>
                      <span className="text-[11px] text-gray-500">{m.dose} • {m.duration}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">{m.instructions}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
