import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart-drawer.component.html'
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  langService = inject(LanguageService);

  couponInput = signal<string>('');
  couponMessage = signal<{ text: string; isError: boolean } | null>(null);
  isCheckoutSuccessOpen = signal<boolean>(false);
  simulatedOrderId = signal<string>('');

  onApplyCoupon(): void {
    const res = this.cartService.applyCoupon(this.couponInput());
    this.couponMessage.set({
      text: res.message,
      isError: !res.success
    });
    if (res.success) {
      this.couponInput.set('');
    }
  }

  onRemoveCoupon(): void {
    this.cartService.removeCoupon();
    this.couponMessage.set(null);
  }

  onSimulateCheckout(): void {
    const id = `BOG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    this.simulatedOrderId.set(id);
    this.isCheckoutSuccessOpen.set(true);
    this.cartService.clearCart();
  }

  closeCheckoutModal(): void {
    this.isCheckoutSuccessOpen.set(false);
    this.cartService.closeCart();
  }
}
