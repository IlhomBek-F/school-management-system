CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth VARCHAR(10) NOT NULL,
    gender VARCHAR(10) NOT NULL DEFAULT 'male',
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    street_address VARCHAR(250) NOT NULL,
    city VARCHAR(50) NOT NULL,

    teacher_id VARCHAR(20) NOT NULL UNIQUE,
    department_id INT NOT NULL,
    qualification VARCHAR(50) NOT NULL,
    uni_or_ins_name VARCHAR(150),
    graduation_year INT,
    experience INT,
    joining_date VARCHAR(10),
    employment_type_id INT,
    salary INT,
    contract_end_date VARCHAR(10)
);
