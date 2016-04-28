import { inject} from 'aurelia-framework';
import AuthService from 'AuthService';

@inject(AuthService)
export class NavBar {

  constructor(AuthService) {
    this.logout = () => {
        AuthService.logout()
    }
  }

}
