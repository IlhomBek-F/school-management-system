package usecase

import (
	"school/domain"
	"school/internal/repository"
)

type RoomUsecase interface {
	Create(payload domain.RoomCreatePayload) (domain.Room, error)
	Update(payload domain.RoomUpdatePayload) (domain.Room, error)
	Delete(id int) error
	GetById(id int) (domain.Room, error)
	GetList() ([]domain.Room, error)
}

type roomUsecase struct {
	roomRepo repository.RoomRepository
}

func NewRoomUsecase(roomRepo repository.RoomRepository) RoomUsecase {
	return roomUsecase{roomRepo: roomRepo}
}

func (r roomUsecase) GetList() ([]domain.Room, error) {
	rooms, err := r.roomRepo.GetList()

	return rooms, err
}

func (r roomUsecase) Create(payload domain.RoomCreatePayload) (domain.Room, error) {
	room, err := r.roomRepo.Create(payload)

	return room, err
}

func (r roomUsecase) Update(payload domain.RoomUpdatePayload) (domain.Room, error) {
	room, err := r.roomRepo.Update(payload)

	return room, err
}

func (r roomUsecase) GetById(id int) (domain.Room, error) {
	room, err := r.roomRepo.GetByID(id)

	return room, err
}

func (r roomUsecase) Delete(id int) error {
	err := r.roomRepo.Delete(id)

	return err
}
