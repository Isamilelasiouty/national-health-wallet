import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { History, ShieldCheck, Lock, Clock, Building, User, KeyRound } from 'lucide-react';

export const TransparencyAuditLog: React.FC = () => {
  const { auditLogs, activePatient } = useHealthWallet();

  return (
    <div className="space-y-6 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              سجل الخصوصية والوصول (Transparency Audit Log)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              سجل رقابي مشفر يوثق بالثانية كل عملية دخول أو استعلام أو كتابة على ملف المريض ({activePatient.fullName})
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-xs font-bold text-[#1B6B46] dark:text-[#78C79B] border border-[#CDE5D6] dark:border-[#224A35]">
          <ShieldCheck className="w-4 h-4" />
          <span>سجل غير قابل للتعديل (Immutable Log)</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F5F9F6] dark:bg-[#162E21] text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3.5 px-4 font-bold">التاريخ والساعة</th>
                <th className="py-3.5 px-4 font-bold">اسم الطبيب والصفة</th>
                <th className="py-3.5 px-4 font-bold">المحافظة والمنشأة الطبية</th>
                <th className="py-3.5 px-4 font-bold">آلية المصادقة</th>
                <th className="py-3.5 px-4 font-bold">نوع الإجراء الطبي والرقابي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/70 dark:hover:bg-[#152B1E] transition-colors">
                  <td className="py-4 px-4 font-mono text-xs text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{log.dateTime}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900 dark:text-white">{log.doctorName}</div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">{log.specialty}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{log.facilityName}</div>
                    <span className="text-[11px] text-[#2D8259] dark:text-[#78C79B] font-medium">
                      محافظة {log.governorate}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        log.authMethod.includes('QR')
                          ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      <KeyRound className="w-3 h-3" />
                      <span>{log.authMethod}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300 font-medium">
                    {log.actionType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
