"use client"

import { Product } from "@prisma/client"
import { Pick } from "@prisma/client/runtime/library"
import { createContext, ReactNode, useState } from "react"

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number
}

export interface ICartContext {
  isOpen: boolean
  products: CartProduct[]
  total: number
  toggleCart: () => void
  addProduct: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const total = products.reduce((acc, p) => acc + p.price * p.quantity, 0)

  const toggleCart = () => {
    setIsOpen((prev) => !prev)
  }

  const addProduct = (product: CartProduct) => {
    const existingProduct = products.some(
      (products) => products.id === product.id,
    )
    if (!existingProduct) {
      return setProducts((prev) => [...prev, product])
    }

    // If the product already exists in the cart, we should update the quantity of the product instead of adding a new one to the cart.
    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          }
        }
        return prevProduct
      })
    })
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product.id !== productId) {
          return product
        }

        if (product.quantity === 1) {
          return product
        }

        return {
          ...product,
          quantity: product.quantity - 1,
        }
      })
    })
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (product.id !== productId) {
          return product
        }

        return {
          ...product,
          quantity: product.quantity + 1,
        }
      })
    })
  }

  const removeProduct = (productId: string) => {
    setProducts((prev) => {
      return prev.filter((product) => product.id !== productId)
    })
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
