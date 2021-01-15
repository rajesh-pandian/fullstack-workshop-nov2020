import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDeleteConfirmationComponent } from './subject-delete-confirmation.component';

describe('RoomDeleteConfirmationComponent', () => {
  let component: SubjectDeleteConfirmationComponent;
  let fixture: ComponentFixture<SubjectDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
