import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { UrlResultComponent } from '../url-result/url-result.component';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
    ErrorMessageComponent,
    UrlResultComponent
  ],
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent {
  form: FormGroup;
  result: string | null = null;
  error: string | null = null;
  isLoading = false;
  isCopied = false;

  private readonly minimumLoadingTime = 500;

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService) {
    this.form = this.fb.group({
      url: ['', 
      [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=]*)?$/)
      ]],
      minutes: [5, [Validators.min(1)]]
    });
  }

  async onSubmit() {
    if (this.form.valid && !this.isLoading) {
      const startTime = Date.now();
      this.isLoading = true;
      this.error = null;

      try {
        const finalUrl = this.normalizeUrl(this.form.value.url);

        this.urlService.shortenUrl(finalUrl, this.form.value.minutes).subscribe({

          next: (res) => {
            this.handleSuccess(res, startTime);
          },
          error: (err) => {
            this.handleError(err, startTime);
          }});
        } catch (error: any) {
          this.handleError(error, startTime);
        }}
      }
  
  private normalizeUrl(rawUrl: string): string {
    if (!rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
      return `http://${rawUrl}`;
    }
    return rawUrl;
  }

  private handleSuccess(res: any, startTime: number) {
    const elapsed = Date.now() - startTime;
    const remainingTime = this.minimumLoadingTime - elapsed;
    
    if (remainingTime > 0) {
      setTimeout(() => {
        this.result = res.shortUrl;
        this.isLoading = false;
      }, remainingTime);
    } else {
      this.result = res.shortUrl;
      this.isLoading = false;
    }
  }

  private handleError(error: any, startTime: number) {
    const elapsed = Date.now() - startTime;
    const remainingTime = this.minimumLoadingTime - elapsed;
  
    let errorMessage = 'Erro inesperado';
  
    if (error.status === 0) {
      errorMessage = 'Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
  
    if (remainingTime > 0) {
      setTimeout(() => {
        this.error = errorMessage;
        this.isLoading = false;
      }, remainingTime);
    } else {
      this.error = errorMessage;
      this.isLoading = false;
    }
  
    this.result = null;
  }
}
