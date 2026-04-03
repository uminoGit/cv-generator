import { useState } from "react"

const ACCENT = "#4299E1"

const initialData = {
  personal: { name: "", title: "", email: "", phone: "", location: "", github: "", linkedin: "" },
  experience: [],
  projects: [],
  skills: [],
  education: [],
  template: "modern"
}

const steps = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Skills" },
  { id: 3, label: "Experiencia" },
  { id: 4, label: "Proyectos" },
  { id: 5, label: "Educación" },
  { id: 6, label: "Descargar" },
]

export default function App() {
  const [step, setStep] = useState(1)
  const [cvData, setCvData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(false)

  const theme = {
    bg: dark ? "#111" : "#e4f8f9",
    sidebar: dark ? "#1a1a1a" : "#d6ecf6",
    border: dark ? "#2a2a2a" : "#e8e8e6",
    text: dark ? "#ededed" : "#1a1a1a",
    muted: dark ? "#57c0e9" : "#1c1010",
    inputBg: dark ? "#222" : "#fff",
    inputBorder: dark ? "#333" : "#e0e0e0",
    activeBg: dark ? "#222" : "#fff",
  }

  const updatePersonal = (field, value) =>
    setCvData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }))

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
    } catch {
      alert("Error al generar el PDF")
    } finally {
      setLoading(false)
    }
  }

  const s = {
    app: { display: "flex", height: "100vh", fontFamily: "sans-serif", background: theme.bg, color: theme.text },
    sidebar: { width: 200, background: theme.sidebar, borderRight: `1px solid ${theme.border}`, padding: "24px 12px", display: "flex", flexDirection: "column", flexShrink: 0 },
    logo: { fontSize: 14, fontWeight: 600, color: theme.text, marginBottom: 32, paddingLeft: 8 },
    step: (active) => ({
      display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
      borderRadius: 6, fontSize: 13, cursor: "pointer", marginBottom: 2,
      color: active ? theme.text : theme.muted,
      background: active ? theme.activeBg : "transparent",
      border: active ? `1px solid ${theme.border}` : "1px solid transparent",
      fontWeight: active ? 500 : 400,
    }),
    dot: (active) => ({
      width: 6, height: 6, borderRadius: "50%",
      background: active ? ACCENT : theme.inputBorder, flexShrink: 0
    }),
    content: { flex: 1, padding: "40px 48px", overflowY: "auto" },
    heading: { fontSize: 28, fontWeight: 600, color: theme.text, marginBottom: 8 },
    subheading: { fontSize: 24, color: theme.muted, marginBottom: 32 },
    fieldGroup: { marginBottom: 20 },
    label: { display: "block", fontSize: 12, color: theme.muted, marginBottom: 6, fontWeight: 500 },
    input: { width: "100%", padding: "8px 12px", borderRadius: 6, border: `1px solid ${theme.inputBorder}`, background: theme.inputBg, color: theme.text, fontSize: 14, boxSizing: "border-box", outline: "none" },
    textarea: { width: "100%", padding: "8px 12px", borderRadius: 6, border: `1px solid ${theme.inputBorder}`, background: theme.inputBg, color: theme.text, fontSize: 14, boxSizing: "border-box", outline: "none", resize: "vertical" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    btnPrimary: { background: ACCENT, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 6, fontSize: 13, cursor: "pointer", fontWeight: 500 },
    btnSecondary: { background: ACCENT, color: "#fff", border: `1px solid ${theme.border}`, padding: "9px 20px", borderRadius: 6, fontSize: 13, cursor: "pointer" },
    btnRow: { display: "flex", gap: 8, marginTop: 32 },
    card: { background: theme.sidebar, border: `1px solid ${theme.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 10 },
    cardTitle: { fontSize: 13, fontWeight: 500, color: theme.text },
    cardSub: { fontSize: 12, color: theme.muted, marginTop: 2 },
    themeBtn: { marginTop: "auto", padding: "6px 8px", borderRadius: 6, border: `1px solid ${theme.border}`, background: "transparent", color: theme.muted, fontSize: 12, cursor: "pointer", textAlign: "left" }
  }

  return (
    <div style={s.app}>
      {/* Sidebar */}
      <div style={s.sidebar}>
        <div style={s.logo}>CV Generator</div>
        {steps.map(st => (
          <div key={st.id} style={s.step(step === st.id)} onClick={() => setStep(st.id)}>
            <div style={s.dot(step >= st.id)}></div>
            {st.label}
          </div>
        ))}
        <button style={s.themeBtn} onClick={() => setDark(d => !d)}>
          {dark ? "☀ Modo claro" : "☾ Modo oscuro"}
        </button>
      </div>

      {/* Content */}
      <div style={s.content}>

        {step === 1 && (
          <div>
            <div style={s.heading}>Datos personales</div>
            <div style={s.subheading}>Tu información de contacto y presentación</div>
            <div style={s.row}>
              {[["name","Nombre completo"],["title","Título profesional"]].map(([f,l]) => (
                <div key={f} style={s.fieldGroup}>
                  <label style={s.label}>{l}</label>
                  <input style={s.input} value={cvData.personal[f]} onChange={e => updatePersonal(f, e.target.value)} />
                </div>
              ))}
            </div>
            <div style={s.row}>
              {[["email","Email"],["phone","Teléfono"]].map(([f,l]) => (
                <div key={f} style={s.fieldGroup}>
                  <label style={s.label}>{l}</label>
                  <input style={s.input} value={cvData.personal[f]} onChange={e => updatePersonal(f, e.target.value)} />
                </div>
              ))}
            </div>
            <div style={s.row}>
              {[["location","Ubicación"],["github","GitHub"]].map(([f,l]) => (
                <div key={f} style={s.fieldGroup}>
                  <label style={s.label}>{l}</label>
                  <input style={s.input} value={cvData.personal[f]} onChange={e => updatePersonal(f, e.target.value)} />
                </div>
              ))}
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>LinkedIn</label>
              <input style={s.input} value={cvData.personal.linkedin} onChange={e => updatePersonal("linkedin", e.target.value)} />
            </div>
            <div style={s.btnRow}>
              <button style={s.btnPrimary} onClick={() => setStep(2)}>Siguiente →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={s.heading}>Skills</div>
            <div style={s.subheading}>Escríbelas separadas por coma</div>
            <textarea rows={4} style={s.textarea}
              defaultValue={cvData.skills.join(", ")}
              onChange={e => setCvData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
              placeholder="React, Node.js, Python, MySQL, Docker..."
            />
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(1)}>← Atrás</button>
              <button style={s.btnPrimary} onClick={() => setStep(3)}>Siguiente →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={s.heading}>Experiencia</div>
            <div style={s.subheading}>Tus trabajos y proyectos freelance</div>
            {cvData.experience.map((exp, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardTitle}>{exp.role} — {exp.company}</div>
                <div style={s.cardSub}>{exp.period}</div>
              </div>
            ))}
            <AddSection
              fields={[["role","Puesto"],["company","Empresa"],["period","Período"],["description","Descripción"]]}
              onAdd={item => setCvData(prev => ({ ...prev, experience: [...prev.experience, item] }))}
              theme={theme} s={s}
            />
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(2)}>← Atrás</button>
              <button style={s.btnPrimary} onClick={() => setStep(4)}>Siguiente →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div style={s.heading}>Proyectos</div>
            <div style={s.subheading}>Tus proyectos más destacados</div>
            {cvData.projects.map((proj, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardTitle}>{proj.name}</div>
                <div style={s.cardSub}>{proj.tech.join(", ")}</div>
              </div>
            ))}
            <AddSection
              fields={[["name","Nombre del proyecto"],["description","Descripción"],["tech","Tecnologías (separadas por coma)"],["url","URL (opcional)"]]}
              onAdd={item => setCvData(prev => ({ ...prev, projects: [...prev.projects, { ...item, tech: item.tech.split(",").map(t => t.trim()).filter(Boolean) }] }))}
              theme={theme} s={s}
            />
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(3)}>← Atrás</button>
              <button style={s.btnPrimary} onClick={() => setStep(5)}>Siguiente →</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div style={s.heading}>Educación</div>
            <div style={s.subheading}>Tu formación académica</div>
            {cvData.education.map((edu, i) => (
              <div key={i} style={s.card}>
                <div style={s.cardTitle}>{edu.degree} — {edu.school}</div>
                <div style={s.cardSub}>{edu.year}</div>
              </div>
            ))}
            <AddSection
              fields={[["degree","Título o carrera"],["school","Institución"],["year","Año"]]}
              onAdd={item => setCvData(prev => ({ ...prev, education: [...prev.education, item] }))}
              theme={theme} s={s}
            />
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(4)}>← Atrás</button>
              <button style={s.btnPrimary} onClick={() => setStep(6)}>Siguiente →</button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <div style={s.heading}>¡Listo para descargar!</div>
            <div style={s.subheading}>Revisa tu información antes de generar el PDF</div>
            <div style={s.card}>
              <div style={s.cardTitle}>{cvData.personal.name || "Sin nombre"}</div>
              <div style={s.cardSub}>{cvData.personal.title}</div>
              <div style={{ marginTop: 12, fontSize: 12, color: theme.muted, display: "flex", flexDirection: "column", gap: 4 }}>
                <span>{cvData.personal.email}</span>
                <span>{cvData.personal.location}</span>
                <span>{cvData.skills.join(", ")}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, margin: "16px 0" }}>
              {[["Experiencias", cvData.experience.length], ["Proyectos", cvData.projects.length], ["Educación", cvData.education.length]].map(([label, count]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 600, color: ACCENT }}>{count}</div>
                  <div style={{ fontSize: 12, color: theme.muted }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={() => setStep(5)}>← Atrás</button>
              <button style={s.btnPrimary} onClick={handleDownload} disabled={loading}>
                {loading ? "Generando..." : "⬇ Descargar PDF"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function AddSection({ fields, onAdd, s }) {
  const empty = Object.fromEntries(fields.map(([f]) => [f, ""]))
  const [form, setForm] = useState(empty)
  const [open, setOpen] = useState(false)

  return (
    <div>
      {!open && (
        <button style={{ ...s.btnSecondary, marginBottom: 16 }} onClick={() => setOpen(true)}>+ Agregar</button>
      )}
      {open && (
        <div style={{ ...s.card, marginBottom: 16 }}>
          {fields.map(([f, l]) => (
            <div key={f} style={{ marginBottom: 12 }}>
              <label style={s.label}>{l}</label>
              <input style={s.input} value={form[f]} onChange={e => setForm(prev => ({ ...prev, [f]: e.target.value }))} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={s.btnPrimary} onClick={() => { onAdd(form); setForm(empty); setOpen(false) }}>+ Agregar</button>
            <button style={s.btnSecondary} onClick={() => setOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}