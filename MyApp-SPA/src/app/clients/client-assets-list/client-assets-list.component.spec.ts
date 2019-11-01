import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAssetsListComponent } from './client-assets-list.component';

describe('ClientAssetsListComponent', () => {
  let component: ClientAssetsListComponent;
  let fixture: ComponentFixture<ClientAssetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAssetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
