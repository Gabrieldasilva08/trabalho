import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroBanner from '../components/home/HeroBanner'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Testimonials from '../components/home/Testimonials'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <FeaturedProducts />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
