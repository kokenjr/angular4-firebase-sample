import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule }    from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

import { AuthGuard } from './_guards/index';
import { SharedService, AlertService } from './_services/index';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AlertComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        AuthGuard,
        SharedService,
        AlertService
      ]
    }).compileComponents();
  }));

  it('should render title in a h2 tag in LoginComponent', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2')).toBeTruthy
    expect(compiled.querySelector('h2').textContent).toEqual('Login');
  });

  it('should render username and password field in LoginComponent', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#username')).toBeTruthy
    expect(compiled.querySelector('#password')).toBeTruthy
  });

  it('should render login button in LoginComponent', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-login')).toBeTruthy
    expect(compiled.querySelector('.btn-login').textContent).toEqual('Login')
  });

  it('should render loading in HomeComponent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3')).toBeTruthy
    expect(compiled.querySelector('h3').textContent).toEqual('Loading...');
  });

});
