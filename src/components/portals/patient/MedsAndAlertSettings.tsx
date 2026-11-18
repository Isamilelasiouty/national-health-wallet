import React, { useState } from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import {
  Bell,
  PlusCircle,
  CheckCircle,
  Trash2,
  Sliders,
  MessageSquare,
  Clock,
  Pill,
  ShieldCheck,
  AlertCircle,
  Users,
} from 'lucide-react';

export const MedsAndAlertSettings: React.FC = () => {
  const {
    activeMeds,
    addManualMedication,
    confirmMedication,
    deleteMedication,
    alertSettings,
    updateAlertSettings,
  } = useHealthWallet();

  // Manual medication form state
  const [medName, setMedName] = useState('');
  const [strength, setStrength] = useState('');
  const [dose, setDose] = useState('');
  const [alarmTime, setAlarmTime] = useState('08:00');
  const [duration, setDuration] = useState('شهر واحد');
  const [formSuccess, setFormSuccess] = useState('');

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim() || !dose.trim()) return;

    addManualMedication({
      name: medName.trim(),
      strength: strength.trim() || 'حسب الرغبة',
      dose: dose.trim(),
      dailyAlarmTime: alarmTime,
      duration: duration.trim(),
    });

    setFormSuccess('تمت إضافة الدواء بنجاح إلى جدول الأدوية المفعلة والمنبه اليومي.');
    setTimeout(() => {
      setFormSuccess('');
      setMedName('');
      setStrength('');
      setDose('');
    }, 2000);
  };

  return (
    <div className="space-y-8 text-right py-4">
      {/* 2-Column Top Section: Manual Add Form + Alert Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add Medication Manually (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                إضافة الأدوية يدوياً
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                إضافة أي دواء أو فيتامين تتناوله بنفسك ليُضاف فوراً لجدول التنبيهات
              </p>
            </div>
          </div>

          {formSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          <form onSubmit={handleAddMed} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  اسم الدواء أو الفيتامين <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder="مثال: فيتامين د3 أو بنادول"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#1B6B46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  التركيز (اختياري)
                </label>
                <input
                  type="text"
                  value={strength}
                  onChange={(e) => setStrength(e.target.value)}
                  placeholder="مثال: 1000 وحدة دولية أو 500 مجم"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#1B6B46]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  الجرعة المقررة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  placeholder="قرص واحد بعد الإفطار"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#1B6B46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  وقت المنبه اليومي
                </label>
                <input
                  type="time"
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#1B6B46]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  المدة العلاجية
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="مثال: شهر أو مستمر"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-[#FAFCFA] dark:bg-[#162E21] text-gray-900 dark:text-white focus:border-[#1B6B46]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إدراج في جدول الأدوية وتفعيل المنبه</span>
            </button>
          </form>
        </div>

        {/* Panel: Alert Settings (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#2D8259] dark:text-[#78C79B] flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                لوحة إعدادات التنبيهات
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                التحكم في وقت التذكير وقنوات الرسائل وإشعار المرافق
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Advance Notice Minutes */}
            <div className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between gap-3">
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">
                  وقت التذكير المسبق بالجرعة
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  تلقي الإشعار قبل موعد تناول الجواء
                </span>
              </div>
              <div className="flex items-center gap-1">
                {(['0', '10', '15', '30'] as const).map((mins) => (
                  <button
                    key={mins}
                    onClick={() => updateAlertSettings({ reminderAdvanceMinutes: mins })}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      alertSettings.reminderAdvanceMinutes === mins
                        ? 'bg-[#1B6B46] text-white'
                        : 'bg-white dark:bg-[#12241A] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {mins === '0' ? 'في الموعد' : `${mins} د`}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle SMS & WhatsApp */}
            <div className="grid grid-cols-2 gap-3">
              <label className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  تفعيل تنبيهات SMS
                </span>
                <input
                  type="checkbox"
                  checked={alertSettings.enableSms}
                  onChange={(e) => updateAlertSettings({ enableSms: e.target.checked })}
                  className="w-4 h-4 text-[#1B6B46] rounded-sm focus:ring-[#1B6B46]"
                />
              </label>

              <label className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  تفعيل تنبيهات واتساب
                </span>
                <input
                  type="checkbox"
                  checked={alertSettings.enableWhatsApp}
                  onChange={(e) => updateAlertSettings({ enableWhatsApp: e.target.checked })}
                  className="w-4 h-4 text-[#1B6B46] rounded-sm focus:ring-[#1B6B46]"
                />
              </label>
            </div>

            {/* Companion Alert on Missed Dose */}
            <label className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between cursor-pointer">
              <div className="space-y-0.5">
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs block">
                  إشعار المرافق العائلي تلقائياً عند نسيان جرعة
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  إرسال رسالة تنبيه للمرافق عند مرور 45 دقيقة دون تأكيد الجرعة
                </span>
              </div>
              <input
                type="checkbox"
                checked={alertSettings.notifyCompanionOnMissedDose}
                onChange={(e) =>
                  updateAlertSettings({ notifyCompanionOnMissedDose: e.target.checked })
                }
                className="w-4 h-4 text-[#1B6B46] rounded-sm focus:ring-[#1B6B46]"
              />
            </label>

            {/* Upcoming Consultation & Immediate File Access Notification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  تنبيه الاستشارة القادمة
                </span>
                <input
                  type="checkbox"
                  checked={alertSettings.notifyUpcomingConsultation}
                  onChange={(e) =>
                    updateAlertSettings({ notifyUpcomingConsultation: e.target.checked })
                  }
                  className="w-4 h-4 text-[#1B6B46] rounded-sm focus:ring-[#1B6B46]"
                />
              </label>

              <label className="p-3 bg-[#F5F9F6] dark:bg-[#162E21] rounded-xl flex items-center justify-between cursor-pointer">
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-xs">
                  تنبيه فوري عند فتح الملف
                </span>
                <input
                  type="checkbox"
                  checked={alertSettings.notifyImmediateFileAccess}
                  onChange={(e) =>
                    updateAlertSettings({ notifyImmediateFileAccess: e.target.checked })
                  }
                  className="w-4 h-4 text-[#1B6B46] rounded-sm focus:ring-[#1B6B46]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Active Medications */}
      <div className="bg-white dark:bg-[#12241A] rounded-3xl p-6 border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#1B6B46] dark:text-[#4EAD80]" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              جدول الأدوية المفعلة (روشتة طبيب vs إضافة شخصية)
            </h3>
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            إجمالي الأدوية النشطة: {activeMeds.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F5F9F6] dark:bg-[#162E21] text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-4 font-bold">اسم الدواء والتركيز</th>
                <th className="py-3 px-4 font-bold">الجرعة المحددة</th>
                <th className="py-3 px-4 font-bold">وقت المنبه</th>
                <th className="py-3 px-4 font-bold">المصدر</th>
                <th className="py-3 px-4 font-bold">المدة</th>
                <th className="py-3 px-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {activeMeds.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50/70 dark:hover:bg-[#152B1E] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                    <div>{med.name}</div>
                    <span className="text-[11px] font-normal text-gray-500 dark:text-gray-400">
                      {med.strength}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300 font-medium">
                    {med.dose}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#1B6B46] dark:text-[#4EAD80]">
                    {med.dailyAlarmTime}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        med.source === 'روشتة طبيب'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                      }`}
                    >
                      {med.source}
                    </span>
                    {med.doctorName && (
                      <span className="text-[11px] text-gray-400 block mt-0.5">{med.doctorName}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{med.duration}</td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => confirmMedication(med.id)}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                        title="تأكيد التفعيل"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMedication(med.id)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="حذف من الجدول"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
