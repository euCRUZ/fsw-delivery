import { db } from "@/lib/prisma"

export const getRestaurantBySlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategory: {
        include: { products: true },
      },
    },
  })
  return restaurant
}

export const getAllRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({
    include: {
      menuCategory: {
        include: { products: true },
      },
    },
  })
  return restaurants
}
