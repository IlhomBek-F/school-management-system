import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";

@Component({
  selector: 'school-dashboard',
  imports: [PageTitleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void { }

}
