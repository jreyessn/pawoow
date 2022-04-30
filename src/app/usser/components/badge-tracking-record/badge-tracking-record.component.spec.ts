import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeTrackingRecordComponent } from './badge-tracking-record.component';

describe('BadgeTrackingRecordComponent', () => {
  let component: BadgeTrackingRecordComponent;
  let fixture: ComponentFixture<BadgeTrackingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeTrackingRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTrackingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
