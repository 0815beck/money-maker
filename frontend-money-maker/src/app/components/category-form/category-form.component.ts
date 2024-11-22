import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  categoryForm!: FormGroup;
  @Output() returnToTransaction = new EventEmitter<boolean>();
  pictureList!: [];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  return() {
    this.returnToTransaction.emit(false);
  }
}
