import React from 'react';
import { useHealthWallet } from '../../context/HealthWalletContext';
import { PatientTab, DoctorTab, MoHTab } from '../../types';
import { EGYPT_GOVERNORATES } from '../../data/mockData';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Users,
  ShieldAlert,
  History,
  Stethoscope,
  Building,
  Archive,
  Award,
  Activity,
  UserCheck,
  CheckCircle,
  MapPin,
  QrCode,
  UserPlus,
  RefreshCw,
  Compass,
} from 'lucide-react';

export const SubNavbar: React.FC = () => {
  const {
    activePortal,
    patientTab,
    setPatientTab,
    doctorTab,
    setDoctorTab,
    mohTab,
    setMohTab,
    patients,
    activePatient,
    switchActivePatient,
    setIsRegistrationModalOpen,
    setIsEmergencyCardOpen,
    refreshSessionCode,
    doctor,
    updateDoctorLocation,
  } = useHealthWallet();

  const [isChangingLocation, setIsChangingLocation] = React.useState(false);
  const [selectedGov, setSelectedGov] = React.useState(doctor.governorate);
  const [selectedFacilityType, setSelectedFacilityType] = React.useState(doctor.facilityType);
  const [selectedFacilityName, setSelectedFacilityName] = React.useState(doctor.facilityName);

  // MoH filter
  const [mohGovernorateFilter, setMohGovernorateFilter] = React.useState('جميع المحافظات (27 محافظة)');

  const patientTabsConfig = [
    { id: 'dashboard', label: '1. لوحة المتابعة الرئيسية', icon: LayoutDashboard },
    { id: 'records', label: '2. السجل الطبي الموحد', icon: FileText },
    { id: 'meds', label: '3. أدويتي وإعدادات التنبيهات', icon: Bell },
    { id: 'family', label: '4. المرضى والمرافق العائلي', icon: Users },
    { id: 'audit', label: '5. سجل الخصوصية والوصول', icon: History },
  ] as const;

  const doctorTabsConfig = [
    { id: 'consultation', label: '1. شاشة الكشف والروشتة', icon: Stethoscope },
    { id: 'facility', label: '2. المحافظة وجهة العمل', icon: Building },
    { id: 'issued-rx', label: '3. أرشيف الروشتات الصادرة', icon: Archive },
    { id: 'credentials', label: '4. حالة الاعتماد والوثائق', icon: Award },
  ] as const;

  const mohTabsConfig = [
    { id: 'epidemiology', label: '1. الترصد الوبائي اللحظي', icon: Activity },
    { id: 'physicians', label: '2. مركز اعتماد الأطباء والحوكمة', icon: UserCheck },
    { id: 'facilities', label: '3. المنشآت والتدقيق الأمني', icon: Building },
  ] as const;

  const overviewAnchors = [
    { href: '#philosophy', label: 'الفلسفة المعمارية' },
    { href: '#visual-identity', label: 'الهوية البصرية' },
    { href: '#portals', label: 'البوابات الثلاث' },
    { href: '#public-tools', label: 'الخدمات العامة' },
    { href: '#end-to-end-flow', label: 'دورة التكامل اللحظي' },
    { href: '#security', label: 'الأمان والتشفير' },
  ];

  const handleSaveLocation = () => {
    updateDoctorLocation(selectedGov, selectedFacilityType, selectedFacilityName);
    setIsChangingLocation(false);
  };

  return (
    <div className="sticky top-20 z-30 w-full bg-[#F5F9F6] dark:bg-[#0E1F17] border-b border-[#E1EFE6] dark:border-[#1E3B2C] shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===================== PATIENT PORTAL SUB-NAVBAR & TOP BAR ===================== */}
        {activePortal === 'patient' && (
          <div className="py-2.5 space-y-2">
            {/* Patient Contextual Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#13261C] px-4 py-2.5 rounded-xl border border-[#D5E7DC] dark:border-[#1E3B2C]">
              {/* Profile Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">
                  الملف النشط:
                </span>
                <select
                  value={activePatient.id}
                  onChange={(e) => switchActivePatient(e.target.value)}
                  className="bg-[#F5F9F6] dark:bg-[#1A3326] text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] py-1.5 px-3 rounded-lg border border-[#CDE5D6] dark:border-[#2E543F] focus:border-[#1B6B46]"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.relationship})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setIsRegistrationModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-[#EBF5EF] dark:bg-[#1E3B2C] text-[#1B6B46] dark:text-[#78C79B] hover:bg-[#DEEFE5] text-xs font-bold flex items-center gap-1 border border-[#CDE5D6] dark:border-[#2E543F] transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>إضافة مريض جديد</span>
                </button>

                <button
                  onClick={refreshSessionCode}
                  className="px-3 py-1.5 rounded-lg bg-[#1B6B46] text-white hover:bg-[#155336] text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                  title="توليد كود QR / OTP مؤقت جديد لتقديمه للطبيب"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>توليد كود QR/OTP للطبيب</span>
                </button>

                <button
                  onClick={() => setIsEmergencyCardOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>بطاقة الطوارئ</span>
                </button>
              </div>
            </div>

            {/* Horizontal Sub-Navbar Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {patientTabsConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = patientTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPatientTab(tab.id as PatientTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#1B6B46] text-white shadow-2xs'
                        : 'bg-white dark:bg-[#13261C] text-[#4B5563] dark:text-[#A3BFB0] border border-[#E1EFE6] dark:border-[#1E3B2C] hover:border-[#1B6B46] hover:text-[#1B6B46]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== DOCTOR PORTAL SUB-NAVBAR & TOP BAR ===================== */}
        {activePortal === 'doctor' && (
          <div className="py-2.5 space-y-2">
            {/* Doctor Contextual Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#13261C] px-4 py-2.5 rounded-xl border border-[#D5E7DC] dark:border-[#1E3B2C]">
              {/* Doctor Identity & Accreditation */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {doctor.name}
                </span>
                <span className="text-xs text-[#2D8259] dark:text-[#78C79B] font-medium">
                  ({doctor.specialty})
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle className="w-3 h-3" />
                  <span>معتمد من وزارة الصحة</span>
                </span>
              </div>

              {/* Active Facility & Governorate */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F5F9F6] dark:bg-[#1A3326] rounded-lg border border-[#CDE5D6] dark:border-[#2E543F]">
                  <MapPin className="w-3.5 h-3.5 text-[#1B6B46] dark:text-[#4EAD80]" />
                  <span className="font-bold text-gray-800 dark:text-gray-200">
                    {doctor.governorate} — {doctor.facilityType}: {doctor.facilityName}
                  </span>
                </div>
                <button
                  onClick={() => setIsChangingLocation((p) => !p)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#1B6B46] dark:text-[#78C79B] hover:underline"
                >
                  {isChangingLocation ? 'إغلاق' : 'تغيير الموقع'}
                </button>
              </div>
            </div>

            {/* Change Location Drawer */}
            {isChangingLocation && (
              <div className="p-4 bg-[#EBF5EF] dark:bg-[#162E21] rounded-xl border border-[#CDE5D6] dark:border-[#2E543F] grid grid-cols-1 sm:grid-cols-4 gap-3 animate-in fade-in duration-200">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">المحافظة</label>
                  <select
                    value={selectedGov}
                    onChange={(e) => setSelectedGov(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700"
                  >
                    {EGYPT_GOVERNORATES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">نوع المنشأة</label>
                  <select
                    value={selectedFacilityType}
                    onChange={(e) => setSelectedFacilityType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700"
                  >
                    <option value="مستشفى حكومي">مستشفى حكومي</option>
                    <option value="مستشفى خاص">مستشفى خاص</option>
                    <option value="عيادة خاصة">عيادة خاصة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">اسم المنشأة الطبية</label>
                  <input
                    type="text"
                    value={selectedFacilityName}
                    onChange={(e) => setSelectedFacilityName(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSaveLocation}
                    className="w-full py-2 bg-[#1B6B46] text-white text-xs font-bold rounded-lg hover:bg-[#155336]"
                  >
                    حفظ موقع العمل
                  </button>
                </div>
              </div>
            )}

            {/* Horizontal Sub-Navbar Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {doctorTabsConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = doctorTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDoctorTab(tab.id as DoctorTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#2D8259] text-white shadow-2xs'
                        : 'bg-white dark:bg-[#13261C] text-[#4B5563] dark:text-[#A3BFB0] border border-[#E1EFE6] dark:border-[#1E3B2C] hover:border-[#2D8259] hover:text-[#2D8259]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== MOH PORTAL SUB-NAVBAR & TOP BAR ===================== */}
        {activePortal === 'moh' && (
          <div className="py-2.5 space-y-2">
            {/* MoH Contextual Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#13261C] px-4 py-2.5 rounded-xl border border-[#D5E7DC] dark:border-[#1E3B2C]">
              {/* MoH Operations Header */}
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-black text-[#1B6B46] dark:text-[#4EAD80]">
                  غرفة القيادة المركزية والحوكمة الصحية — وزارة الصحة والسكان
                </span>
              </div>

              {/* Nationwide Governorate Filter */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  نطاق التصفية:
                </label>
                <select
                  value={mohGovernorateFilter}
                  onChange={(e) => setMohGovernorateFilter(e.target.value)}
                  className="bg-[#F5F9F6] dark:bg-[#1A3326] text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] py-1.5 px-3 rounded-lg border border-[#CDE5D6] dark:border-[#2E543F] focus:border-[#1B6B46]"
                >
                  <option value="جميع المحافظات (27 محافظة)">كل محافظات الجمهورية (27 محافظة)</option>
                  {EGYPT_GOVERNORATES.map((g) => (
                    <option key={g} value={g}>
                      محافظة {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Horizontal Sub-Navbar Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {mohTabsConfig.map((tab) => {
                const Icon = tab.icon;
                const isActive = mohTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMohTab(tab.id as MoHTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#43936B] text-white shadow-2xs'
                        : 'bg-white dark:bg-[#13261C] text-[#4B5563] dark:text-[#A3BFB0] border border-[#E1EFE6] dark:border-[#1E3B2C] hover:border-[#43936B] hover:text-[#43936B]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== OVERVIEW SUB-NAVBAR ===================== */}
        {activePortal === 'overview' && (
          <div className="py-2.5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-[#1B6B46] dark:text-[#4EAD80] flex items-center gap-1 shrink-0 ml-2">
                <Compass className="w-3.5 h-3.5" />
                <span>أقسام الوثيقة:</span>
              </span>
              {overviewAnchors.map((anchor) => (
                <a
                  key={anchor.href}
                  href={anchor.href}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#13261C] text-[#4B5563] dark:text-[#A3BFB0] border border-[#E1EFE6] dark:border-[#1E3B2C] hover:border-[#1B6B46] hover:text-[#1B6B46] dark:hover:text-white whitespace-nowrap transition-colors"
                >
                  {anchor.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
