import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, TimeoutError, Subscription } from "rxjs";
import { LoadingController, AlertController } from 'ionic-angular';
import { API } from '../app.config';
/*
  Generated class for the BaseHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BaseHttpProvider {
  url: string = API.urlPrefix;
  loading: any;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.loading = this.loadingCtrl.create({
      spinner: "crescent",
      content: "加载中..."
    });
  }

  errorHandler(res) {
    if (res.code === 0) {
      let alert = this.alertCtrl.create({
        title: '温馨提示',
        subTitle: res.message,
        buttons: ['确 定']
      });
      alert.present();
    } else if (res.code === 401) {
      console.log('请重新登录~')
    }
  }

  request(api, options): Observable<Response> {
    return Observable.create(observer => {
      this.loading.present();
      this.http.request("POST", this.url + api, options).subscribe(
       res => {
          observer.next(res);
          this.errorHandler(res);
        },
        err=> {
          let alert = this.alertCtrl.create({
            title: '温馨提示',
            subTitle: "服务器故障，请稍后再试......",
            buttons: ['确 定']
          });
          alert.present();
          observer.error(err);
        },
        () => {
          this.loading.dismiss();
        })
    })
  }

  post(api: string, body: any = null): Observable<Response> {
    return this.request(api, {
      body: body,
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8'
      })
    })
  }


}
