from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS


analysis5_bp = Blueprint('analysis5_bp', __name__)
CORS(analysis5_bp)


client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']


@analysis5_bp.route('/getAnalysis5/<string:year>', methods=['GET'])
def hit_flop_analysis(year):
    try:

        pipeline = [
            {
                "$match": {
                    "release_date": {"$exists": True},
                    "revenue": {"$exists": True},
                    "budget": {"$exists": True},
                    "$expr": {
                        "$eq": [
                            {"$year": {"$toDate": "$release_date"}},
                            int(year),
                        ],
                    },
                },
            },
            {
                "$group": {
                    "_id": {
                        "month": {"$month": {"$toDate": "$release_date"}},
                        "hitFlopStatus": {
                            "$cond": {
                                "if": {"$gt": [
                                    {"$ifNull": ["$revenue", 0]},
                                    {"$multiply": [{"$ifNull": ["$budget", 0]}, 2]}
                                ]},
                                "then": "Hit",
                                "else": "Flop",
                            }
                        },
                    },
                    "count": {"$sum": 1},
                },
            },
            {
                "$group": {
                    "_id": "$_id.month",
                    "hits": {"$sum": {"$cond": [{"$eq": ["$_id.hitFlopStatus", "Hit"]}, "$count", 0]}},
                    "flops": {"$sum": {"$cond": [{"$eq": ["$_id.hitFlopStatus", "Flop"]}, "$count", 0]}},
                    "totalMovies": {"$sum": "$count"},
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "month": "$_id",
                    "hits": 1,
                    "flops": 1,
                    "totalMovies": 1,
                    "successPercentage": {
                        "$cond": {
                            "if": {"$ne": ["$totalMovies", 0]},
                            "then": {"$multiply": [{"$divide": ["$hits", "$totalMovies"]}, 100]},
                            "else": 0,
                        }
                    },
                },
            },
            {
                "$sort": {"month": 1},
            },
        ]


        result = collection.aggregate(pipeline)


        result_list = list(result)


        return jsonify(result_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
