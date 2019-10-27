import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAssistantComponent } from './evaluacion-assistant.component';

describe('EvaluacionAssistantComponent', () => {
  let component: EvaluacionAssistantComponent;
  let fixture: ComponentFixture<EvaluacionAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
