# ClinicHub-backend

### For contributors:

run ```npm install``` will install all dependencies on api and client (important!!!).
run ```docker-compose up --build```

To generate prisma use ```npx prisma generate```

if any issue, just post in [Issues](https://github.com/261361-Project-SE/Clinichub-backend/issues).




### Postgres connection

host: ```localhost```

database: ```prisma```

user: ```postgres```

password: ```admin```

### Note
if port already used change follow:
  docker-compose.yml
  ```
   nginx:
      ...
      ports:
        - "{nginx port}:80"
      ...
   client:
      ...
      ports:
        - "{client port}:3000"
      environment:
        - API_END_POINT=http://api:{api port}
      ...
   api:
      ...
      ports:
        - "{api port}:5000"
      ...
   postgres:
      ...
      ports:
        - "{postgres port}:5432"
      ...
  ```
