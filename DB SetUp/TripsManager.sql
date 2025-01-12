CREATE DATABASE TripsManager;

USE TripsManager;

CREATE TABLE TripType(
	typeCode INT IDENTITY(1,1) PRIMARY KEY,
	typeName VARCHAR(255)
);

CREATE TABLE Users (
    userCode INT IDENTITY(1,1) PRIMARY KEY,
    fName VARCHAR(255),
    lName VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    loginPassword VARCHAR(255),
    firstAidCertificate BIT
);

CREATE TABLE Trip (
    tripCode INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    tripDestination VARCHAR(255),
    typeCode INT,
    tripDate DATE,
    tripDurationHours INT, 
    availablePlaces INT,
    price DECIMAL(10, 2),
    img TEXT,
    FOREIGN KEY (typeCode) REFERENCES TripType(typeCode)
);

CREATE TABLE BookingPlace (
    bookingCode INT IDENTITY(1,1) PRIMARY KEY,
    userCode INT,
    bookingDate DATE,
    tripCode INT,
    numberOfPlaces INT,
    FOREIGN KEY (userCode) REFERENCES Users(userCode),
    FOREIGN KEY (tripCode) REFERENCES Trip(tripCode)
);

INSERT INTO TripType (typeName) VALUES
    ('Wet'), 
    ('Nature'), 
    ('Hiking'), 
    ('Sailing'), 
	('City'),
	('Museum'),
	('Family');

INSERT INTO Users (fName, lName, phone, email, loginPassword, firstAidCertificate) VALUES
    ('John', 'Doe', '1234567890', 'john.doe@example.com', '1234bn', 1),
    ('Jane', 'Smith', '0987654321', 'jane.smith@example.com', 'ax6678', 0),
    ('Michael', 'Johnson', '0524423687', 'michael.johnson@example.com', 'nju789u', 0),
    ('Emily', 'Brown', '0123456789', 'emily.brown@example.com', '123qqq', 1),
    ('David', 'Wilson', '4567890123', 'david.wilson@example.com', 'password5', 1),
    ('Orna', 'Cohen', '0584423687', 'ornaco2@gmail.com', 'ornaco2', 0);

INSERT INTO Trip (tripDestination, typeCode, tripDate, tripDurationHours, availablePlaces, price, img) VALUES
    ('Tveria, Kineret', 1, '2024-2-26', 6, 15, 400.00, ''),
    ('Jerusalem', 5, '2024-2-27', 7, 10, 180.00, ''),
    ('Ein-Gedi', 1, '2023-12-28', 5, 12, 200.00, ''),
    ('Sailing in Kineret', 4, '2023-12-29', 3, 6, 450.00, ''),
    ('Yad-Vashem', 6, '2024-03-01', 7, 15, 200.00, ''),
	('Jeep', 6, '2024-03-01', 7, 15, 200.00, ''),
	('Forest',2,'2024-02-01',8,30,400.00,''),
	('Mountaineering',3,'2024-02-02',8,10,500.00,'');

    
INSERT INTO BookingPlace (userCode, bookingDate , tripCode, numberOfPlaces) VALUES
    (1, '2026-01-01', 1, 2),
    (2, '2023-12-27', 2, 3),
    (3, '2025-12-28', 3, 1),
    (4, '2023-12-29', 4, 4),
    (5, '2025-12-30', 5, 2),
	(6,'2024-01-08',4,1);