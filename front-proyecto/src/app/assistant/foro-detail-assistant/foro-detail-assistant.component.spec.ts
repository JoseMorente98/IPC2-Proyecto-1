import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoDetailAssistantComponent } from './foro-detail-assistant.component';

describe('ForoDetailAssistantComponent', () => {
  let component: ForoDetailAssistantComponent;
  let fixture: ComponentFixture<ForoDetailAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoDetailAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoDetailAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
