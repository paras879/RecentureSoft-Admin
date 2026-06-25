import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeSectionsContainer from "@/components/HomeSectionsContainer";

export default async function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <HomeSectionsContainer />
      </main>
    </>
  );
}