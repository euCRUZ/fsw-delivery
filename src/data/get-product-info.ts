import { db } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const getProductInfo = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
  })
  if (!product) {
    return notFound()
    // console.error(`Product with id ${id} not found`)
  }
  return product
}
