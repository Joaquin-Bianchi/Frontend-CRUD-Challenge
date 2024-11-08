import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell } from "@/components/ui/table";
import { editStatusOrder } from "@/services/orderService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
  status: string;
}

export default function SelectOrderStatus({ id, status }: Props) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const queryClient = useQueryClient();

  const statusColors = {
    cancelled: "bg-red-500",
    completed: "bg-green-500",
    pending: "bg-yellow-500",
  };

  const { mutate } = useMutation({
    mutationFn: ({
      orderId,
      newStatus,
    }: {
      orderId: string;
      newStatus: string;
    }) => editStatusOrder(orderId, newStatus),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["orders"] });
      toast.success("Estado actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar estado");
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    mutate({ orderId: id, newStatus });
  };

  return (
    <TableCell>
      <Select value={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger
          className={`rounded-full text-white ${
            statusColors[currentStatus as keyof typeof statusColors] ||
            "bg-yellow-500"
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pendiente</SelectItem>
          <SelectItem value="completed">Entregado</SelectItem>
          <SelectItem value="cancelled">Cancelado</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
  );
}
