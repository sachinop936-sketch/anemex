
-- Clean up all size-related feature entries and re-add the correct one
DO $$
DECLARE
  r RECORD;
  cleaned text[];
  f text;
BEGIN
  FOR r IN SELECT id, features FROM products LOOP
    cleaned := '{}';
    IF r.features IS NOT NULL THEN
      FOREACH f IN ARRAY r.features LOOP
        IF f NOT ILIKE '%Available Size%' THEN
          cleaned := array_append(cleaned, f);
        END IF;
      END LOOP;
    END IF;
    cleaned := array_append(cleaned, 'Available Sizes: S, M, L, XL, XXL');
    UPDATE products SET features = cleaned WHERE id = r.id;
  END LOOP;
END $$;
