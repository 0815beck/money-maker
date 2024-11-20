import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  categoryForm!: FormGroup;
  pictureList = [
    'https://cdn.pixabay.com/photo/2017/10/04/12/18/shopping-2816045_1280.png',
    'https://cdn.pixabay.com/photo/2024/01/15/10/54/ai-generated-8509956_1280.png',
  ];
  @Output() returnToTransaction = new EventEmitter<boolean>();

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
