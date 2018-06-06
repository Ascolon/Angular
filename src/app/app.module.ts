import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HoveredDirective } from './directives/hovered.directive';
import { SearchPipe } from './pipes/search.pipe';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FilmComponent } from './film/film.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { OrderPipe } from './pipes/order.pipe';
import { ByGenreComponent } from './by-genre/by-genre.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SettingComponent } from './setting/setting.component';
import { UpdateDataService } from './services/updateData.service';
import { UserService } from './services/user.service';
import { HttpService } from './services/http.service';
import { UrlService } from './services/urls.service';
import { SettingService } from './services/setting.service';
import { TimePipe, MovieTimePipe } from './pipes/time.pipe';
import { FavoriteComponent } from './favorite/favorite.component';
import { SubscribeService } from './services/subscribe.service';
import { FormService } from './services/form.service';
import { TrustStylePipe } from './pipes/trust-style.pipe';
import { LoaderComponent } from './loader/loader.component';
import { RadioComponent } from './radio/radio.component';
import { AuthGuardServiceGuard } from './guards/auth-guard-service.guard';


const route = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'film/:id', component: FilmComponent },
  { path: 'film/:id/:time', component: FilmComponent },
  { path: 'cp', component: CabinetComponent, canActivate: [AuthGuardServiceGuard]},
  { path: 'bygenre/:genre', component: ByGenreComponent },
  { path: 'search/:name', component: SearchResultComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuardServiceGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HoveredDirective,
    SearchPipe,
    OrderPipe,
    FilmComponent,
    CabinetComponent,
    ByGenreComponent,
    SearchResultComponent,
    SettingComponent,
    TimePipe,
    MovieTimePipe,
    FavoriteComponent,
    TrustStylePipe,
    LoaderComponent,
    RadioComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(route)
  ],
  providers: [
    AuthGuardServiceGuard,
    HttpService,
    UserService,
    UrlService,
    UpdateDataService,
    SettingService,
    SubscribeService,
    FormService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
