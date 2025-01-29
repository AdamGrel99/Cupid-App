from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Ścieżka do pliku, w którym będą przechowywane dane albumów
ALBUM_FILE = "albums.json"

# Funkcja pomocnicza: zapisz dane do pliku
def save_album_data(data):
    with open(ALBUM_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Funkcja pomocnicza: wczytaj dane z pliku
def load_album_data():
    if os.path.exists(ALBUM_FILE):
        with open(ALBUM_FILE, "r") as file:
            return json.load(file)
    return []



def save_album():
    try:
        # Pobranie danych z żądania
        album_data = request.get_json()
        if not album_data:
            print("check")
            return jsonify({"error": "No album data provided"}), 400
            
        # Załaduj istniejące dane albumu
        albums = load_album_data()
        print("check1")
        # Dodaj nowy album
        albums.append(album_data)
        print("check2")
        # Zapisz dane do pliku
        save_album_data(albums)
        print("check3")

        # Zwróć odpowiedź sukcesu
        return jsonify({"message": "Album saved successfully"}), 200
    except Exception as e:
        print(f"Error saving album: {e}")
        return jsonify({"error": "An error occurred while saving the album"}), 500



def get_album():
    try:
        # Wczytanie danych albumów
        albums = load_album_data()
        return jsonify(albums), 200
    except Exception as e:
        print(f"Error loading albums: {e}")
        return jsonify({"error": "An error occurred while loading the albums"}), 500