import { Component, OnInit } from '@angular/core';
import {BrotherService} from '../brother.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Brother} from '../Brother';
import {RelatedBrother} from '../RelatedBrother';
import {MajorMinor} from '../MajorMinor';
import {Location} from '@angular/common';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-brother-details',
  templateUrl: './brother-details.component.html',
  styleUrls: ['./brother-details.component.sass', './brother-details.component.css']
})
export class BrotherDetailsComponent implements OnInit {
  private brother: Brother;
  currentPositions: string[];
  pastPositions: string[];

  constructor(private configService: ConfigService,
              private brotherService: BrotherService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.brotherService.getBrother(+params.id).then(brother => {
        this.brother = brother;
        this.sortPositions();
      });
    });
  }

  sortPositions(): void {
    this.currentPositions = [];
    this.pastPositions = [];
    const now: Date = new Date();

    for (const position of this.brother.positions) {
      if (position.heldTo.getTime() > now.getTime() && position.heldFrom.getTime() < now.getTime()) {
        // current position, if my term ends tomorrow, tomorrow > now. but if from > now,
        // that means the person has not yet taken over the office.
        this.currentPositions.push(position.name);
      } else if (now.getTime() > position.heldTo.getTime()) {
        // past position
        this.pastPositions.push(position.name);
      }
    }
  }

  getGraduationTense(): string {
    if (new Date().getTime() > new Date(this.brother.expectedGraduation).getTime()) {
      return 'Graduated';
    }
    return 'Expected graduation:';
  }

  convertDateIntoSemester(date: Date): string {
    let d = '';
    if (date.getMonth() <= 5) {
      d = 'Spring';
    } else if (date.getMonth() >= 10) {
      d = 'Fall';
    } else {
      d = 'Summer';
    }

    return d + ' ' + date.getFullYear();
  }

  formatBrother(b: RelatedBrother) {
    if (b.viewable) {
      return `<a [routerLink]=\"['/details', ${b.id}]\">${b.name}</a>`;
    } else {
      return b.name;
    }
  }

  formatStringList(s: any[], format?: (object: any) => string): string {
    let commas = s.length - 1;
    let list = '';

    if (!format) {
      format = (object: any) => object;
    }

    if (s.length < 1) {
      return '';
    }

    if (s.length === 1) {
      return format(s[0]);
    }

    s.forEach(el => {
      list += format ? format(el) + (commas-- > 0 ? ', ' : '') : '';
    });

    return list;
  }

  getMajors(): string {
    if (!this.brother.majors || this.brother.majors.length === 0 || this.brother.majors[0].name.toLowerCase().startsWith('undecided')) {
      return 'No major (undecided)';
    }
    return this.formatList(this.brother.majors) + ' major';
  }

  getMinors(): string {
    if (!this.brother.minors || this.brother.minors.length === 0) {
      return 'No minor';
    }

    return this.formatList(this.brother.minors) + ' minor';
  }

  formatList(s: MajorMinor[]): string {
    return this.formatStringList(s, (m: MajorMinor) => m.name);
  }

  getCurrentPositions(): string {
    if (!this.currentPositions || this.currentPositions.length === 0) {
      return 'Not currently holding any positions';
    }

    return 'Currently holding ' + this.formatStringList(this.currentPositions);
  }

  getPastPositions(): string {
    if (!this.pastPositions || this.pastPositions.length === 0) {
      return 'No offices held in the past';
    }
    return 'Previously held ' + this.formatStringList(this.pastPositions);
  }

  determinePlurality(s: any[], singular: string, plural: string) {
    // 0 is plural
    if (s.length === 1) {
      return singular;
    }

    return plural;
  }

  getChapterDesignation(): string {
    return this.brother.chapterDesignation ? this.brother.chapterDesignation : '\u039A\u03A6';
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US');
  }

  goBack(): void {
    this.location.back();
  }
}
