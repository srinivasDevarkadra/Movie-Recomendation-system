from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS


analysis2_bp = Blueprint('analysis2_bp', __name__)
CORS(analysis2_bp)


client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']


@analysis2_bp.route('/getBlockbusterAnalysis/<string:year>', methods=['GET'])
def blockbuster_analysis(year):
    try:
        print("Inside")
        print(year)

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
                "$addFields": {
                    "ROI": {
                        "$cond": {
                            "if": {"$eq": ["$budget", 0]},
                            "then": None,
                            "else": {
                                "$divide": [
                                    {"$subtract": ["$revenue", "$budget"]},
                                    "$budget",
                                ],
                            },
                        },
                    },
                },
            },
            {
                "$match": {
                    "ROI": {"$gte": 2},
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "month": {"$month": {"$toDate": "$release_date"}},
                    "ROI": 1,
                },
            },
            {
                "$group": {
                    "_id": "$month",
                    "avgROI": {"$avg": "$ROI"},
                },
            },
            {
                "$sort": {"_id": 1},
            },
            {
                "$project": {
                    "_id": 0,
                    "month": "$_id",
                    "avgROI": 1,
                },
            },
        ]


        result = collection.aggregate(pipeline)


        result_list = list(result)

        print(len(result_list))


        return jsonify(result_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
