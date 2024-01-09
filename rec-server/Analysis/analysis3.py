from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS


analysis3_bp = Blueprint('analysis3_bp', __name__)
CORS(analysis3_bp)


client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']


@analysis3_bp.route('/getAnalysis3/<string:year>', methods=['GET'])
def get_analysis(year):
    try:

        pipeline = [
            {
                "$match": {
                    "release_date": {"$exists": True},
                    "vote_average": {"$exists": True},
                    "genres": {"$exists": True},
                    "$expr": {
                        "$eq": [
                            {"$year": {"$toDate": "$release_date"}},
                            int(year),
                        ],
                    },
                },
            },
            {
                "$unwind": "$genres",
            },
            {
                "$group": {
                    "_id": {
                        "genre": "$genres",
                        "hitFlopStatus": {
                            "$cond": {
                                "if": {"$gte": ["$vote_average", 7]},
                                "then": "Hit",
                                "else": "Flop",
                            },
                        },
                    },
                    "avgRatings": {"$avg": "$vote_average"},
                    "count": {"$sum": 1},
                },
            },
            {
                "$group": {
                    "_id": "$_id.genre",
                    "hitFlopStats": {
                        "$push": {
                            "status": "$_id.hitFlopStatus",
                            "count": "$count",
                        },
                    },
                    "avgRatings": {"$avg": "$avgRatings"},
                    "totalMovies": {"$sum": "$count"},
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "genre": "$_id",
                    "hitFlopStats": 1,
                    "avgRatings": 1,
                    "totalMovies": 1,
                },
            },
            {
                "$sort": {"genre": 1},
            },
            {
                "$limit": 10
            },
        ]


        result = collection.aggregate(pipeline)


        result_list = list(result)


        return jsonify(result_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
