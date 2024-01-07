import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar, IonContent, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonChip, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonTitle, IonContent, CommonModule, FormsModule, TranslateModule, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCardContent, IonChip]
})
export class ProjectsPage implements OnInit {

  filteredProjects: Project[] = [];
  tags: string[] = [];
  enabledTags: string[] = [];
  technologies: string[] = [];
  enabledTechnologies: string[] = [];



  constructor(private router: Router) { }

  ngOnInit() {
    this.filteredProjects = environment.projects;
    environment.projects.forEach(x => {
      this.tags = this.tags.concat(x.tags.filter(y=>!this.tags.includes(y)));
      //this.enabledTags = this.tags.concat(x.tags.filter(y=>!this.tags.includes(y)));
      this.technologies = this.technologies.concat(x.technologies.filter(y=>!this.technologies.includes(y)));
      //this.enabledTechnologies = this.technologies.concat(x.technologies.filter(y=>!this.technologies.includes(y)));
    })
  }

  isTagSelected(tag: string): boolean {
    return this.enabledTags.includes(tag);
  }

  isTechSelected(tech: string): boolean {
    return this.enabledTechnologies.includes(tech);
  }

  onTagClicked(tag: string) {
    const index = this.enabledTags.findIndex(x => x == tag);
    if (index > -1) {
      this.enabledTags.splice(index, 1);
    } else {
      this.enabledTags.push(tag);
    }
    this.applyFilters();
  }

  onTechClicked(tech: string) {
    const index = this.enabledTechnologies.findIndex(x => x == tech);
    if (index > -1) {
      this.enabledTechnologies.splice(index, 1);
    } else {
      this.enabledTechnologies.push(tech);
    }
    this.applyFilters();
  }

  private applyFilters() {
    if (this.enabledTags.length == 0 && this.enabledTechnologies.length != 0) {
      this.filteredProjects = environment.projects.filter(project => project.technologies.some(x => this.enabledTechnologies.includes(x)));
    } else if (this.enabledTags.length != 0 && this.enabledTechnologies.length == 0) {
      this.filteredProjects = environment.projects.filter(project => project.tags.some(x => this.enabledTags.includes(x)));
    } else if (this.enabledTags.length == 0 && this.enabledTechnologies.length == 0) {
      this.filteredProjects = environment.projects;
    } else {
      this.filteredProjects = environment.projects.filter(project => project.tags.some(x => this.enabledTags.includes(x)) && project.technologies.some(x => this.enabledTechnologies.includes(x)));
    }
  }

  onProjectClicked(project: Project) {
    this.router.navigate(['/project-detail/', project.id]);
  }

  resetFilters() {
    this.enabledTags = [];
    this.enabledTechnologies = [];
    this.filteredProjects = environment.projects;
  }
}
