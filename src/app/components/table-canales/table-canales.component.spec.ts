import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCanalesComponent } from './table-canales.component';

describe('TableCanalesComponent', () => {
  let component: TableCanalesComponent;
  let fixture: ComponentFixture<TableCanalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCanalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCanalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
