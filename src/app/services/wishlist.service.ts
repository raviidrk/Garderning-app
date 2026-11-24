import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private platformId = inject(PLATFORM_ID);
  readonly wishlistIds = signal<string[]>([]);

  readonly count = computed(() => this.wishlistIds().length);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const saved = localStorage.getItem('bog_wishlist');
        if (saved) {
          this.wishlistIds.set(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Error loading wishlist', e);
      }
    }
  }

  toggleWishlist(productId: string): boolean {
    const current = this.wishlistIds();
    let updated: string[];
    const exists = current.includes(productId);
    if (exists) {
      updated = current.filter(id => id !== productId);
    } else {
      updated = [...current, productId];
    }
    this.wishlistIds.set(updated);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('bog_wishlist', JSON.stringify(updated));
      } catch (e) {}
    }
    return !exists;
  }

  isWishlisted(productId: string): boolean {
    return this.wishlistIds().includes(productId);
  }
}
