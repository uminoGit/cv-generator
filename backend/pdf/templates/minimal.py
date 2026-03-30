from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def fill_template(c: canvas.Canvas, cv_data: dict):
    c.setFont('Times-Bold', 20)
    c.drawString(72, 750, cv_data.get('name', ''))

    c.setFont('Times-Roman', 11)
    c.drawString(72, 730, f"Email: {cv_data.get('email', '')}")
    c.drawString(72, 715, f"Tel: {cv_data.get('phone', '')}")

    y = 680
    c.drawString(72, y, 'Resumen:')
    c.setFont('Times-Roman', 10)
    y -= 18
    c.drawString(72, y, cv_data.get('summary', ''))
