import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarAdminComponent } from './auxiliar-admin.component';

describe('AuxiliarAdminComponent', () => {
  let component: AuxiliarAdminComponent;
  let fixture: ComponentFixture<AuxiliarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
