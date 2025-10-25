import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";

@Component({
  selector: 'school-settings',
  imports: [PageTitleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {

  ngOnInit(): void { }

}
