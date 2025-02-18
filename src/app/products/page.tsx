import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ProductPage = () => {
  return (
    <div className="p-5 border border-emerald-50 rounded-xl"> 
      <h1 className="text-red-500">Produtos</h1>
      <Button>Adicionar</Button>
      <Input placeholder="Pesquisar" />
    </div>
  )
}

export default ProductPage
