# README

API Server:
  - Start postgres in the background: `docker-compose up -d postgres`
  - Start server: `docker-compose up api`
  - Port: `3001`

Web Client
  - Start server: `npm run start`
  - Port: `3000`

Load Odds from API:
  - `docker-compose run api rails console`
  - `LoadOddsService.process`

Start over and re-seed database:
  - `docker-compose down -v`
  - `docker-compose up -d postgres`
  - `docker-compose run api rake db:migrate`
  - `docker-compose run api rake db:seed`

Start over and re-seed database using one line script:
  - `scripts/reset`

Rails console:
  -  `scripts/console`
