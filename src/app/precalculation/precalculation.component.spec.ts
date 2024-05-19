import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecalculationComponent } from './precalculation.component';

describe('PrecalculationComponent', () => {
  let component: PrecalculationComponent;
  let fixture: ComponentFixture<PrecalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrecalculationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrecalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
