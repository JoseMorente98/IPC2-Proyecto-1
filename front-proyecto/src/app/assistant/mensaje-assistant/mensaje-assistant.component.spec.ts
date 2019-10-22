import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeAssistantComponent } from './mensaje-assistant.component';

describe('MensajeAssistantComponent', () => {
  let component: MensajeAssistantComponent;
  let fixture: ComponentFixture<MensajeAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
