package repository

import (
	"context"
	"school/bootstrap"
	"school/domain"
	"time"

	"gorm.io/gorm"
)

type RoomRepository interface {
	Create(payload domain.RoomCreatePayload) (domain.Room, error)
	GetByID(id int) (domain.Room, error)
	Update(payload domain.RoomUpdatePayload) (domain.Room, error)
	Delete(id int) error
	GetList(query domain.RoomQuery) ([]domain.Room, int, error)
	CreateRoomFacility(facilityIds []int, roomId int) error
}

type roomRepository struct {
	context context.Context
	db      *gorm.DB
}

func NewRoomRepository(db *gorm.DB) RoomRepository {
	return roomRepository{db: db}
}

func (r roomRepository) GetList(query domain.RoomQuery) ([]domain.Room, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var rooms []domain.Room
	var total int64
	paginator := domain.Paginator{PerPage: query.PerPage, Page: query.Page}

	db := r.db.Model(&rooms)

	if query.Status != "" {
		db = db.Where("status = ?", query.Status)
	}

	if query.RoomTypeId != 0 {
		db = db.Where("room_type_id = ?", query.RoomTypeId)
	}

	if query.QueryTerm != "" {
		db = db.Where("name ILIKE ?", "%"+query.QueryTerm+"%")
	}

	resultCount := db.WithContext(ctx).Count(&total)

	result := db.WithContext(ctx).Scopes(bootstrap.QueryScope(&paginator)).
		Preload("Building").
		Preload("RoomType").
		Preload("Facilities").
		Find(&rooms)

	if resultCount.Error != nil {
		return []domain.Room{}, 0, resultCount.Error
	}

	return rooms, int(total), result.Error
}

func (r roomRepository) Create(payload domain.RoomCreatePayload) (domain.Room, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	room := domain.Room{
		RoomFields: payload,
	}

	result := r.db.WithContext(ctx).Create(&room)

	return room, result.Error
}

func (r roomRepository) GetByID(id int) (domain.Room, error) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	var room domain.Room
	result := r.db.WithContext(ctx).Preload("Facilities").Preload("Building").Preload("RoomType").Where("id = ?", id).First(&room)

	return room, result.Error
}

func (r roomRepository) Update(payload domain.RoomUpdatePayload) (domain.Room, error) {
	room, err := r.GetByID(payload.ID)

	if err != nil {
		return domain.Room{}, err
	}

	result := r.db.Model(&room).Select("*").Updates(&payload)

	if result.Error != nil {
		return domain.Room{}, result.Error
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	err = r.db.WithContext(ctx).Model(&room).Association("Facilities").Replace(payload.Facilities)

	if err != nil {
		return domain.Room{}, err
	}

	return r.GetByID(payload.ID)
}

func (r roomRepository) Delete(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Delete(domain.Room{}, id).Error
}

func (r roomRepository) CreateRoomFacility(facilityIds []int, roomId int) error {
	roomFacilities := []domain.RoomFacility{}

	for _, id := range facilityIds {
		roomFacilities = append(roomFacilities, domain.RoomFacility{FacilityId: id, RoomId: roomId})
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	return r.db.WithContext(ctx).Create(&roomFacilities).Error
}
