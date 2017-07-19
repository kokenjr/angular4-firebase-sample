import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, SharedService} from '../_services/index';


@Component({
  selector: 'app-root',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loading = false;

  constructor(public route: ActivatedRoute, public router: Router,
    public afAuth: AngularFireAuth, private sharedService: SharedService,
    private alertService: AlertService) {  }

  ngOnInit() {
    this.sharedService.signedIn(false)

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    var username = this.model.username;
    var password = this.model.password;
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
     .then(firebaseUser => {
        console.log("successful login")
        localStorage.setItem('currentUser', JSON.stringify(firebaseUser));
        this.sharedService.signedIn(true)
        this.router.navigate([this.returnUrl]);
     })
    .catch(error => {
      console.log("error logging in")
      this.alertService.error(error.message);
      this.loading = false;
    });
  }
}
