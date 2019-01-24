import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CacheService } from 'ionic-cache';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,

              private cache: CacheService) {
    platform.ready().then(() => {

      this.cache.setDefaultTTL( 60 * 60 * 12 );
      this.cache.setOfflineInvalidate(false);
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

