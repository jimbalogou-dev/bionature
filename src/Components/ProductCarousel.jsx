import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'

function ProductCarousel({ products }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-600"
        aria-label="Précédent"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="w-40 sm:w-48 shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full w-9 h-9 items-center justify-center text-gray-600 hover:text-green-700 hover:border-green-600"
        aria-label="Suivant"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default ProductCarousel