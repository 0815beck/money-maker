import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCostFormComponent } from './fixed-cost-form.component';
import {AccountService} from '../../services/account.service';
import {CategoryService} from '../../services/category.service';
import {FixedCostService} from '../../services/fixed-cost.service';
import {TransactionService} from '../../services/transaction.service';
import {of} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('FixedCostFormComponent', () => {
  let component: FixedCostFormComponent;
  let fixture: ComponentFixture<FixedCostFormComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockFixedCostService: jasmine.SpyObj<FixedCostService>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;

  beforeEach(async () => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['account$', 'refetchSelectedAccount']);
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategories', 'deleteCategory']);
    mockFixedCostService = jasmine.createSpyObj('FixedCostService', ['addFixedCost', 'modifyFixedCost']);
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['addTransaction']);

    // Mock observables
    mockAccountService.account$ = of({ id: 1, name: 'Test Account', transactions: [], fixedCosts: []});
    mockCategoryService.getCategories.and.returnValue(of([{ id: 1, name: 'Test Category' }]));
    await TestBed.configureTestingModule({
      declarations: [FixedCostFormComponent],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: FixedCostService, useValue: mockFixedCostService },
        { provide: TransactionService, useValue: mockTransactionService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedCostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
