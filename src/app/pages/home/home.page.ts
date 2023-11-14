import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/angular/standalone';
import { CvComponent } from 'src/app/components/cv/cv.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { ProjectsComponent } from 'src/app/components/projects/projects.component';
import { Section } from 'src/app/models/component';
import { environment } from 'src/environments/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-folder',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CommonModule, ProjectsComponent, CvComponent, OverviewComponent, TranslateModule],
})
export class HomePage {

  public folder!: string;
  public title!: string;
  private activatedRoute = inject(ActivatedRoute);

  constructor() { }

  ionViewWillEnter() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.title = this.getTitle();
  }

  ionViewDidEnter() {
    this.checkCvVersion();
  }

  private getTitle() {
    switch (this.folder) {
      default:
      case Section.Overview:
        return "OVERVIEW.TITLE";
      case Section.Projects:
        return "PROJECTS.TITLE";
      case Section.Cv:
        return "CV.TITLE";
    }
  }

  private checkCvVersion() {
    const openingVersion = Number(this.activatedRoute.snapshot.queryParamMap.get('version') as string);
    /*if (openingVersion && openingVersion >= environment.cv.version) {

    }*/
  }
}
