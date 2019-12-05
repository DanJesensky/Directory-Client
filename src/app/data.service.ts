import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MajorMinor } from './MajorMinor';
import { Position } from './Position';
import { ConfigService } from './config.service';
import { ContentModel } from './ContentModel';
import { Question } from './Question';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  public async fetchMajors(): Promise<MajorMinor[]>{
    let model: ContentModel<MajorMinor> = await
      this.httpClient
        .get<ContentModel<MajorMinor>>(`${this.configService.config.apiUrl}/Major`)
        .toPromise();

    return model.content;
  }

  public async fetchMinors(): Promise<MajorMinor[]>{
    let model: ContentModel<MajorMinor> = await
      this.httpClient
        .get<ContentModel<MajorMinor>>(`${this.configService.config.apiUrl}/Minor`)
        .toPromise();

    return model.content;
  }

  public async getQuestions(): Promise<Question[]>{
    let model: ContentModel<Question> = await
      this.httpClient
        .get<ContentModel<Question>>(`${this.configService.config.apiUrl}/Question`)
        .toPromise();

    return model.content;
  }

  public async getPositions(): Promise<Position[]>{
    let model: ContentModel<Position> = await
      this.httpClient
        .get<ContentModel<Position>>(`${this.configService.config.apiUrl}/Position`)
        .toPromise();

    return model.content;
  }
}
