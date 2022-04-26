import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsComponentComponent } from './add-questions-component.component';

describe('AddQuestionsComponentComponent', () => {
  let component: AddQuestionsComponentComponent;
  let fixture: ComponentFixture<AddQuestionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
