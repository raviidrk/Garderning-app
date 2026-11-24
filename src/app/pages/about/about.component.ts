import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  langService = inject(LanguageService);
  route = inject(ActivatedRoute);

  activeSection = signal<'story' | 'shipping' | 'refund' | 'privacy' | 'terms'>('story');

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment === 'shipping' || fragment === 'refund' || fragment === 'privacy' || fragment === 'terms') {
        this.activeSection.set(fragment);
      }
    });
  }

  setSection(sec: 'story' | 'shipping' | 'refund' | 'privacy' | 'terms'): void {
    this.activeSection.set(sec);
  }
}
