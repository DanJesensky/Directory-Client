import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brother } from './Brother';
import { ContentModel } from './ContentModel';
import {ConfigService} from './config.service';
import { MinimalBrother } from './MinimalBrother';

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
      return this.httpClient.get<Brother>(`${this.configService.config.apiUrl}/Brother/${id}`).toPromise().then(b => {
        // Manually map these to dates since HttpClient doesn't do it right, and there seems to be no way to correct this behavior,
        // besides writing an HttpInterceptor: https://stackoverflow.com/questions/46559268/parse-date-with-angular-4-3-httpclient
        b.dateJoined = b.dateJoined ? new Date(b.dateJoined) : null;
        b.dateInitiated = b.dateInitiated ? new Date(b.dateInitiated) : null;
        b.expectedGraduation = b.expectedGraduation ? new Date(b.expectedGraduation) : null;

        b.positions.forEach(position => {
          position.heldFrom = position.heldFrom ? new Date(position.heldFrom) : null;
          position.heldTo = position.heldTo ? new Date(position.heldTo) : null;
        });

        return b;
      });
    }

    public async saveBrother(brother: Brother): Promise<void>{
        throw new Error("Method not implemented.");
    }

    public async savePicture(id: number, picture: File): Promise<void>{
        throw new Error("Method not implemented.");
    }

    public async GetMinimalBrothers(): Promise<MinimalBrother[]>{
      let brothers: ContentModel<MinimalBrother> = await
        this.httpClient
          .get<ContentModel<MinimalBrother>>(`${this.configService.config.apiUrl}/Brother/Minimal`)
          .toPromise();
      return brothers.content;
    }
}
