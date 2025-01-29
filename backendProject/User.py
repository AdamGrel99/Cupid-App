import json
import os

from flask import jsonify

USER_FILE = "users.json"


class User:
    def __init__(self,id, email, password, name, surname, token, role):
        self.id = id
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.token = token
        self.role = role

    def to_dict(self):
        return self.__dict__
    
    @staticmethod
    def handle_registration(data):
        try:
            print("Otrzymane dane w handle_registration:", data)

            if not data.get("email") or not data.get("password"):
                raise ValueError("Email i hasło są wymagane")

            # Wypełnienie brakujących danych
            id = data.get("id", "default_id")
            email = data["email"]
            password = data["password"]
            name = data.get("name", "")
            surname = data.get("surname", "")
            token = data.get("token", "default_token")  # TODO: Generowanie tokenu
            role = data.get("role", "user")

            print(id, email, password, name, surname, token, role)

            # Tworzymy obiekt User
            user = User(id, email, password, name, surname, token, role)

            print("Przed zapisaniem użytkownika do pliku")
            print(f"Plik {USER_FILE} nie istnieje. Tworzę nowy.")
            # Sprawdzamy, czy plik istnieje i czy nie jest pusty
            if not os.path.exists(USER_FILE):
                print(f"Plik {USER_FILE} nie istnieje. Tworzę nowy.")
                with open(USER_FILE, "w") as file:
                    json.dump([], file)  # Tworzymy pustą listę

            # Odczytujemy użytkowników z pliku
            with open(USER_FILE, "r") as file:
                users = json.load(file)

            print("Odczytani użytkownicy:", users)

            # Dodajemy nowego użytkownika do listy
            users.append(user.to_dict())

            # Zapisujemy dane użytkowników do pliku
            with open(USER_FILE, "w") as file:
                json.dump(users, file, ensure_ascii=False, indent=4)

            print("Zapisano użytkownika:", user.to_dict())  # Debugowanie: wyświetlamy zapisane dane

            # Zwracamy odpowiedź JSON z danymi użytkownika
            return jsonify({"message": "Rejestracja zakończona sukcesem!", "user": user.to_dict()}), 201

        except Exception as e:
            print(f"Błąd w handle_registration: {str(e)}")  # Debugowanie błędu
            return jsonify({"error": str(e)}), 500


    


    @staticmethod
    def load_users():
        """Wczytuje użytkowników z pliku JSON."""
        if not os.path.exists(USER_FILE):
            with open(USER_FILE, "w") as file:
                json.dump([], file)

        try:
            with open(USER_FILE, "r") as file:
                data = json.load(file)
                print (data)
                print("check")
                if isinstance(data, str):  # Jeśli to string, parsujemy jeszcze raz
                    data = json.loads(data)
                    print (data)
                if not isinstance(data, list):  # Jeśli to nie lista, coś jest źle
                    print("Błędny format JSON! Resetowanie pliku.")
                    return []

                return data
        except json.JSONDecodeError:
            print("Błąd dekodowania JSON! Plik mógł zostać uszkodzony.")
            return []

    @staticmethod
    def handle_login(data):
        """Obsługa logowania użytkownika - używa pętli do wyszukiwania."""
        try:
            email = data.get("email")
            password = data.get("password")
            if not email or not password:
                raise ValueError("Email i hasło są wymagane")

            users = User.load_users()
            # 🔍 Szukamy użytkownika pętlą for
            found_user = None
            for user in users:
                if user["email"] == email:
                    print(user["email"])
                    found_user = user
                    print(found_user)
                    # Przerywamy pętlę, jeśli znaleziono użytkownika
            print("check1")            
            if not found_user:
                raise ValueError("Nie znaleziono użytkownika o podanym emailu")
            print("check2") 
            if found_user["password"] != password:
                raise ValueError("Nieprawidłowe hasło")
            print("check3") 
            return jsonify({"message": "Logowanie zakończone sukcesem!", "user": found_user}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 400

    

    @staticmethod
    def get_user_by_login(login):
        users = User.load_users()  
        for user in users:
            if user.get("login") == login:  
                return user
        return None  

    @staticmethod
    def get_user_by_name(name):
        users = User.load_users()  
        for user in users:
            if user.get("name") == name:  
                return user
        return None  

    @staticmethod
    def get_user_by_surname(surname):
        users = User.load_users()  
        for user in users:
            if user.get("surname") == surname:  
                return user
        return None  

    @staticmethod
    def get_user_by_token(token):
        users = User.load_users()  
        for user in users:
            if user.get("token") == token:  
                return user
        return None  
    
    @staticmethod
    def compare_result_of_seach(temp):
        if temp:
            print("Found user:", temp)
        else:
            print("User not found")



