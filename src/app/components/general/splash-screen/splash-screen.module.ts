import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}


@NgModule({
  declarations: [SplashScreenComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [SplashScreenComponent]
})
export class SplashScreenModule { }
