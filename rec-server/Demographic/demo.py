from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS

demo_bp = Blueprint('demo_bp', __name__)
CORS(demo_bp)

client = MongoClient('mongodb://localhost:27017/')
db = client['demographic_rec']
collection = db['demo_data']

@demo_bp.route('/getTopMovies', methods=['GET'])
def fetch_top_movies():
    try:
        projection = {
            'urlPoster': 1,
            'vote_average': 1,
            'genres.name': 1,
            'title': 1,
            'release_date': 1
        }

        movies = list(collection.find(projection=projection).limit(10))

        top_movies = {
            "results": [
                {
                    "poster_url": movie.get("urlPoster", ""),
                    "vote_average": movie.get("vote_average", 0),
                    "genres": [genre["name"] for genre in movie.get("genres", []) if "name" in genre],
                    "title": movie.get("title", ""),
                    "release_date": movie.get("release_date", "").strftime('%Y-%m-%d') if movie.get("release_date") else ""
                }
                for movie in movies
            ]
        }

        response = json.dumps(top_movies, default=json_util.default)
        return Response(response, mimetype='application/json')
    except Exception as e:
        return jsonify({"error": str(e)}), 500
