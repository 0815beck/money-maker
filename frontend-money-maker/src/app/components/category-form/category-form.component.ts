import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent {
  categoryForm!: FormGroup;
  @Output() returnToTransaction = new EventEmitter<boolean>();
  selectedPicture!: string;

  pictureList: string[] = [
    'https://img.icons8.com/?size=100&id=9aS0IadEbesZ&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=r1zeTmH4eIib&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=QVQY51sDgy1I&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=14181&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=85007&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=31799&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=73815&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=l5Br0fxxE35Q&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=86123&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=241&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=4823&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=106514&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=11441&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=62370&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=2772&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=35583&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=11587&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=8242&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=381&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=GXbDr_HC5ZF1&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=6632&format=png&color=000000',
    'https://img.icons8.com/?size=100&id=jiAKUZAnt9go&format=png&color=000000'



  ];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: [''],
    });
  }

  return() {
    this.returnToTransaction.emit(false);
  }

  selectPicture(picture: string) {
    this.selectedPicture = picture;

    const input = document.getElementById(
      'selected-picture'
    ) as HTMLInputElement;
    input.value = this.selectedPicture;
    input.classList.add('selected');
    console.log(input.value);
  }

  onSubmit() {
    const newCategory: Category = {
      name: this.categoryForm.get('name')?.value,
      imgUrl: this.selectedPicture,
    };
    console.log(newCategory);

    this.categoryService.addCategory(newCategory).subscribe({
      next: () => {
        console.log('Saved Category');
        this.return();
      },
      error: (error) => {
        console.error('Can not save Category', error);
      },
    });
  }
}
