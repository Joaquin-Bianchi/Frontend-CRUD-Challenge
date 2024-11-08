import { Order } from "@/interfaces/order.interface";

const API_URL = "http://localhost:3000";

export const getOrders = async (page = 1, limit = 5) => {
  try {
    //obtener los pedidos con paginación
    const ordersResponse = await fetch(
      `${API_URL}/orders?_page=${page}&_per_page=${limit}`
    );
    const orders = await ordersResponse.json();

    //  el total de pedidos, ya que no los devulve la api

    const totalResponse = await fetch(`${API_URL}/orders`);
    const totalOrders = await totalResponse.json();

    // calculo del Total de registros y total de páginas
    const totalCount = totalOrders.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    return {
      orders,
      totalCount, // total de registros
      totalPages, //total de páginas
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (order: Order) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const editOrder = async (order: Order) => {
  try {
    const response = await fetch(`${API_URL}/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Error al editar: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const editStatusOrder = async (orderId: string, status: string) => {
  try {
    const order = await getOrderById(orderId);
    const updatedOrder = {
      ...order,
      status,
    };
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el estado");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
export const deleteOrderById = async (orderId: string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar : ${response.status}`);
    }

    return response;
  } catch (error: any) {
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`);
    const order = await response.json();
    return order;
  } catch (error: any) {
    throw error;
  }
};
