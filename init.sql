CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_timestamp_func()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW(); -- Set updated_at jadi waktu KINI
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_items_modtime
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_func();

INSERT INTO items (name, stock) VALUES 
('Laptop Gaming', 10),
('Mouse Wireless', 50),
('Mechanical Keyboard', 25);