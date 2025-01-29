import glob
import os
from flask import Flask, request, jsonify, Response, send_from_directory
from flask_cors import CORS
import json
import generate_qr_card
import receive_photo
import generowanieTokenu
import export_album
import User
import album

app = Flask(__name__)
CORS(app)


# CORS(app)
@app.route("/api/get-albums", methods=["GET"])
def get_albums():
    album.get_album()


@app.route("/api/save-album", methods=["POST"])
def save_albums():
    album.save_album()
    
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
    return User.User.handle_login(request.json)

@app.route('/api/foto', methods=['POST'])
def save_photo():
    photo_data = json.loads(request.data)

    # generate_qr_card.getCalled(photo_data)
    receive_photo.receivePhoto(photo_data)

    token = photo_data["token"]

    return jsonify({'location': f'/{token}/ulotka.pdf'}), 201

@app.route('/api/export_album', methods=['POST'])
def export_album_fun():
    album_data = json.loads(request.data)

    export_mode = request.args.get('export_mode', None)
    token = request.args.get('token', None)
    
    if(export_mode == "pdf"):
        export_album.export_to_pdf(album_data, token)
    if(export_mode == "docx"):
        export_album.export_to_docx(album_data, token)
    if(export_mode == "html"):
        export_album.export_to_html(album_data, token)

    return jsonify({'location': f'http://localhost:5000/api/download_file/{token}/album_weselny.{export_mode}'}), 201

@app.route('/api/get_photo_list', methods=['GET'])
def get_photo_list():
    token = request.args.get('token', None)
    print(token)
    
    photos_found = os.listdir(token)
    
    data_to_return = list()
    
    for file in photos_found:
        if file.endswith(".jpg"):
            data_to_return.append({"download_url": f"http://localhost:5000/api/download_file/{token}/{file}"})
    
    return jsonify(data_to_return), 201


@app.route('/api/download_file/<path:filename>')
def download_file(filename):
    return send_from_directory('', filename, as_attachment=True)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)