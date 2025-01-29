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
from pdf2docx import Converter
from spire.pdf.common import *
from spire.pdf import *

page_width = 3508/6
page_height = 2480/6

# const A4_WIDTH = 3508;
# const A4_HEIGHT = 2480;

pdfmetrics.registerFont(TTFont('Imperial', 'ImperialScript-Regular.ttf'))

def export_to_pdf(history_album_stack, token):
    
    canvas = Canvas(f"{token}/album_weselny.pdf",[page_width,page_height])
    
    print(history_album_stack)
    
    for page in history_album_stack:
        #tło
        canvas.setFillColor(colors.wheat)
        canvas.rect(0,0,page_width*units.mm, page_height*units.mm,fill=1)
        
        for photo in page["images"]:
            # canvas.drawImage()
                
            img_src = str(photo["src"])
            img_src = img_src.replace("http://localhost:5000/api/download_photo/", "")
            
            #print(f"Adding image: {img_src}")
            
            image = ImageReader(img_src)
            img_width, img_height = image.getSize()
                
            if "width" in photo:
                print(f"It has no scale. Tryint to draw at: {photo["x"]/6};{(page_height - photo["y"]/6-photo["height"]/6)}. Image size: {photo["width"]/6}x{photo["height"]/6}")
                canvas.drawImage(image, photo["x"]/6, (page_height - photo["y"]/6)-photo["height"]/6, photo["width"]/6, photo["height"]/6)
         
            else:
                print(f"It has no scale. Tryint to draw at: {photo["x"]/6};{(page_height - photo["y"]/6)}. Image size: {img_width/6}x{img_height/6}")
                canvas.drawImage(image, photo["x"]/6, (page_height - photo["y"]/6)-img_height/6, img_width/6, img_height/6)     
        
        canvas.setFontSize(12)
        canvas.setFillColor(colors.black)
        canvas.drawCentredString(page_width/2, 12*units.mm, str(page["pageNumber"]))
        
        canvas.setFontSize(8)
        canvas.setFillColor(colors.black)
        canvas.drawCentredString(page_width/2, 5*units.mm, "www.cupid.pl")
        
        canvas.showPage()
        print("=========\nNew page!\n")
    
    canvas.save()
    
def export_to_docx(history_album_stack, token):
    export_to_pdf(history_album_stack, token)
    
    cv = Converter(f"{token}/album_weselny.pdf")
    cv.convert(f"{token}/album_weselny.docx", start=0, end=None)
    cv.close()
    
def export_to_html(history_album_stack, token):
    export_to_pdf(history_album_stack, token)
    
    doc = PdfDocument()

    doc.LoadFromFile(f"{token}/album_weselny.pdf")

    convertOptions = doc.ConvertOptions

    convertOptions.SetPdfToHtmlOptions(True, True, 1, True)

    doc.SaveToFile(f"{token}/album_weselny.html", FileFormat.HTML)

    doc.Dispose()
        
    
    