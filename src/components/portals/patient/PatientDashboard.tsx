import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { CountdownCircle, CleanQRCode } from '../../common/CustomSVGIcons';
import {
  QrCode,
  RefreshCw,
  XCircle,
  CheckCircle2,
  Clock,
  Heart,
  AlertTriangle,
  Pill,
  ShieldCheck,
  User,
  ShieldAlert,
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const {
    activePatient,
    otpCode,
    sessionSecondsLeft,
    isSessionActive,
    refreshSessionCode,
    endSessionImmediately,
    todayDoses,
    toggleDoseTaken,
    setIsEmergencyCardOpen,
  } = useHealthWallet();

  const totalDoses = todayDoses.length;
  const takenDoses = todayDoses.filter((d) => d.isTakenToday).length;
  const adherencePercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  return (
    <div className="space-y-8 text-right py-4">
      {/* 3 Main Dashboard Cards in Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1: Temporary Session Code (QR / OTP) (4 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#12241A] rounded-3xl p-6 border-2 border-[#1B6B46]/30 dark:border-[#1E3B2C] shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] border border-[#CDE5D6] dark:border-[#224A35]">
                <QrCode className="w-3.5 h-3.5" />
                <span>رمز الجلسة المؤقت (QR / OTP)</span>
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                  isSessionActive
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                }`}
              >
                {isSessionActive ? 'الجلسة نشطة ومصرح بها' : 'الجلسة منتهية الصلاحية'}
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              صالح لمدة 30 دقيقة للجلسة الواحدة لتقديمه للطبيب، مع إمكانية سحب صلاحية الطبيب فوراً في أي لحظة.
            </p>

            {/* QR & Countdown Layout */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {/* QR Code */}
              <div className="shrink-0 flex flex-col items-center">
                <CleanQRCode value={`https://moh.gov.eg/wallet/session/${otpCode}`} size={120} />
                <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">مسح الـ QR بالطبيب</span>
              </div>

              {/* Countdown Circular Ring */}
              <div className="shrink-0 flex flex-col items-center">
                <CountdownCircle secondsLeft={sessionSecondsLeft} size={110} />
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">كود التحقق (OTP)</span>
                  <span className="font-mono text-2xl font-black tracking-widest text-[#1B6B46] dark:text-[#4EAD80]">
                    {otpCode.slice(0, 3)} {otpCode.slice(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <button
              onClick={refreshSessionCode}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>تحديث الكود (30 دقيقة جديدة)</span>
            </button>
            <button
              onClick={endSessionImmediately}
              className="py-2.5 px-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 border border-red-200 dark:border-red-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              title="سحب صلاحية الطبيب فوراً وإنهاء الجلسة"
            >
              <XCircle className="w-4 h-4" />
              <span>إنهاء الجلسة فوراً</span>
            </button>
          </div>
        </div>

        {/* Card 2: Today's Medication Doses (4 Cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] border border-[#CDE5D6] dark:border-[#224A35]">
                <Pill className="w-3.5 h-3.5" />
                <span>جرعات الأدوية اليوم</span>
              </span>
              <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] font-mono">
                الالتزام: {adherencePercent}%
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              تعرض أدوية اليوم ومواعيدها مع زر «تأكيد الجرعة ✔» لتسجيل الالتزام الدوائي وإشعار المرافق.
            </p>

            {/* Doses List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {todayDoses.map((dose) => (
                <div
                  key={dose.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    dose.isTakenToday
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60'
                      : 'bg-[#FAFCFA] dark:bg-[#162E21] border-[#E1EFE6] dark:border-[#1E3B2C]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {dose.medicationName}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                        {dose.strength}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <Clock className="w-3 h-3 text-[#1B6B46] dark:text-[#4EAD80]" />
                      <span>{dose.scheduledTime}</span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-[11px] text-gray-500">{dose.source}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDoseTaken(dose.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                      dose.isTakenToday
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-600 hover:text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{dose.isTakenToday ? 'تم أخذها' : 'تأكيد الجرعة ✔'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
            <span>تم تأكيد {takenDoses} من إجمالي {totalDoses} جرعات اليوم</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">مزامنة سحابية مشفرة</span>
          </div>
        </div>

        {/* Card 3: Vitals Summary Card (3 Cols) */}
        <div className="lg:col-span-3 bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] border border-[#CDE5D6] dark:border-[#224A35]">
                <Heart className="w-3.5 h-3.5" />
                <span>ملخص الحالة الحيوية</span>
              </span>
              <button
                onClick={() => setIsEmergencyCardOpen(true)}
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>بطاقة الطوارئ</span>
              </button>
            </div>

            <div className="space-y-3 pt-1">
              <div className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">الاسم الرباعي</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{activePatient.fullName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">فصيلة الدم</span>
                  <span className="text-base font-black text-red-600 dark:text-red-400 font-mono">
                    {activePatient.bloodType}
                  </span>
                </div>
                <div className="p-2.5 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl border border-gray-200 dark:border-gray-700">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 block">المحافظة</span>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{activePatient.governorate}</span>
                </div>
              </div>

              {/* Drug Allergies */}
              <div className="p-3 bg-red-50/70 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-300 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>تنبيه الحساسية الدوائية:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {activePatient.drugAllergies.map((a, i) => (
                    <span key={i} className="text-xs bg-red-600 text-white font-medium px-2 py-0.5 rounded-md">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chronic Diseases */}
              <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/60">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  الأمراض المزمنة المسجلة:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activePatient.chronicDiseases.map((d, i) => (
                    <span
                      key={i}
                      className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] font-mono text-gray-500 dark:text-gray-400 text-center">
            الرقم القومي: {activePatient.nationalId}
          </div>
        </div>
      </div>
    </div>
  );
};
