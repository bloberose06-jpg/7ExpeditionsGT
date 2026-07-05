import Header from "./components/Header";
import Hero from "./components/Hero";
import Tours from "./components/Tours";
import Gallery from "./components/Gallery";
import WhyUs from "./components/WhyUs";
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
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
