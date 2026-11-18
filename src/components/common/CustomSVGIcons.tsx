import React from 'react';

// Custom SVG: Hospital Icon
export const HospitalIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-7 h-7 text-[#1B6B46]',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="6" width="26" height="23" rx="3" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.08" />
    <path d="M16 11V19M12 15H20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    <rect x="7" y="22" width="4" height="7" fill="currentColor" />
    <rect x="21" y="22" width="4" height="7" fill="currentColor" />
    <rect x="14" y="23" width="4" height="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

// Custom SVG: Doctor Stethoscope Icon
export const DoctorIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-7 h-7 text-[#2D8259]',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="16" cy="9" r="5" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.1" />
    <path
      d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M13 22V24C13 25.6569 14.3431 27 16 27C17.6569 27 19 25.6569 19 24V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="16" cy="28.5" r="1.5" fill="currentColor" />
  </svg>
);

// Custom SVG: Patient Wallet Icon
export const PatientWalletIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-7 h-7 text-[#1B6B46]',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="7" width="26" height="20" rx="3.5" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.08" />
    <path d="M3 12H29" stroke="currentColor" strokeWidth="2" />
    <circle cx="21" cy="19" r="2.5" stroke="currentColor" strokeWidth="2" fill="#FFFFFF" />
    <path d="M8 19H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Custom SVG: Security Shield Icon
export const ShieldSecurityIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-7 h-7 text-[#1B6B46]',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M16 4L6 8V15C6 21.6 10.3 27.8 16 29C21.7 27.8 26 21.6 26 15V8L16 4Z"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.08"
    />
    <path d="M12 16L15 19L20 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Custom SVG: ECG Heart Pulse Line
export const ECGPulseLine: React.FC<{ className?: string; width?: number; height?: number }> = ({
  className = 'text-[#2D8259]',
  width = 300,
  height = 50,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 300 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M0 25H60L70 12L80 38L95 5L110 45L125 18L135 30L145 25H300"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-ecg"
    />
  </svg>
);

// Custom SVG: Circular Countdown Progress Ring for 30 min session
export const CountdownCircle: React.FC<{
  secondsLeft: number;
  totalSeconds?: number;
  size?: number;
}> = ({ secondsLeft, totalSeconds = 1800, size = 110 }) => {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  const strokeDashoffset = circumference - progressRatio * circumference;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isCritical = secondsLeft < 300; // less than 5 minutes

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2EDE6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isCritical ? '#DC2626' : '#2D8259'}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span
          className={`font-mono font-bold text-lg leading-none ${
            isCritical ? 'text-red-600 dark:text-red-400' : 'text-[#1B6B46] dark:text-[#4EAD80]'
          }`}
        >
          {formattedTime}
        </span>
        <span className="text-[11px] text-[#6B7280] dark:text-[#A3BFB0] mt-0.5">متبقي للجلسة</span>
      </div>
    </div>
  );
};

// Custom SVG: Realistic Clean QR Code Representation
export const CleanQRCode: React.FC<{ value: string; size?: number }> = ({ value, size = 130 }) => (
  <div
    className="bg-white p-3 rounded-xl border-2 border-[#D3E8DC] inline-flex items-center justify-center shadow-xs"
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 100 100" width="100%" height="100%" fill="#1B6B46">
      {/* Top Left Finder */}
      <rect x="5" y="5" width="28" height="28" rx="4" fill="none" stroke="#1B6B46" strokeWidth="6" />
      <rect x="13" y="13" width="12" height="12" rx="2" fill="#1B6B46" />

      {/* Top Right Finder */}
      <rect x="67" y="5" width="28" height="28" rx="4" fill="none" stroke="#1B6B46" strokeWidth="6" />
      <rect x="75" y="13" width="12" height="12" rx="2" fill="#1B6B46" />

      {/* Bottom Left Finder */}
      <rect x="5" y="67" width="28" height="28" rx="4" fill="none" stroke="#1B6B46" strokeWidth="6" />
      <rect x="13" y="75" width="12" height="12" rx="2" fill="#1B6B46" />

      {/* Data Dots Representation */}
      <rect x="38" y="10" width="6" height="6" rx="1" />
      <rect x="48" y="10" width="6" height="6" rx="1" />
      <rect x="58" y="10" width="6" height="6" rx="1" />
      <rect x="38" y="22" width="6" height="6" rx="1" />
      <rect x="50" y="24" width="6" height="6" rx="1" />

      <rect x="10" y="38" width="6" height="6" rx="1" />
      <rect x="22" y="38" width="6" height="6" rx="1" />
      <rect x="34" y="38" width="6" height="6" rx="1" />
      <rect x="46" y="38" width="6" height="6" rx="1" />
      <rect x="58" y="38" width="6" height="6" rx="1" />
      <rect x="70" y="38" width="6" height="6" rx="1" />
      <rect x="82" y="38" width="6" height="6" rx="1" />

      <rect x="38" y="50" width="8" height="8" rx="1" />
      <rect x="52" y="50" width="6" height="6" rx="1" />
      <rect x="64" y="50" width="6" height="6" rx="1" />
      <rect x="78" y="50" width="6" height="6" rx="1" />

      <rect x="38" y="66" width="6" height="6" rx="1" />
      <rect x="48" y="66" width="6" height="6" rx="1" />
      <rect x="62" y="66" width="8" height="8" rx="1" />
      <rect x="78" y="66" width="6" height="6" rx="1" />

      <rect x="38" y="80" width="6" height="6" rx="1" />
      <rect x="50" y="80" width="8" height="8" rx="1" />
      <rect x="68" y="80" width="6" height="6" rx="1" />
      <rect x="82" y="80" width="8" height="8" rx="1" />
    </svg>
  </div>
);
