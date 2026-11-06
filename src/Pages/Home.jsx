import Hero from '../Components/Hero'
import CategoryGrid from '../Components/CategoryGrid'
import BestSellers from '../Components/BestSellers'
import PremiumPacks from '../Components/PremiumPacks'
import Testimonials from '../Components/Testimonials'
import TrustBadges from '../Components/TrustBadges'
import Newsletter from '../Components/Newsletter'

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