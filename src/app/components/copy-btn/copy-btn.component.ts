import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-btn',
  imports: [],
  templateUrl: './copy-btn.component.html',
  styleUrl: './copy-btn.component.scss'
})
export class CopyBtnComponent {

  @Input() text = '';
  isCopied = false;

  copyToClipboard() {
    navigator.clipboard.writeText(this.text).then(() => {
      this.isCopied = true;
      setTimeout(() => this.isCopied = false, 2000);
    });
  }

}
