CREATE TABLE IF NOT EXISTS room_facilities (
    id SERIAL PRIMARY KEY,
    room_id INT,
    facility_id INT,
    CONSTRAINT "room_facilities_room_id_fk" FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    CONSTRAINT "room_facilities_facility_id_fk" FOREIGN KEY (facility_id) REFERENCES facilities(id) ON DELETE CASCADE,
    CONSTRAINT "room_facilities_unique" UNIQUE (room_id, facility_id)
);