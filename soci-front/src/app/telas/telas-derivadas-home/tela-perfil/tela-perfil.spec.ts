import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPerfil } from './tela-perfil';

describe('TelaPerfil', () => {
  let component: TelaPerfil;
  let fixture: ComponentFixture<TelaPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
