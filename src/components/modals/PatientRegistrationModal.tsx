import React, { useState } from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { EGYPT_GOVERNORATES } from '../../data/mockData';
import { BloodType, RelationType } from '../../types';
import { X, UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';

export const PatientRegistrationModal: React.FC = () => {
  const { isRegistrationModalOpen, setIsRegistrationModalOpen, registerNewPatient } = useHealthWallet();

  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [relationship, setRelationship] = useState<RelationType>('مريض مستقل');
  const [bloodType, setBloodType] = useState<BloodType>('A+');
  const [governorate, setGovernorate] = useState(EGYPT_GOVERNORATES[0]);
  const [drugAllergiesText, setDrugAllergiesText] = useState('');
  const [chronicDiseasesText, setChronicDiseasesText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isRegistrationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    const cleanName = fullName.trim();
    const nameParts = cleanName.split(/\s+/);
    if (nameParts.length < 4) {
      setErrorMsg('يرجى إدخال الاسم الرباعي كاملاً كما هو مدون في بطاقة الرقم القومي.');
      return;
    }

    const cleanNationalId = nationalId.trim();
    if (!/^\d{14}$/.test(cleanNationalId)) {
      setErrorMsg('الرقم القومي يجب أن يتكون من 14 رقماً صحيحاً بالضبط.');
      return;
    }

    const allergies = drugAllergiesText.trim()
      ? drugAllergiesText.split('،').map((s) => s.trim()).filter(Boolean)
      : ['لا توجد حساسية دوائية مسجلة'];

    const chronic = chronicDiseasesText.trim()
      ? chronicDiseasesText.split('،').map((s) => s.trim()).filter(Boolean)
      : ['لا توجد أمراض مزمنة مسجلة'];

    registerNewPatient({
      fullName: cleanName,
      nationalId: cleanNationalId,
      relationship,
      bloodType,
      governorate,
      drugAllergies: allergies,
      chronicDiseases: chronic,
    });

    setSuccessMsg('تم إنشاء المحفظة الصحية المشفرة بنجاح وإضافتها لقائمة الأسرة.');
    setTimeout(() => {
      setSuccessMsg('');
      setIsRegistrationModalOpen(false);
      setFullName('');
      setNationalId('');
      setDrugAllergiesText('');
      setChronicDiseasesText('');
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#12241A] rounded-2xl shadow-2xl border border-[#D1E5D9] dark:border-[#1E3B2C] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#F5F9F6] dark:bg-[#162E21] border-b border-[#E1EFE6] dark:border-[#1E3B2C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B46]/10 dark:bg-[#2FA36F]/20 flex items-center justify-center text-[#1B6B46] dark:text-[#4EAD80]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-xl font-bold text-[#111827] dark:text-[#F3F8F5]">
                إنشاء محفظة صحية لمريض جديد
              </h2>
              <p className="text-sm text-[#4B5563] dark:text-[#A3BFB0]">
                تسجيل مشفر يربط القطاعين الحكومي والخاص بملف يملكه المريض
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRegistrationModalOpen(false)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-right">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-300 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-300 text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Quadruple Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                الاسم الرباعي <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="أحمد محمد محمود السيد"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                يلزم كتابة 4 أسماء لمطابقة سجلات وزارة الصحة والسجل المدني.
              </span>
            </div>

            {/* National ID (14 digits) */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                الرقم القومي (14 رقماً) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={14}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                placeholder="28910150102345"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base font-mono tracking-wider focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              />
            </div>

            {/* Account Type / Relationship */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                نوع الحساب / صلة القرابة <span className="text-red-500">*</span>
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value as RelationType)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              >
                <option value="مريض مستقل">مريض مستقل (حساب شخصي)</option>
                <option value="أب">أب (مرافق عائلي)</option>
                <option value="أم">أم (مرافق عائلي)</option>
                <option value="ابن">ابن (مرافق عائلي)</option>
                <option value="ابنة">ابنة (مرافق عائلي)</option>
                <option value="زوجة">زوجة (مرافق عائلي)</option>
                <option value="زوج">زوج (مرافق عائلي)</option>
              </select>
            </div>

            {/* Blood Type */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                فصيلة الدم <span className="text-red-500">*</span>
              </label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value as BloodType)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              >
                <option value="A+">A+ (إيجابي)</option>
                <option value="A-">A- (سلبي)</option>
                <option value="B+">B+ (إيجابي)</option>
                <option value="B-">B- (سلبي)</option>
                <option value="AB+">AB+ (إيجابي)</option>
                <option value="AB-">AB- (سلبي)</option>
                <option value="O+">O+ (إيجابي)</option>
                <option value="O-">O- (سلبي)</option>
              </select>
            </div>

            {/* Governorate */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                المحافظة <span className="text-red-500">*</span>
              </label>
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              >
                {EGYPT_GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>

            {/* Drug Allergies */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                الحساسية الدوائية الحرجة (افصل بينها بفاصلة)
              </label>
              <input
                type="text"
                value={drugAllergiesText}
                onChange={(e) => setDrugAllergiesText(e.target.value)}
                placeholder="مثال: البنسلين ومشتقاته، السلفا (أو اترك فارغاً إن لم يوجد)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              />
            </div>

            {/* Chronic Diseases */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] dark:text-[#E8F3EC] mb-1.5">
                الأمراض المزمنة (افصل بينها بفاصلة)
              </label>
              <input
                type="text"
                value={chronicDiseasesText}
                onChange={(e) => setChronicDiseasesText(e.target.value)}
                placeholder="مثال: ارتفاع ضغط الدم، السكري، الربو (أو اترك فارغاً إن لم يوجد)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
              />
            </div>
          </div>

          {/* Security note */}
          <div className="p-3.5 bg-[#EBF5EF] dark:bg-[#162E21] rounded-xl flex items-start gap-3 border border-[#CDE5D6] dark:border-[#224A35]">
            <ShieldCheck className="w-5 h-5 text-[#1B6B46] dark:text-[#4EAD80] shrink-0 mt-0.5" />
            <p className="text-xs text-[#2D8259] dark:text-[#A3BFB0] leading-relaxed">
              تشفير طرفي كامل (End-to-End Encryption): تُحفظ هذه البيانات داخل مفتاح مشفر خاص بالمريض لا يمكن لأي منشأة طبية أو جهة فك تشفيره إلا بتصريح مؤقت من المريض عبر (QR / OTP).
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setIsRegistrationModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>تأكيد وإنشاء المحفظة المشفرة</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
