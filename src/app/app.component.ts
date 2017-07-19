import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService} from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signedIn = false;
  constructor(public router: Router, public afAuth: AngularFireAuth,
    public sharedService: SharedService) {
      if (localStorage.getItem('currentUser')){
        this.signedIn = true;
      }
    }

  ngOnInit() {
    this.sharedService.getEmittedValue()
      .subscribe(isSignedIn => this.signedIn = isSignedIn);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
