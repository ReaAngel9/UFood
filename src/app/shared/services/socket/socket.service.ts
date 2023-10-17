import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  readonly url: string = environment.apiUrl;

  constructor() {
    this.socket = io.io(this.url);
  }

  listen(event: string) {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
