import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDeleteConfirmationComponent } from './course-delete-confirmation.component';

describe('CourseDeleteConfirmationComponent', () => {
  let component: CourseDeleteConfirmationComponent;
  let fixture: ComponentFixture<CourseDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
