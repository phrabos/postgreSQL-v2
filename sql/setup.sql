DROP TABLE IF EXISTS ultramarathons;

CREATE TABLE ultramarathons (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  distance INTEGER CHECK (distance > 0)
)