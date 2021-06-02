import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorFormBoxComponent } from './calculator-form-box.component';

describe('CalculatorFormBoxComponent', () => {
  let component: CalculatorFormBoxComponent;
  let fixture: ComponentFixture<CalculatorFormBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorFormBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorFormBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
