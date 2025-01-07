import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { StatusIndicatorComponent } from '../../shared/components/status-indicator/status-indicator.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [StatusIndicatorComponent, ButtonComponent],
  templateUrl: './invoice-details.component.html',
})
export class InvoiceDetailsComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  itemListFormArray = [1, 2];

  invoiceId = signal<number | bigint | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const invoiceId = params.get('invoiceId');
      this.invoiceId.set(invoiceId ? parseInt(invoiceId) : null);
    });
  }

  navigateToInvoiceList(): void {
    this.router.navigate(['/']);
  }
}
