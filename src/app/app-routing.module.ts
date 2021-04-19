import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartComponent} from './components/start/start.component';
import {CustomizeComponent} from './components/customize/customize.component';
import {WorkoutComponent} from './components/workout/workout.component';

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
  {path: '**', redirectTo: 'start'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
