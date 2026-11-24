import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language.service';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-quick-view-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-view-modal.component.html'
})
export class QuickViewModalComponent {
  @Input({ required: true }) product!: Product;
  @Output() close = new EventEmitter<void>();

  cartService = inject(CartService);
  langService = inject(LanguageService);
  wishlistService = inject(WishlistService);

  selectedPack = signal<string>('Pack of 1');
  quantity = signal<number>(1);
  isAddedAnimation = signal<boolean>(false);

  ngOnInit(): void {
    if (this.product?.packOptions?.length > 0) {
      this.selectedPack.set(this.product.packOptions[0]);
    }
  }

  incrementQty(): void {
    this.quantity.update(q => q + 1);
  }

  decrementQty(): void {
    this.quantity.update(q => Math.max(1, q - 1));
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.product, this.selectedPack(), this.quantity());
    this.isAddedAnimation.set(true);
    setTimeout(() => {
      this.isAddedAnimation.set(false);
      this.close.emit();
    }, 1200);
  }

  getWhatsAppInquiryUrl(): string {
    const text = encodeURIComponent(
      `Vanakkam Babu Organic Garden! I am interested in ordering ${this.product.name} (${this.product.tamilName}) - ₹${this.product.price}. Do you have live stock available for delivery?`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }
}
