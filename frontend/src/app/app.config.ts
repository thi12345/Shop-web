import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    importProvidersFrom(NgxSpinnerModule.forRoot({type: 'ball-scale-multiple'})),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    })),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(),
  
    withInterceptors([errorInterceptor, loadingInterceptor, jwtInterceptor]),
   
  ),
  importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync()
  ]
};
