import databases

from starlette.config import Config


config = Config('.env')

DATABASE_URL = config(
    'DATABASE_URL',
    cast=databases.DatabaseURL,
    default="postgresql://postgres:postgres@localhost:5432/profiles")
