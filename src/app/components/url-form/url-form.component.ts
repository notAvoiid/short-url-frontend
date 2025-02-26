import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../../services/url.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  constructor(private fb: FormBuilder,private urlService: UrlService) {
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


  copyToClipboard() {
    if (this.result) {
      navigator.clipboard.writeText(this.result)
        .then(() => {
          this.isCopied = true;
          setTimeout(() => this.isCopied = false, 2000); // Feedback some após 2 segundos
        })
        .catch(err => {
          this.error = 'Falha ao copiar. Tente novamente!';
          console.error('Falha ao copiar URL:', err);});
    }
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

    if (remainingTime > 0) {
      setTimeout(() => {
        this.error = error.message || 'Erro ao encurtar URL';
        this.isLoading = false;
      }, remainingTime);
    } else {
      this.error = error.message || 'Erro ao encurtar URL';
      this.isLoading = false;
    }
    
    this.result = null;
  }
}
