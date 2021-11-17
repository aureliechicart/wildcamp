-- Revert wildcamp:trigger from pg

BEGIN;

-- Trigger that will execute the function trigger_set_timestamp each time a campground is updated
DROP TRIGGER set_timestamp_campground ON campground;

-- Trigger that will execute the function trigger_set_timestamp each time a comment is updated
DROP TRIGGER set_timestamp_comment ON comment;

-- Trigger that will execute the function trigger_set_timestamp each time a user is updated
DROP TRIGGER set_timestamp_user ON "user";

-- Function that will update with the current time the modified_at field of a record when updating the record
DROP FUNCTION trigger_set_timestamp();


COMMIT;
