import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { Emote } from '../shared/types/emote.type';

@Component({
  selector: 'app-emotes',
  templateUrl: './emotes.component.html',
  styleUrl: './emotes.component.css'
})
export class EmotesComponent {
  // private property to store cards value
  private _emotes: Emote[];
  // private property to store all backend URLs
  private readonly _backendURL: any;

  /**
   * Component constructor
   */
  constructor(private _http: HttpClient) {
    this._emotes = [];
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }

  /**
   * Returns private property _cards
   */
  get emotes(): Emote[] {
    return this._emotes;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
    this._http.get<Emote[]>(this._backendURL.allEmotes)
      .subscribe({ next: (emotes: Emote[]) => this._emotes = emotes });
  }
}
