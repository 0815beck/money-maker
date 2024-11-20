import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCostFormComponent } from './fixed-cost-form.component';

describe('FixedCostFormComponent', () => {
  let component: FixedCostFormComponent;
  let fixture: ComponentFixture<FixedCostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedCostFormComponent]
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
