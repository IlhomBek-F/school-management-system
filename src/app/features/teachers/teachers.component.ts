import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";

@Component({
  selector: 'school-teachers',
  imports: [PageTitleComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {

  ngOnInit(): void { }

}
