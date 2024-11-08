import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editOrder } from "@/services/orderService";
import { Order } from "@/interfaces/order.interface";
import { DialogClose } from "@/components/ui/dialog";


interface Props {
  order: Order;
}

function EditOrderForm({ order }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Order>({
    defaultValues: {
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
      status: order.status,
    },
  });

  const editOrderMutation = useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden editada correctamente");
    },
    onError: (error: Error) => {
      toast.error(`Error al editar la orden: ${error.message}`);
    },
  });

  const onSubmit = handleSubmit((data: Order) => {
    const orderWithId = { ...data, id: order.id };
    editOrderMutation.mutate(orderWithId);
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
          label="Item"
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
          rules={{ required: "La cantidad es requerida" }}
          placeholder="Cantidad"
          type="number"
        />
      </div>
      <div className="col-span-2">
        <div className="col-span-2 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button
              type="submit"
              disabled={editOrderMutation.isPending}
              onClick={onSubmit}
            >
              {editOrderMutation.isPending ? "Editando..." : "Editar Orden"}
            </Button>
          </DialogClose>
        </div>
      </div>
    </form>
  );
}

export default EditOrderForm;
