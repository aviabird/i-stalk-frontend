import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../models';



// Decalere Constant FB for Facebook SDK;
declare const FB:any;

@Injectable()
export class FacebookAuthService {
  
  constructor() { 
    FB.init({
      appId      : '112535305898047',
      cookie     : false,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  }


  // getAuthResponse(){
  //   FB.getAuthResponse();
  // }

  // getLoginStatus(){
  //   FB.getLoginStatus(
  //     response => {
  //       if(response.status == 'connected'){
  //         console.log("Connected and Response is:", response);
  //         this.getUser();
  //       }
  //       else if (response.status === 'not_authorized') {
  //         console.log("Not Authenticated");
  //       }
  //       else {
  //         console.log("Not Logged in");
  //       }
  //     }
  //   );
  // }

  // statusChangeCallback(resp) {
  //     if (resp.status === 'connected') {
  //         // connect here with your server for facebook login by passing access token given by facebook
  //         this.router.navigate(['/dashboard']);
  //     }else if (resp.status === 'not_authorized') {
          
  //     }else {
          
  //     }
  //   };

    fbPromise(){
      return new Promise<any>(
        (resolve, reject) => {
          FB.login((response) => {
            if(response.authResponse){
              console.log("Inside If AuthResposne");
              resolve(response);
            } else{
              console.log("Inside reject");
              reject();
            }
          })
        }
      )
    }

    loginFB(){
      return Observable.create((observer)=> {
        this.fbPromise().then(
          (response) => {
            if(response.status === 'connected'){
              
              // Unsure about this approach
              // TODO: Discuss this approach
              const user = new User(
                response.authResponse.userID,
                response.authResponse.accessToken)
              
              // Emit User
              observer.next(user);
            }else{
              return null;
            }
          },
          (error: any) => observer.error(error)
        );
      })        
    }

    // LogOutFB(){

    // }

    // getUser(){
    //   FB.api('/me', response =>{
    //     console.log("User is", response)
    //   })
    // }
}