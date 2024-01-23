INSERT INTO "public"."post_category" ("id", "category", "language") VALUES
	(14, 'Education', 1),
    (15, 'Food & Drink', 1),
    (16, 'Home & Office', 1);

UPDATE "public"."provider_post" 
SET "service_category" = 16 
WHERE "service_category" IN (1, 8);