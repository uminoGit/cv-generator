from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import ParagraphStyle
import io

def generate_pdf(data):
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    story = []

    PRIMARY = colors.HexColor("#2D3748")
    ACCENT  = colors.HexColor("#4299E1")
    GRAY    = colors.HexColor("#718096")

    name_style = ParagraphStyle("name",
        fontSize=24, textColor=PRIMARY, fontName="Helvetica-Bold", spaceAfter=4)

    title_style = ParagraphStyle("title",
        fontSize=13, textColor=ACCENT, fontName="Helvetica", spaceAfter=4)

    contact_style = ParagraphStyle("contact",
        fontSize=9, textColor=GRAY, fontName="Helvetica", spaceAfter=2)

    section_style = ParagraphStyle("section",
        fontSize=13, textColor=PRIMARY, fontName="Helvetica-Bold",
        spaceBefore=14, spaceAfter=6)

    body_style = ParagraphStyle("body",
        fontSize=10, textColor=PRIMARY, fontName="Helvetica", spaceAfter=3)

    small_style = ParagraphStyle("small",
        fontSize=9, textColor=GRAY, fontName="Helvetica", spaceAfter=2)

    # Encabezado
    story.append(Paragraph(data.personal.name, name_style))
    story.append(Paragraph(data.personal.title, title_style))
    story.append(Paragraph(data.personal.email, contact_style))
    story.append(Paragraph(data.personal.location, contact_style))
    if data.personal.github:
        story.append(Paragraph(data.personal.github, contact_style))
    story.append(Spacer(1, 8))
    story.append(HRFlowable(color=ACCENT, thickness=2, width="100%"))

    # Skills
    story.append(Paragraph("Skills", section_style))
    story.append(Paragraph(", ".join(data.skills), body_style))

    # Experiencia
    if data.experience:
        story.append(Paragraph("Experiencia", section_style))
        for exp in data.experience:
            story.append(Paragraph(f"<b>{exp.role}</b> — {exp.company}", body_style))
            story.append(Paragraph(exp.period, small_style))
            story.append(Paragraph(exp.description, body_style))
            story.append(Spacer(1, 6))

    # Proyectos
    if data.projects:
        story.append(Paragraph("Proyectos", section_style))
        for proj in data.projects:
            story.append(Paragraph(f"<b>{proj.name}</b>", body_style))
            story.append(Paragraph(proj.description, body_style))
            story.append(Paragraph(", ".join(proj.tech), small_style))
            story.append(Spacer(1, 6))

    # Educación
    if data.education:
        story.append(Paragraph("Educación", section_style))
        for edu in data.education:
            story.append(Paragraph(f"<b>{edu.degree}</b> — {edu.school}", body_style))
            story.append(Paragraph(edu.year, small_style))
            story.append(Spacer(1, 6))

    doc.build(story)
    buffer.seek(0)
    return buffer.read()