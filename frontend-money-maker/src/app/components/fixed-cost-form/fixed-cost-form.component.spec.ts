import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FixedCostFormComponent} from './fixed-cost-form.component';
import {AccountService} from '../../services/account.service';
import {CategoryService} from '../../services/category.service';
import {FixedCostService} from '../../services/fixed-cost.service';
import {TransactionService} from '../../services/transaction.service';
import {of} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FixedCost} from '../../models/fixed-cost';
import {Category} from '../../models/category';
import {Account} from '../../models/account';
import {FormBuilder} from '@angular/forms';
import {Transaction} from '../../models/transaction';

describe('FixedCostFormComponent', () => {
  let component: FixedCostFormComponent;
  let fixture: ComponentFixture<FixedCostFormComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockFixedCostService: jasmine.SpyObj<FixedCostService>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;


  beforeEach(async () => {
    mockAccountService = jasmine.createSpyObj('AccountService', ['refetchSelectedAccount']);
    mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategories', 'deleteCategory']);
    mockFixedCostService = jasmine.createSpyObj('FixedCostService', ['addFixedCost', 'modifyFixedCost']);
    mockTransactionService = jasmine.createSpyObj('TransactionService', ['addTransaction']);

    const testAccount: Account = {id: 1, name: 'Test Account', transactions: [], fixedCosts: []};
    const testCategory: Category = {id: 1, name: 'Test Category'};
    const testFixedCost: FixedCost = {
      id: 1,
      amount: 100,
      start: new Date('2024-01-01'),
      description: 'Test Fixed Cost',
      category: testCategory,
      account: testAccount,
      generatedTransactions: []
    };

    mockAccountService.account$ = of(testAccount);
    mockCategoryService.getCategories.and.returnValue(of([testCategory]));
    mockFixedCostService.addFixedCost.and.returnValue(of(testFixedCost));
    mockFixedCostService.modifyFixedCost.and.returnValue(of(testFixedCost));
    mockTransactionService.addTransaction.and.returnValue(of({
      amount: 100,
      account: testAccount,
      category: testCategory,
      description: 'Test',
      timestamp: new Date(),
      isFixedCost: true
    } as Transaction));
    mockCategoryService.deleteCategory.and.returnValue(of(undefined));


    await TestBed.configureTestingModule({
      imports: [],
      declarations: [FixedCostFormComponent],
      providers: [
        {provide: AccountService, useValue: mockAccountService},
        {provide: CategoryService, useValue: mockCategoryService},
        {provide: FixedCostService, useValue: mockFixedCostService},
        {provide: TransactionService, useValue: mockTransactionService},
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FixedCostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the form with default values when selectedFixedCost is provided', () => {
    const selectedFixedCost: FixedCost = {
      id: 1,
      amount: 100,
      start: new Date('2024-01-01'),
      description: 'Test Fixed Cost',
      category: {id: 1, name: 'Test Category'},
      account: {id: 1, name: 'Test Account', transactions: [], fixedCosts: []},
      generatedTransactions: []
    };
    component.selectedFixedCost = selectedFixedCost;

    component.ngOnChanges();

    expect(component.fixedCostForm.get('id')?.value).toBe(selectedFixedCost.id);
    expect(component.fixedCostForm.get('amount')?.value).toBe(selectedFixedCost.amount);
    expect(component.fixedCostForm.get('start')?.value).toBe(selectedFixedCost.start);
    expect(component.fixedCostForm.get('description')?.value).toBe(selectedFixedCost.description);
    expect(component.fixedCostForm.get('category')?.value).toEqual(selectedFixedCost.category);
    expect(component.fixedCostForm.get('account')?.value).toEqual(selectedFixedCost.account);
    expect(component.fixedCostForm.get('generatedTransactions')?.value).toEqual(selectedFixedCost.generatedTransactions);
  });

  it('should not fill the form if selectedFixedCost is undefined', () => {
    component.selectedFixedCost = undefined;

    component.ngOnChanges();

    expect(component.fixedCostForm.get('id')?.value).toBeNull();
    expect(component.fixedCostForm.get('amount')?.value).toBe("");
  });

  it('should not fill the form if categoryList is empty', () => {
    component.selectedFixedCost = {
      id: 1,
      amount: 100,
      start: new Date('2024-01-01'),
      description: 'Test Fixed Cost',
      category: {id: 1, name: 'Test Category'},
      account: {id: 1, name: 'Test Account', transactions: [], fixedCosts: []},
      generatedTransactions: []
    };
    component.categoryList = [];

    component.ngOnChanges();

    expect(component.fixedCostForm.get('category')?.value).toBe("");
  });

  it('should create a new fixed cost and add a transaction if start date is today and selectedFixedCost is null', () => {
    const newFixedCost: FixedCost = {
      id: null,
      amount: 100,
      start: new Date(),
      description: 'Test',
      category: {id: 1, name: 'Test Category'},
      account: {id: 1, name: 'Test Account', transactions: [], fixedCosts: []},
      generatedTransactions: []
    };
    component.fixedCostForm.setValue(newFixedCost);
    component.transactionType = '-1';
    spyOn(component, 'closeForm');

    component.createFixedCost();

    expect(mockTransactionService.addTransaction).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      amount: newFixedCost.amount * -1,
      account: newFixedCost.account,
      category: newFixedCost.category,
      description: newFixedCost.description,
      isFixedCost: true
    }));
    expect(mockFixedCostService.addFixedCost).toHaveBeenCalledWith(jasmine.objectContaining({
      id: null,
      amount: newFixedCost.amount * -1,
      start: newFixedCost.start,
      description: newFixedCost.description,
      category: newFixedCost.category,
      account: newFixedCost.account,
      generatedTransactions: jasmine.any(Array)
    }));
    expect(mockAccountService.refetchSelectedAccount).toHaveBeenCalled();
    expect(component.closeForm).toHaveBeenCalled();
  });

  it('should create a new fixed cost but not a new transaction if the starter ist not today', () => {
    const newFixedCost: FixedCost = {
      id: null,
      amount: 100,
      start: new Date('22-11-2023'),
      description: 'Test',
      category: {id: 1, name: 'Test Category'},
      account: {id: 1, name: 'Test Account', transactions: [], fixedCosts: []},
      generatedTransactions: []
    };
    component.fixedCostForm.setValue(newFixedCost);
    component.transactionType = '1';

    component.createFixedCost();
    expect(mockFixedCostService.addFixedCost).toHaveBeenCalled();
    expect(mockTransactionService.addTransaction).not.toHaveBeenCalled();
  });

  it('should update the fixed cost if it has and not add a transaction if selectedFixedCost is not null', () => {
    const existingFixedCost: FixedCost = {
      id: 1,
      amount: 100,
      start: new Date(),
      description: 'Test',
      category: {id: 1, name: 'Test Category'},
      account: {id: 1, name: 'Test Account', transactions: [], fixedCosts: []},
      generatedTransactions: []
    };
    component.fixedCostForm.setValue(existingFixedCost);
    component.transactionType = '1';
    component.selectedFixedCost = existingFixedCost;
    spyOn(component, 'closeForm');

    component.createFixedCost();

    expect(mockFixedCostService.addFixedCost).not.toHaveBeenCalled();
    expect(mockTransactionService.addTransaction).not.toHaveBeenCalled();
    expect(mockFixedCostService.modifyFixedCost).toHaveBeenCalledWith(existingFixedCost);
    expect(mockAccountService.refetchSelectedAccount).toHaveBeenCalled();
    expect(component.closeForm).toHaveBeenCalled();
  });

  it('should call getCategories and populate categoryList on success', () => {
    const mockCategories = [{id: 1, name: 'Test Category'}];
    component.loadCategories();
    fixture.detectChanges();
    expect(mockCategoryService.getCategories).toHaveBeenCalled();
    expect(component.categoryList).toEqual(mockCategories);
  });

  it('should call delete with the id of the selected category', () => {
    const mockCategory = {id: 1, name: 'Test Category'};
    component.fixedCostForm.get('category')?.setValue(mockCategory);
    spyOn(component, 'loadCategories')

    component.deleteSelectedCategory();
    fixture.detectChanges();


    expect(mockCategoryService.deleteCategory).toHaveBeenCalledOnceWith(1);
    expect(component.loadCategories).toHaveBeenCalled();
    expect(component.fixedCostForm.get('category')?.value).toEqual('');
  });

});
