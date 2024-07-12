import { Component, input, Input, InputSignal } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  icon = input('');
  variation = input<'primary' | 'secondary'>('primary');
}
