import { getProductInfo } from "@/data/get-product-info"
import ProductHeader from "./components/product-header"
import ProductDetails from "./components/product-details"

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params

  const product = await getProductInfo(productId, slug)
  

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  )
}

export default ProductPage

