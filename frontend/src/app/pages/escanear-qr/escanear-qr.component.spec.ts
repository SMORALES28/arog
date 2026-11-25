import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscanearQrComponent } from './escanear-qr.component';

describe('EscanearQrComponent', () => {
  let component: EscanearQrComponent;
  let fixture: ComponentFixture<EscanearQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EscanearQrComponent]
    });
    fixture = TestBed.createComponent(EscanearQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
