import { Routes } from '@angular/router';
import { UrlFormComponent } from './components/url-form/url-form.component';
import { ExpiredComponent } from './components/expired/expired.component';

export const routes: Routes = [
    { path: '', component: UrlFormComponent },
    { path: 'expired', component: ExpiredComponent },
    { path: '**', redirectTo: '/' } 
];
