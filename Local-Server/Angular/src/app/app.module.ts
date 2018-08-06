import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'
import {Http, Headers, HttpModule} from '@angular/http'


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdatePasswdComponent } from './components/update-passwd/update-passwd.component';
import { RemoveUserComponent } from './components/remove-user/remove-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RequestsComponent } from './components/requests/requests.component';
import { AccceptsComponent } from './components/acccepts/acccepts.component';
import { UsersService } from './services/users.service';
import { TxnsService } from './services/txns.service';
import { GetLocalItemsComponent } from './components/get-local-items/get-local-items.component';
import { ConfirmationsComponent } from './components/confirmations/confirmations.component';
import { MakeRequestComponent } from './components/make-request/make-request.component';
import { GetUuidComponent } from './components/get-uuid/get-uuid.component';
import { SeeChainComponent } from './components/see-chain/see-chain.component';
import { FindUuidComponent } from './components/find-uuid/find-uuid.component';


const appRoutes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'register',component:RegisterComponent},
  {path:'requests',component:RequestsComponent},
  {path:'accepts',component:AccceptsComponent},
  {path:'removeUser',component:RemoveUserComponent},
  {path:'updatePasswd',component:UpdatePasswdComponent},
  {path:'getLocalItems',component:GetLocalItemsComponent},
  {path:'makeReq',component:MakeRequestComponent},
  {path:'getUUID',component:GetUuidComponent},
  {path:'confirmations',component:ConfirmationsComponent},
  {path:'seeChain', component:SeeChainComponent},
  {path:'findUuid',component:FindUuidComponent}
] 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UpdatePasswdComponent,
    RemoveUserComponent,
    DashboardComponent,
    RequestsComponent,
    AccceptsComponent,
    GetLocalItemsComponent,
    ConfirmationsComponent,
    MakeRequestComponent,
    GetUuidComponent,
    SeeChainComponent,
    FindUuidComponent
  ],
  imports: [
    BrowserModule,RouterModule,
    HttpModule,FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UsersService,TxnsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
