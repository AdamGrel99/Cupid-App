from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import generate_qr_card

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


@app.route('/api/generate_qr_card', methods=['POST'])
def create_card():
    card_data = json.loads(request.data)
    # if not employee_is_valid(employee):
    #     return jsonify({'error': 'Invalid employee properties.'}), 400

    generate_qr_card.getCalled(card_data)

    token = card_data["token"]

    return jsonify({'location': f'/{token}/ulotka.pdf'}), 201


if __name__ == '__main__':
    app.run(port=5000)