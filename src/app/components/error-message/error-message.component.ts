import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() show = false;
  @Input() title = 'Something Went Wrong';
  @Input() message = 'We encountered an unexpected issue. Please try again later.';
  @Input() note = 'If the problem persists, contact support.';
}

