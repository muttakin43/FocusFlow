import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Today } from './features/today/today/today';
import { Weekly } from './features/weekly/weekly/weekly';
import { Timer } from './features/timer/timer/timer';
import { Settings } from './features/settings/settings/settings';
import { Onboarding } from './features/onboarding/onboarding/onboarding';
import { onboardingGuard } from './core/guards/onboarding-guard';


const routes: Routes = [
  { path: '',       redirectTo: 'today', pathMatch: 'full' },
  {
  path: 'onboarding',
  component: Onboarding
}
 , { path: 'today',  component: Today, canActivate: [onboardingGuard]},
  { path: 'weekly',component: Weekly},
  { path: 'timer', component: Timer},
  {path: 'settings', component: Settings }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
