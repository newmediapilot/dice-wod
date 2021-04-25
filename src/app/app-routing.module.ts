import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartComponent} from './components/start/start.component';
import {CustomizeComponent} from './components/customize/customize.component';
import {WorkoutComponent} from './components/workout/workout.component';
import {WorkoutRoundsComponent} from './components/workout-rounds/workout-rounds.component';
import {WorkoutTimeComponent} from './components/workout-time/workout-time.component';

const routes: Routes = [
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'customize',
    component: CustomizeComponent
  },
  {
    path: 'workout',
    component: WorkoutComponent
  },
  {
    path: 'wod-rounds',
    component: WorkoutRoundsComponent
  },
  {
    path: 'wod-time',
    component: WorkoutTimeComponent
  },
  {path: '**', redirectTo: 'start'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
