import { Order } from "@/interfaces/order.interface";
import { getOrderById } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ArrowLeftCircle, Calendar, Package, Truck, User } from "lucide-react";
import { ActionModal } from "@/components/modal/ActionModal";
import EditOrderForm from "../components/forms/EditOrdertForm";
import SelectOrderStatus from "@/components/form/SelectOrderStatus";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useQuery<Order, Error>({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id as string),
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando orden...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error.message}
      </div>
    );
  if (!order)
    return (
      <div className="flex justify-center items-center h-screen">
        No se encontró la orden
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6  ">
          <div className="flex items-baseline gap-2 ">
            <Link to={"/orders"}>
              <ArrowLeftCircle className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
            </Link>

            <h1 className="text-3xl font-bold mb-4">
              Detalles de la orden
              <span className="text-primary"> #{order.id}</span>
            </h1>
          </div>
          <div></div>
          <ActionModal title="✏️ Editar Orden" dialogTitle="Editar orden">
            <EditOrderForm order={order} />
          </ActionModal>
        </div>

        <div className="">
          <Card className="mb-6">
            <CardContent>
              <div className="grid mt-8 grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <User className="mr-2" /> Detalles del Cliente
                  </h3>
                  <p>
                    <strong>Nombre:</strong> {order.customerName}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Package className="mr-2" /> Detalles del Pedido
                  </h3>
                  <p>
                    <strong>Artículo:</strong> {order.item}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {order.quantity}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Resumen del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>{order.item}</span>
                </div>
                <span>x{order.quantity}</span>
              </div>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Fecha de Orden</span>
                </div>
                <span>12/12/2000 </span>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Estado del pedido</span>
                </div>
                <SelectOrderStatus id={order.id} status={order.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
