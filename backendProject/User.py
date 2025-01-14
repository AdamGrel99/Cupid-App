import json
import os

USER_FILE = "users.json"


class User:
    def __init__(self,id, login, password, name, surname, token, role):
        self.id = id
        self.login = login
        self.password = password
        self.name = name
        self.surname = surname
        self.token = token
        self.role = role

    def to_json(self):
        return json.dumps(self.__dict__, ensure_ascii=False)
    
    
    def handle_registration(request_body):
    # Parsowanie danych JSON od frontendu
        data = json.loads(request_body)
        
        # Wypełnienie brakujących danych
        id = data.get("id")
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        surname = data.get("surname")  
        token = data.get("token")  #Todo Generowanie tokenu
        role = data.get("role")  #Todo wybieranie Domyślna rola

        # Tworzenie obiektu User
        user = User(id, email, password, name, surname, token, role)

        # Zwrócenie obiektu użytkownika jako JSON (lub zapis w bazie danych)
        return user.to_json()

    @staticmethod
    def load_users():
        if not os.path.exists(USER_FILE):
            with open(USER_FILE, "w") as file:
                json.dump([], file)  
        try:
            with open(USER_FILE, "r") as file:
                content = file.read().strip()  
                return json.loads(content) if content else []  
        except json.JSONDecodeError:
            return []  

    

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



