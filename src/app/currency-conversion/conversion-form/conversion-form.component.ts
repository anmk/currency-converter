import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './conversion-form.component.html'
})
export class ConversionFormComponent {
  @Output() addOrder = new EventEmitter<{}>();
  conversionForm!: FormGroup;
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.buildOrderForm();
  }

  private buildOrderForm(): FormGroup {
   return this.conversionForm = this.formBuilder.group({
    calculatedAmount: [null, [Validators.required]],
    });
  }

  addNewConvert(): void {
    this.addOrder.emit(+this.conversionForm.value.calculatedAmount);
  }

}
