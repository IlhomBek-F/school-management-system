package repository

import (
	"school/bootstrap"
	"school/domain"

	"gorm.io/gorm"
)

type RoomRepository interface {
	Create(payload domain.RoomCreatePayload) (domain.Room, error)
	GetByID(id int) (domain.Room, error)
	Update(payload domain.RoomUpdatePayload) (domain.Room, error)
	Delete(id int) error
	GetList(query domain.RoomQuery) ([]domain.Room, domain.Meta, error)
	CreateRoomFacility(facilityIds []int, roomId int) error
}

type roomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(db *gorm.DB) RoomRepository {
	return roomRepository{db: db}
}

func (r roomRepository) GetList(query domain.RoomQuery) ([]domain.Room, domain.Meta, error) {
	var rooms []domain.Room

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

	var total int64
	resultCount := db.Count(&total)

	result := db.Scopes(bootstrap.QueryScope(&paginator)).
		Preload("Building").
		Preload("RoomType").
		Preload("Facilities").
		Find(&rooms)

	if resultCount.Error != nil {
		return []domain.Room{}, domain.Meta{}, resultCount.Error
	}

	meta := domain.Meta{
		PerPage:     paginator.PerPage,
		Total:       int(total),
		CurrentPage: query.Page,
	}

	return rooms, meta, result.Error
}

func (r roomRepository) Create(payload domain.RoomCreatePayload) (domain.Room, error) {
	room := domain.Room{
		RoomFields: payload,
	}

	result := r.db.Create(&room)

	return room, result.Error
}

func (r roomRepository) GetByID(id int) (domain.Room, error) {
	var room domain.Room
	result := r.db.Preload("Facilities").Preload("Building").Preload("RoomType").Where("id = ?", id).First(&room)

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

	err = r.db.Model(&room).Association("Facilities").Replace(payload.Facilities)

	if err != nil {
		return domain.Room{}, err
	}

	return r.GetByID(payload.ID)
}

func (r roomRepository) Delete(id int) error {
	return r.db.Delete(domain.Room{}, id).Error
}

func (r roomRepository) CreateRoomFacility(facilityIds []int, roomId int) error {
	roomFacilities := []domain.RoomFacility{}

	for _, id := range facilityIds {
		roomFacilities = append(roomFacilities, domain.RoomFacility{FacilityId: id, RoomId: roomId})
	}

	return r.db.Create(&roomFacilities).Error
}
