import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaCriarEvento } from './tela-criar-evento';

describe('TelaCriarEvento', () => {
  let component: TelaCriarEvento;
  let fixture: ComponentFixture<TelaCriarEvento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaCriarEvento],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaCriarEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
