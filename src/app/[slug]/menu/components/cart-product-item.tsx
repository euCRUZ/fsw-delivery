import Image from "next/image"
import { CartContext, CartProduct } from "../context/cart"
import { formatCurrency } from "@/helpers/format-currency"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { useContext } from "react"

interface CartItemProps {
  product: CartProduct
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext)

  return (
    <div className="my-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="p-2"
          />
        </div>

        {/* RIGHT */}
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              disabled={product.quantity === 1}
              className="h-7 w-7 rounded-lg"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <p className="w-8 text-xs">{product.quantity}</p>

            <Button
              variant="destructive"
              className="h-7 w-7 rounded-lg"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        className="me-4 h-7 w-7 rounded-lg"
        variant="outline"
        onClick={() => removeProduct(product.id)}
      >
        <TrashIcon />
      </Button>
    </div>
  )
}

export default CartProductItem
