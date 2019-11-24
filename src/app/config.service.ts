import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public config: Config;

  constructor(private httpClient: HttpClient) { }

  fetchConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve: any, reject: any) => {
      this.httpClient
        .get<Config>('/assets/directory-config.json')
        .subscribe(response => {
          this.config = response;

          resolve(true);
        },
        (err: any) => {
          console.log(err);
          reject(false);
        });
    });
  }
}
