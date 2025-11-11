import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
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
import { CreateRoomPayload, Room, RoomDropdownOptionsSuccess, RoomListSuccessRes, RoomSuccessRes } from '../models';
import { Building } from '@core/models/building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Facility } from '@core/models/facility';
import { finalize, forkJoin } from 'rxjs';
import { makeDropdownOption } from 'app/utils/helper';
import { RoomStats, RoomStatsSuccessRes } from '@core/models/stats';
import { StatsService } from '@core/services/stats.service';

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
  viewMode: WritableSignal<ViewModeEnum> = signal(ViewModeEnum.GRID);
  loading = signal(false)
  loadingOptions = signal(false)
  loadingRoomStats = signal(false)
  roomTypeOptions: WritableSignal<DropdownOption[]> = signal([{ label: 'All Types', value: 'all' }]);

  filterFormGroup = new FormGroup({
    search: new FormControl(),
    room_type_id: new FormControl('all'),
    status: new FormControl('all')
  })

  rooms: WritableSignal<Room[]> = signal([]);
  statuses: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Available', value: RoomStatus.AVAILABLE },
    { label: 'Occupied', value: RoomStatus.OCCUPIED },
    { label: 'Maintenance', value: RoomStatus.MAINTENANCE }
  ];

  roomStats = signal<RoomStats>({total_rooms: 0, total_capacity: 0, available_rooms: 0, avg_occupancy: 0})

  private _dialogService = inject(DialogService)
  private _confirmService = inject(DeleteConfirmDialogService)
  private _messageService = inject(ToastService)
  private _roomsService = inject(RoomsService)
  private _statsService = inject(StatsService);
  private _buildingOptions: WritableSignal<Building[]> = signal([]);
  private _facilities: WritableSignal<Facility[]> = signal([]);

  ngOnInit(): void {
    this._getRoomList();
    this._getRoomStats();
    this._getRoomDropdownOptions();
    this._handleFilterRoom();
  }

  upsertRoom(room?: Room): void {
    const loading = signal(false);
    const dialogRef = this._dialogService.open(DynamicFormModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: room ? 'Update room' : 'Add new room',
      width: '45%',
      data: {
        payload: {...room, facilities: room?.facilities.map(({id}) => id)},
        loading: loading,
        formContainers: this._getRoomFormContainer(),
        footer: {
          onConfirm: (formValue: CreateRoomPayload) => {
            if(room) {
              this._updateRoom(formValue, loading, dialogRef)
            } else {
              this._createRoom(formValue, loading, dialogRef)
            }
          },
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  deleteRoom(room: Room) {
    const deleteConfirm = (ref: ConfirmationService) => {
      this._confirmService.loading$.next(true)
      this._roomsService.delete(room.id)
       .pipe(
         finalize(() => this._confirmService.loading$.next(false)),
         untilDestroyed(this)
       ).subscribe({
        next: () => {
          this._messageService.success("Room deleted successfully");
          ref.close();
          this._getRoomList()
        }, error: (err) => {
          this._messageService.error(err.message || "Failed deleting room")
        }
      })
    }

    this._confirmService.confirm(deleteConfirm)
  }

  private _getRoomStats() {
    this.loadingRoomStats.set(true)
    this._statsService.getRoomStats()
    .pipe(
      finalize(() => this.loadingRoomStats.set(false)),
      untilDestroyed(this)
    ).subscribe({next: (res: RoomStatsSuccessRes) => {
       this.roomStats.set(res.data)
    }, error: (err) => {
       this._messageService.error(err.message || "Failed getting room stats")
    }})
  }

  private _getRoomList() {
    this.loading.set(true)
    this._roomsService.retrieveAll<RoomListSuccessRes>()
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
           this.rooms.set(res.data);
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
          this._getRoomList()
          dialogref.close()
        }, error: (err) => {
          this._messageService.error(err.message || "Failed creating new room. Please try again")
        }
      })
  }

  private _updateRoom(formValue: CreateRoomPayload, loading: WritableSignal<boolean>, dialogref: DynamicDialogRef) {
    console.log(formValue)
  }

  private _handleFilterRoom() {
    this.filterFormGroup.valueChanges
      .pipe(
        untilDestroyed(this)
      ).subscribe(console.log)
  }

  private _getRoomDropdownOptions() {
    this.loadingOptions.set(true)
    forkJoin([
      this._roomsService.getBuildings(),
      this._roomsService.getFacilities(),
      this._roomsService.getRoomTypes()
    ]).pipe(
      finalize(() => this.loadingOptions.set(false)),
      untilDestroyed(this)
    ).subscribe({
      next: ([buildingRes, facilityRes, roomTypeRes]: RoomDropdownOptionsSuccess) => {
        this._buildingOptions.set(buildingRes.data)
        this._facilities.set(facilityRes.data)
        this.roomTypeOptions.update((prev) => [...prev, ...roomTypeRes.data.map(({name, id}) => makeDropdownOption(name, id))])
      }, error: (err) => {
        this._messageService.error(err.message || "Failed getting room dropdown options")
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
            options: this.roomTypeOptions()
          }),
          new QuestionSelectInput({
            key: 'building_id',
            label: 'Building',
            required: true,
            optionLabel: "name",
            optionValue: "id",
            options: this._buildingOptions()
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
              return this._facilities().filter(({ id }) => facility_ids.includes(id))
            },
            options: this._facilities()
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
