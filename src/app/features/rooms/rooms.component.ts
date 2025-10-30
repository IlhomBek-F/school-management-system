import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RoomsGridViewListComponent } from "./components/rooms-grid-view-list.component/rooms-grid-view-list.component";
import { RoomsTableViewListComponent } from "./components/rooms-table-view-list.component/rooms-table-view-list.component";
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { SchoolStatsCardComponent } from "@shared/components/stats-card/stats-card.component";
import { ButtonModule } from "primeng/button";
import { TextInputComponent } from "@shared/components/dynamic-form/text-input/text-input.component";
import { SelectInputComponent } from "@shared/components/dynamic-form/select-input/select-input.component";
import { EmptyListComponent } from "@shared/components/empty-list/empty-list.component";
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicFormModalComponent } from '@shared/components/dynamic-form-modal/dynamic-form-modal.component';
import { QuestionTextInput } from '@core/dynamic-form/question-text-input';
import { QuestionFieldTypeEnum } from '@core/enums/question-type.enum';
import { QuestionTextArea } from '@core/dynamic-form/question-textarea';
import { QuestionSelectInput } from '@core/dynamic-form/question-select-input';
import { FormContainer } from '@core/models/question-base';

interface Room {
  id: number;
  name: string;
  code: string;
  type: string;
  building: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  status: string;
  schedule: {
    day: string;
    time: string;
    class: string;
  }[];
  color: string;
}

