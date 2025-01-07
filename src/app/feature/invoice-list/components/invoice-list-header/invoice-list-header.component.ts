import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-invoice-list-header',
  standalone: true,
  imports: [
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    ButtonComponent,
  ],
  templateUrl: './invoice-list-header.component.html',
})
export class InvoiceListHeaderComponent {
  private _formBuilder = inject(FormBuilder);

  @Input() invoiceListSize: number = 0;

  @Output() sidenavToggle = new EventEmitter<void>();

  filterByStatus = this._formBuilder.group({
    draft: false,
    pending: false,
    paid: false,
  });

  getTotalInvoiceText(): string {
    return this.invoiceListSize > 0
      ? `There are ${this.invoiceListSize} total invoices`
      : `No invoices`;
  }

  emitSidenavToggle() {
    this.sidenavToggle.emit();
  }
}
