import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Status } from '../../../enums/status';

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-indicator.component.html',
})
export class StatusIndicatorComponent {
  @Input() invoiceStatus!: number;
  status = Status;
}
