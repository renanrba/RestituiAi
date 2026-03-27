import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Metrics } from '../components/Metrics';
import { PlatformExplanation } from '../components/PlatformExplanation';
import { Profiles } from '../components/Profiles';
import { HowItWorks } from '../components/HowItWorks';
import { Documents } from '../components/Documents';
import { CoveredDiseases } from '../components/CoveredDiseases';
import { RestitutionCalculator } from '../components/RestitutionCalculator';
import { Testimonials } from '../components/Testimonials';
import { Blog } from '../components/Blog';
import { AboutUs } from '../components/AboutUs';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { LeadModal } from '../components/LeadModal';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <Hero onOpenModal={() => setIsModalOpen(true)} />
      <PlatformExplanation />
      <Profiles />
      <CoveredDiseases />
      <RestitutionCalculator onOpenModal={() => setIsModalOpen(true)} />
      <Metrics />
      <HowItWorks />
      <Testimonials />
      <Documents />
      <Blog />
      <AboutUs />
      <FAQ />
      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
