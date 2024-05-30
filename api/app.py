from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np

from flask_cors import CORS


app = Flask(__name__)  # Initialize the flask App
CORS(app)

model = tf.keras.models.load_model(
    "C:/Users/Emilio Venegas/Documents/python/Machine_learning/model_weights/model.keras"
)


@app.route("/predict", methods=["POST"])    
def process_image():
    file = request.files["file"]
    img = Image.open(file).convert("L")
    img = img.resize((227, 227))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=-1)  # Add color channel dimension
    img_array = np.expand_dims(img_array, axis=0)
    # img_array = np.array(img).reshape(-1, 227, 227, 1)

    predictions = model.predict(img_array)
    probabilities = predictions[0].tolist()

    index_pred = np.argmax(predictions, axis=1)[0]
    max_pred = np.max(predictions)
    print(index_pred, max_pred)
    print(probabilities)

    return (
        jsonify(
            {
                "prediction": index_pred.item(),
                "probability": max_pred.item(),
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
