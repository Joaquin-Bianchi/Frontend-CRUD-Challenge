import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "@/services/orderService";
import { Order } from "@/interfaces/order.interface";

function CreateOrderForm() {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Order>({
    defaultValues: {
      quantity: 1,
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    mutationKey: ["createOrder"],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden creada correctamente");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Error al crear la orden";
      toast.error(errorMessage);
    },
  });

  const onSubmit = handleSubmit((data: Order) => {
    // para que la api fake los cree siempre en pendiente
    const orderWihtDefaultStatus = { ...data, status: "pending" };
    createOrderMutation.mutate(orderWihtDefaultStatus);
  });

  return (
    <form className="grid grid-cols-2 gap-4 py-4" onSubmit={onSubmit}>
      <div className="col-span-2">
        <FormField
          name="customerName"
          label="Nombre del cliente"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          placeholder="Nombre del cliente"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="item"
          label="Item "
          control={control}
          rules={{ required: "El item es requerido" }}
          placeholder="Item"
          type="text"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="quantity"
          label="Cantidad"
          control={control}
          rules={{ required: "El telefono es requerido" }}
          placeholder="Teléfono"
          type="number"
        />
      </div>

      <div className="col-span-2">
        <Button
          type="submit"
          className="w-full"
          disabled={createOrderMutation.isPending}
        >
          {createOrderMutation.isPending ? "Creando..." : "Crear Orden"}
        </Button>
      </div>
    </form>
  );
}

export default CreateOrderForm;
