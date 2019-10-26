import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadAssistantComponent } from './actividad-assistant.component';

describe('ActividadAssistantComponent', () => {
  let component: ActividadAssistantComponent;
  let fixture: ComponentFixture<ActividadAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
