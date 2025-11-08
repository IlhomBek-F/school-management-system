import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { SchoolStatsCardComponent } from "@shared/components/stats-card/stats-card.component";
import { ButtonModule } from "primeng/button";
import { TextInputComponent } from "@shared/components/dynamic-form/text-input/text-input.component";
import { SelectInputComponent } from "@shared/components/dynamic-form/select-input/select-input.component";
import { EmptyListComponent } from "@shared/components/empty-list/empty-list.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
import { CreateRoomPayload, Room, RoomListSuccessRes, RoomSuccessRes } from '../models';
import { Building } from '@core/models/building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Facility } from '@core/models/facility';
import { finalize } from 'rxjs';

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
    ReactiveFormsModule,
    EmptyListComponent,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  providers: [RoomsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsComponent {
  readonly VIEW_MODE = ViewModeEnum;
  loading = signal(false)
  loadingRoomTypes = signal(false)

  roomTypeOptions: DropdownOption[] = [{ label: 'All Types', value: 'all' }];

  filterFormGroup = new FormGroup({
    search: new FormControl(),
    room_type_id: new FormControl('all'),
    status: new FormControl('all')
  })

  rooms: Room[] = [
    // {
    //   id: 1,
    //   name: 'Room 101',
    //   code: 'RM-101',
    //   room_type: 'Classroom',
    //   building: 'Main Building',
    //   floor_id: 1,
    //   capacity: 30,
    //   currentOccupancy: 28,
    //   facilities: ['Projector', 'Whiteboard', 'AC'],
    //   status: RoomStatus.OCCUPIED,
    //   color: 'bg-blue-500',
    //   created_at: "",
    //   updated_at: "",
    //   deleted_at: null
    // },
    // {
    //   id: 2,
    //   name: 'Lab 1',
    //   code: 'LAB-01',
    //   room_type: 'Laboratory',
    //   building: 'Science Block',
    //   floor_id: 2,
    //   capacity: 25,
    //   currentOccupancy: 0,
    //   facilities: ['Lab Equipment', 'Safety Gear', 'Computers'],
    //   status: RoomStatus.AVAILABLE,
    //   color: 'bg-green-500',
    //   created_at: "",
    //   updated_at: "",
    //   deleted_at: null
    // },
    // {
    //   id: 3,
    //   name: 'Room 201',
    //   code: 'RM-201',
    //   room_type: 'Classroom',
    //   building: 'Main Building',
    //   floor_id: 2,
    //   capacity: 35,
    //   currentOccupancy: 32,
    //   facilities: ['Smart Board', 'Sound System', 'AC'],
    //   status: RoomStatus.OCCUPIED,
    //   color: 'bg-purple-500',
    //   created_at: "",
    //   updated_at: "",
    //   deleted_at: null
    // },
  ];

  viewMode: string = ViewModeEnum.GRID;
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
  private _buildingOptions: Building[] = [];
  private _facilities: Facility[] = []

  ngOnInit(): void {
    this.calculateStats();
    this._getRoomList()
    this._getRoomTypes();
    this._getBuildingOptions();
    this._getFacilityOptions();
    this._handleFilterRoom();
  }

  calculateStats(): void {
    this.totalRooms = this.rooms.length;
    this.availableRooms = this.rooms.filter(r => r.status === RoomStatus.AVAILABLE).length;
    this.totalCapacity = this.rooms.reduce((sum, r) => sum + r.capacity, 0);
    const totalOccupancy = this.rooms.reduce((sum, r) => sum + r.currentOccupancy, 0);
    this.avgOccupancy = Math.round((totalOccupancy / this.totalCapacity) * 100);
  }

  upsertRoom(room?: Room): void {
    const loading = signal(false);
    const dialogRef = this._dialogService.open(DynamicFormModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Add new room',
      width: '45%',
      data: {
        payload: room,
        loading: loading,
        formContainers: this._getRoomFormContainer(),
        footer: {
          onConfirm: (formValue: CreateRoomPayload) => this._createRoom(formValue, loading, dialogRef),
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
        this._messageService.success("Room deleted successfully")
        ref.close()
      }, 3000)
    })
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  private _getRoomList() {
    this.loading.set(true)
    this._roomsService.retrieveAll<RoomListSuccessRes>()
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
           this.rooms = res.data
        }, error: (err) => {
           this._messageService.error(err.message || "Failed getting room list")
        }
      })
  }

  private _createRoom(formValue: CreateRoomPayload, loading: WritableSignal<boolean>, dialogref: DynamicDialogRef) {
    loading.set(true)
    this._roomsService.create<RoomSuccessRes, CreateRoomPayload>(formValue)
      .pipe(
        finalize(() => loading.set(false)),
        untilDestroyed(this)
      )
      .subscribe({
        next: (res) => {
          this._messageService.success("Created new room");
          dialogref.close()
        }, error: (err) => {
          this._messageService.error(err.message || "Failed creating new room. Please try again")
        }
      })
  }

  private _handleFilterRoom() {
    this.filterFormGroup.valueChanges
      .pipe(
        untilDestroyed(this)
      ).subscribe(console.log)
  }

  private _getRoomTypes() {
    this.loadingRoomTypes.set(true)
    this._roomsService.getRoomTypes()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.loadingRoomTypes.set(false)
          this.roomTypeOptions.push(...res.data.map(({ name, id }) => ({ label: name, value: id })))
        }, error: (err) => {
          this._messageService.error(err.message || "Failed getting room types")
          this.loadingRoomTypes.set(false)
        }
      })
  }

  private _getBuildingOptions() {
    this._roomsService.getBuildings()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this._buildingOptions = res.data;
        }, error: (err) => {
          this._messageService.error(err.message || "Failed getting buildings")
        }
      })
  }

  private _getFacilityOptions() {
    this._roomsService.getFacilities()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this._facilities = res.data;
        }, error: (err) => {
          this._messageService.error(err.message || "Failed getting facilities")
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
            value: 'all',
            options: this.roomTypeOptions
          }),
          new QuestionSelectInput({
            key: 'building_id',
            label: 'Building',
            required: true,
            optionLabel: "name",
            optionValue: "id",
            options: this._buildingOptions
          }),

        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'floor_id',
            label: 'Floor',
            required: true,
            options: [
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 }
            ]
          }),
          new QuestionMultiSelect({
            key: 'facilities',
            label: 'Facility',
            optionLabel: "name",
            optionValue: 'id',
            normalizeValue: (facility_ids: number[]) => {
              return this._facilities.filter(({ id }) => facility_ids.includes(id))
            },
            options: this._facilities
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
