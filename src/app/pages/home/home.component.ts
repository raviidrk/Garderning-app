import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { QuickViewModalComponent } from '../../components/quick-view-modal/quick-view-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, QuickViewModalComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  productService = inject(ProductService);
  langService = inject(LanguageService);
  cartService = inject(CartService);

  activeTab = signal<'all' | 'indoor' | 'flowering' | 'terrace'>('all');
  selectedQuickViewProduct = signal<Product | null>(null);
  isVideoModalOpen = signal<boolean>(false);
  isGiftInquiryModalOpen = signal<boolean>(false);

  filteredProducts = computed(() => {
    const list = this.productService.products();
    const tab = this.activeTab();
    if (tab === 'indoor') {
      return list.filter(p => p.careInfo?.placementKey === 'indoor');
    }
    if (tab === 'flowering') {
      return list.filter(p => p.categoryLabel.toLowerCase().includes('flower') || p.category === 'plants');
    }
    if (tab === 'terrace') {
      return list.filter(p => p.careInfo?.placementKey === 'terrace' || p.category === 'growbags' || p.category === 'soil');
    }
    return list.slice(0, 8);
  });

  popularProducts = computed(() => {
    return this.productService.products().filter(p => p.badge === 'Bestseller' || p.badge === 'Chennai Special').slice(0, 4);
  });

  reviews = signal([
    {
      name: 'Dr. S. Ramachandran',
      location: 'Chennai',
      rating: 5,
      comment: 'Ordered 6 grow bags and Manjal Jathi Malli plant. Received within hours from Babu Organic Garden! Healthy green foliage and live packing was top notch.',
      tamilComment: 'மஞ்சள் ஜாதி மல்லி செடி மற்றும் குரோ பேக் பாபு ஆர்கானிக் கார்டனில் வாங்கினேன். ஆரோக்கியமான செடிகள் மற்றும் அருமையான தரம்!',
      date: '2 days ago'
    },
    {
      name: 'Priyanka & Vignesh',
      location: 'Chennai',
      rating: 5,
      comment: 'We gave 75 miniature Jade plants as wedding return gifts to our guests. Everyone in Chennai loved the concept and the personalized Tamil thank-you tags!',
      tamilComment: 'எங்கள் திருமணத்திற்கு 75 தாம்பூல பரிசு செடிகள் வாங்கினோம். விருந்தினர்கள் அனைவரும் மிகவும் பாராட்டினர்.',
      date: '1 week ago'
    },
    {
      name: 'Balamurugan K.',
      location: 'Tambaram East',
      rating: 5,
      comment: 'The Red Soil + Vermicompost mix is genuine organic stuff. My Nattu Thakkali and chilli plants started fruiting within 50 days on the terrace.',
      tamilComment: 'செம்மண் மற்றும் மண்புழு உரம் மிகச் சிறந்த தரம். மாடித் தோட்டத்தில் தக்காளி அருமையாக காய்த்துள்ளது.',
      date: '2 weeks ago'
    }
  ]);

  openQuickView(product: Product): void {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView(): void {
    this.selectedQuickViewProduct.set(null);
  }

  openVideoModal(): void {
    this.isVideoModalOpen.set(true);
  }

  closeVideoModal(): void {
    this.isVideoModalOpen.set(false);
  }

  openGiftModal(): void {
    this.isGiftInquiryModalOpen.set(true);
  }

  closeGiftModal(): void {
    this.isGiftInquiryModalOpen.set(false);
  }

  getWhatsAppGiftInquiry(): string {
    const text = encodeURIComponent(
      'Vanakkam Babu Organic Garden! I would like to inquire about Return Gift Plants in Terracotta Pots for an upcoming event.'
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  }
}
