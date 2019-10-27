import { Component, OnInit } from '@angular/core';
import { BrotherService } from '../brother.service';
import {Brother} from '../Brother';
import {Router} from '@angular/router';
import {ConfigService} from '../config.service';
import {ContentModel} from '../ContentModel';

@Component({
  selector: 'app-brother-list',
  templateUrl: './brother-list.component.html',
  styleUrls: ['./brother-list.component.sass', './brother-list.component.css']
})
export class BrotherListComponent implements OnInit {
  private brothers: Brother[][];
  private basePictureUrl: string;
  private columns = 3;

  constructor(private brotherService: BrotherService, private router: Router, private configService: ConfigService) { }

  public ngOnInit(): void {
    this.basePictureUrl = this.brotherService.getPictureBaseUrl();
    this.loadBrothers();
  }

  private loadBrothers(): void {
    this.brotherService.getBrotherList().then(b => this.initializeGrid(b));
  }

  private initializeGrid(b: ContentModel<Brother>): void {
    this.brothers = [];

    for (let i = 0; i < b.content.length / this.columns; i++) {
      this.brothers[i] = b.content.slice(i * this.columns, (1 + i) * this.columns);
    }
  }

  private getPictureUrl(brotherId: number): string {
    return `${this.basePictureUrl}/${brotherId}`;
  }

  private onSelect(brother: Brother): void {
    this.router.navigate(['/details', brother.id]);
  }

  private search(): void {
    let searchText = '';
    const element = document.getElementById('search-field') as HTMLInputElement;

    if (element) {
      searchText = element.value;
    }

    if (searchText === '') {
      this.loadBrothers();
    } else {
      this.brotherService.searchBrothers(searchText).then(
        b => { console.log(b); this.initializeGrid(b); },
        err => console.error(err)
      );
    }
  }
}
