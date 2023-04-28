import { AutoplayerService } from './services/autoplayer/autoplayer.service';
import { environment } from './../environments/environment';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { Component } from '@angular/core';
import { ExperimentService } from './services/experiment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public gameInitialized: boolean = false;

  get doShowLog() {
    return environment.showLog;
  }

  get isTestMode() {
    return environment.testMode;
  }

  get isGameOver() {
    return this._gameLogic.isGameOver;
  }

  get showEndScreen() {
    return environment.showEndScreen;
  }

  constructor(
    private _gameLogic: GameLogicService,
    private _autoPlayer: AutoplayerService,
    private _experimentService: ExperimentService
  ) {}

  async ngOnInit() {
    if (environment.testMode) {
      await this._autoPlayer.run();
    } else {
      await this.initGame();
      this.gameInitialized = true;
    }
  }

  async initGame() {
    await this._gameLogic.onStart();
  }

  async onRestart() {
    await this.initGame();
  }
}
