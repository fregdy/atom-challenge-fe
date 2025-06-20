import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "../../core/auth.interceptor";

describe('TaskTableComponent', () => {
  let component: TaskTableComponent;
  let fixture: ComponentFixture<TaskTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTableComponent],
      providers: [provideHttpClient(withInterceptors([authInterceptor])),]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
