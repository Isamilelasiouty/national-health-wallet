import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { MedicalRecord } from '../../../types';
import {
  FileText,
  Activity,
  Layers,
  Building,
  User,
  Calendar,
  MapPin,
  Pill,
  Filter,
  CheckCircle,
  FileCheck,
} from 'lucide-react';

export const UnifiedMedicalRecord: React.FC = () => {
  const { medicalRecords, activePatient } = useHealthWallet();
  const [filterType, setFilterType] = useState<string>('الكل');

  const filterOptions = [
    'الكل',
    'الروشتات الإلكترونية',
    'التحاليل المعملية',
    'الأشعات التشخيصية',
  ];

  const filteredRecords = medicalRecords.filter((rec) => {
    if (filterType === 'الكل') return true;
    if (filterType === 'الروشتات الإلكترونية') return rec.type === 'روشتة إلكترونية';
    if (filterType === 'التحاليل المعملية') return rec.type === 'تحليل معملي';
    if (filterType === 'الأشعات التشخيصية') return rec.type === 'أشعة تشخيصية';
    return true;
  });

  return (
    <div className="space-y-6 text-right py-4">
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                السجل الطبي الموحد (Unified Medical Record)
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                جدول زمني شامل يجمع كافة السجلات الصادرة من المستشفيات الحكومية والعيادات والمعامل الخاصة للمريض ({activePatient.fullName})
              </p>
            </div>
          </div>
        </div>

        {/* Smart Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap bg-[#F5F9F6] dark:bg-[#162E21] p-1.5 rounded-2xl border border-[#E1EFE6] dark:border-[#1E3B2C]">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>فلتر تصنيف ذكي:</span>
          </span>
          {filterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setFilterType(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === opt
                  ? 'bg-[#1B6B46] text-white shadow-2xs'
                  : 'text-[#4B5563] dark:text-[#A3BFB0] hover:text-[#1B6B46] hover:bg-white dark:hover:bg-[#13261C]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline of Records */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white dark:bg-[#12241A] rounded-2xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm hover:border-[#1B6B46] dark:hover:border-[#4EAD80] transition-all space-y-4"
            >
              {/* Top Record Bar: Title, Type Badge, Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      record.type === 'روشتة إلكترونية'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : record.type === 'تحليل معملي'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                    }`}
                  >
                    {record.type}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                    {record.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{record.date}</span>
                </div>
              </div>

              {/* Facility & Doctor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#1B6B46] dark:text-[#4EAD80] shrink-0" />
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block text-[10px]">المنشأة الطبية</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {record.facilityName} ({record.facilityType})
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#2D8259] dark:text-[#78C79B] shrink-0" />
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block text-[10px]">المحافظة</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{record.governorate}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center gap-2">
                  <User className="w-4 h-4 text-[#43936B] dark:text-[#A3BFB0] shrink-0" />
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block text-[10px]">الطبيب المعتمد</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{record.doctorName}</span>
                  </div>
                </div>
              </div>

              {/* Diagnosis and Medical Details */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <span className="text-[#1B6B46] dark:text-[#4EAD80] font-bold">التشخيص الطبي: </span>
                  {record.diagnosis}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-[#15281E] p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  {record.details}
                </p>
              </div>

              {/* Prescription Items (if applicable) */}
              {record.prescriptionItems && record.prescriptionItems.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-2">
                    الأدوية الموصوفة المعتمدة بالروشتة:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {record.prescriptionItems.map((med, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 text-xs flex items-center justify-between"
                      >
                        <span className="font-bold text-emerald-900 dark:text-emerald-300">
                          {med.medicine}
                        </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                          {med.dose} • {med.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-[#12241A] rounded-2xl p-12 text-center text-gray-500 border border-[#E1EFE6] dark:border-[#1E3B2C]">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-base font-bold">لا توجد سجلات مطابقة لهذا التصنيف</p>
          </div>
        )}
      </div>
    </div>
  );
};
