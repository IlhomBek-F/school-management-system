package repository

import (
	"school/domain"

	"gorm.io/gorm"
)

type RoomRepository interface {
	Create(payload domain.RoomCreatePayload) (domain.Room, error)
	GetByID(id int) (domain.Room, error)
	Update(payload domain.RoomUpdatePayload) (domain.Room, error)
	Delete(id int) error
	GetList() ([]domain.Room, error)
	CreateRoomFacility(facilityIds []int, roomId int) error
}

type roomRepository struct {
	db *gorm.DB
}

func NewRoomRepository(db *gorm.DB) RoomRepository {
	return roomRepository{db: db}
}

func (r roomRepository) GetList() ([]domain.Room, error) {
	var rooms []domain.Room
	result := r.db.Preload("Building").Preload("RoomType").Preload("Facilities").Find(&rooms)

	return rooms, result.Error
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
