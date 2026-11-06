import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import BestSellers from '../components/BestSellers'
import PremiumPacks from '../components/PremiumPacks'
import Testimonials from '../components/Testimonials'
import TrustBadges from '../components/TrustBadges'
import Newsletter from '../components/Newsletter'

function Home() {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <BestSellers />
      <PremiumPacks />
      <Testimonials />
      <TrustBadges />
      <Newsletter />
    </div>
  )
}

export default Home