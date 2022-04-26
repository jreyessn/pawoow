import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionsComponentComponent } from './edit-questions-component.component';

describe('EditQuestionsComponentComponent', () => {
  let component: EditQuestionsComponentComponent;
  let fixture: ComponentFixture<EditQuestionsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestionsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuestionsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
