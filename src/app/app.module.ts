import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AccueilComponent } from './pages/admin/accueil/accueil.component';
import { AccueilClientComponent } from './pages/client/accueil-client/accueil-client.component';
import { InscriptionComponent } from './pages/client/inscription/inscription.component';
import { HeaderComponent } from './components/header/header.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { GroupesListComponent } from './components/groupes-list/groupes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    AccueilClientComponent,
    InscriptionComponent,
    HeaderComponent,
    ConversationComponent,
    UsersListComponent,
    GroupesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
