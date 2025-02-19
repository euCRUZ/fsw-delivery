import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug"
import { notFound } from "next/navigation"
import RestauratHeader from "./components/header"


interface RestaurantMenuPageProps {
  params: { slug: string }
  searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = params
  const { consumptionMethod } = await searchParams

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound()
  }

  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) {
    return notFound()
  }

  return (
    <div>
      <RestauratHeader restaurant={restaurant} />
    </div>
  )
}

export default RestaurantMenuPage
