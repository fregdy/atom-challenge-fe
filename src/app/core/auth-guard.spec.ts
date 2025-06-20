import {TestBed} from '@angular/core/testing';
import {CanActivateFn} from '@angular/router';

import {authGuard} from './auth-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (route, state) =>
    TestBed.runInInjectionContext(() => authGuard(route,state));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
