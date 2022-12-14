import { AffinityTablesService } from './../../services/affinity-tables.service';
import { environment } from './../../../../../environments/environment';
import { GameLogicService } from './../../../../services/game-logic/game-logic.service';
import { IAdvisor } from './../../../../shared/resources/advisors.resource';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

type CharacterKey = string;

@Component({
  selector: 'app-affinity-description-generator',
  templateUrl: './affinity-description-generator.component.html',
  styleUrls: ['./affinity-description-generator.component.scss']
})
export class AffinityDescriptionGeneratorComponent implements OnInit, OnChanges {
  static genRelationshipKey(advisor1: IAdvisor, advisor2: IAdvisor) {
    return `${advisor1.name}.${advisor2.name}`;
  }

  @Input('advisor') inAdvisor: IAdvisor;
  @Input('roundNo') inRoundNo: number;

  get otherAdvisorNames(): CharacterKey[] {
    const isNotPlayer = ((key: CharacterKey) => key !== this.playerKey);
    const isNotSelf = ((key: CharacterKey) => key !== this.inAdvisor.name);

    const otherNames = this._gameLogicService.advisors.filter(adv => {
      return isNotPlayer(adv.name) && isNotSelf(adv.name);
    }).map(adv => adv.name);

    return otherNames;
  }

  get playerKey(): CharacterKey {
    return environment.playerCharacterKey;
  }

  get showRawNumbers(): boolean {
    return environment.showRawNumbers;
  }

  constructor(
    private _gameLogicService: GameLogicService,
    private _affinityTablesService: AffinityTablesService
  ) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  ngOnChanges(): void {
    this.loadTableData();
  }

  getAffinityTowards(key: CharacterKey) {
    return this._affinityTablesService.getAffinityData(this.inAdvisor.name, key, this.inRoundNo);
  }

  getAffinityPolarityTowards(key: CharacterKey) {
    const affinity = this.getRawAffinityTowards(key) || 0;

    if (affinity < 0) {
      return 'negative';
    } else if (affinity > 0) {
      return 'positive';
    }

    return '';
  }

  getRawAffinityTowards(key: CharacterKey) {
    return this._affinityTablesService.getRawAffinity(this.inAdvisor.name, key, this.inRoundNo);
  }

  getEffectOnOpinion(partner: CharacterKey) {
    return this._affinityTablesService.getRelEffectData(this.inAdvisor.name, partner, this.inRoundNo);
  }

  getEffectOnOpinionPolarity(partner: CharacterKey) {
    const effect = this.getRawEffectOnOpinion(partner) || 0;

    if (effect < 0) {
      return 'negative';
    } else if (effect > 0) {
      return 'positive';
    }

    return '';
  }

  getRawEffectOnOpinion(partner: CharacterKey) {
    return this._affinityTablesService.getRawRelEffectData(this.inAdvisor.name, partner, this.inRoundNo);
  }

  getIfRebellious() {
    return this._affinityTablesService.getIfRebellious(this.inAdvisor.name, this.inRoundNo);
  }

  getRebellionUtility() {
    return this._affinityTablesService.getRawRebelliousness(this.inAdvisor.name, this.inRoundNo);
  }

  private loadTableData() {
    this._affinityTablesService.generateAffinityDisplayData(this.inAdvisor, this.inRoundNo);
  }
}
