import ButtonDelete from "@/components/buttons/ButtonDelete";
import { ActionModal } from "@/components/modal/ActionModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/interfaces/order.interface";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { deleteOrderById } from "@/services/orderService";
import EditOrderForm from "../forms/EditOrdertForm";
import SelectOrderStatus from "@/components/form/SelectOrderStatus";

interface Props {
  orders?: Order[];
}

function OrderTable({ orders }: Props) {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.customerName}
              </TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.item}</TableCell>
              <TableCell className="capitalize">
                {/*//? select para cambio del estad */}
                <SelectOrderStatus id={order.id} status={order.status} />
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Link
                  to={`/orders/${order.id}`}
                  className="flex items-center space-x-2"
                >
                  <Button
                    variant="default"
                    size="default"
                    className="font-semibold"
                  >
                    Ver detalles
                  </Button>
                </Link>
              </TableCell>

              <TableCell>
                <Popover>
                  <PopoverTrigger className="ml-auto mr-2" asChild>
                    <Ellipsis className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <div className="items-end flex gap-1">
                      <ActionModal title="Editar" dialogTitle="Editar Orden">
                        <EditOrderForm order={order} />
                      </ActionModal>
                      <ButtonDelete
                        id={order.id}
                        deleteFn={deleteOrderById}
                        nameMutationKey="deleteOrder"
                        nameQueryKey="orders"
                        textObjectDelete="Order"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrderTable;
