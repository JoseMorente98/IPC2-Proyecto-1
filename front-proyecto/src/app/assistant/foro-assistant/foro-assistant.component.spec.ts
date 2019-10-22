import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoAssistantComponent } from './foro-assistant.component';

describe('ForoAssistantComponent', () => {
  let component: ForoAssistantComponent;
  let fixture: ComponentFixture<ForoAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
