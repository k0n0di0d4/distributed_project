import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { MainComponent } from './presentation/pages/main/main.component';
import { ErrorComponent } from './presentation/pages/error/error.component';
import { AuthGuard } from './domain/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent,
    canActivate: [AuthGuard], data: { role: 'User' },
    // children: [

    // ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
