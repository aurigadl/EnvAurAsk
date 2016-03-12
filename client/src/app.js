import 'bootstrap';
import { inject  } from 'aurelia-framework';
import AuthService from 'AuthService';

@inject(AuthService)
export class App {

  constructor(AuthService) {
    this.auth = AuthService;
  }

  configureRouter(config, router) {
    config.title = 'Answer me';
    config.map([
        { route: 'wizard', name: 'wizard', moduleId: 'users', nav: true, title: 'wizard test' }
        ]);

    this.router = router;
  }

}


export class ToJSONValueConverter {
  toView(obj) {
    if (obj) {
      return JSON.stringify(obj, null, 2)
    }
  }
}

