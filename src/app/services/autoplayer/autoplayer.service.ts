import { IDecisionEvent } from './../game-logic/modules/generate-decision-event';
import { GameResources } from './../game-logic/resources/resources';
import { IAction } from './../../shared/resources/action.resource';
import { environment } from './../../../environments/environment';
import { GameLogicService } from './../game-logic/game-logic.service';
import { LoggerService, LogDataTypes, ILogAdvisor } from './../logger/logger.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoplayerService {

  constructor(
    private _gameLogic: GameLogicService,
    private _logger: LoggerService,
  ) { }

  async run() {
    for (let i = 0; i < environment.testRunCount; i += 1) {
      console.log('Running playthrough #', i);
      this._gameLogic.onStart();

      await this._logger.logData({
        playthroughNo: i,
        round: this._gameLogic.round,
        type: LogDataTypes.INIT,
        actions: GameResources.actionList,
      });

      this._gameLogic.generateDecisionEvent();

      while (!this._gameLogic.isGameOver) {
        const roundNo = this._gameLogic.round;
        const decisionEvent = {...this._gameLogic.currentDecisionEvent} as IDecisionEvent;

        await this._logger.logData({
          playthroughNo: i,
          round: roundNo,
          type: LogDataTypes.PRE_DECISION,
          decisionEvent: decisionEvent,
        });

        await this._logger.logData({
          playthroughNo: i,
          round: roundNo,
          type: LogDataTypes.ADVISOR_STATE,
          advisors: GameResources.advisorList,
        });

        const chosenAction = this.chooseAction();

        await this._logger.logData({
          playthroughNo: i,
          round: roundNo,
          type: LogDataTypes.POST_DECISION,
          decisionEvent: { ...decisionEvent, chosenAction: chosenAction },
        });

        await this._logger.logData({
          playthroughNo: i,
          round: roundNo,
          type: LogDataTypes.ADVISOR_STATE,
          advisors: GameResources.advisorList,
        });
      }
    }
  }

  chooseAction() {
    const decisionEvent = this._gameLogic.currentDecisionEvent;
    const alternatives = decisionEvent?.alternatives as IAction[];
    const chosenAlternative = alternatives[Math.floor(Math.random() * alternatives.length)];
    this._gameLogic.onChooseAction(chosenAlternative);

    return chosenAlternative;
  }
}
