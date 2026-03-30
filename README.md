# CV Generator

Aplicación web para generar CVs en PDF de forma rápida y visual.

## Stack
- **Frontend:** React + Vite
- **Backend:** Python + FastAPI
- **PDF:** ReportLab
- **Base de datos:** MySQL (próximamente)

## Features
- Formulario multi-paso
- Generación de PDF en tiempo real
- Descarga directa desde el navegador

## Cómo correrlo localmente

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## En construcción
- [ ] Paso de Proyectos y Educación
- [ ] Foto de perfil en el CV
- [ ] Múltiples templates
- [ ] Autenticación y guardado de CVs
- [ ] Deploy
