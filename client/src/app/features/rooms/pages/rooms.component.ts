import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { RoomsGridViewListComponent } from '../components/rooms-grid-view-list/rooms-grid-view-list.component';
import { RoomsTableViewListComponent } from '../components/rooms-table-view-list/rooms-table-view-list.component';
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { DropdownOption } from '@core/models/base';
import { RoomStatus } from '../enums';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { QuestionMultiSelect } from '@core/dynamic-form/question-multi-select';
import { RoomsService } from '../services/rooms.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Room } from '../models';
import { Building } from '@core/models/building';

@UntilDestroy()
@Component({
  selector: 'school-rooms',
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
  providers: [RoomsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  readonly VIEW_MODE = ViewModeEnum;
  loading = signal(true)
  loadingRoomTypes = signal(false)
  loadingBuildings = signal(false)
  roomTypeOptions: DropdownOption[] = [{ label: 'All Types', value: 'all' }]
  buildingOptions: Building[] = []

    rooms: Room[] = [
    {
      id: 1,
      name: 'Room 101',
      code: 'RM-101',
      room_type: 'Classroom',
      building: 'Main Building',
      floor: 1,
      capacity: 30,
      currentOccupancy: 28,
      facilities: ['Projector', 'Whiteboard', 'AC'],
      status: RoomStatus.OCCUPIED,
      color: 'bg-blue-500',
      created_at: "",
      updated_at: "",
      deleted_at: null
    },
    {
      id: 2,
      name: 'Lab 1',
      code: 'LAB-01',
      room_type: 'Laboratory',
      building: 'Science Block',
      floor: 2,
      capacity: 25,
      currentOccupancy: 0,
      facilities: ['Lab Equipment', 'Safety Gear', 'Computers'],
      status: RoomStatus.AVAILABLE,
      color: 'bg-green-500',
      created_at: "",
      updated_at: "",
      deleted_at: null
    },
    {
      id: 3,
      name: 'Room 201',
      code: 'RM-201',
      room_type: 'Classroom',
      building: 'Main Building',
      floor: 2,
      capacity: 35,
      currentOccupancy: 32,
      facilities: ['Smart Board', 'Sound System', 'AC'],
      status: RoomStatus.OCCUPIED,
      color: 'bg-purple-500',
      created_at: "",
      updated_at: "",
      deleted_at: null
    },
  ];

  filteredRooms: Room[] = [];
  searchTerm: string = '';
  selectedType: string = 'all';
  selectedStatus: string = 'all';
  viewMode: string = ViewModeEnum.LIST;

  statuses: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Available', value: RoomStatus.AVAILABLE },
    { label: 'Occupied', value: RoomStatus.OCCUPIED },
    { label: 'Maintenance', value: RoomStatus.MAINTENANCE }
  ];

  totalRooms: number = 0;
  availableRooms: number = 0;
  totalCapacity: number = 0;
  avgOccupancy: number = 0;
  private _dialogService = inject(DialogService)
  private _confirmService = inject(DeleteConfirmDialogService)
  private _messageService = inject(ToastService)
  private _roomsService = inject(RoomsService)

   ngOnInit(): void {
    this.filteredRooms = [...this.rooms];
    this.calculateStats();
    this._getRoomTypes();
    this._getBuildingOptions()
  }

  calculateStats(): void {
    this.totalRooms = this.rooms.length;
    this.availableRooms = this.rooms.filter(r => r.status === RoomStatus.AVAILABLE).length;
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
        this.selectedType === 'all' || room.room_type === this.selectedType;
      const matchesStatus =
        this.selectedStatus === 'all' || room.status === this.selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }

   upsertRoom(room?: Room): void {
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

  deleteRoom(room: Room) {
          this._confirmService.confirm((ref: ConfirmationService) => {
            this._confirmService.loading$.next(true)
            setTimeout(() => {
              this._confirmService.loading$.next(false);
              this.filteredRooms = this.filteredRooms.filter(({id}) => room.id !== id)
              this._messageService.success("Room deleted successfully")
              ref.close()
            }, 3000)
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

  private _getRoomTypes() {
    this.loadingRoomTypes.set(true)
    this._roomsService.getRoomTypes()
    .pipe(untilDestroyed(this))
     .subscribe({
       next: (res) => {
          this.loadingRoomTypes.set(false)
          this.roomTypeOptions.push(...res.data.map(({name, id}) => ({label: name, value: id}))) 
       }, error: (err) => {
           this._messageService.error(err.message || "Failed getting room types")
           this.loadingRoomTypes.set(false)
       }
     })
  }

  private _getBuildingOptions() {
     this.loadingBuildings.set(true)
    this._roomsService.getBuildings()
    .pipe(untilDestroyed(this))
     .subscribe({
       next: (res) => {
          this.loadingBuildings.set(false)
          this.buildingOptions = res.data;
       }, error: (err) => {
           this._messageService.error(err.message || "Failed getting buildings")
           this.loadingBuildings.set(false)
       }
     })
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
            key: 'room_type_id',
            label: 'Room type',
            required: true,
            options: this.roomTypeOptions
          }),
          new QuestionSelectInput({
            key: 'building_id',
            label: 'Building',
            required: true,
            optionLabel: "name",
            optionValue: "id",
            options: this.buildingOptions
          }),

        ]
      },
      {
        containers: [
            new QuestionSelectInput({
            key: 'floor',
            label: 'Floor',
            required: true,
            options: [

            ]
          }),
            new QuestionMultiSelect({
            key: 'facility_ids',
            label: 'Facility',
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
            options: this.statuses
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
