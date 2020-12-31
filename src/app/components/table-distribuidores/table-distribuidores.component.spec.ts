import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDistribuidoresComponent } from './table-distribuidores.component';

describe('TableDistribuidoresComponent', () => {
  let component: TableDistribuidoresComponent;
  let fixture: ComponentFixture<TableDistribuidoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDistribuidoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDistribuidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
