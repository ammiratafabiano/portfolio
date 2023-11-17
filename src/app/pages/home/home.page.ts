import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonToast, ToastController, IonIcon, IonAvatar, IonButton, IonFooter } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { closeOutline, cloudDownloadOutline, happyOutline, logoGithub, logoInstagram, logoLinkedin, mailOutline, sadOutline } from 'ionicons/icons';
import { Button } from 'src/app/models/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CommonModule, TranslateModule, IonToast, IonIcon, IonAvatar, IonButton, IonFooter],
})
export class HomePage {

  public title!: string;
  public buttons: Button[] = [];

  private activatedRoute = inject(ActivatedRoute);

  constructor(private toastController: ToastController, private translateService: TranslateService, private location: Location) {
    addIcons({sadOutline, happyOutline, closeOutline, logoGithub, logoLinkedin, logoInstagram, mailOutline, cloudDownloadOutline })
  }

  ionViewWillEnter() { }

  ionViewDidEnter() {
    this.checkCvVersion();
  }

  ngOnInit() {
    this.buttons = [
      {
        icon: "logo-github",
        url: environment.githubUrl
      },
      {
        icon: "logo-linkedin",
        url: environment.linkedinUrl
      },
      {
        icon: "logo-instagram",
        url: environment.instagramUrl
      },
      {
        icon: "mail-outline",
        url: "mailto:ammiratafabiano@gmail.com"
      }
    ]
  }

  openUrl(url: string) {
    window.open(url);
  }

  openCv() {
    this.openUrl(environment.cv.url);
  }

  private checkCvVersion() {
    const openingVersion = Number(this.activatedRoute.snapshot.queryParamMap.get('version') as string);
    const currentVersion = environment.cv.version;
    if (openingVersion && currentVersion) {
      this.resetQueryString();
      if (openingVersion >= currentVersion) {
        this.presentToast('HOME.CV.UPTODATE', 'happy-outline');
      } else {
        this.presentToast('HOME.CV.NOT_UPTODATE', 'sad-outline', 'HOME.CV.DOWNLOAD_SHORT', () => {
          window.open(environment.cv.url);
        });
      }
    }
  }

  private async presentToast(message: string, icon: string | undefined = undefined, actionMessage: string | undefined = undefined, actionCallback = () => { }, duration = 10000, position: "top" | "bottom" | "middle" | undefined = 'bottom') {
    const toast = await this.toastController.create({
      message: this.translateService.instant(message),
      duration: actionMessage ? 0 : duration,
      position,
      icon,
      buttons: actionMessage ? [
        {
          text: this.translateService.instant(actionMessage),
          role: 'info',
          handler: actionCallback
        },
        {
          icon: 'close-outline',
          role: 'cancel'
        },
      ] : [
        {
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }

  private resetQueryString() {
    const url = this.location.path();
    const nuovaUrl = url.replace(/\?.*$/, '');
    this.location.replaceState(nuovaUrl);
  }
}
