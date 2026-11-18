import React from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { X, AlertTriangle, Heart, ShieldAlert, PhoneCall, Printer } from 'lucide-react';

export const EmergencyCardModal: React.FC = () => {
  const { isEmergencyCardOpen, setIsEmergencyCardOpen, activePatient } = useHealthWallet();

  if (!isEmergencyCardOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-card-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-[#151D18] rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 animate-emergency-pulse">
        {/* Emergency Header Banner */}
        <div className="bg-red-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest bg-white text-red-700 px-2 py-0.5 rounded-sm">
                  بيانات منقذة للحياة فقط
                </span>
              </div>
              <h2 id="emergency-card-title" className="text-xl font-extrabold mt-0.5">
                بطاقة الطوارئ الطبية السريعة
              </h2>
            </div>
          </div>
          <button
            onClick={() => setIsEmergencyCardOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق بطاقة الطوارئ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice for Paramedics */}
        <div className="bg-red-50 dark:bg-red-950/40 px-6 py-2.5 border-b border-red-200 dark:border-red-900 text-xs text-red-800 dark:text-red-300 font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
          <span>مخصصة لفرق الإسعاف والرعاية العاجلة دون كشف باقي السجل المرضي الخاص.</span>
        </div>

        {/* Emergency Card Details */}
        <div className="p-6 space-y-4 text-right">
          {/* Patient Name */}
          <div className="bg-gray-50 dark:bg-[#1C2820] p-3.5 rounded-xl border border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">اسم المريض</span>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{activePatient.fullName}</p>
          </div>

          {/* National ID & Blood Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-[#1C2820] p-3.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-0.5">الرقم القومي</span>
              <p className="text-base font-mono font-bold text-gray-900 dark:text-white">
                {activePatient.nationalId}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 p-3.5 rounded-xl border border-red-200 dark:border-red-900 text-center">
              <span className="text-xs text-red-700 dark:text-red-300 block mb-0.5 font-semibold">
                فصيلة الدم (Blood Type)
              </span>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">
                {activePatient.bloodType}
              </p>
            </div>
          </div>

          {/* Critical Allergies */}
          <div className="bg-red-50/80 dark:bg-red-950/20 p-4 rounded-xl border border-red-300 dark:border-red-900/60">
            <div className="flex items-center gap-2 mb-2 text-red-700 dark:text-red-300 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>الحساسية الدوائية الحرجة (تجنب الإعطاء الفوري)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activePatient.drugAllergies.map((allergy, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-red-600 text-white font-semibold text-xs shadow-xs"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Chronic Diseases */}
          <div className="bg-amber-50/70 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-300 dark:border-amber-900/60">
            <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
              <Heart className="w-4 h-4" />
              <span>الأمراض المزمنة المسجلة</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activePatient.chronicDiseases.map((disease, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-medium text-xs border border-amber-200 dark:border-amber-800"
                >
                  {disease}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions: Ambulance 123 & Print */}
          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3">
            <a
              href="tel:123"
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm text-center flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال بإسعاف مصر (123)</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة البطاقة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
