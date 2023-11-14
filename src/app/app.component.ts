import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, homeSharp, documentOutline, documentSharp, folderOutline, folderSharp } from 'ionicons/icons';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, TranslateModule],
})
export class AppComponent {
  public appPages = [
    { title: 'OVERVIEW.TITLE', url: '/overview', icon: 'home' },
    { title: 'PROJECTS.TITLE', url: '/projects', icon: 'folder' },
    { title: 'CV.TITLE', url: '/cv', icon: 'document' }
  ];
  constructor(private translate: TranslateService) {
    const currentLang = this.translate.getBrowserLang() || "en";
    this.translate.setDefaultLang(currentLang);
    addIcons({ homeOutline, homeSharp, folderOutline, folderSharp, documentOutline, documentSharp });
  }
}
