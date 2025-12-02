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
import { DropdownOption, Meta } from '@core/models/base';
import { RoomStatus } from '../enums';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { QuestionMultiSelect } from '@core/dynamic-form/question-multi-select';
import { RoomsService } from '../services/rooms.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Room, RoomDropdownOptionsSuccess, RoomListSuccessRes, RoomQuery, RoomSuccessRes, UpsertRoomPayload } from '../models';
import { Building } from '@core/models/building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Facility } from '@core/models/facility';
import { debounceTime, distinctUntilChanged, finalize, forkJoin } from 'rxjs';
import { makeDropdownOption } from 'app/utils/helper';
import { RoomStats, RoomStatsSuccessRes } from '@core/models/stats';
import { StatsService } from '@core/services/stats.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { OptionTypeEnum } from '@core/enums/option-type.enum';
import { AsyncOptionEnum } from '@core/enums/async-option.enum';

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
    PaginatorModule,
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
  optionType = OptionTypeEnum;
  asyncOptionType = AsyncOptionEnum;

  loading = signal(false)
  loadingOptions = signal(false)
  loadingRoomStats = signal(false)
  roomTypeOptions: WritableSignal<DropdownOption[]> = signal([{ label: 'All Types', value: 0 }]);

  filterFormGroup = new FormGroup({
    search: new FormControl("", {nonNullable: true}),
    room_type_id: new FormControl(0, {nonNullable: true}),
    status: new FormControl('', {nonNullable: true}),
    page: new FormControl(1, {nonNullable: true}),
    per_page: new FormControl(5, {nonNullable: true})
  })

  rooms: WritableSignal<Room[]> = signal([]);

  roomsMeta: WritableSignal<Meta> = signal({
    total: 0,
    per_page: this.filterFormGroup.get('per_page')?.value || 5,
    current_page: this.filterFormGroup.get('page')?.value || 1
  })

  statuses: DropdownOption[] = [
    { label: 'All Status', value: '' },
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
        loading: loading,
        formContainers: this._getRoomFormContainer(room),
        footer: {
          onConfirm: (formValue: UpsertRoomPayload) => {
            loading.set(true)

            if(room) {
              this._updateRoom({...formValue, id: room.id}, loading, dialogRef)
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

  onPageChange({page = 0}: PaginatorState) {
    this.filterFormGroup.patchValue({...this.filterFormGroup.getRawValue(), page: page + 1}, {emitEvent: false})
    this._getRoomList()
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
    const query: RoomQuery = this.filterFormGroup.getRawValue()

    this.loading.set(true)
    this._roomsService.retrieveAll<RoomListSuccessRes>(query)
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
           this.rooms.set(res.data);
           this.roomsMeta.set(res.meta)
        }, error: (err) => {
           this._messageService.error(err.message || "Failed getting room list")
        }
      })
  }

  private _createRoom(formValue: UpsertRoomPayload, loading: WritableSignal<boolean>, dialogref: DynamicDialogRef) {
    this._roomsService.create<RoomSuccessRes, UpsertRoomPayload>(formValue)
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

  private _updateRoom(formValue: UpsertRoomPayload, loading: WritableSignal<boolean>, dialogref: DynamicDialogRef) {
    this._roomsService.update<RoomSuccessRes, UpsertRoomPayload>(formValue)
     .pipe(
      finalize(() => loading.set(false)),
      untilDestroyed(this)
     ).subscribe({next: () => {
       this._messageService.success("Room updated successfully")
       dialogref.close()
       this._getRoomList();
     }, error: (err) => {
       this._messageService.error("Failed updating room")
     }})
  }

  private _handleFilterRoom() {
    this.filterFormGroup.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => {
          return prev.search === curr.search && prev.status === curr.status && prev.room_type_id === curr.room_type_id
        }),
        untilDestroyed(this)
      ).subscribe((value) => {
        this.filterFormGroup.patchValue({...value, page: 1}, {emitEvent: false})
        this._getRoomList()
      })
  }

  private _getRoomDropdownOptions() {
    this.loadingOptions.set(true)
    forkJoin([
      this._roomsService.getBuildings(),
      this._roomsService.getRoomTypes()
    ]).pipe(
      finalize(() => this.loadingOptions.set(false)),
      untilDestroyed(this)
    ).subscribe({
      next: ([buildingRes, roomTypeRes]: RoomDropdownOptionsSuccess) => {
        this._buildingOptions.set(buildingRes.data)
        this.roomTypeOptions.update((prev) => [...prev, ...roomTypeRes.data.map(({name, id}) => makeDropdownOption(name, id))])
      }, error: (err) => {
        this._messageService.error(err.message || "Failed getting room dropdown options")
      }
    })
  }

  private _getRoomFormContainer(room?: Room): FormContainer[] {
    return [
      {
        containers: [
          new QuestionTextInput({
            key: 'name',
            label: 'Room Name',
            value: room?.name,
            required: true,
          }),
          new QuestionTextInput({
            key: 'code',
            label: 'Room code',
            value: room?.code,
            required: true,
          }),
          new QuestionTextInput({
            key: 'number',
            label: 'Room number',
            value: room?.number,
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
            value: room?.room_type.id,
            optionValue: 'id',
            optionLabel: 'name',
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.ROOM_TYPES,
          }),
          new QuestionSelectInput({
            key: 'building_id',
            label: 'Building',
            required: true,
            value: room?.building.id,
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
            value: room?.floor_id,
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
            value: room?.facilities,
            optionType: OptionTypeEnum.ASYNC,
            asyncOptionType: AsyncOptionEnum.FACILITIES,
            normalizeValue: (facility_ids: number[], options: Facility[]) => {
              return options.filter(({ id }) => facility_ids.includes(id))
            },
          })
        ]
      },
      {
        containers: [
          new QuestionSelectInput({
            key: 'status',
            label: 'Status',
            required: true,
            value: room?.status,
            options: this.statuses
          }),
          new QuestionTextInput({
            key: 'capacity',
            label: 'Room capacity',
            value: room?.capacity,
            type: QuestionFieldTypeEnum.Number
          }),
          new QuestionTextInput({
            key: 'area',
            label: 'Room area',
            value: room?.area,
            type: QuestionFieldTypeEnum.Number
          })
        ]
      },
      {
        containers: [
          new QuestionTextArea({
            key: 'description',
            label: 'Description',
            value: room?.description
          })
        ]
      }
    ]
  }
}
