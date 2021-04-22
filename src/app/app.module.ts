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

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    CustomizeComponent,
    WorkoutComponent,
    IndexComponent,
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
