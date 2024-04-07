import { Component, Input, OnInit } from '@angular/core';
import { Emote } from '../types/emote.type';

@Component({
  selector: 'nwt-emote',
  templateUrl: './emote.component.html',
  styleUrls: ['./emote.component.css']
})
export class EmoteComponent implements OnInit {
  // private property to store card value
  private _emote: Emote;

  /**
   * Component constructor
   */
  constructor() {
    this._emote = {} as Emote;
  }

  /**
   * Returns private property _emote
   */
  get emote(): Emote {
    return this._emote;
  }

  /**
   * Sets private property _emote
   */
  @Input()
  set emote(emote: Emote) {
    this._emote = emote;
  }

  /**
   * OnInit implementation
   */
  ngOnInit(): void {
  }
}
