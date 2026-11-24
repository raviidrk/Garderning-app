export interface OrderTimelineStep {
  title: string;
  tamilTitle: string;
  description: string;
  tamilDescription: string;
  location: string;
  date: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming';
  icon: 'cart' | 'leaf' | 'box' | 'truck' | 'check';
}

export interface OrderItem {
  productId: string;
  name: string;
  tamilName: string;
  image: string;
  price: number;
  quantity: number;
  pack: string;
}

export interface Order {
  orderId: string;
  mobile: string;
  customerName: string;
  orderDate: string;
  estimatedDelivery: string;
  statusText: string;
  tamilStatusText: string;
  deliveryAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
  };
  trackingNumber: string;
  courierName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: string;
  timeline: OrderTimelineStep[];
}
