import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {Account} from '../../models/account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent {

  accountForm: FormGroup;
  @Output()closeEvent=new EventEmitter<void>


  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.accountForm = fb.group({
        id: [],
        name: ["", Validators.required],
        fixedCosts: [[]],
        transactions: [[]]
      }
    )
  }

  createAccount(): void {
    const account: Account = this.accountForm.value;
    this.accountService.addAccount(account).subscribe(data => {
      this.closeForm();
    });
  }

  closeForm(): void{
    this.closeEvent.emit();
  }

}
