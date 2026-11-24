import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product, PlantLight, PlantPlacement } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { QuickViewModalComponent } from '../../components/quick-view-modal/quick-view-modal.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent, QuickViewModalComponent],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  productService = inject(ProductService);
  langService = inject(LanguageService);
  wishlistService = inject(WishlistService);
  route = inject(ActivatedRoute);

  // Filter signals
  selectedCategory = signal<string>('all');
  selectedLight = signal<PlantLight | 'all'>('all');
  selectedPlacement = signal<PlantPlacement | 'all'>('all');
  isPetSafeOnly = signal<boolean>(false);
  isInStockOnly = signal<boolean>(false);
  maxPrice = signal<number>(1000);
  sortBy = signal<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  searchQuery = signal<string>('');
  isWishlistOnly = signal<boolean>(false);

  isMobileFiltersOpen = signal<boolean>(false);
  selectedQuickViewProduct = signal<Product | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory.set(params['category']);
      }
      if (params['q']) {
        this.searchQuery.set(params['q']);
      }
      if (params['filter'] === 'wishlist') {
        this.isWishlistOnly.set(true);
      }
      if (params['product']) {
        const prod = this.productService.getProductById(params['product']);
        if (prod) {
          this.selectedQuickViewProduct.set(prod);
        }
      }
    });
  }

  filteredProducts = computed(() => {
    let list = this.productService.products();

    // Search query
    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tamilName.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Wishlist only
    if (this.isWishlistOnly()) {
      const wishlisted = this.wishlistService.wishlistIds();
      list = list.filter(p => wishlisted.includes(p.id));
    }

    // Category
    const cat = this.selectedCategory();
    if (cat !== 'all') {
      list = list.filter(p => p.category === cat || p.categoryLabel.toLowerCase().includes(cat));
    }

    // Light
    const light = this.selectedLight();
    if (light !== 'all') {
      list = list.filter(p => p.careInfo?.lightKey === light || p.careInfo?.lightKey === 'all');
    }

    // Placement
    const place = this.selectedPlacement();
    if (place !== 'all') {
      list = list.filter(p => p.careInfo?.placementKey === place);
    }

    // Pet Safe
    if (this.isPetSafeOnly()) {
      list = list.filter(p => p.careInfo?.petSafe === true);
    }

    // In Stock
    if (this.isInStockOnly()) {
      list = list.filter(p => p.inStock);
    }

    // Max Price
    list = list.filter(p => p.price <= this.maxPrice());

    // Sorting
    const sort = this.sortBy();
    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  });

  activeFilterCount = computed(() => {
    let count = 0;
    if (this.selectedCategory() !== 'all') count++;
    if (this.selectedLight() !== 'all') count++;
    if (this.selectedPlacement() !== 'all') count++;
    if (this.isPetSafeOnly()) count++;
    if (this.isInStockOnly()) count++;
    if (this.maxPrice() < 1000) count++;
    if (this.searchQuery().trim()) count++;
    if (this.isWishlistOnly()) count++;
    return count;
  });

  resetFilters(): void {
    this.selectedCategory.set('all');
    this.selectedLight.set('all');
    this.selectedPlacement.set('all');
    this.isPetSafeOnly.set(false);
    this.isInStockOnly.set(false);
    this.maxPrice.set(1000);
    this.searchQuery.set('');
    this.isWishlistOnly.set(false);
    this.sortBy.set('featured');
  }

  openQuickView(product: Product): void {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.selectedQuickViewProduct.set(null);
  }
}
