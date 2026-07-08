import Header from "./components/Header";
import Hero from "./components/Hero";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import WhyUs from "./components/WhyUs";
import Calendar from "./components/Calendar"; // 👈 1. IMPORTA EL COMPONENTE AQUÍ
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Tours />
        <Gallery />
        <WhyUs />
        
        <Calendar /> {/* 👈 2. RENDERÍZALO AQUÍ (justo antes o después de WhyUs / Galería) */}
        
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
