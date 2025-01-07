// import { inject } from '@angular/core';
// import { CanActivateFn } from '@angular/router';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
// import { map, switchMap, take } from 'rxjs/operators';

// export const cognitoAuthGuard: CanActivateFn = (route, state) => {
//   const oidcSecurityService = inject(OidcSecurityService);

//   return oidcSecurityService.checkAuth().pipe(
//     switchMap(() => oidcSecurityService.isAuthenticated$),
//     take(1),
//     map(({ isAuthenticated }) => {
//       if (isAuthenticated) {
//         return true;
//       }

//       oidcSecurityService.authorize();
//       return false;
//     })
//   );
// };
