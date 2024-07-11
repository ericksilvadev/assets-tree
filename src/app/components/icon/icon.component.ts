import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, WritableSignal, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { svgIcons } from './icon.svg';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: '<div [innerHTML]="icon()" class="icon"></div>',
  styleUrl: './icon.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {

  @Input()
  name: string = '';

  protected icon: WritableSignal<SafeHtml> = signal('');

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setIcon();
  }

  private setIcon(): void {
    const icon = this.getIcon(this.name);

    this.icon.set(icon);
  }

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
