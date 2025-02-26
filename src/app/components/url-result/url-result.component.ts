import { Component, Input } from '@angular/core';
import { CopyBtnComponent } from "../copy-btn/copy-btn.component";

@Component({
  selector: 'app-url-result',
  imports: [CopyBtnComponent],
  templateUrl: './url-result.component.html',
  styleUrl: './url-result.component.scss'
})
export class UrlResultComponent {
  @Input() result: string | null = null;
}
