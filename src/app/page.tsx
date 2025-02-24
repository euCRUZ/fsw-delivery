import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllRestaurants } from "@/data/get-restaurant"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Bem-vindo ao FWS Delivery!",
  description: "O melhor delivery do mundo, por Giovanni Cruz!",
}

const HomePage = async () => {
  const restaurants = await getAllRestaurants()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Conteúdo Principal */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-primary/10 to-primary/5 p-4">
        <Card className="flex w-full max-w-4xl flex-col shadow-lg">
          <div className="p-6 pb-0">
            <h1 className="mb-2 text-center text-3xl font-bold text-primary">
              Bem-vindo ao FWS Delivery!
            </h1>
            <p className="mb-6 text-center text-muted-foreground">
              Escolha o restaurante que você quer fazer seu pedido:
            </p>
          </div>

          <ScrollArea className="h-[60vh] flex-grow px-6 pb-6">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {restaurants.map((restaurant) => (
                <Link
                  href={`/${restaurant.slug}`}
                  key={restaurant.id}
                  className="group"
                >
                  <div className="flex flex-col items-center rounded-lg p-4 transition-all duration-300 hover:bg-primary/5">
                    <div className="relative mb-3 h-16 w-16">
                      <Image
                        src={restaurant.avatarImageUrl || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h2 className="text-center text-sm font-semibold transition-colors duration-300 group-hover:text-primary">
                      {restaurant.name}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Footer Fixo */}
      <div className="bg-gradient-to-b from-primary/10 to-primary/5 p-4 text-center text-muted-foreground">
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

export default HomePage
