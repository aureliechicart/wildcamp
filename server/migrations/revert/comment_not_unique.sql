-- Revert wildcamp:comment_not_unique from pg

BEGIN;

ALTER TABLE comment ADD UNIQUE (text);

COMMIT;
