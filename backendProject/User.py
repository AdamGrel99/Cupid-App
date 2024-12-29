import json
import os

USER_FILE = "users.json"


class User:
    def __init__(self, login, password, name, surname, token, role):
        self.login = login
        self.password = password
        self.name = name
        self.surname = surname
        self.token = token
        self.role = role

    def to_json(self):
        return json.dumps(self.__dict__, ensure_ascii=False)

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
    def save_users(user):
        users = User.load_users()  
        users.append(user.__dict__)  
        with open(USER_FILE, "w") as file:
            json.dump(users, file, ensure_ascii=False, indent=4)

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

if __name__ == '__main__':
    # Create a new user instance
    #x = User("dupa", "password", "John", "Doe", "token123", "admin")

    # Save the user to the JSON file
    #User.save_users(x)

    # Print the user's login

    user_data = User.get_user_by_login("dupa")
    user_data2 = User.get_user_by_name("John")
    user_data3 = User.get_user_by_surname("Doe")
    user_data4 = User.get_user_by_token("token12")
    User.compare_result_of_seach(user_data)
    User.compare_result_of_seach(user_data2)
    User.compare_result_of_seach(user_data3)
    User.compare_result_of_seach(user_data4)
    print("Funkcje zwracają całe obiekty Adasko dopisz sobie jakie tam ma byc api i jak cos by nie dzialalo to wal smialo testowalem u siebie na wewnetrznym systemie i bylo git znajdowalo odpowiednich ludzikow")


