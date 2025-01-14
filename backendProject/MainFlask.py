from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import generate_qr_card
import receive_photo
import generowanieTokenu
import User

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://192.168.10.102:5173", "http://192.168.10.102::5173", "http://192.168.10.102::5173"]}})

# CORS(app)

@app.route('/api/cardqr', methods=['POST'])
def create_card():
    card_data = json.loads(request.data)
    # if not employee_is_valid(employee):
    #     return jsonify({'error': 'Invalid employee properties.'}), 400

    generate_qr_card.getCalled(card_data)
    #TODO
    token = card_data["token"]

    return jsonify({'location': f'/{token}/ulotka.pdf'}), 201

@app.route('/api/register',methods=['POST'])
def restister():
    User.User.handle_registration(request.data)

@app.route('/api/foto', methods=['POST'])
def save_photo():
    photo_data = json.loads(request.data)

    generate_qr_card.getCalled(photo_data)
    receive_photo.receivePhoto(photo_data)

    token = photo_data["token"]

    return jsonify({'location': f'/{token}/ulotka.pdf'}), 201



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)