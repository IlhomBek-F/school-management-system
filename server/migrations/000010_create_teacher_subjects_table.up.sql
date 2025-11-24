CREATE TABLE IF NOT EXISTS teacher_subjects (
    id SERIAL PRIMARY KEY,
    teacher_id INT,
    subject_id INT,
    CONSTRAINT "ts_teacher_id_fk" FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    CONSTRAINT "ts_subject_id_fk" FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT "ts_unique" UNIQUE (teacher_id, subject_id)
);