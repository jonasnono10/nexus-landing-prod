import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GenShowcase from "@/components/GenShowcase";
import PricingSection from "@/components/PricingSection";
import GenDemoChat from "@/components/GenDemoChat";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <GenShowcase />
      <PricingSection />
      <GenDemoChat />


      {/* Footer simple placeholder */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© 2025 Nexus Army. Todos os direitos reservados.</p>
        <p className="mt-2">Inteligência Artificial para Negócios.</p>
      </footer>
    </main>
  );
}
