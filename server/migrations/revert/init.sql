-- Revert wildcamp:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "user", campground, comment;

COMMIT;
