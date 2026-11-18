import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { EGYPT_GOVERNORATES } from '../../../data/mockData';
import { Building, MapPin, CheckCircle, ShieldCheck, Stethoscope } from 'lucide-react';

export const GovernorateAndFacility: React.FC = () => {
  const { doctor, updateDoctorLocation } = useHealthWallet();

  const [governorate, setGovernorate] = useState(doctor.governorate);
  const [facilityType, setFacilityType] = useState(doctor.facilityType);
  const [facilityName, setFacilityName] = useState(doctor.facilityName);
  const [savedSuccess, setSavedSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorLocation(governorate, facilityType, facilityName);
    setSavedSuccess('تم تحديث جهة العمل والمحافظة بنجاح، وسيُختم بها تلقائياً كل روشتة صادرة.');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-right py-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] flex items-center justify-center">
          <Building className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white">
            المحافظة وجهة العمل (Governorate & Facility)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            تحديد المنشأة الطبية المعتمدة ومحافظتها ليُختم بها رسمياً كل تقرير وروشتة إلكترونية
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2">
          <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* Main Settings Form */}
      <div className="bg-white dark:bg-[#12241A] rounded-3xl p-8 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Governorate Selection (all 27 Egyptian Governorates) */}
          <div>
            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
              اختيار المحافظة (جميع محافظات مصر الـ 27) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white text-base focus:border-[#2D8259]"
              >
                {EGYPT_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    محافظة {gov}
                  </option>
                ))}
              </select>
              <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              يتم ربط التقارير الطبية جغرافياً بغرفة الترصد الوبائي لوزارة الصحة.
            </span>
          </div>

          {/* Facility Type */}
          <div>
            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
              تحديد نوع المنشأة الطبية <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['مستشفى حكومي', 'مستشفى خاص', 'عيادة خاصة'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFacilityType(type)}
                  className={`p-3.5 rounded-xl border text-sm font-bold text-center transition-all ${
                    facilityType === type
                      ? 'bg-[#2D8259] text-white border-[#2D8259] shadow-2xs'
                      : 'bg-[#FAFCFA] dark:bg-[#162E21] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-[#2D8259]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Facility Name */}
          <div>
            <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
              اسم المنشأة الطبية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              placeholder="مثال: مستشفى قصر العيني التعليمي / مركز النيل التخصصي"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white text-base focus:border-[#2D8259]"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
              الاسم الرسمي المعتمد الذي سيظهر في الختم الرقمي أعلى كل روشتة إلكترونية.
            </span>
          </div>

          {/* Institutional Seal Preview */}
          <div className="p-4 bg-[#EBF5EF] dark:bg-[#162E21] rounded-2xl border border-[#CDE5D6] dark:border-[#2E543F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#2D8259] dark:text-[#78C79B]" />
              <div>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">معاينة الختم الرقمي الصادر:</span>
                <span className="text-sm font-black text-gray-900 dark:text-white">
                  [{doctor.name}] • [{facilityType}: {facilityName}] • [محافظة {governorate}]
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-[#2D8259] font-bold">كود الترخيص: #{doctor.licenseNumber}</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#2D8259] hover:bg-[#236846] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>حفظ واعتماد موقع العمل النشط</span>
          </button>
        </form>
      </div>
    </div>
  );
};
