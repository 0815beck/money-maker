import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewFixedCostsComponent } from './overview-fixed-costs.component';

describe('OverviewFixedCostsComponent', () => {
  let component: OverviewFixedCostsComponent;
  let fixture: ComponentFixture<OverviewFixedCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewFixedCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewFixedCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
