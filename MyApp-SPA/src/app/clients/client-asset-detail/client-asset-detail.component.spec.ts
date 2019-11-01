import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAssetDetailComponent } from './client-asset-detail.component';

describe('ClientAssetDetailComponent', () => {
  let component: ClientAssetDetailComponent;
  let fixture: ComponentFixture<ClientAssetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAssetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
