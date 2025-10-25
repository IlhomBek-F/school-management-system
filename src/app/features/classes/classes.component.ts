import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title.component/page-title.component";

@Component({
  selector: 'school-classes.component',
  imports: [PageTitleComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesComponent implements OnInit {

  ngOnInit(): void { }

}
