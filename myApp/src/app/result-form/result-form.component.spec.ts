import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTableComponent } from './result-form.component';

describe('ResultFormComponent', () => {
  let component: ResultTableComponent;
  let fixture: ComponentFixture<ResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
