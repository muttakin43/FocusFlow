import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Topbar } from './shared/components/topbar/topbar';
import { Today } from './features/today/today/today';
import { TaskCard } from './features/today/task-card/task-card';

@NgModule({
  declarations: [App, Sidebar, Topbar, Today, TaskCard],
  imports: [BrowserModule, AppRoutingModule,MatIconModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
