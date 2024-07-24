to run a express app you need to instal in main directory, npm i express -d as a dependency
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "uuid": "^9.0.1"
npm i express -d -y
"Express es un framework para nodejs"
npm i cors -d -y
npm i uuid /buscar {v4}



----------------------------------
  express_recipes_filters

mira != : undefined

[0mGET /recipes/shopping-list [33m400[0m 6.557 ms - 22[0m

    ✔ Should return 400 for /recipes/shopping-list if no ids are passed in query

mira != : undefined

[0mGET /recipes/shopping-list?ids=12,32,33,acasd [33m400[0m 1.531 ms - 22[0m

    1) Should respond back with a 404 if none of the ids match

mira != : undefined

[0mGET /recipes/shopping-list?ids=1 [33m400[0m 0.767 ms - 22[0m

    2) Should respond with the shopping list if the ids are valid and match is found

mira != : undefined

[0mGET /recipes/shopping-list?ids=1,12,3 [33m400[0m 1.078 ms - 22[0m

    3) Should respond with the correct shopping if the query sent is mixed

  1 passing (6s)

  3 failing