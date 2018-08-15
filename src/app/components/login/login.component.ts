import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginInfo = {
    email: "",
    password: ""
  };
  theUser:any = {};

  loginErrorMessage: string;

  constructor(private myAuth: AuthService,
              private myRouter: Router) { }

  ngOnInit() {
    this.myAuth
    .checklogin()
    .toPromise()
    // If success, we are logged in.
    .then(resultFromApi => {
      this.theUser = resultFromApi;
      console.log('who is user: ', resultFromApi)
      this.myRouter.navigate(["/"]);
  })
      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log("err:", err);
      });
    }

    doLogin(){
      return this.myAuth.login(this.loginInfo)
      .toPromise()
      .then( () => {
         // clear the form
         this.loginInfo = {
          email: '',
          password: ''
        };
  
        // clear the error message
        this.loginErrorMessage = "";
  
        // redirect to /phones
        this.myRouter.navigate(['/desktop']);
        location.reload();
      })
      .catch( err => {
        const parsedError = err.json();
        this.loginErrorMessage = parsedError.message + ' ';
      } )
    }
  

}
