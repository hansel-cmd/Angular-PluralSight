import { NgModule, ProviderToken, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventThumbnailComponent } from './event-thumbnail/event-thumbnail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventService } from './shared/event.service';
import { ToastrService } from './shared/toastr.service';
import { EventDetailsComponent } from './event-details/event-details.component';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterModule,
  Routes,
} from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterActivatorService } from './shared/router-activator.service';
import { AuthService } from './user/login/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSessionComponent } from './create-session/create-session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { CollapsibleWellComponent } from './shared/collapsible-well/collapsible-well.component';
import { DurationPipe } from './shared/duration.pipe';
import { UpvoteComponent } from './upvote/upvote.component';
import { VoterService } from './shared/voter.service';

import { HttpClientModule } from '@angular/common/http';
import { EventResolver } from './shared/event.resolver';
import { LoadingComponent } from './shared/loading/loading.component';

const CustomGuard = (service: ProviderToken<any>) => {
  const canActivateFn: CanActivateFn = (
    route: ActivatedRouteSnapshot
  ): boolean => {
    return inject(service).canActivate(route);
  };
  return canActivateFn;
};

const CustomResolver = (service: ProviderToken<any>) => {
  const resolverFn = (route: ActivatedRouteSnapshot) => {
    return inject(service).resolve(route);
  };
  return resolverFn;
};

const shouldBlockNavigation = (component: any) => {
  if (component.isDirty) {
    return window.confirm(
      'Changes you have made may not be changed. Do you want to leave?'
    );
  }
  return true;
};

const appRoutes: Routes = [
  {
    path: 'events',
    component: EventsListComponent,
  },
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: [shouldBlockNavigation],
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    canActivate: [CustomGuard(RouterActivatorService)],
    // displays the data after everything everything is resolved.
    // So if it's not yet resolved, it will not render the page
    // and we cant have a "loading" display because it will not
    // render the page in the first place.
    resolve: { event: CustomResolver(EventResolver) },
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'events/session/new',
    component: CreateSessionComponent,
    canDeactivate: [shouldBlockNavigation],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EventService, ToastrService, AuthService, VoterService],
  bootstrap: [EventsAppComponent],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NotFoundComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    UpvoteComponent,
    LoadingComponent,
  ],
})
export class AppModule {}
