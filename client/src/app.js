import 'bootstrap';
import { inject  } from 'aurelia-framework';
import AuthService from 'AuthService';
import steps from 'jquery-steps';

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

  attached(){

    var form = $("#example-vertical").show();

    form.steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        stepsOrientation: "vertical"
    })
  }
}


export class ToJSONValueConverter {
  toView(obj) {
    if (obj) {
      return JSON.stringify(obj, null, 2)
    }
  }
}
