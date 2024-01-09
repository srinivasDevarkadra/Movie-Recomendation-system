from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS


analysis4_bp = Blueprint('analysis4_bp', __name__)
CORS(analysis4_bp)


client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']


@analysis4_bp.route('/getAnalysis4/<string:year>', methods=['GET'])
def fetch_top_budget_languages(year):
    try:
        pipeline = [
            {
                "$project": {
                    "year": {"$dateToString": {"format": "%Y", "date": {"$toDate": "$release_date"}}},
                    "original_language": 1,
                    "budget": 1,
                    "revenue": 1
                },
            },
            {
                "$match": {
                    "year": year,
                    "budget": {"$gt": 0},
                    "original_language": {"$ne": "en"}
                },
            },
            {
                "$group": {
                    "_id": "$original_language",
                    "totalBudget": {"$sum": "$budget"}
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "language": "$_id",
                    "totalBudget": "$totalBudget"
                },
            },
            {
                "$sort": {
                    "totalBudget": -1,
                },
            },
            {
                "$limit": 10
            },
        ]

        result = collection.aggregate(pipeline)

        language_mapping = {
            'en': 'English',
            'sv': 'Swedish',
            'ja': 'Japanese',
            'hi': 'Hindi',
            'zh': 'Mandarin',
            'es': 'Spanish',
            'de': 'German',
            'ru': 'Russian',
            'ko': 'Korean',
            'fr': 'French',
            'ta': 'Tamil',
            'te': 'Telugu',
            'tr': 'Turkish',
            'it': 'Italian',
            'cn': 'Chinese',
            'no': 'Norwegian',
            'da': 'Danish',
            'el': 'Greek',
            'ro': 'Romanian',
            'fi': 'Finnish',
            'sl': 'Slovenian',
            'bg': 'Bulgarian',
            'ar': 'Arabic',
            'sq': 'Albanian',
            'fa': 'Persian',
            'th': 'Thai',
            'hr': 'Croatian',
            'he': 'Hebrew',
            'is': 'Icelandic',
            'mr': 'Marathi',
            'tl': 'Tagalog',
            'et': 'Estonian',
            'hu': 'Hungarian',
            'pt': 'Portuguese',
            'nl': 'Dutch',
            'kk': 'Kazakh',
            'sr': 'Serbian',
            'cs': 'Czech',
            'vi': 'Vietnamese',
            'id': 'Indonesian',
            'pl': 'Polish',
            'ab': 'Abkhazian',
        }

        final_result = []
        for doc in result:
            x = {
                'language': language_mapping.get(doc['language'], 'Unknown'),
                'budget': doc['totalBudget']
            }
            final_result.append(x)

        response = json.dumps(final_result, default=json_util.default)
        return Response(response, mimetype='application/json')

    except Exception as e:
        return jsonify({"error": str(e)}), 500