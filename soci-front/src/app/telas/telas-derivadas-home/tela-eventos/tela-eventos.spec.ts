import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaEventos } from './tela-eventos';

describe('TelaEventos', () => {
  let component: TelaEventos;
  let fixture: ComponentFixture<TelaEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaEventos],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaEventos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
