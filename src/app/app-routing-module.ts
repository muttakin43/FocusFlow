import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Today } from './features/today/today/today';

const routes: Routes = [
  { path: '',       redirectTo: 'today', pathMatch: 'full' },
  { path: 'today',  component: Today},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
