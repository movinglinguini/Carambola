import { RoundCounterComponent } from './components/round-counter/round-counter.component';
import { AffinityTablesService } from './components/affinity-tables/services/affinity-tables.service';
import { LoggerService } from './services/logger/logger.service';
import { GameLogicService } from './services/game-logic/game-logic.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AffinityTablesComponent } from './components/affinity-tables/affinity-tables.component';
import { LogComponent } from './components/log/log.component';
import { ActionSelectionComponent } from './components/action-selection/action-selection.component';
import { EndScreenComponent } from './components/end-screen/end-screen.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { AffinityDescriptionGeneratorComponent } from './components/affinity-tables/components/affinity-description-generator/affinity-description-generator.component';
import { SelectedActionComponent } from './components/selected-action/selected-action.component';
import { ActionReactionComponent } from './components/action-reaction/action-reaction.component';
import { ActionReactionGeneratorComponent } from './components/action-reaction/components/action-reaction-generator/action-reaction-generator.component';
import { ChronicleComponent } from './components/main-screen/components/chronicle/chronicle.component';
import { TimelineComponent } from './components/main-screen/components/timeline/timeline.component';
import { ReactionMemoryService } from './components/action-selection/services/reaction-memory.service';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvisorService } from './services/advisor.service';
import { ExperimentService } from './services/experiment.service';

@NgModule({
  declarations: [
    AppComponent,
    AffinityTablesComponent,
    LogComponent,
    ActionSelectionComponent,
    EndScreenComponent,
    MainScreenComponent,
    AffinityDescriptionGeneratorComponent,
    SelectedActionComponent,
    ActionReactionComponent,
    ActionReactionGeneratorComponent,
    ChronicleComponent,
    TimelineComponent,
    RoundCounterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbTooltipModule,
  ],
  exports: [
    MainScreenComponent
  ],
  providers: [
    GameLogicService,
    LoggerService,
    AffinityTablesService,
    ReactionMemoryService,
    AdvisorService,
    ExperimentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
