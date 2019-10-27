import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brother } from './Brother';
import { ContentModel } from './ContentModel';
import { Observable } from 'rxjs';
import {ConfigService} from './config.service';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class BrotherService {
    constructor(private httpClient: HttpClient, private configService: ConfigService) {
    }

    public getBrotherList(): Promise<ContentModel<Brother>> {
      console.log(this.configService);
      return this.httpClient.get<ContentModel<Brother>>(`${this.configService.config.apiUrl}/Brother`).toPromise();
    }

    public getPictureBaseUrl(): string {
      return `${this.configService.config.apiUrl}/Picture`;
    }

    public searchBrothers(query: string): Promise<ContentModel<Brother>> {
      return this.httpClient.get<ContentModel<Brother>>(`${this.configService.config.apiUrl}/Search/${query}`).toPromise();
    }

    public getBrother(id: number): Promise<Brother> {
      return this.httpClient.get<Brother>(`${this.configService.config.apiUrl}/Brother/${id}`).toPromise();
    }
}
