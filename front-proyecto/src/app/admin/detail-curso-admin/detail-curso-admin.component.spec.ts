import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCursoAdminComponent } from './detail-curso-admin.component';

describe('DetailCursoAdminComponent', () => {
  let component: DetailCursoAdminComponent;
  let fixture: ComponentFixture<DetailCursoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCursoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCursoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
