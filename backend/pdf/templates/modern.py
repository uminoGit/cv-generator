from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def fill_template(c: canvas.Canvas, cv_data: dict):
    c.setFont('Helvetica-Bold', 24)
    c.drawString(72, 750, cv_data.get('name', ''))

    c.setFont('Helvetica', 12)
    c.drawString(72, 730, cv_data.get('email', ''))
    c.drawString(72, 715, cv_data.get('phone', ''))

    y = 685
    c.setFont('Helvetica-Bold', 14)
    c.drawString(72, y, 'Perfil')
    c.setFont('Helvetica', 11)
    y -= 18
    c.drawString(72, y, cv_data.get('summary', ''))

    y -= 32
    c.setFont('Helvetica-Bold', 14)
    c.drawString(72, y, 'Habilidades')
    c.setFont('Helvetica', 11)
    y -= 18
    c.drawString(72, y, ', '.join(cv_data.get('skills', [])))
