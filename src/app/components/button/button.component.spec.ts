import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon correctly', () => {
    // arrange
    component.icon = 'asset';

    // act
    fixture.detectChanges();
    const iconComponent = fixture.debugElement.query(By.css('app-icon')).componentInstance as IconComponent;

    // assert
    expect(iconComponent.name).toBe(component.icon);
  });

  it('should not render icon if icon is not provided', () => {
    // act
    fixture.detectChanges();
    const iconComponent = fixture.debugElement.query(By.css('app-icon'));

    // assert
    expect(iconComponent).toBeNull();
  });
});
