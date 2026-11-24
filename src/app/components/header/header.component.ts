import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  langService = inject(LanguageService);
  themeService = inject(ThemeService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  productService = inject(ProductService);
  router = inject(Router);

  isMobileMenuOpen = signal<boolean>(false);
  isShopDropdownOpen = signal<boolean>(false);
  searchQuery = signal<string>('');
  isSearchFocused = signal<boolean>(false);

  searchResults = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return [];
    return this.productService.products().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tamilName.includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.categoryTamil.includes(q)
    ).slice(0, 5);
  });

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onSelectSearchResult(productId: string): void {
    this.searchQuery.set('');
    this.isSearchFocused.set(false);
    this.router.navigate(['/shop'], { queryParams: { product: productId } });
  }

  onSearchSubmit(): void {
    const q = this.searchQuery().trim();
    if (q) {
      this.isSearchFocused.set(false);
      this.router.navigate(['/shop'], { queryParams: { q } });
    }
  }
}
