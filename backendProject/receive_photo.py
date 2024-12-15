import os
import base64
import datetime, time

def receivePhoto(photo_data):
    if not os.path.exists(f"{photo_data["token"]}/"):
        os.makedirs(photo_data["token"])
        
    receive_time = time.strftime("%Y-%m-%d_%H-%M-%S")
        
    file = open(f'{photo_data["token"]}/{receive_time}.jpg', "wb")
    file_content = base64.b64decode(photo_data["photoBase64"])
    file.write(file_content)
    file.close()
    
    
# if __name__ == '__main__':
#     receive_photo("532423")