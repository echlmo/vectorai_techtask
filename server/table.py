import sqlalchemy

metadata = sqlalchemy.MetaData()

Profiles = sqlalchemy.Table(
    "profiles",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("position", sqlalchemy.Integer),
    sqlalchemy.Column("type_name", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("img_src", sqlalchemy.String)
)
