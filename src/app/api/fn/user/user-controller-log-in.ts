/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AccessToken } from '../../models/access-token';
import { UserDto } from '../../models/user-dto';

export interface UserControllerLogIn$Params {
      body: UserDto
}

export function userControllerLogIn(http: HttpClient, rootUrl: string, params: UserControllerLogIn$Params, context?: HttpContext): Observable<StrictHttpResponse<AccessToken>> {
  const rb = new RequestBuilder(rootUrl, userControllerLogIn.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AccessToken>;
    })
  );
}

userControllerLogIn.PATH = '/user/login';
