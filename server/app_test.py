from app import app

from starlette.testclient import TestClient


def test_get_profiles():
    client = TestClient(app)
    response = client.get('/profiles')
    assert response.status_code == 200
    

def test_get_user():
    client = TestClient(app)
    response = client.get('/profiles/1')
    assert response.status_code == 200
