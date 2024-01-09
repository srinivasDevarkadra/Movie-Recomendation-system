from flask import Blueprint, jsonify, Response, current_app
from pymongo import MongoClient
import json
import logging
from bson import json_util
import os
import traceback
from flask_cors import CORS

logging.basicConfig(level=logging.INFO)

content_bp = Blueprint('content_bp', __name__)
CORS(content_bp)

client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']

def load_indices(json_file):
    dir_path = os.path.abspath(os.path.dirname(__file__))
    full_path = os.path.join(dir_path, json_file)
    
    with open(full_path, 'r') as file:
        return json.load(file)

def load_cosine_sim(csv_file, delimiter=','):
    dir_path = os.path.abspath(os.path.dirname(__file__))
    full_path = os.path.join(dir_path, csv_file)
    
    matrix = []
    with open(full_path, 'r') as file:
        for line in file:
            row = [float(value) if value else 0.0 for value in line.strip().split(delimiter)]
            matrix.append(row)
    return matrix

def invert_mapping(mapping):
    return {v: k for k, v in mapping.items()}

def get_rec(title, indices, cosine_sim, indices_to_titles):
    idx = indices[title]
    sim_scores = [(i, cosine_sim[idx][i]) for i in range(len(cosine_sim))]
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]
    return [indices_to_titles[idx] for idx in movie_indices]

@content_bp.route('/getContentRecommendations/<string:movie_title>', methods=['GET'])
def fetch_content_based_recommendations(movie_title):
    try:
        current_app.logger.info('Loading indices and cosine similarity matrix.')
        ind = load_indices('indices.json')
        cos = load_cosine_sim('cosine_sim.csv')
        indices_to_titles = invert_mapping(ind)

        current_app.logger.info('Getting recommendations for "The Dark Knight Rises".')
        recommended_titles = get_rec(movie_title, ind, cos, indices_to_titles)
        current_app.logger.info(f'Recommended titles: {recommended_titles}')

        projection = {
            'urlPoster': 1,
            'vote_average': 1,
            'genres.name': 1,
            'title': 1,
            'release_date': 1
        }

        current_app.logger.info(f'Querying database with projection: {projection}')
        query = {'title': {'$in': recommended_titles}}
        
        movies = list(collection.find(query, projection=projection).limit(10))

        current_app.logger.info(f'Number of movies fetched: {len(movies)}')

        recommended_movies = {
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

        response = json.dumps(recommended_movies, default=json_util.default)
        return Response(response, mimetype='application/json')
    except Exception as e:
        tb = traceback.format_exc()
        current_app.logger.error(f'An error occurred: {e}, Traceback: {tb}')
        return jsonify({"error": str(e), "traceback": tb}), 500

