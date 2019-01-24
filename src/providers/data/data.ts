import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/Operators';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { Toefl } from './toefl.model';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  toeflLists: Observable<Toefl[]>;
  toeflListLey = 'my-toefl-group';
  public toeflsListsChanged = new Subject<Toefl[]>();

  constructor(public http: HttpClient,
              private toast: ToastController,
              private cache: CacheService

    ) {
    console.log('Hello DataProvider Provider');
  }

  loadToeflLists(refresher?) {

    let url = 'https://examsimv100.herokuapp.com/showexam/';
    let req = this.http.get<{message: string, toefls: any[]}>(url)
              .pipe(
                      map( (res) => {
                        let toast = this.toast.create({
                          message: 'New data from API loaded',
                          duration: 2000
                        });
                        toast.present();
                        console.log(res.toefls);
                        return res.toefls;
                      })

              )

              let ttl= 10;

              if(refresher) {
                let delayType = 'all';
                 this.cache.loadFromDelayedObservable( url, req, this.toeflListLey, ttl, delayType )
                       .subscribe( data => {
                         console.log('server data: ', data);
                         this.toeflsListsChanged.next( data );
                         refresher.complete();
                       })

              } else {
                 this.cache.loadFromObservable( url, req, this.toeflListLey, ttl)
                      .subscribe( data1 => {
                        console.log( data1 );
                        this.toeflsListsChanged.next( data1 );
                      })


              }
     }
 cashInvalidateService() {
  this.cache.clearGroup(this.toeflListLey);
 }
 forceToReresher(refresher) {
  this.loadToeflLists(refresher);
 }
}
