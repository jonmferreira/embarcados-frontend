export type InvoiceItem = {
  id: number;
  serial_number: string;
  customer_part_number: string;
  customer_product_id: string;
  reason: string;
  request_id: number;
  invoice_item_id: number | null;
  invoice_number: string | null;
  expedition_date: string | null;
  ipi: number | null;
  icms: number | null;
  unit_price: number | null;
  quantity: number | null;
};
