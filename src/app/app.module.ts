import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from "@angular/core";
import {Router} from "@angular/router";
import * as Sentry from "@sentry/angular";
import {AngularFireModule} from '@angular/fire';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StartComponent} from './components/start/start.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomizeComponent} from './components/customize/customize.component';
import {WodConfigService} from './services/wod-config.service';
import {IndexComponent} from './components/index/index.component';
import {TimerComponent} from './components/common/timer/timer.component';
import {WorkoutTimeComponent} from './components/workout-time/workout-time.component';
import {WorkoutRoundsComponent} from './components/workout-rounds/workout-rounds.component';
import {SummaryComponent} from './components/summary/summary.component';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFirestoreModule} from '@angular/fire/firestore';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    WodConfigService,
    // vendor
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
