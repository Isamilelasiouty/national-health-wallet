import React from 'react';
import { HealthWalletProvider, useHealthWallet } from './context/HealthWalletContext';
import { Header } from './components/layout/Header';
import { SubNavbar } from './components/layout/SubNavbar';
import { Footer } from './components/layout/Footer';
import { MobileFrame } from './components/layout/MobileFrame';

// Modals
import { PatientRegistrationModal } from './components/modals/PatientRegistrationModal';
import { EmergencyCardModal } from './components/modals/EmergencyCardModal';
import { DoctorVerificationModal } from './components/modals/DoctorVerificationModal';

// Overview Sections
import { HeroSection } from './components/portals/overview/HeroSection';
import { PhilosophyAndIdentity } from './components/portals/overview/PhilosophyAndIdentity';
import { PublicToolsSection } from './components/portals/overview/PublicToolsSection';
import { EndToEndFlowSection } from './components/portals/overview/EndToEndFlowSection';
import { SecuritySection } from './components/portals/overview/SecuritySection';

// Patient Portal Tabs
import { PatientDashboard } from './components/portals/patient/PatientDashboard';
import { UnifiedMedicalRecord } from './components/portals/patient/UnifiedMedicalRecord';
import { MedsAndAlertSettings } from './components/portals/patient/MedsAndAlertSettings';
import { FamilyCompanion } from './components/portals/patient/FamilyCompanion';
import { TransparencyAuditLog } from './components/portals/patient/TransparencyAuditLog';

// Doctor Portal Tabs
import { ConsultationAndRx } from './components/portals/doctor/ConsultationAndRx';
import { GovernorateAndFacility } from './components/portals/doctor/GovernorateAndFacility';
import { IssuedPrescriptions } from './components/portals/doctor/IssuedPrescriptions';
import { CredentialsAndVerification } from './components/portals/doctor/CredentialsAndVerification';

// MoH Portal Tabs
import { EpidemiologicalDashboard } from './components/portals/moh/EpidemiologicalDashboard';
import { PhysicianVerificationHub } from './components/portals/moh/PhysicianVerificationHub';
import { FacilitiesAndSecurityAudit } from './components/portals/moh/FacilitiesAndSecurityAudit';

const MainContent: React.FC = () => {
  const { activePortal, patientTab, doctorTab, mohTab } = useHealthWallet();

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors">
      <div>
        <Header />
        <SubNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 1. Overview & Full Platform Blueprint */}
          {activePortal === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <HeroSection />
              <PhilosophyAndIdentity />
              <PublicToolsSection />
              <EndToEndFlowSection />
              <SecuritySection />
            </div>
          )}

          {/* 2. Patient Portal Tabs */}
          {activePortal === 'patient' && (
            <div className="animate-in fade-in duration-300">
              {patientTab === 'dashboard' && <PatientDashboard />}
              {patientTab === 'records' && <UnifiedMedicalRecord />}
              {patientTab === 'meds' && <MedsAndAlertSettings />}
              {patientTab === 'family' && <FamilyCompanion />}
              {patientTab === 'audit' && <TransparencyAuditLog />}
            </div>
          )}

          {/* 3. Doctor Portal Tabs */}
          {activePortal === 'doctor' && (
            <div className="animate-in fade-in duration-300">
              {doctorTab === 'consultation' && <ConsultationAndRx />}
              {doctorTab === 'facility' && <GovernorateAndFacility />}
              {doctorTab === 'issued-rx' && <IssuedPrescriptions />}
              {doctorTab === 'credentials' && <CredentialsAndVerification />}
            </div>
          )}

          {/* 4. MoH Portal Tabs */}
          {activePortal === 'moh' && (
            <div className="animate-in fade-in duration-300">
              {mohTab === 'epidemiology' && <EpidemiologicalDashboard />}
              {mohTab === 'physicians' && <PhysicianVerificationHub />}
              {mohTab === 'facilities' && <FacilitiesAndSecurityAudit />}
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* Global Modals */}
      <PatientRegistrationModal />
      <EmergencyCardModal />
      <DoctorVerificationModal />
    </div>
  );
};

export default function App() {
  return (
    <HealthWalletProvider>
      <MobileFrame>
        <MainContent />
      </MobileFrame>
    </HealthWalletProvider>
  );
}
