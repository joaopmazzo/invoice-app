import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './invoice-form.component.html',
})
export class InvoiceFormComponent {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  form: FormGroup;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.form = this.fb.group({
      streetAddressFrom: ['', Validators.required],
      cityFrom: ['', Validators.required],
      postCodeFrom: ['', Validators.required],
      countryFrom: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      projectDescription: ['', Validators.required],
      itemList: this.fb.array(
        [],
        [this.minLengthArray(1), this.validateItemList()]
      ),
    });
  }

  get itemListFormArray() {
    return this.form.get('itemList') as FormArray;
  }

  async addItemList(): Promise<void> {
    const itemListForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.itemListFormArray.push(itemListForm);

    // Use NgZone to ensure we're back in the Angular zone
    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        this.ngZone.run(() => {
          this.scrollToBottom();
        });
      });
    });
  }

  removeItemList(index: number): void {
    this.itemListFormArray.removeAt(index);
  }

  getFormControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }

  getAddressControl(itemListIndex: number, controlName: string): FormControl {
    return this.itemListFormArray
      .at(itemListIndex)
      .get(controlName) as FormControl;
  }

  minLengthArray(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length >= min) {
        return null;
      }
      return { minLength: true };
    };
  }

  validateItemList() {
    return (control: AbstractControl): ValidationErrors | null => {
      const itemList = control as FormArray;
      let valid = true;
      itemList.controls.forEach((item) => {
        if (item.invalid) {
          valid = false;
        }
      });
      return valid ? null : { invalidItemList: true };
    };
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scroll({
        top: this.scrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  onSubmit() {
    if (!this.form.valid) this.form.markAllAsTouched();

    console.log(this.form.value);
  }
}
