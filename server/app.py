import databases
from starlette.applications import Starlette
from starlette.responses import JSONResponse, Response
from starlette.endpoints import HTTPEndpoint
from starlette.routing import Route

from config import DATABASE_URL


db = databases.Database(DATABASE_URL)


async def get_profiles(request):
    """
    Get all profile from the database.
    Returns profile data in position order.
    """
    pass


async def get_profile(request):
    """
    Get a profile from the database by ID.
    Returns profile data in position order.
    """
    pass


async def add_profile(request):
    """
    Add a user profile to database.
    """
    pass


async def get_picture(request):
    """
    Get picture source url for an existing user profile.
    """
    pass


async def add_picture(request):
    """
    Add a picture to an existing user profile (id, img_src).
    """
    pass


routes = [
    Route("/profiles", endpoint=get_profiles, methods=["GET"]),
    Route("/profiles/{id}", endpoint=get_profile, methods=["GET"]),
    Route("/profiles/update", endpoint=add_profile, methods=["POST"]),
    Route("/pictures/{id}", endpoint=get_picture, methods=["GET"]),
    Route("/pictures/update", endpoint=add_picture, methods=["POST"])
]

app = Starlette(
    debug=True,
    routes=routes,
    on_startup=[db.connect],
    on_shutdown=[db.disconnect])
