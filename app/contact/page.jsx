import ContactHero from "@/components/contact/ContactHero";
import InteractiveContactForm from "@/components/contact/InteractiveContactForm";
import PremiumFooter from "@/components/PremiumFooter";
import Navbar from "@/components/Navbar";


export const metadata = {
    title: "Contact Us | RecentureSoft",
    description: "Get in touch with our team to start your next enterprise project.",
};

export default function ContactPage() {
    return (
        <main className="bg-slate-50 dark:bg-[#020617] transition-colors duration-300 min-h-[auto] lg:min-h-screen overflow-x-hidden">
            <Navbar />
            <ContactHero />

            <InteractiveContactForm />

            <PremiumFooter />
        </main>
    );
}
