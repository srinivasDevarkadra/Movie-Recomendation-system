from flask import Flask
from flask_cors import CORS
from Demographic.demo import demo_bp
from Overview.overview import overview_bp
from Content.content import content_bp
from Analysis.language_revenue import lr_bp
from Analysis.analysis2 import analysis2_bp
from Analysis.analysis3 import analysis3_bp
from Analysis.analysis4 import analysis4_bp
from Analysis.analysis5 import analysis5_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(demo_bp, url_prefix='/api/')
app.register_blueprint(overview_bp, url_prefix='/api/')
app.register_blueprint(content_bp, url_prefix='/api/')
app.register_blueprint(lr_bp, url_prefix='/api/')
app.register_blueprint(analysis2_bp, url_prefix='/api/')
app.register_blueprint(analysis3_bp, url_prefix='/api/')
app.register_blueprint(analysis4_bp, url_prefix='/api/')
app.register_blueprint(analysis5_bp, url_prefix='/api/')

if __name__ == '__main__':
    app.run(debug=True)
