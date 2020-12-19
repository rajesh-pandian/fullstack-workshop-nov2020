import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCourseDetailComponent } from './student-course-detail.component';

describe('StudentCourseDetailComponent', () => {
  let component: StudentCourseDetailComponent;
  let fixture: ComponentFixture<StudentCourseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
