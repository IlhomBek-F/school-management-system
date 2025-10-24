import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'school-teachers',
  imports: [],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {

  ngOnInit(): void { }

}
