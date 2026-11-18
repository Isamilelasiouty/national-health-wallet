import React from 'react';
import { useHealthWallet } from '../../../context/HealthWalletContext';
import { Users, UserPlus, Heart, Pill, MapPin, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export const FamilyCompanion: React.FC = () => {
  const { patients, activePatient, switchActivePatient, setPatientTab, setIsRegistrationModalOpen } =
    useHealthWallet();

  const handleOpenWallet = (patientId: string) => {
    switchActivePatient(patientId);
    setPatientTab('dashboard');
  };

  return (
    <div className="space-y-6 text-right py-4">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#12241A] p-6 rounded-3xl border border-[#E1EFE6] dark:border-[#1E3B2C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#4EAD80] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white">
              المرضى والمرافق العائلي (Family Companion)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              إدارة محافظ الأسرة (كبار السن والأطفال) ومتابعة مواعيد أدويتهم وحالاتهم الحيوية
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsRegistrationModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#1B6B46] hover:bg-[#155336] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>إضافة فرد جديد للأسرة</span>
        </button>
      </div>

      {/* Grid of Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => {
          const isActive = patient.id === activePatient.id;
          return (
            <div
              key={patient.id}
              className={`bg-white dark:bg-[#12241A] rounded-2xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
                isActive
                  ? 'border-2 border-[#1B6B46] ring-2 ring-[#1B6B46]/20 shadow-md'
                  : 'border-[#E1EFE6] dark:border-[#1E3B2C] shadow-xs hover:border-[#2D8259]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#1B6B46] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {patient.relationship}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900">
                    {patient.bloodType}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {patient.fullName}
                  </h4>
                  <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                    الرقم القومي: {patient.nationalId}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>المحافظة: {patient.governorate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-[#1B6B46] dark:text-[#4EAD80]" />
                    <span>عدد الأدوية النشطة: {patient.activeMedsCount} أدوية</span>
                  </div>
                </div>

                {/* Chronic Condition pill */}
                {patient.chronicDiseases.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] text-gray-400 block mb-1">الحالة الصحية:</span>
                    <div className="flex flex-wrap gap-1">
                      {patient.chronicDiseases.map((d, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-[#EBF5EF] dark:bg-[#162E21] text-[#1B6B46] dark:text-[#78C79B] px-2 py-0.5 rounded-md font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                {isActive ? (
                  <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] bg-[#EBF5EF] dark:bg-[#162E21] rounded-xl">
                    <CheckCircle className="w-4 h-4" />
                    <span>الملف النشط حالياً للمنظومة</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenWallet(patient.id)}
                    className="w-full py-2.5 px-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-[#1B6B46] hover:bg-[#EBF5EF] dark:hover:bg-[#162E21] text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>فتح محفظة الفرد وإدارتها</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
