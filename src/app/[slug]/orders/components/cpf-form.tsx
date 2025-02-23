"use client"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { isValidCpf, removeCpfPunctuation } from "@/helpers/cpf"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PatternFormat } from "react-number-format"
import { usePathname, useRouter } from "next/navigation"

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1)
    .refine((cpf) => isValidCpf(cpf), {
      message: "O CPF é obrigatório",
    }),
})

type FormSchema = z.infer<typeof formSchema>

const CpfForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const router = useRouter()
  const pathName = usePathname()

  const onSubmit = (data: FormSchema) => {
    router.replace(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar seus pedidos
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel>Seu CPF</FormLabel>
                  <FormControl>
                    <PatternFormat
                      placeholder="Digite seu CPF..."
                      format={"###.###.###-##"}
                      customInput={Input}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DrawerFooter>
              <Button variant="destructive" className="w-full rounded-full">
                Confirmar
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export default CpfForm
