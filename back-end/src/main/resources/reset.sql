-- Disable foreign key checks to avoid errors on dependent tables
SET FOREIGN_KEY_CHECKS = 0;

-- Prepare and execute drop statements
SET @tables = (
    SELECT GROUP_CONCAT(CONCAT('`', table_name, '`') SEPARATOR ',')
    FROM information_schema.tables
    WHERE table_schema = DATABASE()
);

-- If there are any tables, drop them
SET @drop_stmt = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @drop_stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
