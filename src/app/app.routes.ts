import { Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './feature/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './feature/invoice-list/invoice-list.component';

export const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
];
