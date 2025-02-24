import { getRestaurantBySlug } from "@/data/get-restaurant"
import Image from "next/image"
import { notFound } from "next/navigation"
import ConsumptionMethodOption from "./components/consumptio-method-option"
import { Metadata } from "next"

interface RestaurantPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  const { slug } = await params
  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) {
    return {
      title: "Restaurant Not Found",
    }
  }
  return {
    title: restaurant.name,
    description: restaurant.description,
  }
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params

  const restaurant = await getRestaurantBySlug(slug)
  if (!restaurant) {
    return notFound()
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* LOGO */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      {/* WELCOME */}
      <div className="space-y-2 pt-14 text-center">
        <h3 className="text 2xl: font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      {/* CONSUMPTION METHOD */}
      <div className="grid grid-cols-2 gap-4 pt-10">
        <ConsumptionMethodOption
          imageUrl="/dine_in.png"
          imageAlt="Para comer aqui"
          buttonText="Para comer aqui"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          imageUrl="/takeaway.png"
          imageAlt="Para levar"
          buttonText="Para levar"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>

      <div className="mt-9 p-4 text-center text-muted-foreground">
        <p>
          Made with{" "}
          <span role="img" aria-label="Coração">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="https://crzweb.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            CRZ
          </a>
        </p>
      </div>
    </div>
  )
}

export default RestaurantPage
