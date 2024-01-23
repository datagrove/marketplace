UPDATE "public"."providers" 
SET "language_spoken" = '{"2"}' 
WHERE "language_spoken" is null;

alter table "public"."providers" alter column "language_spoken" set not null;


