"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFUALT_IMAGE = "https://tinyurl.com/demo-cupcake"

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """ Model for Cupcake """

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, 
                   primary_key=True,
                   autoincrement=True)

    flavor = db.Column(db.Text, nullable=False)

    size = db.Column(db.Text, nullable=False)

    rating = db.Column(db.Float, nullable=False)

    image = db.Column(db.Text, 
                      nullable=False, 
                      default=DEFUALT_IMAGE)

    def serialize(self):
        """ Serialize cupcake to a dict """

        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }

