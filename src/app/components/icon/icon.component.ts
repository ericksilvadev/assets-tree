import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcons } from './icon.svg';

@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

  name = input<string>('');
  class = input<string>('');

  protected icon = computed(() => this.getIcon(this.name()));

  constructor(private sanitizer: DomSanitizer) { }

  private getIcon(name: string): SafeHtml {
    const icon = svgIcons[name];

    if (!icon) {
      console.warn(`Icon ${name} not found`);

      return '';
    }

    const iconsString = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-svg" viewBox="${icon.viewBox}">${icon.content}</svg>`;

    return this.sanitizer.bypassSecurityTrustHtml(iconsString);
  }
}
