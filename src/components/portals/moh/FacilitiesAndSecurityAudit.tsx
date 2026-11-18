import React from 'react';
import { CONNECTED_FACILITIES_SUMMARY } from '../../../data/mockData';
import { Building, ShieldCheck, CheckCircle2, Lock, Activity, Server, Radio } from 'lucide-react';

export const FacilitiesAndSecurityAudit: React.FC = () => {
  return (
    <div className="space-y-8 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#43936B] dark:text-[#A3BFB0] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              المنشآت والتدقيق الأمني (Facilities & Security Audit)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              متابعة حالة الربط المشفر اللحظي للمستشفيات الحكومية والخاصة والمعامل على مستوى الجمهورية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>شبكة الربط القومي: آمنة ومشفرة بالكامل</span>
        </div>
      </div>

      {/* Facilities Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CONNECTED_FACILITIES_SUMMARY.map((fac, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-4 hover:border-[#43936B] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900 dark:text-white">{fac.type}</span>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-900">
                {fac.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                <span className="text-gray-400 block text-[10px]">إجمالي المنشآت المسجلة</span>
                <span className="font-mono text-base font-bold text-gray-900 dark:text-white">
                  {fac.total.toLocaleString('ar-EG')}
                </span>
              </div>
              <div className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl">
                <span className="text-gray-400 block text-[10px]">المتصلة بالربط المشفر</span>
                <span className="font-mono text-base font-bold text-[#1B6B46] dark:text-[#4EAD80]">
                  {fac.connected.toLocaleString('ar-EG')}
                </span>
              </div>
            </div>

            {/* Connection progress bar */}
            <div className="space-y-1">
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#43936B] rounded-full"
                  style={{ width: `${(fac.connected / fac.total) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-gray-400 font-mono text-left block">
                معدل الجاهزية الرقمية: {Math.round((fac.connected / fac.total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Security Architecture Verification Box */}
      <div className="bg-[#EBF5EF] dark:bg-[#162E21] p-6 rounded-3xl border border-[#CDE5D6] dark:border-[#224A35] space-y-3">
        <h4 className="text-base font-bold text-[#1B6B46] dark:text-[#4EAD80] flex items-center gap-2">
          <Lock className="w-5 h-5" />
          <span>بروتوكولات الأمان والتدقيق المستمر</span>
        </h4>
        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          تعتمد كافة المنشآت الطبية المتصلة على قنوات اتصال آمنة ومشفرة بطرفين E2EE، ولا يتم حفظ أي بيانات غير مشفرة لدى أي وسيط. كل عملية استعلام تخضع للمصادقة المزدوجة بطلب كود الجلسة المؤقت (QR / OTP) الخاص بالمريض، وتسجل لحظياً في سجل الخصوصية والوصول.
        </p>
      </div>
    </div>
  );
};
