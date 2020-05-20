import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users

let mockData = [];
let x = 0;

@Injectable()
class MockApi implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users') && method === 'POST':
          return addUser();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function addUser() {
      const user = body;
      x = x + 1;
      user.id = x;
      mockData.push(user);
      return ok(user);
    }

    function getUsers() {
      return ok(mockData);
    }

    function getUserById() {
      const user = mockData.find((x) => x.id === idFromUrl());
      if (!user) {
        error('User not found');
      }
      return ok(user);
    }

    function deleteUser() {
      mockData = mockData.filter((x) => x.id !== idFromUrl());
      return ok();
    }

    // helper functions

    // tslint:disable-next-line: no-shadowed-variable
    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      // tslint:disable-next-line: radix
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const MockApiService = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockApi,
  multi: true,
};
