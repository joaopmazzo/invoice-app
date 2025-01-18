import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxCurrencyDirective],
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor, OnInit {
  @Input() fieldName: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input() pattern: string | RegExp = '';
  @Input() required: boolean = false;
  @Input() max: number | null = null;
  @Input() min: number | null = null;
  @Input() step: number = 0.1;
  @Input() control?: FormControl;

  internalControl: FormControl = new FormControl('');

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  ngOnInit() {
    if (this.control) {
      this.internalControl = this.control;
    }
    this.setDisabledState(this.disabled);
  }

  writeValue(value: any): void {
    this.internalControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.internalControl.disable() : this.internalControl.enable();
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.internalControl.setValue(value, { emitEvent: false });
  }

  getErrorMessage(): string {
    if (this.internalControl.errors?.['required']) {
      return `can't be empty.`;
    }
    if (this.internalControl.errors?.['email']) {
      return `invalid email address.`;
    }
    if (this.internalControl.errors?.['minlength']) {
      return `tho short (${this.internalControl.errors['minlength'].requiredLength}).`;
    }
    if (this.internalControl.errors?.['min']) {
      return `must be at least ${this.internalControl.errors['min'].min}.`;
    }
    if (this.internalControl.errors?.['max']) {
      return `must not exceed ${this.internalControl.errors['max'].max}.`;
    }
    return 'invalid input.';
  }
}
