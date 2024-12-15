from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from cryptography.fernet import Fernet
import os

app = Flask(__name__)

# Klucze szyfrowania dla pary młodej
COUPLE_KEY = Fernet.generate_key()
fernet = Fernet(COUPLE_KEY)

# Ograniczenia dla gości
GUEST_MAX_UPLOADS = 5
guest_uploads = {}

# Konfiguracja folderów
UPLOAD_FOLDER_COUPLE = 'uploads/couple'
UPLOAD_FOLDER_GUESTS = 'uploads/guests'
os.makedirs(UPLOAD_FOLDER_COUPLE, exist_ok=True)
os.makedirs(UPLOAD_FOLDER_GUESTS, exist_ok=True)

@app.route('/token/couple', methods=['GET'])
def generate_couple_token():
    """Generuje zaszyfrowany token dla pary młodej."""
    token = fernet.encrypt(b"couple").decode('utf-8')
    return jsonify({"token": token})

@app.route('/token/guest', methods=['GET'])
def generate_guest_token():
    """Generuje jawny token dla gości."""
    token = "guest"
    return jsonify({"token": token})

@app.route('/upload', methods=['POST'])
def upload_file():
    """Obsługuje przesyłanie zdjęć."""
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Token is required"}), 401

    file = request.files.get("file")
    if not file:
        return jsonify({"error": "No file provided"}), 400

    filename = secure_filename(file.filename)

    # Rozróżnienie użytkownika na podstawie tokenu
    try:
        user_type = fernet.decrypt(token.encode('utf-8')).decode('utf-8')
    except Exception:
        user_type = token  # Jawny token dla gości

    if user_type == "couple":
        # Para młoda
        file.save(os.path.join(UPLOAD_FOLDER_COUPLE, filename))
        return jsonify({"message": f"File uploaded for couple: {filename}"}), 200

    elif user_type == "guest":
        # Goście
        guest_ip = request.remote_addr
        if guest_ip not in guest_uploads:
            guest_uploads[guest_ip] = 0

        if guest_uploads[guest_ip] >= GUEST_MAX_UPLOADS:
            return jsonify({"error": "Upload limit reached"}), 403

        guest_uploads[guest_ip] += 1
        file.save(os.path.join(UPLOAD_FOLDER_GUESTS, filename))
        return jsonify({"message": f"File uploaded for guest: {filename}"}), 200

    else:
        return jsonify({"error": "Invalid token"}), 403

@app.route('/uploads/couple/<filename>', methods=['GET'])
def get_couple_file(filename):
    """Pobiera plik pary młodej."""
    return send_from_directory(UPLOAD_FOLDER_COUPLE, filename)

@app.route('/uploads/guests/<filename>', methods=['GET'])
def get_guest_file(filename):
    """Pobiera plik gości."""
    return send_from_directory(UPLOAD_FOLDER_GUESTS, filename)

if __name__ == "__main__":
    app.run(debug=True)
