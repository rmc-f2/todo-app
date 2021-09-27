import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TodosComponent } from './todos/todos.component';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig, 'todo-app'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
