import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  // confirm(message: string, okCallback: () => any) {
  //   alertify.confirm('MENSAJE A', 'MENSAJE B', function(e) {
  //     if (e) {
  //       okCallback();
  //     } else {}
  //   });
  // }

  confirm(tittle: string, message: string, okCallback: () => any) {
    alertify.confirm(tittle, message, function() { okCallback(); }
    , function() { alertify.error('Cancel'); });
  }
  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }
}
