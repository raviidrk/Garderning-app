import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { LanguageService } from '../../services/language.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  langService = inject(LanguageService);
  route = inject(ActivatedRoute);

  orderIdInput = signal<string>('BOG-2026-8841');
  mobileInput = signal<string>('9840012345');
  activeOrder = signal<Order | null>(null);
  searched = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['orderId']) {
        this.orderIdInput.set(params['orderId']);
      }
      if (params['mobile']) {
        this.mobileInput.set(params['mobile']);
      }
      this.trackOrder();
    });
  }

  trackOrder(): void {
    this.searched.set(true);
    this.errorMessage.set(null);

    const id = this.orderIdInput().trim();
    const mobile = this.mobileInput().trim();

    if (!id && !mobile) {
      this.errorMessage.set('Please provide either your Order ID or registered Mobile Number.');
      this.activeOrder.set(null);
      return;
    }

    const order = this.orderService.findOrder(id, mobile);
    if (order) {
      this.activeOrder.set(order);
    } else {
      this.activeOrder.set(null);
      this.errorMessage.set('No order found matching these details. Please verify your Order ID or mobile number.');
    }
  }

  loadDemo(id: string, mobile: string): void {
    this.orderIdInput.set(id);
    this.mobileInput.set(mobile);
    this.trackOrder();
  }

  getWhatsAppSupportUrl(): string {
    const order = this.activeOrder();
    const text = encodeURIComponent(
      `Vanakkam Babu Organic Garden! I need an update regarding my order #${order?.orderId || this.orderIdInput()} for delivery in Chennai.`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }
}
