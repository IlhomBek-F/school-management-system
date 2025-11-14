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
	GetList(query domain.RoomQuery) ([]domain.Room, domain.Meta, error)
}

type roomUsecase struct {
	roomRepo repository.RoomRepository
}

func NewRoomUsecase(roomRepo repository.RoomRepository) RoomUsecase {
	return roomUsecase{roomRepo: roomRepo}
}

func (r roomUsecase) GetList(query domain.RoomQuery) ([]domain.Room, domain.Meta, error) {
	rooms, total, err := r.roomRepo.GetList(query)

	meta := domain.Meta{
		PerPage:     query.PerPage,
		Total:       int(total),
		CurrentPage: query.Page,
	}

	return rooms, meta, err
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
