CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAr(50) UNIQUE NOT NULL,
    room_type_id INT,
    building_id INT,
    floor INT,
    capacity INT,
    currentOccupancy INT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rooms_room_type_id_fk" FOREIGN KEY (room_type_id) REFERENCES rooms(id),
    CONSTRAINT "rooms_building_id_fk" FOREIGN KEY (building_id) REFERENCES buildings(id)
);