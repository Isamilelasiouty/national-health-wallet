import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { MOH_EARLY_WARNING, EGYPT_GOVERNORATES } from '../../../data/mockData';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  Building,
  Users,
  FileCheck,
  MapPin,
  Filter,
} from 'lucide-react';

export const EpidemiologicalDashboard: React.FC = () => {
  const [selectedGov, setSelectedGov] = useState('كل محافظات الجمهورية (27 محافظة)');

  // Filter or show early warning items
  const warnings = MOH_EARLY_WARNING;

  return (
    <div className="space-y-8 text-right py-4">
      {/* Top Notice: Illustrative Numbers */}
      <div className="p-3 bg-[#EBF5EF] dark:bg-[#162E21] border border-[#CDE5D6] dark:border-[#2E543F] rounded-2xl flex items-center justify-between gap-3 text-xs text-[#2D8259] dark:text-[#78C79B] font-semibold">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80] shrink-0" />
          <span>
            تنويه توضيحي: الأرقام الإحصائية ومؤشرات الأداء المعروضة أدناه هي أرقام توضيحية استرشادية لأغراض العرض التقديمي المعماري، وليست بيانات وبائية واقعية.
          </span>
        </div>
        <span className="font-mono bg-white dark:bg-[#12241A] px-2 py-0.5 rounded-md border border-[#CDE5D6] dark:border-[#2E543F] text-[11px] shrink-0">
          بيانات عرض تجريبي
        </span>
      </div>

      {/* 3 Top KPIs (مؤشرات الأداء العليا) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Active Health Wallets */}
        <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold">إجمالي المحافظ الصحية النشطة</span>
            <Users className="w-5 h-5 text-[#1B6B46] dark:text-[#4EAD80]" />
          </div>
          <div className="font-mono text-3xl font-black text-[#1B6B46] dark:text-[#4EAD80]">
            12,480,210
          </div>
          <span className="text-[11px] text-gray-400 block">
            رقم توضيحي للعرض • ربط القطاعين الحكومي والخاص
          </span>
        </div>

        {/* KPI 2: Digitally Certified Physicians */}
        <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold">عدد الأطباء المعتمدين رقمياً</span>
            <Building className="w-5 h-5 text-[#2D8259] dark:text-[#78C79B]" />
          </div>
          <div className="font-mono text-3xl font-black text-[#2D8259] dark:text-[#78C79B]">
            84,320
          </div>
          <span className="text-[11px] text-gray-400 block">
            رقم توضيحي للعرض • موثقون بنقابة الأطباء والسجل المدني
          </span>
        </div>

        {/* KPI 3: Issued e-Prescriptions Today */}
        <div className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold">الروشتات الإلكترونية الصادرة اليوم</span>
            <FileCheck className="w-5 h-5 text-[#43936B] dark:text-[#A3BFB0]" />
          </div>
          <div className="font-mono text-3xl font-black text-[#43936B] dark:text-[#A3BFB0]">
            142,650
          </div>
          <span className="text-[11px] text-gray-400 block">
            رقم توضيحي للعرض • ترحيل مشفر لحظي لمحفظة المريض
          </span>
        </div>
      </div>

      {/* Early Warning Table (جدول الإنذار المبكر) */}
      <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                جدول الإنذار المبكر والترصد الوبائي اللحظي
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              رصد لحظي للتصنيفات المرضية (ICD-10) والمحافظات الأعلى تسجيلاً لاكتشاف الأوبئة والأمراض الموسمية مبكراً (بيانات مجهولة الهوية بالكامل)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">تصفية المحافظة:</span>
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="text-xs font-bold p-2 rounded-xl bg-[#FAFCFA] dark:bg-[#162E21] border border-gray-300 dark:border-gray-700 text-[#1B6B46] dark:text-[#4EAD80]"
            >
              <option value="كل محافظات الجمهورية (27 محافظة)">كل محافظات الجمهورية (27 محافظة)</option>
              {EGYPT_GOVERNORATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F5F9F6] dark:bg-[#162E21] text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 font-bold">التصنيف المرضي</th>
                <th className="py-3 px-4 font-bold font-mono">كود ICD-10</th>
                <th className="py-3 px-4 font-bold">المحافظات الأعلى تسجيلاً</th>
                <th className="py-3 px-4 font-bold text-center">الحالات المسجلة (توضيحية)</th>
                <th className="py-3 px-4 font-bold text-center">الاتجاه الوبائي</th>
                <th className="py-3 px-4 font-bold text-center">مستوى التنبيه</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {warnings.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/70 dark:hover:bg-[#152B1E] transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                    {item.diseaseName}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#1B6B46] dark:text-[#4EAD80]">
                    {item.icd10Code}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {item.highestGovernorates.map((g, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-gray-800 dark:text-gray-200">
                    {item.reportedCases.toLocaleString('ar-EG')}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.trend === 'مرتفع'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{item.trend}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.alertLevel === 'تنبيه موسمي'
                          ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300'
                          : item.alertLevel === 'تحت المتابعة الدقيقة'
                          ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-300 border border-blue-300'
                          : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 border border-emerald-300'
                      }`}
                    >
                      {item.alertLevel}
                    </span>
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
