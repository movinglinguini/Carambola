import { GameLogicService } from './../../services/game-logic/game-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {
  public rounds: null[] = [null];

  constructor(
    private _gameLogicService: GameLogicService
  ) { }

  ngOnInit(): void {
    this._gameLogicService.$onNextRound.subscribe(() => {
      this.rounds.push(null);
    });
  }

}
