import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Topbar } from './shared/components/topbar/topbar';
import { Today } from './features/today/today/today';
import { TaskCard } from './features/today/task-card/task-card';
import { TruncatePipe } from './shared/pipes/truncate-pipe';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCard } from './features/today/weather-card/weather-card';
import { QuoteCard } from './features/today/quote-card/quote-card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskFormModal } from './shared/components/task-form-modal/task-form-modal';

@NgModule({
  declarations: [
    App,
    Sidebar,
    Topbar,
    Today,
    TaskCard,
    TruncatePipe,
    WeatherCard,
    QuoteCard,
    TaskFormModal,
  ],
  imports: [
    BrowserModule,
MatSnackBarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
