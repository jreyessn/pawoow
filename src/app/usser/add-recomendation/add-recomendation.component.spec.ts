import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecomendationComponent } from './add-recomendation.component';

describe('AddRecomendationComponent', () => {
  let component: AddRecomendationComponent;
  let fixture: ComponentFixture<AddRecomendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecomendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecomendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
