import reportlab.lib.colors as colors
import reportlab.lib.units as units
from reportlab.pdfgen.canvas import Canvas
from reportlab.graphics import renderPM
import segno
import PIL.Image
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

page_width = 210
page_height = 297

pdfmetrics.registerFont(TTFont('Imperial', 'ImperialScript-Regular.ttf'))

def getCalled(data):
    generateQRCard("Wesele", data["date"], data["manName"], data["womanName"], data["token"])
    
def generateQRCard(event_name, event_date, man_name, woman_name, token):
    # todo: change these later to get stuff from frontend
    # event_name = "Wesele"
    # event_date = "23.12.2035"
    # man_name = "Waldemar"
    # woman_name = "Anastazja"
    fin_text = u"Zrób zdjęcia do albumu weselnego!"

    canvas = Canvas(f"{token}/ulotka.pdf")

    canvas.setFillColor(colors.wheat)
    canvas.rect(0,0,210*units.mm, 297*units.mm,fill=1)

    canvas.setFont("Imperial", 100)
    canvas.setFillColor(colors.orange)
    canvas.drawCentredString(210/2*units.mm, 270*units.mm, event_name)

    canvas.setFontSize(80)
    canvas.drawCentredString(210/2*units.mm, 240*units.mm, event_date)

    canvas.setFontSize(70)
    canvas.drawCentredString(210/2*units.mm, 210*units.mm, man_name + " & " + woman_name)

    canvas.setFontSize(50)
    canvas.drawCentredString(210/2*units.mm, 190*units.mm, fin_text)

    qrcode = segno.make_qr(f"localhost:5137/foto?token={token}")
    
    if not os.path.exists(f"{token}/"):
        os.makedirs(token)
        
    qrcode.save(f"{token}/qrcode.png")

    qrcode = ImageReader(f"{token}/qrcode.png")

    canvas.drawImage(qrcode, 210/2*units.mm - 15/2*units.cm, 20*units.mm, 150*units.mm, 150*units.mm)

    canvas.setFontSize(32)
    canvas.setFillColor(colors.black)
    canvas.drawCentredString(210/2*units.mm, 10*units.mm, "www.cupid.pl")

    canvas.save()



# if __name__ == "__main__":
#     print("a")
#     generateQRCard()

