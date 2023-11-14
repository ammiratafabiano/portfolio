import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudDownloadOutline, cloudDownloadSharp } from 'ionicons/icons';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton]
})
export class CvComponent  implements OnInit {

  constructor() {
    addIcons({ cloudDownloadOutline, cloudDownloadSharp });
  }

  ngOnInit() {}

}
