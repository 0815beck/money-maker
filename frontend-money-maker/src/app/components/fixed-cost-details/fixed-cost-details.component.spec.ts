import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCostDetailsComponent } from './fixed-cost-details.component';

describe('FixedCostDetailsComponent', () => {
  let component: FixedCostDetailsComponent;
  let fixture: ComponentFixture<FixedCostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixedCostDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixedCostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
