import { Component, OnInit } from '@angular/core';
import { SplashScreenStateService } from 'src/app/services/general/splash-scree/splash-screen-state.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {


  // The screen starts with the maximum opacity
  public opacityChange = 1;
  public splashTransition: any;
  // First access the splash is visible
  public showSplash = true;
  readonly ANIMATION_DURATION = 1;

  options: AnimationOptions = {
    path: '/assets/lotties/splash-screen-loader.json',
  };
  


  constructor(
    public splashScreenStateService: SplashScreenStateService
  ) { }

  ngOnInit(): void {

    // Somewhere the stop method has been invoked
   this.splashScreenStateService.subscribe((res: any) => {
        this.hideSplashAnimation();
    });

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }


  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
    setTimeout(() => {
       // After the transition is ended the showSplash will be hided
       this.showSplash = !this.showSplash;
    }, 1000);
 }

}
