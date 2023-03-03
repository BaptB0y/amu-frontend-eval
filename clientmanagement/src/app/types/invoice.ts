export type Invoice = {
  // Une propriété id numérique
  id: number;
  // Une propriété client de type Customer
  customer:number;
  // Une propriété amount de type int
  amount: number;
  // Une propriété status de type
  status: string;
}

export type Invoices = Invoice[];
