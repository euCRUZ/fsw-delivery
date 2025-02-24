"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format-currency"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useContext, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CartContext } from "../../context/cart"
import CartSheet from "../../components/cart-sheet"

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { avatarImageUrl: true; name: true }
      }
    }
  }>
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCart, addProduct } = useContext(CartContext)

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity,
    })
    toggleCart()
  }

  const [quantity, setQuantity] = useState<number>(1)

  const handleDecrement = () =>
    setQuantity((prev) => {
      if (prev <= 1) {
        return 1
      }
      return prev - 1
    })
  const handleIncrement = () => setQuantity((prev) => prev + 1)

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
        <div className="flex-auto overflow-hidden">
          {/* Restaurant */}
          <div className="flex items-center gap-1.5">
            <Image
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="texted-muted-foreground text-sm">
              {product.restaurant.name}
            </p>
          </div>

          {/* Product Name */}
          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          {/* PRICE AND QUANTITY */}
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {formatCurrency(product.price * quantity)}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-center">
              <Button
                variant="outline"
                disabled={quantity === 1}
                className="h-8 w-8 rounded-xl"
                onClick={handleDecrement}
              >
                <ChevronLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>

              <Button
                variant="destructive"
                className="h-8 w-8 rounded-xl"
                onClick={handleIncrement}
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          {quantity > 1 && (
            <p className="mt-[6px] text-sm text-neutral-400">
              Preço individual: {formatCurrency(product.price)}
            </p>
          )}

          <ScrollArea className="h-full">
            {/* Description */}
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold">Sobre</h4>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Ingredients */}

            {product.ingredients.length > 0 && (
              <div className="pb-30 mt-6 space-y-3">
                <div className="flex items-center gap-1.5">
                  <ChefHatIcon size={18} />
                  <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="list-disc px-5 text-sm text-muted-foreground">
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </ScrollArea>
        </div>

        <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  )
}

export default ProductDetails
