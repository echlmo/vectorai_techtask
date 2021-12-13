import databases
import uvicorn

from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.endpoints import HTTPEndpoint
from starlette.exceptions import HTTPException
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from config import DATABASE_URL
from table import Profiles


db = databases.Database(DATABASE_URL)

middleware = [
    Middleware(CORSMiddleware, allow_origins=['*'], allow_methods=["GET", "POST"])
]


class AllProfiles(HTTPEndpoint):
    async def get(self, request):
        """
        Get all profiles from the database.
        Returns profile data sorted in position order as JSON.
        :param request: Request
        :return: JSONResponse
        """

        await db.connect()
        query = Profiles.select().order_by("position")
        results = await db.fetch_all(query)
        content = [
            {
                "id": result["id"],
                "position": ["position"],
                "type_name": result["type_name"],
                "title": result["title"],
                "img_src": result["img_src"]
            }
            for result in results
        ]

        return JSONResponse(content)

    async def post(self, request):
        """
        Add a new user profile to database.
        :param request: Request with field 'params' containing key:value pairs: 'title':(str), 'type_name':(str)
        and 'position':(int). Optional params: 'img_src':(str)
        :return: JSONResponse "success": "true"
        """

        if request.method == "POST":
            body = await request.json()
            query = Profiles.insert.values(
                position=body['position'],
                type_name=body['type_name'],
                title=body['title'],
                img_src=body['img_src']
            )
            await db.execute(query)
            return JSONResponse({
                "success": "true"
            })

        raise HTTPException(status_code=400)


class UserProfile(HTTPEndpoint):
    async def get(self, request):
        """
        Get a profile from the database by ID.
        Returns profile data as JSON.
        :param request: Request with path_params containing key:value pair 'id':(int).
        :return: JSONResponse
        """

        await db.connect()
        params = request.path_params
        query = Profiles.select().where(
            Profiles.c.id == int(params['id'])
        )
        result = await db.fetch_one(query=query)
        content = [
            {
                "id": result["id"],
                "position": result["position"],
                "type_name": result["type_name"],
                "title": result["title"],
                "img_src": result["img_src"]
            }
        ]

        return JSONResponse(content)

    async def post(self, request):
        """
        Update an existing profile to database by ID.
        :param request: Request with path_params containing key:value pairs: 'title':(str), 'type_name':(str)
        and 'position':(int). Optional params: 'img_src':(str)
        :return: JSONResponse "success": "true"
        """
        if request.method == "POST":
            body = await request.json()
            params = request.path_params
            query = Profiles.update.where(
                Profiles.c.id == int(params['id'])
            ).values(
                position=body['position'],
                type_name=body['type_name'],
                title=body['title'],
                img_src=body['img_src']
            )
            await db.execute(query)
            return JSONResponse({
                "success": "true"
            })

        raise HTTPException(status_code=400)


routes = [
    Route("/profiles", endpoint=AllProfiles, methods=["GET", "POST"]),
    Route("/profiles/{id}", endpoint=UserProfile, methods=["GET", "POST"])
]

app = Starlette(
    debug=True,
    routes=routes,
    middleware=middleware,
    on_startup=[db.connect],
    on_shutdown=[db.disconnect])


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
