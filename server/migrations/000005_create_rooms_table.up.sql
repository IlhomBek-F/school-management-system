CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAr(50) UNIQUE NOT NULL,
    number INT,
    room_type_id INT,
    building_id INT,
    floor_id INT,
    capacity INT,
    status VARCHAR(20),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    description VARCHAR(250),
    area INT,
    CONSTRAINT "rooms_room_type_id_fk" FOREIGN KEY (room_type_id) REFERENCES room_types(id),
    CONSTRAINT "rooms_building_id_fk" FOREIGN KEY (building_id) REFERENCES buildings(id)
);