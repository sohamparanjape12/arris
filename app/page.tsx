import Contact from "@/components/Contact";
import Details from "@/components/Details";
import Directory from "@/components/Directory";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Office from "@/components/Office";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <Hero />
      <Directory />
      <Manifesto />
      <Details />
      <Office />
      <Contact />
      <Footer />
    </div>
  );
}
