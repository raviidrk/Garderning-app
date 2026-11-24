import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() quickView = new EventEmitter<Product>();

  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  langService = inject(LanguageService);

  selectedPack = signal<string>('Pack of 1');
  isAddedAnimation = signal<boolean>(false);

  ngOnInit(): void {
    if (this.product?.packOptions?.length > 0) {
      this.selectedPack.set(this.product.packOptions[0]);
    }
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.product, this.selectedPack(), 1);
    this.isAddedAnimation.set(true);
    setTimeout(() => {
      this.isAddedAnimation.set(false);
    }, 1500);
  }

  onToggleWishlist(event: Event): void {
    event.stopPropagation();
    this.wishlistService.toggleWishlist(this.product.id);
  }

  onQuickViewClick(event: Event): void {
    event.stopPropagation();
    this.quickView.emit(this.product);
  }
}
