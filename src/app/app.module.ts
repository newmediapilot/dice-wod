import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StartComponent} from './components/start/start.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomizeComponent} from './components/customize/customize.component';
import {WodConfigService} from './services/wod-config.service';
import { WorkoutComponent } from './components/workout/workout.component';
import { IndexComponent } from './components/index/index.component';
import { TimerComponent } from './components/common/timer/timer.component';
import { WorkoutTimeComponent } from './components/workout-time/workout-time.component';
import { WorkoutRoundsComponent } from './components/workout-rounds/workout-rounds.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CustomizeComponent,
    IndexComponent,
    TimerComponent,
    WorkoutTimeComponent,
    WorkoutRoundsComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    WodConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
