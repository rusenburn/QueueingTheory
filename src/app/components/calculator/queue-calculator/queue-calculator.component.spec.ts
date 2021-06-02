import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueCalculatorComponent } from './queue-calculator.component';

describe('QueueCalculatorComponent', () => {
  let component: QueueCalculatorComponent;
  let fixture: ComponentFixture<QueueCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueueCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
