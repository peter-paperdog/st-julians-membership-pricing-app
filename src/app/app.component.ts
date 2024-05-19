import {Component} from '@angular/core';
import {TitleService} from "./services/title.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string;

  constructor(private titleService: TitleService) {
    this.title = '';
  }

  ngOnInit(): void {
    this.titleService.currentTitle.subscribe(title => this.title = title);
  }
}
