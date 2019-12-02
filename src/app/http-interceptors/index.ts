import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './global-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor, multi: true }
]