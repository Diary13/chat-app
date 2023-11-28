import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesListComponent } from './groupes-list.component';

describe('GroupesListComponent', () => {
  let component: GroupesListComponent;
  let fixture: ComponentFixture<GroupesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
