import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Validators } from "../../../validators/validators";
/**
 * Generated class for the FindPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
})
export class FindPasswordPage {
  findPsdForm:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPasswordPage');
  }


  ngOnInit(){
    this.initForm();
  }

   // 初始化表单控件
   initForm() {
    this.findPsdForm = this.formBuilder.group({
      mobileNum: ["", [Validators.required, Validators.phone]],
      password: ["", [Validators.required]],
      rePassword: ["", [Validators.required]],
      phoneCode: ["", [Validators.required]]
    });
  }

  back(){
    this.navCtrl.pop();
  }
}
