import React, { useState } from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { PUBLIC_VERIFIED_DOCTORS } from '../../data/mockData';
import { X, Search, CheckCircle, AlertTriangle, ShieldCheck, Building } from 'lucide-react';

export const DoctorVerificationModal: React.FC = () => {
  const { isDoctorVerificationOpen, setIsDoctorVerificationOpen } = useHealthWallet();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isDoctorVerificationOpen) return null;

  const filteredDoctors = PUBLIC_VERIFIED_DOCTORS.filter(
    (doc) =>
      doc.name.includes(searchTerm.trim()) ||
      doc.syndicateNumber.includes(searchTerm.trim()) ||
      doc.specialty.includes(searchTerm.trim())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doc-verify-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#12241A] rounded-2xl shadow-2xl border border-[#D1E5D9] dark:border-[#1E3B2C] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-[#F5F9F6] dark:bg-[#162E21] border-b border-[#E1EFE6] dark:border-[#1E3B2C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B6B46]/10 dark:bg-[#2FA36F]/20 flex items-center justify-center text-[#1B6B46] dark:text-[#4EAD80]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="doc-verify-title" className="text-xl font-bold text-[#111827] dark:text-[#F3F8F5]">
                خدمة «تحقق من طبيبك»
              </h2>
              <p className="text-sm text-[#4B5563] dark:text-[#A3BFB0]">
                أداة استعلام عامة للتأكد من اعتماد الطبيب رسمياً لدى وزارة الصحة ومنع انتحال الصفة
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDoctorVerificationOpen(false)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-right">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الطبيب، أو رقم القيد النقابي (مثال: 84219)..."
              className="w-full pl-4 pr-11 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A3326] text-[#111827] dark:text-white text-base focus:border-[#1B6B46] dark:focus:border-[#4EAD80] transition-colors"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-3.5 top-3.5" />
          </div>

          {/* Prompt / Explanation */}
          <div className="p-3 bg-[#EBF5EF] dark:bg-[#162E21] rounded-xl flex items-center gap-2 text-xs text-[#2D8259] dark:text-[#A3BFB0] border border-[#CDE5D6] dark:border-[#224A35]">
            <CheckCircle className="w-4 h-4 shrink-0 text-[#1B6B46] dark:text-[#4EAD80]" />
            <span>
              جميع الأطباء المعتمدين في هذه المنظومة خاضعون لمطابقة الرقم القومي وشهادة التخرج وكارنيه نقابة الأطباء.
            </span>
          </div>

          {/* Results List */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#D5E7DC] dark:border-[#1E3B2C] bg-[#FAFCFA] dark:bg-[#152B1E] hover:border-[#1B6B46] dark:hover:border-[#4EAD80] transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-gray-900 dark:text-white">{doc.name}</span>
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>معتمد رسمياً</span>
                        </span>
                      </div>
                      <p className="text-sm text-[#2D8259] dark:text-[#78C79B] font-medium">{doc.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 pt-1">
                        <Building className="w-3.5 h-3.5 text-gray-400" />
                        <span>{doc.workplace}</span>
                      </div>
                    </div>

                    <div className="text-left shrink-0 bg-white dark:bg-[#1A3326] px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 block">رقم القيد النقابي</span>
                      <span className="font-mono font-bold text-sm text-[#1B6B46] dark:text-[#4EAD80]">
                        #{doc.syndicateNumber}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-base font-semibold">لم يتم العثور على طبيب بهذا الاسم أو الرقم</p>
                <p className="text-xs mt-1">تأكد من كتابة الاسم أو رقم القيد النقابي بشكل صحيح.</p>
              </div>
            )}
          </div>

          <div className="pt-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
            تنبيه: انتحال الصفة الطبية أو ممارسة المهنة دون ترخيص رسمي من وزارة الصحة جريمة يُعاقب عليها القانون.
          </div>
        </div>
      </div>
    </div>
  );
};
