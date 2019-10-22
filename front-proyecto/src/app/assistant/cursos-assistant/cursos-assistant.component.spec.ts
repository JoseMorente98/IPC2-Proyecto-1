import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosAssistantComponent } from './cursos-assistant.component';

describe('CursosAssistantComponent', () => {
  let component: CursosAssistantComponent;
  let fixture: ComponentFixture<CursosAssistantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursosAssistantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
