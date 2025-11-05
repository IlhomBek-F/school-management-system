import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const isAuthorized = authService.isAuthorized()

  return isAuthorized || router.parseUrl('/login')
}
