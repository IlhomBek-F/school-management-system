import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { BehaviorSubject, catchError, delay, filter, Observable, switchMap, take, throwError } from "rxjs";

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function authInteceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.url.includes('/login')) {
    return next(req).pipe(delay(2000)) // remove delay in production mode
  }

  const authService = inject(AuthService);
  const router = inject(Router)

  const handleUnauthorized = () => {
    authService.clearTokens();
    router.navigate(['/login']);
  };

  if (!authService.isAuthorized()) {
    handleUnauthorized()
    return throwError(() => new Error("Unauthorized"));
  }

  const accessToken = authService.getAccessToken();

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return next(req).pipe(
    delay(2000), // remove delay in production mode
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(req, next, authService, router);
      }

      return throwError(() => new Error(error.error.message));
    })
  )
}

function handle401Error(req: HttpRequest<unknown>, next: HttpHandlerFn, authService: AuthService, router: Router) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null)
    const refreshToken = authService.getRefreshToken()

    if (!refreshToken) {
      authService.clearTokens()
      router.navigate(['/login'])
      return throwError(() => new Error("No refresh token available"))
    }

    return authService.refreshAccessToken().pipe(
      switchMap((newToken) => {
        isRefreshing = false
        refreshTokenSubject.next(newToken)
        authService.saveAccessToken(newToken)

        const retryReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${newToken}`
          }
        })

        return next(retryReq)
      }),
      catchError((err) => {
        isRefreshing = false;
        authService.clearTokens()
        router.navigate(['/login'])
        return throwError(() => err)
      })
    )
  }

  return refreshTokenSubject.pipe(
    filter((token) => !!token),
    take(1),
    switchMap((token) => {
      const retryReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })

      return next(retryReq)
    })
  )
}
