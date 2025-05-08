include .env

drop-db:
	@mysql -h $(DB_HOST) -P $(DB_PORT) -u $(DB_USER) -p$(DB_PASSWORD) -e "DROP DATABASE IF EXISTS $(DB_NAME);"

create-db:
	@mysql -h $(DB_HOST) -P $(DB_PORT) -u $(DB_USER) -p$(DB_PASSWORD) -e "CREATE DATABASE $(DB_NAME);"

reset-db: drop-db create-db

# Migration
migrate:
	@yarn migrate

# Seeder
seed:
	@bun src/infra/prisma/seeders/index.ts

clear-all: reset-db
	@rm -rf prisma/generated
	@rm -rf prisma/schema/migrations
	@rm -rf dist
