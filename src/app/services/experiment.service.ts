import { Injectable } from '@angular/core';
import { GameLogicService } from './game-logic/game-logic.service';
import { incrementPlaythroughNo } from '../advisor-generators/utilities/experiment-playthrough.utils';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(
    private _gameLogicService: GameLogicService
  ) {
    this._gameLogicService.$onGameOver.subscribe(() => {
      incrementPlaythroughNo();
    });
  }
}
