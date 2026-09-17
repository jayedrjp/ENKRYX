import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Services from "../components/Services";
import WhyChoose from "../components/WhyChoose";
import HowWeWork from "../components/HowWeWork";
import Portfolio from "../components/Portfolio";
import Team from "../components/Team";
import Testimonials from "../components/Testimonials";
import FAQAccordion from "../components/FAQAccordion";
import FinalCTA from "../components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <WhyChoose />
      <HowWeWork />
      <Portfolio />
      <Team />
      <Testimonials />
      <FAQAccordion />
      <FinalCTA />
    </>
  );
}

