-- Task 1: Insert the new record into the account table
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Task 2: Modify the Tony Stark record to change the account_type to "Admin"
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Task 3: Delete the Tony Stark record from the database
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Task 4: Modify the "GM Hummer" record to read "a huge interior" using the PostgreSQL Replace function
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- Task 5: Use an inner join to select the required fields from the inventory and classification tables for items belonging to the "Sport" category
SELECT inv.inv_make,
    inv.inv_model,
    class.classification_name
FROM inventory AS inv
    INNER JOIN classification AS class ON inv.classification_id = class.classification_id
WHERE class.classification_name = 'Sport';
-- Task 6: Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image and inv_thumbnail columns using the PostgreSQL Replace function
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');