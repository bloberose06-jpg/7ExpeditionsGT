import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Tours from "@/app/components/Tours";
import Gallery from "@/app/components/Gallery";
import WhyUs from "@/app/components/WhyUs";
import Calendar from "@/app/components/Calendar";
import Reservation from "@/app/components/Reservation";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Tours />
        <Gallery />
        <WhyUs />
        <Calendar />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
