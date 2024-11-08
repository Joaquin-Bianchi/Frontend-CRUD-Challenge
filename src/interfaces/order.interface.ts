export enum Status {
  pending,
  completed,
  cancelled,
}

export interface Order {
  id: string;
  customerName: string;
  status: string;
  item: string;
  quantity: number;
}
