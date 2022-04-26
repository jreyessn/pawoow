import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVeterinaryComponent } from './edit-veterinary.component';

describe('EditVeterinaryComponent', () => {
  let component: EditVeterinaryComponent;
  let fixture: ComponentFixture<EditVeterinaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVeterinaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVeterinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
