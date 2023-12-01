import { Injectable } from '@angular/core';

declare let toastr: any;

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  success(name: string, title?: string) {
    toastr.success(name, title);
  }
  error(name: string, title?: string) {
    toastr.error(name, title);
  }
  info(name: string, title?: string) {
    toastr.info(name, title);
  }
  warning(name: string, title?: string) {
    toastr.warning(name, title);
  }
}
