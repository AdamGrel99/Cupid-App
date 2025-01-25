from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import generate_qr_card
import receive_photo
import generowanieTokenu
import User

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


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

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        print("Otrzymane dane:", data)  # Debugowanie: wyświetlamy otrzymane dane

        if not data:
            raise ValueError("Brak danych w żądaniu")

        # Sprawdźmy, co dokładnie robi handle_registration w User.py
        user = User.User.handle_registration(data)

        print("Dane użytkownika po rejestracji:", user)  # Debugowanie: wyświetlamy dane użytkownika
        
        return jsonify({"message": "Rejestracja zakończona sukcesem!"}), 201
    except Exception as e:
        print(f"Błąd w handle_registration: {str(e)}")  # Debugowanie: wyświetlamy błąd
        return jsonify({"error": str(e)}), 500
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return User.User.handle_login(data)

@app.route('/api/foto', methods=['POST'])
def save_photo():
    photo_data = json.loads(request.data)

    generate_qr_card.getCalled(photo_data)
    receive_photo.receivePhoto(photo_data)

    token = photo_data["token"]

    return jsonify({'location': f'/{token}/ulotka.pdf'}), 201

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)