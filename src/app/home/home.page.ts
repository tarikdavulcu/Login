import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
userName:string;
passWord:string;
site:string;
  constructor(private http: HttpClient,public alertController: AlertController,public toastController: ToastController,private router: Router) {}
  ngOnInit(): void {
    
  }
girisYap(userName,passWord)
{
  console.log(this.userName);
  this.http.get('https://api.github.com/users/'+this.userName).subscribe((response) => {
    console.log(response);
    console.log(response['name']+ response['blog'] );
    this.site=response['blog'];
    this.presentAlert();
    this.presentToast();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: this.site
      }
    };
    this.router.navigate(['/anasayfa'],navigationExtras);
    
});
}
async presentAlert() {
  const alert = await this.alertController.create({
    
    header: 'Döner Deger',
    subHeader: this.userName,
    message: this.site,
    buttons: ['Peki']
  });

  await alert.present();
}
async presentToast() {
  const toast = await this.toastController.create({
    message:  this.userName +" "+this.site,
    duration: 2000
  });
  toast.present();
}
}


