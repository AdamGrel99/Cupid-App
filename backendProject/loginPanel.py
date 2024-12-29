import json
import hashlib
import os

# Plik, w którym będą przechowywane dane użytkowników
USER_FILE = "users.json"

class Osoba:
    def __init__(self, imie, wiek, miasto):
        self.imie = imie
        self.wiek = wiek
        self.miasto = miasto

    def to_json(self):
        return json.dumps(self.__dict__, ensure_ascii=False)


def load_users():
    """Wczytuje dane użytkowników z pliku. Tworzy plik, jeśli nie istnieje."""
    if not os.path.exists(USER_FILE):
        with open(USER_FILE, "w") as file:
            json.dump({}, file)  # Tworzy pusty plik JSON
    with open(USER_FILE, "r") as file:
        return json.load(file)

@app.route('/api/account/login', methods=['POST'])
def save_users(users):
    respone(data)
    """Zapisuje dane użytkowników do pliku."""
    with open(USER_FILE, "w") as file:
        json.dump(users, file, indent=4)


def hash_password(password):
    """Haszuje hasło, by przechowywać je w bezpiecznej formie."""
    return hashlib.sha256(password.encode()).hexdigest()


def register(username, password):
    """Rejestruje nowego użytkownika."""
    users = load_users()

    if username in users:
        print("Użytkownik o podanej nazwie już istnieje!")
        return False

    users[username] = hash_password(password)
    save_users(users)
    print("Rejestracja zakończona sukcesem!")
    return True

@app.route('/api/account/login', methods=['GET'])
def login(username, password):
    """Loguje użytkownika, jeśli dane są poprawne."""
    users = load_users()
    hashed_password = hash_password(password)

    if username in users and users[username] == hashed_password:
        print("Logowanie zakończone sukcesem! Witaj,", username)
        return True
    else:
        print("Błędna nazwa użytkownika lub hasło.")
        return False


# Menu aplikacji
def main():
    while True:
        print("\n1. Rejestracja")
        print("2. Logowanie")
        print("3. Wyjście")
        choice = input("Wybierz opcję: ")

        if choice == "1":
            username = input("Podaj nazwę użytkownika: ")
            password = input("Podaj hasło: ")
            register(username, password)
        elif choice == "2":
            username = input("Podaj nazwę użytkownika: ")
            password = input("Podaj hasło: ")
            login(username, password)
        elif choice == "3":
            print("Do widzenia!")
            break
        else:
            print("Nieprawidłowy wybór, spróbuj ponownie.")


if __name__ == "__main__":
    main()
