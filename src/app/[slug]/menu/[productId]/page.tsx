import { getProductInfo } from "@/data/get-product-info"
import ProductHeader from "./components/product-header"

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params

  const product = await getProductInfo(productId)

  return (
    <ProductHeader product={product} />
  )
}

export default ProductPage
