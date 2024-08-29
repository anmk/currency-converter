import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-conversion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './conversion-form.component.html'
})
export class ConversionFormComponent {
  @Output() addOrder = new EventEmitter<{}>();
  private formBuilder = inject(FormBuilder);
  conversionForm!: FormGroup;
  
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
