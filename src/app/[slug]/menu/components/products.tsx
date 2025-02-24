import { formatCurrency } from "@/helpers/format-currency"
import { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"

interface ProductsProps {
  products: Product[]
}

const Products = ({ products }: ProductsProps) => {
  const { slug } = useParams<{ slug: string }>() // other way to get the slug instead of using the params prop
  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get("consumptionMethod")
  return (
    <div className="space-y-3 overflow-auto px-5 pb-20">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
          className="flex items-center justify-between gap-10 border-b py-5"
        >
          {/* LEFT */}
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatCurrency(product.price)}
            </p>
          </div>

          {/* RIGHT */}
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Products
