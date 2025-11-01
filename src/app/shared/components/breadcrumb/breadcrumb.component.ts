import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, last } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const ROUTE_BREADCRUMB: Record<any, any> = {
  students: {
    label: 'Students',
    icon: 'pi pi-users'
  },
  teachers: {
    label: 'Teachers',
    icon: 'pi pi-users'
  },
  classes: {
    label: 'Classes',
    icon: 'pi pi-book'
  },
  ':student_id': {
    label: 'Student detail',
    icon: 'pi pi-info-circle'
  },
  ':teacher_id': {
    label: 'Teacher detail',
    icon: 'pi pi-info-circle'
  },
  ':class_id': {
    label: 'Class detail',
    icon: 'pi pi-info-circle'
  }
}

@Component({
  selector: 'school-breadcrumb',
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  items: MenuItem[] = []

  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _cdr = inject(ChangeDetectorRef)

  constructor() {
     this._router.events.pipe(
      filter((evt) => evt instanceof NavigationEnd)
    ).subscribe(() => {
      this.items = this._createBreadcrumbs(this._activeRoute);
      this._cdr.markForCheck()
    })
  }

  private _createBreadcrumbs(activeRoute: ActivatedRoute): MenuItem[] {
    const breadcrumbs: MenuItem[] = [];
    let currUrl = '';
    const children = activeRoute.children

    while(children.length) {
      const childSnapshot = children.shift()?.snapshot
      const routeURL = childSnapshot?.url.map(segment => segment.path)
      const spl = childSnapshot?.routeConfig?.path?.split('/') as string[]

      spl.forEach((url, index) => {
        if(ROUTE_BREADCRUMB[url]) {
          currUrl += `/${routeURL?.[index]}`
          breadcrumbs.push({label: ROUTE_BREADCRUMB[url].label, routerLink: currUrl, icon: ROUTE_BREADCRUMB[url].icon})
        }
      })
    }
    return breadcrumbs
  }
}
