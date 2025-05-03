DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=pos
DB_USER=root
DB_PASSWORD=root

drop-db:
	@mysql -h $(DB_HOST) -P $(DB_PORT) -u $(DB_USER) -p$(DB_PASSWORD) -e "DROP DATABASE IF EXISTS $(DB_NAME);"

create-db:
	@mysql -h $(DB_HOST) -P $(DB_PORT) -u $(DB_USER) -p$(DB_PASSWORD) -e "CREATE DATABASE $(DB_NAME);"

reset-db: drop-db create-db

# Seeder
seed:
	@bun src/infra/prisma/seeders/index.ts

clear-all:
	@rm -rf prisma/generated
	@rm -rf prisma/migrations
	@rm -rf dist
