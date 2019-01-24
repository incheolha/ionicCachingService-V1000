import { Component, OnDestroy } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {

  toeflLists: any;
  toeflListLey = 'my-toefl-group';
  toeflListChanagedSub: Subscription;

  constructor(public navCtrl: NavController,


              private dataService: DataProvider) {

           this.dataService.loadToeflLists();


this.toeflListChanagedSub = this.dataService.toeflsListsChanged
                            .subscribe( (updatedToeflList) => {
                              this.toeflLists = updatedToeflList;
                            })


              }

   invalidateCache() {
        this.dataService.cashInvalidateService();
   }

   forceReload(refresher) {
    this.dataService.forceToReresher(refresher);
   }

   ngOnDestroy() {

   }
}
