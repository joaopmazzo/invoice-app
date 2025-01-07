import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StatusIndicatorComponent } from '../../../../shared/components/status-indicator/status-indicator.component';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [StatusIndicatorComponent],
  templateUrl: './invoice-card.component.html',
})
export class InvoiceCardComponent {
  private router = inject(Router);

  @Input() invoiceId!: number;
  @Input() invoiceDate!: string;
  @Input() invoiceClientName!: string;
  @Input() invoiceTotalPrice!: number;
  @Input() invoiceStatus!: number;

  formatDateToString(dateString: string): string {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  formatCurrencyToString(currency: number | bigint): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(currency);
  }

  navigateToInvoiceDetails(invoiceId: number | bigint): void {
    this.router.navigate(['invoice/', invoiceId]);
  }
}
