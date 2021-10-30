-- Deploy wildcamp:comment_not_unique to pg

BEGIN;

ALTER TABLE comment DROP CONSTRAINT comment_text_key;

COMMIT;
