BEGIN;

INSERT INTO
  "user" (
    email,
    password,
    username,
    created_at,
    modified_at
  )
VALUES
  (
    'carrot@gmail.com',
    'carrot',
    'carrot',
    NOW(),
    NOW()
  ),
  (
    'parsnip@gmail.com',
    'parsnip',
    'parsnip',
    NOW(),
    NOW()
  ),
  (
    'potato@gmail.com',
    'potato',
    'potato',
    NOW(),
    NOW()
  );

INSERT INTO
  campground (
    title,
    image,
    description,
    country,
    "user_id",
    created_at,
    modified_at
  )
VALUES
  -- We use the escape string constant E to be able to include newlines using \n
  (
    'Cloud''s Rest',
    'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
    E'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'États-Unis',
    1,
    NOW(),
    NOW()
  ),
  (
    'Mesa du désert',
    E'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'États-Unis',
    2,
    NOW(),
    NOW()
  ),
  (
    'Le Canyon',
    'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
    E'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'États-Unis',
    3,
    NOW(),
    NOW()
  ),
  (
    'John O''Groats',
    'https://cdn.pixabay.com/photo/2019/12/08/11/05/john-ogroats-4680892_960_720.jpg',
    E'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    'Royaume-Uni',
    2,
    NOW(),
    NOW()
  );

INSERT INTO
  comment (
    text,
    campground_id,
    "user_id",
    created_at,
    modified_at
  )
VALUES
  (E'Super spot', 2, 1, NOW(), NOW()),
  (E'Moi aussi je recommande !', 2, 3, NOW(), NOW()),
  (E'Bon plan !', 3, 2, NOW(), NOW());

COMMIT;