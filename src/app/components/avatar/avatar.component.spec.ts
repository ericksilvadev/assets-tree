import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('avatarName', 'John Doe');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display avatar with first letter from name', () => {
    // arrange
    const avatar = fixture.debugElement.nativeElement.querySelector('div.avatar');

    // assert
    expect(avatar.textContent).toEqual('J');
  });
});
