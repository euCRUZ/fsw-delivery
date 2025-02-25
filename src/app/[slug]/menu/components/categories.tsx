"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Prisma } from "@prisma/client"
import { ClockIcon } from "lucide-react"
import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import Products from "./products"
import { CartContext } from "../context/cart"
import { formatCurrency } from "@/helpers/format-currency"
import CartSheet from "./cart-sheet"

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategory: { include: { products: true } } }
  }>
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true }
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const { products, total, totalQuantity, toggleCart } = useContext(CartContext)

  const [isOpen, setIsOpen] = useState(true)
  const [nextOpeningTime, setNextOpeningTime] = useState("")
  const [timeUntilClose, setTimeUntilClose] = useState("")
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoriesWithProducts>(restaurant.menuCategory[0])

  useEffect(() => {
    const checkOpeningHours = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()

      const isClosed =
        currentHour > 23 ||
        (currentHour === 23 && currentMinute >= 30) ||
        currentHour < 11 ||
        (currentHour === 11 && currentMinute < 30)

      setIsOpen(!isClosed)

      if (isClosed) {
        if (currentHour > 23 || (currentHour === 23 && currentMinute >= 30)) {
          setNextOpeningTime("11:00")
        } else {
          setNextOpeningTime("23:30")
        }
      } else {
        const closingTime = new Date()
        closingTime.setHours(23, 30, 0, 0)
        const timeDiff = closingTime.getTime() - now.getTime()
        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeUntilClose(`${hours}h${minutes}m`)
      }
    }

    checkOpeningHours()
    const interval = setInterval(checkOpeningHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category)
  }

  const getCategoryButtoVariant = (category: MenuCategoriesWithProducts) => {
    return selectedCategory.id === category.id ? "default" : "secondary"
  }

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-50">{restaurant.description}</p>
          </div>
        </div>

        <div
          className={`mt-3 flex items-center gap-1 text-xs ${isOpen ? "text-green-600" : "text-red-600"}`}
        >
          <ClockIcon size={12} />
          <p>
            {isOpen
              ? `Aberto - Fecha em ${timeUntilClose}`
              : `Fechado - Abre às ${nextOpeningTime}`}
          </p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategory.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtoVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 pt-8 font-semibold">{selectedCategory.name}</h3>

      <Products products={selectedCategory.products} />

      {products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
          <div>
            <p className="text-xs text-muted-foreground">Total dos pedidos</p>
            <p className="text-sm font-semibold">
              {formatCurrency(total)}
              <span className="text-xs font-normal text-muted-foreground">
                / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
              </span>
            </p>
          </div>
          <Button onClick={toggleCart}>Ver sacola</Button>
          <CartSheet />
        </div>
      )}
    </div>
  )
}

export default RestaurantCategories
