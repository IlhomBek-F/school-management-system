package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type RoomTypeUsecase interface {
	Create(payload domain.RoomTypeCreatePayload) (domain.RoomType, error)
	Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error)
	Delete(id int) error
	GetById(id int) (domain.RoomType, error)
	GetList() ([]domain.RoomType, error)
}

type roomTypeUsecase struct {
	roomTypeRepo repository.RoomTypeRepository
}

func NewRoomTypeUsecase(roomTypeRepo repository.RoomTypeRepository) RoomTypeUsecase {
	return roomTypeUsecase{roomTypeRepo: roomTypeRepo}
}

func (r roomTypeUsecase) Create(payload domain.RoomTypeCreatePayload) (domain.RoomType, error) {
	roomType, err := r.roomTypeRepo.Create(payload)

	return roomType, err
}

func (r roomTypeUsecase) Update(payload domain.RoomTypeUpdatePayload) (domain.RoomType, error) {
	roomType, err := r.roomTypeRepo.Update(payload)

	return roomType, err
}

func (r roomTypeUsecase) GetList() ([]domain.RoomType, error) {
	roomTypes, err := r.roomTypeRepo.GetList()

	return roomTypes, err
}

func (r roomTypeUsecase) GetById(id int) (domain.RoomType, error) {
	roomType, err := r.roomTypeRepo.GetByID(id)

	return roomType, err
}

func (r roomTypeUsecase) Delete(id int) error {
	err := r.roomTypeRepo.Delete(id)

	return err
}
