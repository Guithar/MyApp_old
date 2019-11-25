import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMaintListComponent } from './client-maint-list.component';

describe('ClientMaintListComponent', () => {
  let component: ClientMaintListComponent;
  let fixture: ComponentFixture<ClientMaintListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMaintListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMaintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
