import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCriarPublicacao } from './tela-criar-publicacao';

describe('TelaCriarPublicacao', () => {
  let component: TelaCriarPublicacao;
  let fixture: ComponentFixture<TelaCriarPublicacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCriarPublicacao],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaCriarPublicacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
