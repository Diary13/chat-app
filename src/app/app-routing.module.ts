import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './components/conversation/conversation.component';
import { AccueilComponent } from './pages/admin/accueil/accueil.component';
import { AccueilClientComponent } from './pages/client/accueil-client/accueil-client.component';
import { InscriptionComponent } from './pages/client/inscription/inscription.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    children: [
      { path: 'accueil', component: AccueilComponent }
    ] 
  },
  { 
    path: 'client', 
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'accueil/:userIndice', component: AccueilClientComponent, 
        children: [
          { path: 'conversation/:conversationId', component: ConversationComponent }
        ],
      },
    ],
    
  },
  { path: 'inscription', component: InscriptionComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
