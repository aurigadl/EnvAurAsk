import { inject  } from 'aurelia-framework';
import AuthService from 'AuthService';
import {steps} from 'jquery-steps';
import valida  from 'jquery-validation';

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
        stepsOrientation: "vertical",
        onStepChanging: function (event, currentIndex, newIndex) {
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex){
                return true;
            }
            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex){
                // To remove error styles
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },

        onFinishing: function (event, currentIndex) {
          form.validate().settings.ignore = ":disabled";
          return form.valid();
        },
        onFinished: function (event, currentIndex){
              alert("Submitted!");
        }
    }).validate({
          errorPlacement: function errorPlacement(error, element) { element.before(error);  },
         rules: {
           pokemon: {
                   required: true
           }
         }
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
