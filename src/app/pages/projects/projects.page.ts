import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, CommonModule, FormsModule, TranslateModule]
})
export class ProjectsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
