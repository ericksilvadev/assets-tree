import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from './icon.component';
import { svgIcons } from './icon.svg';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: []
    })
      .overrideComponent(IconComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get icon correctly', () => {
    // arrange
    const iconName = 'asset';
    const expectedIcon = svgIcons[iconName].content;

    // act
    const icon = component['getIcon'](iconName);

    // assert
    expect(icon).toContain(expectedIcon);
  });
});
