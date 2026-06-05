import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaPublicacoes } from './tela-publicacoes';

describe('TelaPublicacoes', () => {
  let component: TelaPublicacoes;
  let fixture: ComponentFixture<TelaPublicacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaPublicacoes],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaPublicacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
