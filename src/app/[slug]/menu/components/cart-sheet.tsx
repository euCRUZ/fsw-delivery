import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { useContext, useState } from "react"
import { CartContext } from "../context/cart"
import { formatCurrency } from "../../../../helpers/format-currency"
import CartProductItem from "./cart-product-item"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FinishOrderDialog from "./finish-order-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext)

  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col py-5">
          <ScrollArea className="h-full">
            <div className="flex-auto pb-5">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
              {products.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  A sacola está vazia.
                </p>
              )}
            </div>
          </ScrollArea>

          {products.length > 0 ? (
            <>
              <Card className="mb-6">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-sm font-semibold">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="w-full rounded-full"
                onClick={() => setFinishOrderDialogIsOpen(true)}
                disabled={products.length === 0}
              >
                Finalizar pedido
              </Button>
            </>
          ) : null}

          <FinishOrderDialog
            open={finishOrderDialogIsOpen}
            onOpenChange={() => setFinishOrderDialogIsOpen(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartSheet
