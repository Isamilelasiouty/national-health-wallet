import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import {
  Stethoscope,
  KeyRound,
  QrCode,
  AlertTriangle,
  FileText,
  Pill,
  Send,
  Plus,
  Trash2,
  CheckCircle,
  Building,
  User,
  ShieldCheck,
  Calendar,
  Lock,
} from 'lucide-react';

export const ConsultationAndRx: React.FC = () => {
  const {
    activePatient,
    doctor,
    sessionUnlockedByDoctor,
    unlockSessionWithCode,
    issueAndSignPrescription,
    medicalRecords,
  } = useHealthWallet();

  // Session gate state
  const [enteredOtp, setEnteredOtp] = useState('');
  const [sessionError, setSessionError] = useState('');

  // e-Rx Editor State
  const [diagnosis, setDiagnosis] = useState('');
  const [icd10Code, setIcd10Code] = useState('I10');

  interface MedItem {
    name: string;
    dose: string;
    duration: string;
    instructions: string;
  }

  const [medicines, setMedicines] = useState<MedItem[]>([
    {
      name: 'أميلوديبين 5 مجم (Amlodipine 5mg)',
      dose: 'قرص واحد يومياً',
      duration: '3 أشهر',
      instructions: 'يؤخذ مساءً بعد العشاء',
    },
  ]);

  const [currentMedName, setCurrentMedName] = useState('');
  const [currentDose, setCurrentDose] = useState('');
  const [currentDuration, setCurrentDuration] = useState('3 أشهر');
  const [currentInstructions, setCurrentInstructions] = useState('');
  const [allergyConflictWarning, setAllergyConflictWarning] = useState('');
  const [signSuccess, setSignSuccess] = useState('');

  // Smart suggestions chips
  const suggestions = [
    'أميلوديبين 5 مجم (Amlodipine)',
    'كونكور 5 مجم (Concor)',
    'لوسارتان 50 مجم (Losartan)',
    'ميتفورمين 500 مجم (Glucophage)',
    'بنسلين (Penicillin V - تنبيه تعارض!)',
  ];

  const handleSelectSuggestion = (name: string) => {
    setCurrentMedName(name);
    checkForAllergyConflict(name);
  };

  const checkForAllergyConflict = (medText: string) => {
    const isPenicillin =
      medText.includes('بنسلين') ||
      medText.toLowerCase().includes('penicillin') ||
      medText.toLowerCase().includes('augmentin') ||
      medText.includes('أوجمنتين');

    if (isPenicillin && activePatient.drugAllergies.some((a) => a.includes('البنسلين'))) {
      setAllergyConflictWarning(
        '⚠️ تعارض حرج وفوري: المريض لديه حساسية مفرطة مسجلة من البنسلين ومشتقاته! يمنع وصف هذا الدواء فوراً.'
      );
    } else {
      setAllergyConflictWarning('');
    }
  };

  const handleMedNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentMedName(val);
    checkForAllergyConflict(val);
  };

  const handleAddMedItem = () => {
    if (!currentMedName.trim() || !currentDose.trim()) return;
    setMedicines((prev) => [
      ...prev,
      {
        name: currentMedName.trim(),
        dose: currentDose.trim(),
        duration: currentDuration.trim() || 'علاج مستمر',
        instructions: currentInstructions.trim() || 'حسب الإرشادات',
      },
    ]);
    setCurrentMedName('');
    setCurrentDose('');
    setCurrentInstructions('');
    setAllergyConflictWarning('');
  };

  const handleRemoveMedItem = (index: number) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSignAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagnosis.trim() || medicines.length === 0) return;

    issueAndSignPrescription({
      diagnosis: `${diagnosis.trim()} (${icd10Code})`,
      icd10Code,
      medicines,
    });

    setSignSuccess('تم توقيع الروشتة رقمياً وترحيلها لحظياً لمحفظة المريض ومنبهاته بنجاح!');
    setTimeout(() => {
      setSignSuccess('');
      setDiagnosis('');
      setMedicines([]);
    }, 2500);
  };

  const handleUnlockSession = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockSessionWithCode(enteredOtp);
    if (!success) {
      setSessionError('كود OTP غير صحيح أو انتهت صلاحيته. يرجى مراجعة المريض.');
    } else {
      setSessionError('');
    }
  };

  // If session is locked by doctor gate
  if (!sessionUnlockedByDoctor) {
    return (
      <div className="py-12 max-w-xl mx-auto text-right">
        <div className="bg-white dark:bg-[#12241A] rounded-3xl p-8 border-2 border-[#2D8259] shadow-lg space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              بوابة فتح الجلسة (Session Gate)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2">
              إدخال كود OTP الخاص بالمريض أو مسح رمز QR Code لفك تشفير الملف وفتحه مؤقتاً لمدة 30 دقيقة.
            </p>
          </div>

          {sessionError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 text-red-700 text-xs rounded-xl">
              {sessionError}
            </div>
          )}

          <form onSubmit={handleUnlockSession} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 text-right">
                أدخل كود OTP المكون من 6 أرقام:
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="482915"
                className="w-full text-center font-mono text-3xl font-black tracking-widest py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] focus:border-[#2D8259]"
              />
              <span className="text-[11px] text-gray-400 mt-1 block text-right">
                (يمكنك استخدام الكود الظاهر في بوابة المريض أو الكود الافتراضي: 123456)
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#2D8259] hover:bg-[#236846] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>فتح الجلسة وفحص الملف الطبي</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right py-4">
      {/* 1. Critical Medical Alert Bar (شريط التنبيه الطبي الحرج) */}
      <div className="bg-red-50 dark:bg-red-950/40 border-2 border-red-400 dark:border-red-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-300">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded-sm">
                شريط التنبيه الطبي الحرج
              </span>
              <span className="text-xs font-bold text-red-900 dark:text-red-200">
                المريض: {activePatient.fullName} (فصيلة: {activePatient.bloodType})
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-red-700 dark:text-red-300 mt-1">
              تحذير فوري: المريض يعاني من {activePatient.drugAllergies.join(' و ')} — والأمراض المزمنة: {activePatient.chronicDiseases.join('، ')}.
            </p>
          </div>
        </div>

        <div className="shrink-0 text-left">
          <span className="text-[11px] font-mono font-bold bg-white dark:bg-[#12241A] px-3 py-1.5 rounded-xl border border-red-300 text-red-700 dark:text-red-400">
            جلسة مؤقتة نشطة (E2EE)
          </span>
        </div>
      </div>

      {/* 2. Main 2-Column Split: Right Column (History) & Left Column (Smart e-Rx) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Right Column: Unified Patient History (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2D8259] dark:text-[#78C79B]" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                العمود الأيمن: التاريخ المرضي الموحد
              </h3>
            </div>
            <span className="text-[11px] font-bold text-gray-500">كافة الجهات السابقة</span>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {medicalRecords.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-xl bg-[#FAFCFA] dark:bg-[#15281E] border border-gray-200 dark:border-gray-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">{rec.title}</span>
                  <span className="text-[10px] font-mono text-gray-400">{rec.date}</span>
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  <span className="text-[#2D8259] font-bold">المنشأة: </span>
                  {rec.facilityName} ({rec.governorate})
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  <span className="text-gray-500 font-semibold">التشخيص: </span>
                  {rec.diagnosis}
                </div>
                {rec.prescriptionItems && (
                  <div className="p-2 bg-white dark:bg-[#12241A] rounded-lg border border-gray-100 dark:border-gray-800 text-[11px] text-emerald-800 dark:text-emerald-300">
                    {rec.prescriptionItems.map((pi, idx) => (
                      <div key={idx}>• {pi.medicine} ({pi.dose})</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Left Column: Smart e-Rx Writer (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#12241A] rounded-3xl p-6 border-2 border-[#2D8259]/30 dark:border-[#1E3B2C] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-[#2D8259] dark:text-[#78C79B]" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                العمود الأيسر: محرر الروشتة الذكي المعتمد
              </h3>
            </div>
            <span className="text-xs font-bold text-[#2D8259] dark:text-[#78C79B] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>مختوم بختم {doctor.facilityName}</span>
            </span>
          </div>

          {signSuccess && (
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 font-bold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{signSuccess}</span>
            </div>
          )}

          {allergyConflictWarning && (
            <div className="p-3.5 bg-red-100 dark:bg-red-950/50 border-2 border-red-500 rounded-xl text-xs sm:text-sm text-red-900 dark:text-red-200 font-black flex items-center gap-2 animate-bounce">
              <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
              <span>{allergyConflictWarning}</span>
            </div>
          )}

          <form onSubmit={handleSignAndSend} className="space-y-4 text-xs sm:text-sm">
            {/* Diagnosis Input & ICD-10 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  كتابة التشخيص الطبي (نصي أو ترميز) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="مثال: ارتفاع ضغط الدم الأساسي ومتابعة دورية"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#2D8259]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  كود ICD-10 للترصد
                </label>
                <select
                  value={icd10Code}
                  onChange={(e) => setIcd10Code(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white font-mono font-bold focus:border-[#2D8259]"
                >
                  <option value="I10">I10 (ارتفاع ضغط الدم)</option>
                  <option value="E11">E11 (السكري النوع الثاني)</option>
                  <option value="J06.9">J06.9 (عدوى تنفسية حادة)</option>
                  <option value="J10">J10 (الإنفلونزا الموسمية)</option>
                  <option value="A09">A09 (النزلات المعوية الحادة)</option>
                </select>
              </div>
            </div>

            {/* Smart Suggestions Chips */}
            <div>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1.5">
                اقتراحات الأدوية الذكية السريعة:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 hover:bg-[#EBF5EF] hover:text-[#1B6B46] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Medication Entry Fields */}
            <div className="p-4 bg-[#F5F9F6] dark:bg-[#162E21] rounded-2xl border border-[#D5E7DC] dark:border-[#1E3B2C] space-y-3">
              <span className="font-bold text-gray-900 dark:text-white block text-xs">
                إضافة دواء جديد للروشتة:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    اسم الدواء والتركيز بحرية
                  </label>
                  <input
                    type="text"
                    value={currentMedName}
                    onChange={handleMedNameChange}
                    placeholder="مثال: لوسارتان 50 مجم"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    الجرعة وموعد التنبيه الأول
                  </label>
                  <input
                    type="text"
                    value={currentDose}
                    onChange={(e) => setCurrentDose(e.target.value)}
                    placeholder="قرص واحد صباحاً بعد الأكل"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    المدة العلاجية
                  </label>
                  <input
                    type="text"
                    value={currentDuration}
                    onChange={(e) => setCurrentDuration(e.target.value)}
                    placeholder="3 أشهر"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    إرشادات المريض
                  </label>
                  <input
                    type="text"
                    value={currentInstructions}
                    onChange={(e) => setCurrentInstructions(e.target.value)}
                    placeholder="شرب كميات كافية من الماء"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddMedItem}
                disabled={!currentMedName || !currentDose}
                className="w-full py-2 bg-white dark:bg-[#12241A] border border-[#2D8259] text-[#2D8259] dark:text-[#78C79B] hover:bg-[#2D8259] hover:text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
              >
                + إدراج هذا الدواء في الروشتة
              </button>
            </div>

            {/* List of Medicines in this Rx */}
            <div className="space-y-2">
              <span className="font-bold text-gray-800 dark:text-gray-200 block text-xs">
                الأدوية المدرجة بالروشتة الحالية ({medicines.length}):
              </span>
              {medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                      {med.name}
                    </span>
                    <span className="text-emerald-800 dark:text-emerald-400 text-[11px]">
                      {med.dose} • {med.duration} • {med.instructions}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedItem(idx)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Sign & Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={medicines.length === 0 || !diagnosis}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#2D8259] hover:bg-[#236846] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>توقيع الروشتة رقمياً وترحيلها لمحفظة المريض لحظياً</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
