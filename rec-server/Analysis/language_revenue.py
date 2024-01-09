from flask import Blueprint, jsonify, Response
from pymongo import MongoClient
import json
from bson import json_util
from flask_cors import CORS

# Create a Blueprint
lr_bp = Blueprint('lr_bp', __name__)
CORS(lr_bp)

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['input_dataset']
collection = db['movies_metadata']

# Define a route for this Blueprint
@lr_bp.route('/getTopRevenueLanguages/<string:year>', methods=['GET'])
def fetch_analysis(year):
    try:
        # Define the aggregation pipeline
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
                    "budget": {"$gt": 10000},
                    "revenue": {"$gt": 0},
                    "original_language": {"$ne": "en"}
                    # Add any match conditions if needed
                },
            },
            {
                "$group": {
                    "_id": "$original_language",
                    "totalBudget": {"$sum": "$budget"},
                    "totalRevenue": {"$sum": "$revenue"},
                },
            },
            {
                "$project": {
                    "_id": 0,
                    "language": "$_id",
                    "budget": "$totalBudget",
                    "revenue": "$totalRevenue",
                    "revenueToBudgetRatio": {
                        "$divide": ["$totalRevenue", { "$max": [1, "$totalBudget"] }]
                    }
                },
            },
            {
                "$sort": {
                    "revenueToBudgetRatio": -1,  # Sort in descending order of the ratio
                },
            },
            {
                "$limit": 10  # Limit to the top 10 results
            },
        ]

        # Execute the aggregation pipeline
        result = collection.aggregate(pipeline)

        # Language mapping
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

        # Transform data into the required format
        final_result = []
        for doc in result:
            x = {
                'language' :  language_mapping.get(doc['language'], 'Unknown'),
                'budget' : doc['budget'],
                'revenue' : doc['revenue']    
            }
            final_result.append(x)
        # print(final_result)

        # Serialize the response using json_util to handle MongoDB specific data types
        response = json.dumps(final_result, default=json_util.default)
        return Response(response, mimetype='application/json')
    except Exception as e:
        return jsonify({"error": str(e)}), 500
