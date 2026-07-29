import Hero from "@/app/components/Hero";
import Tours from "@/app/components/Tours";
import Gallery from "@/app/components/Gallery";
import WhyUs from "@/app/components/WhyUs";
import Calendar from "@/app/components/Calendar";
import Reservation from "@/app/components/Reservation";

export default function Home() {
  return (
    <>
      <Hero />
      <Tours />
      <Gallery />
      <WhyUs />
      <Calendar />
      <Reservation />
    </>
  );
}
