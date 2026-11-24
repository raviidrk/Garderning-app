import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private demoOrders: Order[] = [
    {
      orderId: 'BOG-2026-8841',
      mobile: '9840012345',
      customerName: 'Karthik Subramanian',
      orderDate: '24 Nov 2026, 09:30 AM',
      estimatedDelivery: 'Today by 06:00 PM',
      statusText: 'Out for Delivery (Chennai Central Hub)',
      tamilStatusText: 'டெலிவரிக்கு புறப்பட்டுள்ளது (சென்னை கிளை)',
      deliveryAddress: {
        street: 'Flat 3B, Green Meadows, 2nd Main Road',
        area: 'Anna Nagar',
        city: 'Chennai',
        pincode: '600040'
      },
      trackingNumber: 'TN-BOG-882941',
      courierName: 'Babu Organic Express Van & Parcel Logistics',
      items: [
        {
          productId: 'p1',
          name: 'Monstera Deliciosa (6 Inch Pot)',
          tamilName: 'மான்ஸ்டெரா சுவிஸ் சீஸ் செடி',
          image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&auto=format&fit=crop&q=80',
          price: 349,
          quantity: 1,
          pack: 'Pack of 1'
        },
        {
          productId: 'p2',
          name: 'Manjal Jathi Malli (Yellow Jasmine)',
          tamilName: 'மஞ்சள் ஜாதி மல்லி கொடி',
          image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=200&auto=format&fit=crop&q=80',
          price: 149,
          quantity: 1,
          pack: 'Pack of 1'
        },
        {
          productId: 'p11',
          name: 'Red Soil & Vermicompost Mix (5kg)',
          tamilName: 'செம்மண் & மண்புழு உரம்',
          image: 'https://images.unsplash.com/photo-1599685315640-9ceab2f58944?w=200&auto=format&fit=crop&q=80',
          price: 119,
          quantity: 2,
          pack: 'Pack of 1 (5kg)'
        }
      ],
      subtotal: 736,
      deliveryCharge: 0,
      discount: 50,
      total: 686,
      paymentMethod: 'UPI (GPay / PhonePe Paid)',
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          tamilTitle: 'ஆர்டர் உறுதி செய்யப்பட்டது',
          description: 'Payment verified via UPI. Order details sent to farm supervisor.',
          tamilDescription: 'கட்டணம் செலுத்தப்பட்டு பண்ணை பொறுப்பாளருக்கு அனுப்பப்பட்டது.',
          location: 'Babu Organic Garden Online Store',
          date: '24 Nov 2026',
          time: '09:32 AM',
          status: 'completed',
          icon: 'cart'
        },
        {
          title: 'Plants Handpicked & Inspected',
          tamilTitle: 'செடிகள் ஆய்வு செய்யப்பட்டு தேர்வு செய்யப்பட்டன',
          description: 'Our senior botanist checked leaves, roots, and treated soil with organic neem water.',
          tamilDescription: 'ஆரோக்கியமான செடிகள் தேர்ந்தெடுக்கப்பட்டு இயற்கை பூச்சிவிரட்டி தெளிக்கப்பட்டது.',
          location: 'Babu Organic Greenhouse Farm Bed',
          date: '24 Nov 2026',
          time: '11:15 AM',
          status: 'completed',
          icon: 'leaf'
        },
        {
          title: 'Shock-Proof Eco Live Packing',
          tamilTitle: 'பாதுகாப்பான சூழல் நட்பு பேக்கிங்',
          description: 'Root balls moistened with coco moss, pots secured with breathable ventilated carton.',
          tamilDescription: 'செடிகள் சேதமடையாதவாறு காற்றோட்டமான அட்டைப் பெட்டியில் பேக் செய்யப்பட்டது.',
          location: 'Babu Organic Dispatch Center',
          date: '24 Nov 2026',
          time: '01:45 PM',
          status: 'completed',
          icon: 'box'
        },
        {
          title: 'Out for Delivery with Farm Associate',
          tamilTitle: 'டெலிவரிக்கு புறப்பட்டுள்ளது',
          description: 'Delivery associate is en route with your live organic plants in temperature-managed van.',
          tamilDescription: 'டெலிவரி தோழர் உங்கள் செடிகளுடன் இல்லம் நோக்கி புறப்பட்டுள்ளார்.',
          location: 'Chennai Distribution Route',
          date: '24 Nov 2026',
          time: '03:10 PM',
          status: 'current',
          icon: 'truck'
        },
        {
          title: 'Live Arrival Delivery to Doorstep',
          tamilTitle: 'உங்கள் இல்லத்திற்கு டெலிவரி',
          description: 'Direct contactless handover with complimentary organic plant care guide in Tamil & English.',
          tamilDescription: 'இலவச தமிழ்/ஆங்கில பராமரிப்பு கையேடுடன் உங்கள் கைகளில் ஒப்படைக்கப்படும்.',
          location: 'Customer Address, Chennai',
          date: '24 Nov 2026',
          time: 'Expected by 05:45 PM',
          status: 'upcoming',
          icon: 'check'
        }
      ]
    },
    {
      orderId: 'BOG-2026-9102',
      mobile: '9840054321',
      customerName: 'Anitha Rajendran',
      orderDate: '23 Nov 2026, 04:15 PM',
      estimatedDelivery: '25 Nov 2026',
      statusText: 'Dispatched via Parcel Express',
      tamilStatusText: 'பார்சல் எக்ஸ்பிரஸ் மூலம் அனுப்பப்பட்டது',
      deliveryAddress: {
        street: '14, 5th Cross Street, Besant Nagar',
        area: 'Besant Nagar',
        city: 'Chennai',
        pincode: '600090'
      },
      trackingNumber: 'TN-BOG-910283',
      courierName: 'Express Parcel Delivery Service',
      items: [
        {
          productId: 'p4',
          name: '4-Tier Stepped Iron Plant Stand',
          tamilName: '4-அடுக்கு இரும்பு பூந்தொட்டி ஸ்டாண்ட்',
          image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=200&auto=format&fit=crop&q=80',
          price: 549,
          quantity: 1,
          pack: 'Single Stand'
        },
        {
          productId: 'p5',
          name: 'HDPE Green Grow Bags (24x24 Inch UV Treated)',
          tamilName: '24x24 UV குரோ பேக் (பச்சை)',
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200&auto=format&fit=crop&q=80',
          price: 149,
          quantity: 2,
          pack: 'Pack of 1'
        }
      ],
      subtotal: 847,
      deliveryCharge: 0,
      discount: 0,
      total: 847,
      paymentMethod: 'Prepaid (Verified)',
      timeline: [
        {
          title: 'Order Placed & Confirmed',
          tamilTitle: 'ஆர்டர் உறுதி செய்யப்பட்டது',
          description: 'Order received and scheduled for dispatch.',
          tamilDescription: 'ஆர்டர் பெறப்பட்டு அனுப்ப திட்டமிடப்பட்டது.',
          location: 'Babu Organic Garden',
          date: '23 Nov 2026',
          time: '04:20 PM',
          status: 'completed',
          icon: 'cart'
        },
        {
          title: 'Items Packed Securely',
          tamilTitle: 'பொருட்கள் பேக் செய்யப்பட்டன',
          description: 'Metal stand protected and UV grow bags bundled.',
          tamilDescription: 'ஸ்டாண்ட் மற்றும் குரோ பேக்குகள் உறுதியாக பேக் செய்யப்பட்டது.',
          location: 'Babu Organic Warehouse',
          date: '23 Nov 2026',
          time: '07:30 PM',
          status: 'completed',
          icon: 'box'
        },
        {
          title: 'Handed to Courier Express Fleet',
          tamilTitle: 'கொரியர் நிறுவனத்திடம் ஒப்படைக்கப்பட்டது',
          description: 'Tracking manifest generated: TN-BOG-910283.',
          tamilDescription: 'கொரியர் டிராக்கிங் எண் உருவாக்கப்பட்டது: TN-BOG-910283.',
          location: 'Regional Sorting Center',
          date: '24 Nov 2026',
          time: '10:00 AM',
          status: 'current',
          icon: 'truck'
        },
        {
          title: 'Out for Delivery to Recipient',
          tamilTitle: 'டெலிவரிக்கு புறப்பட்டுள்ளது',
          description: 'Package arriving at regional distribution facility.',
          tamilDescription: 'பார்சல் விநியோக மையத்திற்கு வருகிறது.',
          location: 'Chennai Delivery Office',
          date: '25 Nov 2026',
          time: 'Expected by 12:00 PM',
          status: 'upcoming',
          icon: 'truck'
        },
        {
          title: 'Delivered',
          tamilTitle: 'டெலிவரி செய்யப்பட்டது',
          description: 'Handed to recipient with receipt.',
          tamilDescription: 'ரசீதுடன் வாடிக்கையாளரிடம் ஒப்படைக்கப்படும்.',
          location: 'Customer Address',
          date: '25 Nov 2026',
          time: 'Expected Afternoon',
          status: 'upcoming',
          icon: 'check'
        }
      ]
    }
  ];

  findOrder(orderId: string, mobile: string): Order | null {
    const cleanId = orderId.trim().toUpperCase();
    const cleanMobile = mobile.trim().replace(/\D/g, '');

    const found = this.demoOrders.find(
      o => o.orderId.toUpperCase() === cleanId || o.mobile.includes(cleanMobile)
    );

    if (found) return found;

    // If customer entered custom values for testing, generate a realistic active order
    if (cleanId.length > 2 || cleanMobile.length >= 4) {
      return {
        orderId: cleanId.startsWith('BOG-') ? cleanId : `BOG-${cleanId}`,
        mobile: cleanMobile || '9840012345',
        customerName: 'Valued Plant Parent',
        orderDate: 'Today, 10:15 AM',
        estimatedDelivery: 'Within 24-48 Hours',
        statusText: 'In Transit — Safe Live Packing',
        tamilStatusText: 'வழியில் உள்ளது — பாதுகாப்பான நேரடி பேக்கிங்',
        deliveryAddress: {
          street: 'Main Road',
          area: 'Chennai Zone',
          city: 'Chennai',
          pincode: '600001'
        },
        trackingNumber: `BOG-TRK-${Math.floor(100000 + Math.random() * 900000)}`,
        courierName: 'Babu Organic Express Logistics',
        items: [
          {
            productId: 'p1',
            name: 'Monstera Deliciosa Tropical Plant',
            tamilName: 'மான்ஸ்டெரா செடி',
            image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&auto=format&fit=crop&q=80',
            price: 349,
            quantity: 1,
            pack: 'Pack of 1'
          },
          {
            productId: 'p5',
            name: 'HDPE Green Grow Bags (24x24 Inch UV Treated)',
            tamilName: '24x24 UV குரோ பேக்',
            image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200&auto=format&fit=crop&q=80',
            price: 149,
            quantity: 2,
            pack: 'Pack of 1'
          }
        ],
        subtotal: 647,
        deliveryCharge: 0,
        discount: 0,
        total: 647,
        paymentMethod: 'Prepaid (Verified)',
        timeline: [
          {
            title: 'Order Placed & Verified',
            tamilTitle: 'ஆர்டர் உறுதி செய்யப்பட்டது',
            description: 'Live order confirmed by Babu Organic dispatch center.',
            tamilDescription: 'விநியோக மையத்தால் ஆர்டர் உறுதி செய்யப்பட்டது.',
            location: 'Babu Organic Dispatch Hub',
            date: 'Today',
            time: '10:15 AM',
            status: 'completed',
            icon: 'cart'
          },
          {
            title: 'Plants Handpicked & Moisture Sealed',
            tamilTitle: 'செடிகள் தேர்வு செய்யப்பட்டு தயார் செய்யப்பட்டன',
            description: 'Healthy nursery foliage selected with organic root conditioning.',
            tamilDescription: 'ஆரோக்கியமான செடிகள் தேர்ந்தெடுக்கப்பட்டன.',
            location: 'Babu Organic Farm Beds',
            date: 'Today',
            time: '11:45 AM',
            status: 'completed',
            icon: 'leaf'
          },
          {
            title: 'In Transit to Regional Sorting Facility',
            tamilTitle: 'அனுப்பப்பட்டு விநியோகத்தில் உள்ளது',
            description: 'Ventilated parcel packaging loaded on delivery fleet.',
            tamilDescription: 'பார்சல் வாகனத்தில் ஏற்றப்பட்டுள்ளது.',
            location: 'Regional Logistics Hub',
            date: 'Today',
            time: '02:00 PM',
            status: 'current',
            icon: 'truck'
          },
          {
            title: 'Delivered Safely to Doorstep',
            tamilTitle: 'டெலிவரி செய்யப்படும்',
            description: 'Plant arrival guaranteed healthy and fresh.',
            tamilDescription: 'செடிகள் பாதுகாப்பாக உங்கள் இல்லத்தை வந்தடையும்.',
            location: 'Your Address',
            date: 'Tomorrow',
            time: 'By Afternoon',
            status: 'upcoming',
            icon: 'check'
          }
        ]
      };
    }

    return null;
  }
}