@Component({
  selector: 'school-rooms.component',
  imports: [
    CommonModule,
    RoomsGridViewListComponent,
    RoomsTableViewListComponent,
    PageTitleComponent,
    SchoolStatsCardComponent,
    ButtonModule,
    TextInputComponent,
    SelectInputComponent,
    EmptyListComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
    rooms: Room[] = [
    {
      id: 1,
      name: 'Room 101',
      code: 'RM-101',
      type: 'Classroom',
      building: 'Main Building',
      floor: 1,
      capacity: 30,
      currentOccupancy: 28,
      facilities: ['Projector', 'Whiteboard', 'AC'],
      status: 'Occupied',
      schedule: [
        { day: 'Monday', time: '9:00 AM', class: 'Mathematics' },
        { day: 'Wednesday', time: '11:00 AM', class: 'Physics' }
      ],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Lab 1',
      code: 'LAB-01',
      type: 'Laboratory',
      building: 'Science Block',
      floor: 2,
      capacity: 25,
      currentOccupancy: 0,
      facilities: ['Lab Equipment', 'Safety Gear', 'Computers'],
      status: 'Available',
      schedule: [
        { day: 'Tuesday', time: '10:30 AM', class: 'Chemistry Lab' },
        { day: 'Thursday', time: '2:00 PM', class: 'Biology Lab' }
      ],
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Room 201',
      code: 'RM-201',
      type: 'Classroom',
      building: 'Main Building',
      floor: 2,
      capacity: 35,
      currentOccupancy: 32,
      facilities: ['Smart Board', 'Sound System', 'AC'],
      status: 'Occupied',
      schedule: [
        { day: 'Monday', time: '9:00 AM', class: 'Advanced Math' },
        { day: 'Friday', time: '1:00 PM', class: 'Statistics' }
      ],
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Computer Lab',
      code: 'COMP-01',
      type: 'Computer Lab',
      building: 'Technology Center',
      floor: 1,
      capacity: 40,
      currentOccupancy: 0,
      facilities: ['40 Computers', 'Projector', 'AC', 'WiFi'],
      status: 'Available',
      schedule: [
        { day: 'Tuesday', time: '8:00 AM', class: 'Computer Science' },
        { day: 'Thursday', time: '10:00 AM', class: 'Programming' }
      ],
      color: 'bg-indigo-500'
    },
    {
      id: 5,
      name: 'Auditorium',
      code: 'AUD-01',
      type: 'Auditorium',
      building: 'Main Building',
      floor: 1,
      capacity: 200,
      currentOccupancy: 0,
      facilities: ['Stage', 'Sound System', 'Lighting', 'AC', 'Projector'],
      status: 'Available',
      schedule: [
        { day: 'Friday', time: '3:00 PM', class: 'Assembly' }
      ],
      color: 'bg-pink-500'
    },
    {
      id: 6,
      name: 'Library Hall',
      code: 'LIB-01',
      type: 'Library',
      building: 'Library Block',
      floor: 1,
      capacity: 60,
      currentOccupancy: 15,
      facilities: ['Books', 'Study Tables', 'WiFi', 'AC'],
      status: 'Occupied',
      schedule: [],
      color: 'bg-orange-500'
    },
    {
      id: 7,
      name: 'Gymnasium',
      code: 'GYM-01',
      type: 'Sports',
      building: 'Sports Complex',
      floor: 1,
      capacity: 100,
      currentOccupancy: 45,
      facilities: ['Basketball Court', 'Equipment', 'Lockers'],
      status: 'Occupied',
      schedule: [
        { day: 'Daily', time: '3:30 PM', class: 'Physical Education' }
      ],
      color: 'bg-teal-500'
    },
    {
      id: 8,
      name: 'Art Studio',
      code: 'ART-01',
      type: 'Studio',
      building: 'Arts Building',
      floor: 2,
      capacity: 20,
      currentOccupancy: 0,
      facilities: ['Easels', 'Art Supplies', 'Natural Light'],
      status: 'Available',
      schedule: [
        { day: 'Monday', time: '2:00 PM', class: 'Art Class' },
        { day: 'Wednesday', time: '2:00 PM', class: 'Art Class' }
      ],
      color: 'bg-rose-500'
    }
  ];

  filteredRooms: Room[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedStatus: string = 'all';
  viewMode: string = 'grid';

  roomTypes: any[] = [
    { label: 'All Types', value: 'all' },
    { label: 'Classroom', value: 'Classroom' },
    { label: 'Laboratory', value: 'Laboratory' },
    { label: 'Computer Lab', value: 'Computer Lab' },
    { label: 'Auditorium', value: 'Auditorium' },
    { label: 'Library', value: 'Library' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Studio', value: 'Studio' }
  ];

  statuses: any[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Available', value: 'Available' },
    { label: 'Occupied', value: 'Occupied' },
    { label: 'Maintenance', value: 'Maintenance' }
  ];

  totalRooms: number = 0;
  availableRooms: number = 0;
  totalCapacity: number = 0;
  avgOccupancy: number = 0;
  private _dialogService = inject(DialogService)

   ngOnInit(): void {
    this.filteredRooms = [...this.rooms];
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalRooms = this.rooms.length;
    this.availableRooms = this.rooms.filter(r => r.status === 'Available').length;
    this.totalCapacity = this.rooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOccupancy = this.rooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
    this.avgOccupancy = Math.round((totalOccupancy / this.totalCapacity) * 100);
  }

  filterRooms(): void {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSearch =
        room.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        room.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        room.building.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType =
        this.selectedType === 'all' || room.type === this.selectedType;
      const matchesStatus =
        this.selectedStatus === 'all' || room.status === this.selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }

   upsertRoom(room?: any): void {
    const dialogRef = this._dialogService.open(DynamicFormModalComponent, {
      focusOnShow: false,
       dismissableMask: true,
       modal: true,
       header: 'Add new room',
       width: '45%',
       data: {
         payload: room,
         formContainers: this._getRoomFormContainer(),
         footer: {
           onConfirm: (formValue: any) => console.log(formValue),
           onCancel: () => dialogRef.close()
         }
       }
    })
  }

   onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterRooms();
  }

  onTypeChange(value: string): void {
    this.selectedType = value;
    this.filterRooms();
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.filterRooms();
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  private _getRoomFormContainer(): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'name',
            label: 'Room Name',
            required: true,
          }),
          new QuestionTextInput({
            key: 'code',
            label: 'Room code',
            required: true,
          }),
          new QuestionTextInput({
            key: 'number',
            label: 'Room number',
            type: QuestionFieldTypeEnum.Number
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'type',
            label: 'Room type',
            required: true,
            options: [

            ]
          }),
          new QuestionSelectInput({
            key: 'building',
            label: 'Building',
            required: true,
            options: [

            ]
          }),
          new QuestionSelectInput({
            key: 'floor',
            label: 'Floor',
            required: true,
            options: [

            ]
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'status',
            label: 'Status',
            required: true,
            options: [

            ]
          }),
          new QuestionTextInput({
            key: 'capacity',
            label: 'Room capacity',
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'area',
            label: 'Room area',
            type: QuestionFieldTypeEnum.Number
          })
        ]
      },
      {
        containers: [
          new QuestionTextArea({
            key: 'description',
            label: 'Description'
          })
        ]
      }
    ]
  }
}
