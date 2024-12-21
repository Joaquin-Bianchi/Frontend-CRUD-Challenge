import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ActionModal } from "@/components/modal/ActionModal";
import { getOrders } from "@/services/orderService";
import OrderTable from "./components/table/OrderTable";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import CreateOrderForm from "./components/forms/CreateOrderForm";
import { useState } from "react";
import { PaginationComponent } from "@/components/pagination/Pagination";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/interfaces/order.interface";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrders(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };

  if (isLoading) return <div>Cargando Ordenes...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!data) return <div>No hay órdenes</div>;

  const filteredOrders =
    statusFilter === "all"
      ? data.orders.data
      : (data.orders.data as Order[]).filter(
          (order) => order.status === statusFilter
        );

  const { totalPages } = data;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <Link to={"/"}>
              <ArrowLeftCircle className="h-5 w-5 hover:text-rose-500 cursor-pointer" />
            </Link>
            <h1 className="text-3xl font-bold mb-4">Órdenes</h1>
          </div>
          <ActionModal title="+ Nueva Orden" dialogTitle="Crear Nueva orden">
            <CreateOrderForm />
          </ActionModal>
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="filter">Filtrar por estado:</Label>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger id="filter" className="w-[180px]">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <OrderTable orders={filteredOrders} />

        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
}
