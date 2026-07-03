import React, { useState, createContext, useContext } from "react";
import Navbar from "../components/bms/Navbar";
import LiveTicker from "../components/bms/LiveTicker";
import Hero from "../components/bms/Hero";
import ControlCenter from "../components/bms/ControlCenter";
import BentoFeatures from "../components/bms/BentoFeatures";
import AIWorkflow from "../components/bms/AIWorkflow";
import Comparison from "../components/bms/Comparison";
import HowItWorks from "../components/bms/HowItWorks";
import Analytics from "../components/bms/Analytics";
import Security from "../components/bms/Security";
import Integrations from "../components/bms/Integrations";
import Benefits from "../components/bms/Benefits";
import Ecosystem from "../components/bms/Ecosystem";
import CTASection from "../components/bms/CTASection";
import Footer from "../components/bms/Footer";
import DemoDialog from "../components/bms/DemoDialog";

export const DemoDialogContext = createContext({ open: () => {} });
export const useDemoDialog = () => useContext(DemoDialogContext);

export default function BMSLanding() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [intent, setIntent] = useState("demo");

  const open = (nextIntent = "demo") => {
    setIntent(nextIntent);
    setDialogOpen(true);
  };

  return (
    <DemoDialogContext.Provider value={{ open }}>
      <div className="relative min-h-screen bg-[#06080D] text-white overflow-x-hidden" data-testid="bms-landing">
        <Navbar />
        <LiveTicker />
        <main>
          <Hero />
          <ControlCenter />
          <BentoFeatures />
          <AIWorkflow />
          <Comparison />
          <HowItWorks />
          <Analytics />
          <Security />
          <Integrations />
          <Benefits />
          <Ecosystem />
          <CTASection />
        </main>
        <Footer />
        <DemoDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          intent={intent}
        />
      </div>
    </DemoDialogContext.Provider>
  );
}
