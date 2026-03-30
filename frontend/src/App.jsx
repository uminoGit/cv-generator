import { useState } from "react"

const initialData = {
  personal: { name: "", title: "", email: "", location: "", github: "", linkedin: "" },
  experience: [],
  projects: [],
  skills: [],
  education: [],
  template: "modern"
}

export default function App() {
  const [step, setStep] = useState(1)
  const [cvData, setCvData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const updatePersonal = (field, value) => {
    setCvData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }))
  }

  const handleDownload = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/api/cv/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cvData)
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "cv.pdf"
      a.click()
    } catch (err) {
      alert("Error al generar el PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif", padding: "0 20px" }}>
      <h1 style={{ color: "#2D3748" }}>Generador de CV</h1>
      <p style={{ color: "#718096" }}>Paso {step} de 4</p>

      {step === 1 && (
        <div>
          <h2>Datos personales</h2>
          {["name", "title", "email", "location", "github", "linkedin"].map(field => (
            <div key={field} style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4, textTransform: "capitalize" }}>{field}</label>
              <input
                value={cvData.personal[field]}
                onChange={e => updatePersonal(field, e.target.value)}
                style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #CBD5E0", boxSizing: "border-box" }}
              />
            </div>
          ))}
          <button onClick={() => setStep(2)} style={btnStyle}>Siguiente →</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Skills</h2>
          <p style={{ color: "#718096" }}>Escríbelas separadas por coma</p>
          <textarea
            rows={3}
            placeholder="React, Node.js, Python, MySQL..."
            onChange={e => setCvData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
            defaultValue={cvData.skills.join(", ")}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #CBD5E0", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={() => setStep(1)} style={btnSecondary}>← Atrás</button>
            <button onClick={() => setStep(3)} style={btnStyle}>Siguiente →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Experiencia</h2>
          {cvData.experience.map((exp, i) => (
            <div key={i} style={{ background: "#F7FAFC", padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <strong>{exp.role}</strong> — {exp.company}
            </div>
          ))}
          <AddExperience onAdd={exp => setCvData(prev => ({ ...prev, experience: [...prev.experience, exp] }))} />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={() => setStep(2)} style={btnSecondary}>← Atrás</button>
            <button onClick={() => setStep(4)} style={btnStyle}>Siguiente →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>¡Listo!</h2>
          <p style={{ color: "#718096" }}>Tu CV está listo para descargar.</p>
          <div style={{ background: "#F7FAFC", padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <p><strong>Nombre:</strong> {cvData.personal.name}</p>
            <p><strong>Skills:</strong> {cvData.skills.join(", ")}</p>
            <p><strong>Experiencias:</strong> {cvData.experience.length}</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setStep(3)} style={btnSecondary}>← Atrás</button>
            <button onClick={handleDownload} disabled={loading} style={btnStyle}>
              {loading ? "Generando..." : "⬇ Descargar PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AddExperience({ onAdd }) {
  const [form, setForm] = useState({ role: "", company: "", period: "", description: "" })
  return (
    <div style={{ border: "1px solid #CBD5E0", borderRadius: 8, padding: 12 }}>
      <h4 style={{ margin: "0 0 12px" }}>Agregar experiencia</h4>
      {["role", "company", "period", "description"].map(field => (
        <div key={field} style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 4, textTransform: "capitalize" }}>{field}</label>
          <input
            value={form[field]}
            onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
            style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #CBD5E0", boxSizing: "border-box" }}
          />
        </div>
      ))}
      <button onClick={() => { onAdd(form); setForm({ role: "", company: "", period: "", description: "" }) }} style={btnStyle}>
        + Agregar
      </button>
    </div>
  )
}

const btnStyle = {
  background: "#4299E1", color: "white", border: "none",
  padding: "10px 20px", borderRadius: 6, cursor: "pointer", fontSize: 14
}

const btnSecondary = {
  background: "#EDF2F7", color: "#2D3748", border: "none",
  padding: "10px 20px", borderRadius: 6, cursor: "pointer", fontSize: 14
}