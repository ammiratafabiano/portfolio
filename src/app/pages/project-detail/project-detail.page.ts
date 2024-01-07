import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Project } from 'src/app/models/project';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { IonChip } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule]
})
export class ProjectDetailPage implements OnInit {

  project: Project | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private navCtrl: NavController) {
    addIcons({ chevronBackOutline })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const found = environment.projects.find(x => x.id == params.get('id'));
      if (found) {
        this.project = found;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onBackClicked() {
    this.navCtrl.back();
  }

}
