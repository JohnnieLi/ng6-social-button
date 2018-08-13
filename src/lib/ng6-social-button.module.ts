import { NgModule } from '@angular/core';
import { FacebookLoginButton } from './buttons/facebookLoginButton';
import { GoogleLoginButton } from './buttons/googleLoginButton';
import {FacebookSharingButton} from "./buttons/facebookSharingButton";

@NgModule({
  imports: [

  ],
  declarations: [FacebookLoginButton, GoogleLoginButton, FacebookSharingButton],
  exports: [FacebookLoginButton, GoogleLoginButton, FacebookSharingButton]
})
export class Ng6SocialButtonModule { }
