
Social login/share buttons for Angular 6, 

![Generic badge](https://img.shields.io/badge/build-passing-green.svg)
![Generic badge](https://img.shields.io/badge/Angular-6-green.svg) AOT Compatible

## Reference
Original project : sabyasachibiswal https://github.com/sabyasachibiswal/angular5-social-login

Built by using Angular6 **ng generate library**

### Scope
1. FaceBook Login/Share buttons
2. Google Login button
3. Other(weChat) buttons is coming soon
4. ...

### Get started

### Install via npm
```
npm install --save ng6-social-button
```

### Import the module

There are two ways to import the module

**option 1**
```typescript
...
 
import {
    Ng6SocialButtonModule,
    SocialServiceConfig
} from "ng6-social-button";

// Configs
export function getAuthServiceConfigs() {
    let config = new SocialServiceConfig()
        .addFacebook("Your-Facebook-app-id")
        .addGoogle("Your-Google-Client-Id");
    return config;
}

@NgModule({
  imports: [
      ...
      Ng6SocialButtonModule
  ],
  providers: [
      ...
      {
          provide: SocialServiceConfig,
          useFactory: getAuthServiceConfigs
      },
  ],
  bootstrap: [...]
})

```

**option 2**
```typescript
...
 
import {
    Ng6SocialButtonModule,
    FacebookLoginProvider,
    GoogleLoginProvid,
    SocialServiceConfig
} from "ng6-social-button";

// Configs
export function getAuthServiceConfigs() {
    let config = new SocialServiceConfig(
       [
           new FacebookLoginProvider("Your-Facebook-app-id"),
           new GoogleLoginProvid("Your-Google-Client-Id")
       ]
    );
    return config;
}

@NgModule({
  imports: [
      ...
      Ng6SocialButtonModule
  ],
  providers: [
      ...
      {
          provide: SocialServiceConfig,
          useFactory: getAuthServiceConfigs
      },
  ],
  bootstrap: [...]
})
```

### Usage

**option 1: Use buttons**



*in social.component.ts*

```typescript
import { Component } from '@angular/core';
import {
    SocialService
} from "ng6-social-button";
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {

    shareObj = {
        href: "FACEBOOK-SHARE-LINK",
        hashtag:"#FACEBOOK-SHARE-HASGTAG"
    };

  constructor(private socialAuthService: SocialService){}

    signOut(){
       if(this.socialAuthService.isSocialLoggedIn()){
           this.socialAuthService.signOut().catch((err)=>{

           });
       }
    }

    getSocialUser(socialUser){
        console.log(socialUser);
    }
 }

```

*in social.component.html*

```html
...
<facebook-login-button  (socialUser)="getSocialUser($event)"></facebook-login-button>

<facebook-share-button [share]="shareObj" ></facebook-share-button>

<google-login-button (socialUser)="getSocialUser($event)"></google-login-button>

<button (click)="signOut()">SOCIAL LOGOUT</button>
...
```

**option 2: Use providers with custom button**

*in social.component.html*


*in social.component.ts*

```typescript
import { Component } from '@angular/core';
import {
    SocialService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from "ng6-social-button";
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent {

    shareObj = {
        href: "FACEBOOK-SHARE-LINK",
        hashtag:"#FACEBOOK-SHARE-HASGTAG"
    };

  constructor(private socialAuthService: SocialService){}

    signOut(){
       if(this.socialAuthService.isSocialLoggedIn()){
           this.socialAuthService.signOut().then(()=>{
               ...
           }).catch((err)=>{
              ...
           });
       }
    }

    public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "facebook"){
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_TYPE;
        }else if(socialPlatform == "google"){
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_TYPE;
        }
    
        this.socialAuthService.signIn(socialPlatformProvider).then(
        (socialUser) => {
            console.log(socialPlatform+" sign in data : " , socialUser);
            // Now sign-in with userData
            ...        
        });
    }

    public facebookSharing(shareObj: any){
        this.socialAuthService.facebookSharing(shareObj);
    }
 }

```


```html
...
<button (click)="socialSignIn('facebook')">Sign in with Facebook</button>

<button (click)="facebookSharing(shareObj)">Facebook Share</button>  

<button (click)="socialSignIn('google')">Signin in with Google</button>  

<button (click)="signOut()">SOCIAL LOGOUT</button>
...
```

----
## Login Buttons API
| Property    |      Description                 |  Type                     |   Default               |
|-------------|:--------------------------------:|--------------------------:|------------------------:|
| (socialUser)|  trigger when signin done        | EventEmitter<{SocialUser}>|     -     |
| [scopes]    |  social custom scopes            |   [string]                |     facebook:['email', 'public_profile'] |
|             |                                  |                           |     -     |

## Share Buttons API
| Property    |      Description                 |  Type                     |   Default               |
|-------------|:--------------------------------:|--------------------------:|------------------------:|
| [share]     |  social share object             |   object                  |     facebook:{href:Current_URL, hashtag: null} |
|             |                                  |                           |     -     |


## SocialUser Object API
| Property    |      Description                 |  Type                     | 
|-------------|:--------------------------------:|--------------------------:|
| provider    |  social provider: facebook/google/wechat |   string          |    
| id          |  user id                         |   string                  |  
| email       |  social user's email             |   string                  |  
| name        |  social user's name              |   string                  |  
| image       |  social profile image URL        |   string                  |    
| accessToken?|  return oauth2.0 accessToken if has     |   string           |  
| idToken?    |  return oauth2.0 idToken if has  |   string                  | 

----


## Social Client/App Id

### Facebook App Id :

You need to create your own app by going to [Facebook Developers](https://developers.facebook.com/) page. Sign in and Add new app under My Apps and configure Valid OAuth redirect URIs.

### Google Client Id :

Follow this official documentation on [how to Create a Google API Console project and client ID](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin).


