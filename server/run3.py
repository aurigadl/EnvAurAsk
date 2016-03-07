from flask import Flask
from wtforms import Form, BooleanField, StringField, validators
from flask.ext.mongoengine import MongoEngine
from flask.ext.mongoengine.wtf import model_form

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret-1pocosegura'

# MongoDB Config
app.config['MONGODB_DB']       = 'evepytest'
app.config['MONGODB_HOST']     = 'ds051615.mlab.com'
app.config['MONGODB_PORT']     =  51615
app.config['MONGODB_USERNAME'] = 'usertest'
app.config['MONGODB_PASSWORD'] = 'evepytest'


# Create database connection object
db = MongoEngine(app)

class User(db.Document):
    email = db.StringField(required=True)
    first_name = db.StringField(max_length=50)
    last_name = db.StringField(max_length=50)

class Content(db.EmbeddedDocument):
    text = db.StringField()
    lang = db.StringField(max_length=3)

class Post(db.Document):
    title = db.StringField(max_length=120, required=True, validators=[validators.InputRequired(message=u'Missing title.'),])
    author = db.ReferenceField(User)
    tags = db.ListField(db.StringField(max_length=30))
    content = db.EmbeddedDocumentField(Content)

# Views
@app.route('/')
def home():
    return 'Un texto para recordar'

if __name__ == '__main__':
    app.run()
