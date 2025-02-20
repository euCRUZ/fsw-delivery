import { db } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const getProductInfo = async (id: string, slug: string) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: {
        select: { avatarImageUrl: true, name: true, slug: true },
      },
    },
  })
  if (!product) {
    // console.error(`Product with id ${id} not found`)
    return notFound()
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound()
  }

  return product
}
