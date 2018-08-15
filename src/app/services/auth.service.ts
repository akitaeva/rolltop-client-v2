import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';


@Injectable()
  // providedIn: 'root'

export class AuthService {

  tempUser: any;
  currentUser: any;

  constructor(private myHttp: Http ) { }

signup(user){
  return this.myHttp.post(`${environment.apiBase}/api/signup`,
  {
    signUpUsername: user.username,
    signUpEmail: user.email,
    signUpPassword: user.password,
    signUpCheckedPassword: user.checkedPassword
  },
  {
    withCredentials: true
  }
)
.map(res => res.json())
}

login(data){
  // console.log('data: ', data)
  return this.myHttp.post(`${environment.apiBase}/api/login`,
    {
      loginEmail: data.email,
      loginPassword: data.password
    },
    {
      withCredentials: true
    }
  )
  .map(res => {
    console.log('in service log: ', res)
    res.json()})
}

checklogin() {
  return (
    this.myHttp
      .get(
        `${environment.apiBase}/api/loggedin`,

        // Send the cookies across domains
        { withCredentials: true }
      )

      // Parse the JSON
      .map(res => {

        this.tempUser = res;
        return JSON.parse(this.tempUser._body)
      })
  );
} // close checklogin()

logout() {
  return (
    this.myHttp
      .post(
        `${environment.apiBase}/api/logout`,
        // Nothing to send to the back end (req.body)
        {},
        // Send the cookies across domains
        { withCredentials: true }
      )
      // Convert from observable to promise
      .toPromise()

      // Parse the JSON
      .then(res => res.json())
  );
} // close logout()



}
