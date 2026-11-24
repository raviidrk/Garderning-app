import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPack: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private platformId = inject(PLATFORM_ID);

  readonly items = signal<CartItem[]>([]);
  readonly isCartOpen = signal<boolean>(false);
  readonly appliedCoupon = signal<{ code: string; discountAmount: number; discountPercent?: number } | null>(null);
  readonly lastAddedItem = signal<Product | null>(null);
  readonly flyAnimationTrigger = signal<number>(0);

  readonly freeShippingThreshold = 499;
  readonly baseShippingFee = 49;

  readonly totalCount = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  });

  readonly isFreeShipping = computed(() => {
    return this.subtotal() >= this.freeShippingThreshold;
  });

  readonly amountNeededForFreeShipping = computed(() => {
    const diff = this.freeShippingThreshold - this.subtotal();
    return diff > 0 ? diff : 0;
  });

  readonly shippingFee = computed(() => {
    if (this.items().length === 0) return 0;
    return this.isFreeShipping() ? 0 : this.baseShippingFee;
  });

  readonly discount = computed(() => {
    const coupon = this.appliedCoupon();
    if (!coupon) return 0;
    if (coupon.discountPercent) {
      return Math.round((this.subtotal() * coupon.discountPercent) / 100);
    }
    return Math.min(coupon.discountAmount, this.subtotal());
  });

  readonly total = computed(() => {
    const calc = this.subtotal() + this.shippingFee() - this.discount();
    return Math.max(0, calc);
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const saved = localStorage.getItem('bog_cart');
        if (saved) {
          this.items.set(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Error loading cart', e);
      }
    }
  }

  openCart(): void {
    this.isCartOpen.set(true);
  }

  closeCart(): void {
    this.isCartOpen.set(false);
  }

  toggleCart(): void {
    this.isCartOpen.update(v => !v);
  }

  addToCart(product: Product, selectedPack: string = 'Pack of 1', quantity: number = 1): void {
    const current = this.items();
    const existingIndex = current.findIndex(
      item => item.product.id === product.id && item.selectedPack === selectedPack
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = current.map((item, idx) => {
        if (idx === existingIndex) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    } else {
      updated = [...current, { product, quantity, selectedPack }];
    }

    this.items.set(updated);
    this.lastAddedItem.set(product);
    this.flyAnimationTrigger.update(n => n + 1);
    this.saveCart(updated);
    this.openCart();
  }

  updateQuantity(productId: string, selectedPack: string, newQty: number): void {
    if (newQty <= 0) {
      this.removeFromCart(productId, selectedPack);
      return;
    }
    const updated = this.items().map(item => {
      if (item.product.id === productId && item.selectedPack === selectedPack) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    this.items.set(updated);
    this.saveCart(updated);
  }

  removeFromCart(productId: string, selectedPack: string): void {
    const updated = this.items().filter(
      item => !(item.product.id === productId && item.selectedPack === selectedPack)
    );
    this.items.set(updated);
    this.saveCart(updated);
  }

  applyCoupon(code: string): { success: boolean; message: string } {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORGANIC50' || clean === 'CHENNAI50') {
      this.appliedCoupon.set({ code: 'ORGANIC50', discountAmount: 50 });
      return { success: true, message: '₹50 flat discount applied!' };
    }
    if (clean === 'BABU10' || clean === 'VANAKKAM10') {
      this.appliedCoupon.set({ code: clean, discountAmount: 0, discountPercent: 10 });
      return { success: true, message: '10% welcome discount applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ORGANIC50 or BABU10' };
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
  }

  clearCart(): void {
    this.items.set([]);
    this.appliedCoupon.set(null);
    this.saveCart([]);
  }

  private saveCart(cart: CartItem[]): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('bog_cart', JSON.stringify(cart));
      } catch (e) {}
    }
  }
}
