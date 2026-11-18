import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { UserCheck, Check, X, ShieldAlert, FileText, CheckCircle, Clock } from 'lucide-react';

export const PhysicianVerificationHub: React.FC = () => {
  const { verificationRequests, approveDoctorRequest, rejectDoctorRequest } = useHealthWallet();

  return (
    <div className="space-y-6 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#43936B] dark:text-[#A3BFB0] flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              مركز اعتماد الأطباء والحوكمة (Physician Verification Hub)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              طابور مراجعة طلبات الأطباء الجدد ومطابقة مستنداتهم الإلزامية ومنح صلاحية التوقيع الرقمي
            </p>
          </div>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold bg-[#F5F9F6] dark:bg-[#162E21] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
          مستندات إلزامية: الرقم القومي + شهادة التخرج + كارنيه النقابة
        </div>
      </div>

      {/* Queue of Requests */}
      <div className="space-y-4">
        {verificationRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#43936B] transition-all"
          >
            {/* Request Info */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-gray-900 dark:text-white">
                  {req.doctorName}
                </span>
                <span className="text-xs text-[#2D8259] dark:text-[#78C79B] font-bold">
                  {req.specialty}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    req.status === 'معتمد'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : req.status === 'مرفوض'
                      ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* Mandatory Documents Matching Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                  <span className="text-gray-400 block text-[10px]">1. الرقم القومي (14 رقماً)</span>
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{req.nationalId}</span>
                </div>
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                  <span className="text-gray-400 block text-[10px]">2. شهادة التخرج والجامعة</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {req.university} ({req.graduationYear})
                  </span>
                </div>
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                  <span className="text-gray-400 block text-[10px]">3. كارنيه نقابة الأطباء</span>
                  <span className="font-mono font-bold text-[#1B6B46] dark:text-[#4EAD80]">
                    قيد #{req.syndicateNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Regulatory Decision Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              {req.status === 'قيد المراجعة' ? (
                <>
                  <button
                    onClick={() => approveDoctorRequest(req.id)}
                    className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>اعتماد ✔</span>
                  </button>
                  <button
                    onClick={() => rejectDoctorRequest(req.id)}
                    className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>رفض ❌</span>
                  </button>
                </>
              ) : (
                <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>تم اتخاذ القرار الرقابي</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
