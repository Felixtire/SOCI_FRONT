import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaConexoes } from './tela-conexoes';

describe('TelaConexoes', () => {
  let component: TelaConexoes;
  let fixture: ComponentFixture<TelaConexoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaConexoes],
    }).compileComponents();

    fixture = TestBed.createComponent(TelaConexoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
