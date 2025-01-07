import { Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() iconSrc?: string;
  @Input() iconAlt?: string;
  @Input() buttonText!: string;

  @Input() variant:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'light'
    | 'light-variant' = 'primary';

  get buttonClasses(): string {
    const baseClasses =
      'rounded-full flex items-center justify-center gap-4 border-none w-full';
    const variantClasses = {
      primary: 'text-11 bg-01 hover:bg-02',
      secondary: 'text-06 dark:text-05 bg-04 hover:bg-08',
      danger: 'text-11 bg-09 hover:bg-10',
      light: 'text-07 bg-11 hover:bg-05',
      'light-variant':
        'text-07 dark:text-05 bg-05 dark:bg-04 hover:bg-06 dark:hover:bg-06',
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
