import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { AboutUs } from "@/components/landing/AboutUs";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { FlashSale } from "@/components/landing/FlashSale";

export default function Home() {
    return (
        <main className="min-h-screen">
            <FlashSale />
            <Navbar />
            <Hero />
            <ProductShowcase />
            <AboutUs />
            <Testimonials />
            <Footer />
            <CartSidebar />
        </main>
    );
}
