import { useEffect, useMemo, useState, type ReactNode, type SVGProps } from "react";
import { toPng } from "html-to-image";

type IconName =
  | "activity"
  | "alert"
  | "arrow"
  | "building"
  | "calendar"
  | "camera"
  | "check"
  | "chevron"
  | "chevronLeft"
  | "chevronRight"
  | "clock"
  | "close"
  | "database"
  | "download"
  | "expand"
  | "eye"
  | "eyeOff"
  | "filter"
  | "help"
  | "history"
  | "info"
  | "layers"
  | "location"
  | "logout"
  | "map"
  | "menu"
  | "network"
  | "person"
  | "reports"
  | "search"
  | "shield"
  | "signal"
  | "sliders"
  | "users"
  | "wifiOff";

const iconPaths: Record<IconName, ReactNode> = {
  activity: <><path d="M3 12h4l2.5-7 5 14 2.5-7h4" /></>,
  alert: <><path d="M10.3 3.4 2.8 17a2 2 0 0 0 1.8 3h14.8a2 2 0 0 0 1.8-3L13.7 3.4a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>,
  arrow: <><path d="m9 18 6-6-6-6" /></>,
  building: <><path d="M4 21V5l8-3 8 3v16M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01M2 21h20" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  camera: <><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  chevronLeft: <><path d="m15 18-6-6 6-6" /></>,
  chevronRight: <><path d="m9 18 6-6-6-6" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
  expand: <><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></>,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
  eyeOff: <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></>,
  filter: <><path d="M4 5h16M7 12h10M10 19h4" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.3 2.3 0 1 1 3.4 2c-.8.5-1.2 1-1.2 2M12 17h.01" /></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  layers: <><path d="m12 2-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  network: <><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4M6 16v-4h12v4" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  reports: <><path d="M6 2h9l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5M8 13h8M8 17h5" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  signal: <><path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01M2 9a14 14 0 0 1 20 0" /></>,
  sliders: <><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  wifiOff: <><path d="m2 2 20 20M8.5 16a5 5 0 0 1 6.6-.4M5 12.5a10 10 0 0 1 5-2.6M2 9a14 14 0 0 1 4.2-2.8M15.5 6.5A14 14 0 0 1 22 9M12 20h.01" /></>,
};

function Icon({ name, size = 20, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{iconPaths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "safe" | "danger" | "ghost"; icon?: IconName }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{icon && <Icon name={icon} />}{children}</button>;
}

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{children}</select></label>;
}

function StatusPill({ tone, children }: { tone: "safe" | "danger" | "pending" | "info" | "neutral"; children: ReactNode }) {
  return <span className={`pill pill-${tone}`}><span className="pill-dot" />{children}</span>;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={`brand ${compact ? "brand-compact" : ""}`}><span className="brand-mark"><Icon name="shield" size={compact ? 21 : 25} /></span><span><strong>PREVENIDOS</strong>{!compact && <small>Prevención y respuesta ciudadana</small>}</span></div>;
}

type Transmission = "Pendiente" | "Recibido por el nodo" | "Recibido por el receptor" | "Plataforma central";
type Report = {
  id: string;
  state: "A salvo" | "Necesita ayuda";
  date: string;
  shortDate: string;
  coords?: [number, number];
  location: string;
  locationType: string;
  source: string;
  node: string;
  category?: string;
  transmission: Transmission;
  validation: "Sin verificar" | "En revisión" | "Verificado";
  x?: number;
  y?: number;
};

const reports: Report[] = [
  { id: "REP-240617-0182", state: "Necesita ayuda", date: "17 jun 2025 · 10:42", shortDate: "10:42", coords: [-12.047, -77.043], location: "Cercado de Lima", locationType: "Ubicación simulada", source: "Aplicación ciudadana", node: "NOD-LIM-04", category: "Atención médica", transmission: "Plataforma central", validation: "En revisión", x: 48, y: 45 },
  { id: "REP-240617-0181", state: "A salvo", date: "17 jun 2025 · 10:39", shortDate: "10:39", coords: [-12.075, -77.036], location: "La Victoria", locationType: "Selección en mapa", source: "Nodo comunitario", node: "NOD-LIM-02", transmission: "Plataforma central", validation: "Verificado", x: 56, y: 61 },
  { id: "REP-240617-0180", state: "A salvo", date: "17 jun 2025 · 10:37", shortDate: "10:37", coords: [-12.021, -77.06], location: "Breña", locationType: "Ubicación simulada", source: "Aplicación ciudadana", node: "NOD-LIM-04", transmission: "Recibido por el nodo", validation: "Sin verificar", x: 39, y: 38 },
  { id: "REP-240617-0179", state: "Necesita ayuda", date: "17 jun 2025 · 10:35", shortDate: "10:35", coords: [-12.09, -77.055], location: "Jesús María", locationType: "Selección en mapa", source: "Aplicación ciudadana", node: "NOD-LIM-01", category: "Persona atrapada", transmission: "Recibido por el receptor", validation: "En revisión", x: 38, y: 68 },
  { id: "REP-240617-0178", state: "A salvo", date: "17 jun 2025 · 10:31", shortDate: "10:31", location: "Ubicación no disponible", locationType: "No disponible", source: "Aplicación ciudadana", node: "—", transmission: "Pendiente", validation: "Sin verificar" },
  { id: "REP-240617-0177", state: "A salvo", date: "17 jun 2025 · 10:26", shortDate: "10:26", coords: [-12.11, -77.032], location: "San Borja", locationType: "Ubicación simulada", source: "Nodo comunitario", node: "NOD-LIM-03", transmission: "Plataforma central", validation: "Verificado", x: 67, y: 77 },
  { id: "REP-240617-0176", state: "Necesita ayuda", date: "17 jun 2025 · 10:22", shortDate: "10:22", coords: [-12.03, -77.082], location: "San Miguel", locationType: "Selección en mapa", source: "Aplicación ciudadana", node: "NOD-LIM-01", category: "Otro tipo de ayuda", transmission: "Pendiente", validation: "Sin verificar", x: 25, y: 48 },
  { id: "REP-240617-0175", state: "A salvo", date: "17 jun 2025 · 10:18", shortDate: "10:18", coords: [-12.065, -76.99], location: "Ate", locationType: "Ubicación simulada", source: "Aplicación ciudadana", node: "NOD-LIM-02", transmission: "Plataforma central", validation: "En revisión", x: 81, y: 49 },
];

const nodes = [
  { id: "NOD-LIM-01", place: "San Miguel", last: "Hace 2 min", status: "En línea", received: 38, pending: 2 },
  { id: "NOD-LIM-02", place: "La Victoria", last: "Hace 4 min", status: "En línea", received: 51, pending: 0 },
  { id: "NOD-LIM-03", place: "San Borja", last: "Hace 19 min", status: "Sin comunicación reciente", received: 29, pending: 4 },
  { id: "NOD-LIM-04", place: "Cercado de Lima", last: "Sin datos recientes", status: "Desconocido", received: 22, pending: 1 },
];

function Gateway({ onCitizen, onOperator }: { onCitizen: () => void; onOperator: () => void }) {
  return <main className="gateway">
    <div className="gateway-shell">
      <div className="gateway-brand"><Brand /><StatusPill tone="info">Prototipo académico</StatusPill></div>
      <div className="gateway-copy">
        <span className="eyebrow">Sistema de respuesta post-sismo</span>
        <h1>Confirmación del estado de la población</h1>
        <p>Selecciona una interfaz para iniciar el recorrido de demostración.</p>
      </div>
      <div className="access-grid">
        <button className="access-card" onClick={onCitizen}>
          <span className="access-icon citizen"><Icon name="person" size={28} /></span>
          <span><strong>Acceso ciudadano</strong><small>Informa si estás a salvo o necesitas ayuda. No requiere cuenta.</small></span>
          <Icon name="arrow" />
        </button>
        <button className="access-card" onClick={onOperator}>
          <span className="access-icon operator"><Icon name="building" size={28} /></span>
          <span><strong>Acceso operativo</strong><small>Consulta el panel de información georreferenciada del COEN.</small></span>
          <Icon name="arrow" />
        </button>
      </div>
      <div className="demo-notice"><Icon name="info" /><span><strong>Entorno de demostración.</strong> Los datos y estados mostrados son ficticios. No existe integración real con INDECI o COEN.</span></div>
    </div>
  </main>;
}

type CitizenScreen = "home" | "safe" | "help" | "result" | "tracking";

function ConnectionNotice({ connected = false }: { connected?: boolean }) {
  return <div className={`connection-notice ${connected ? "connected" : ""}`}><span><Icon name={connected ? "signal" : "wifiOff"} /></span><div><strong>{connected ? "Conectividad simulada disponible" : "Sin conexión"}</strong><small>{connected ? "La transmisión se representa solo para fines de demostración." : "El reporte puede quedar guardado y pendiente de transmisión."}</small></div></div>;
}

function LocationPicker({ location, setLocation }: { location: "none" | "device" | "map"; setLocation: (v: "none" | "device" | "map") => void }) {
  return <section className="location-box">
    <div className="section-heading"><span className="icon-box"><Icon name="location" /></span><div><h3>Ubicación del reporte</h3><p>Opcional. Usa una ubicación ficticia para la demostración.</p></div></div>
    <div className="location-actions">
      <Button variant={location === "device" ? "primary" : "secondary"} icon="location" onClick={() => setLocation("device")}>Usar ubicación simulada</Button>
      <Button variant={location === "map" ? "primary" : "secondary"} icon="map" onClick={() => setLocation("map")}>Seleccionar en el mapa</Button>
    </div>
    <div className={`location-status ${location !== "none" ? "available" : ""}`}><Icon name={location === "none" ? "info" : "check"} /><span>{location === "device" ? "Ubicación ficticia disponible: -12.047, -77.043" : location === "map" ? "Punto ficticio seleccionado en el mapa" : "Ubicación no disponible"}</span></div>
  </section>;
}

function CitizenApp({
  onExit,
  initialScreen = "home",
  initialCategory = "",
  initialLocation = "none",
  initialResultType = "safe",
}: {
  onExit: () => void;
  initialScreen?: CitizenScreen;
  initialCategory?: string;
  initialLocation?: "none" | "device" | "map";
  initialResultType?: "safe" | "help";
}) {
  const [screen, setScreen] = useState<CitizenScreen>(initialScreen);
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState<"none" | "device" | "map">(initialLocation);
  const [resultType, setResultType] = useState<"safe" | "help">(initialResultType);
  const [trackingOrigin, setTrackingOrigin] = useState<"home" | "result">("home");

  useEffect(() => {
    setScreen(initialScreen);
    setCategory(initialCategory || (initialScreen === "help" ? "Atención médica" : ""));
    setLocation(initialLocation !== "none" ? initialLocation : (initialScreen === "safe" || initialScreen === "help" ? "device" : "none"));
    setResultType(initialResultType);
  }, [initialScreen, initialCategory, initialLocation, initialResultType]);

  const submit = (type: "safe" | "help") => { setResultType(type); setScreen("result"); };
  const restart = () => { setScreen("home"); setCategory(""); setLocation("none"); };

  return <div className="citizen-page">
    <div className="citizen-phone">
      <div className="mobile-status-bar" aria-hidden="true">
        <span className="mobile-status-time">10:48</span>
        <div className="mobile-status-speaker" />
        <div className="mobile-status-icons">
          <Icon name="signal" size={13} />
          <span className="mobile-status-battery" />
        </div>
      </div>
      <header className="citizen-header">
        <button className="brand-button" onClick={restart} aria-label="Ir al inicio"><Brand compact /></button>
        <button className="exit-button" onClick={onExit}>Salir</button>
      </header>
      <main className="citizen-content">
        {screen === "home" && <>
          <div className="citizen-intro"><span className="demo-label">DEMOSTRACIÓN</span><h1>Confirmación de estado</h1><p>Después del sismo, informa cómo te encuentras.</p></div>
          <div className="emergency-actions">
            <button type="button" className="emergency-btn safe" onClick={() => setScreen("safe")}>
              <span className="emergency-btn-icon"><Icon name="check" size={20} /></span>
              <span className="emergency-btn-text">
                <strong>ESTOY A SALVO</strong>
                <small>Confirmar que no necesitas ayuda</small>
              </span>
            </button>
            <button type="button" className="emergency-btn danger" onClick={() => setScreen("help")}>
              <span className="emergency-btn-icon"><Icon name="alert" size={20} /></span>
              <span className="emergency-btn-text">
                <strong>NECESITO AYUDA</strong>
                <small>Informar una necesidad urgente</small>
              </span>
            </button>
          </div>
          <ConnectionNotice />
          <Button variant="ghost" icon="reports" onClick={() => { setTrackingOrigin("home"); setScreen("tracking"); }}>Consultar mi reporte</Button>
        </>}

        {screen === "safe" && <>
          <div className="flow-heading safe"><span className="flow-icon"><Icon name="check" size={29} /></span><span className="eyebrow">Confirmar estado</span><h1>¿Confirmas que estás a salvo?</h1><p>Se registrará tu estado para facilitar el seguimiento de la emergencia.</p></div>
          <LocationPicker location={location} setLocation={setLocation} />
          <div className="flow-actions"><Button variant="safe" icon="check" onClick={() => submit("safe")}>Confirmar</Button><Button variant="ghost" onClick={() => setScreen("home")}>Volver</Button></div>
        </>}

        {screen === "help" && <>
          <div className="flow-heading danger"><span className="flow-icon"><Icon name="alert" size={29} /></span><span className="eyebrow">Solicitud de ayuda</span><h1>¿Qué tipo de ayuda necesitas?</h1><p>La selección es opcional. Puedes enviar el reporte sin especificarla.</p></div>
          <div className="choice-list">
            {["Atención médica", "Persona atrapada", "Otro tipo de ayuda", "Prefiero no especificarlo"].map((item) =>
              <button className={`choice ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)} key={item}><span className="radio">{category === item && <span />}</span>{item}</button>
            )}
          </div>
          <LocationPicker location={location} setLocation={setLocation} />
          <div className="flow-actions"><Button variant="danger" icon="alert" onClick={() => submit("help")}>Enviar solicitud</Button><Button variant="ghost" onClick={() => setScreen("home")}>Volver</Button></div>
        </>}

        {screen === "result" && <div className="result-screen">
          <div className={`result-symbol ${resultType}`}><Icon name={resultType === "safe" ? "check" : "alert"} size={38} /></div>
          <span className="demo-label">REPORTE DE DEMOSTRACIÓN</span>
          <h1>{resultType === "safe" ? "Tu estado fue guardado" : "Tu solicitud fue guardada"}</h1>
          <p>{resultType === "safe" ? "Registramos que te encuentras a salvo." : "El reporte quedó registrado en este prototipo."}</p>
          <div className="report-receipt">
            <div><span>Identificador</span><strong>REP-DEMO-0241</strong></div>
            <div><span>Fecha y hora</span><strong>17 jun 2025 · 10:48</strong></div>
            <div><span>Ubicación</span><strong>{location === "none" ? "No disponible" : location === "device" ? "-12.047, -77.043 (ficticia)" : "Punto seleccionado (ficticio)"}</strong></div>
            {resultType === "help" && <div><span>Tipo de ayuda</span><strong>{category || "No especificado"}</strong></div>}
          </div>
          <div className="transmission-state"><Icon name="clock" /><div><strong>Reporte guardado. Pendiente de transmisión</strong><small>Estado simulado del prototipo. No confirma recepción institucional.</small></div></div>
          <div className="flow-actions"><Button icon="reports" onClick={() => { setTrackingOrigin("result"); setScreen("tracking"); }}>Consultar reporte</Button><Button variant="secondary" onClick={restart}>Volver al inicio</Button></div>
        </div>}

        {screen === "tracking" && <>
          <div className="flow-heading"><span className="eyebrow">Seguimiento simulado</span><h1>Estado del reporte</h1><p>Identificador: <strong>REP-DEMO-0241</strong></p></div>
          <div className="timeline">
            <TimelineItem state="complete" title="Reporte creado" detail="Guardado localmente · 10:48" label="Completada" />
            <TimelineItem state="pending" title="Reporte transmitido" detail="En espera de conectividad" label="Pendiente" />
            <TimelineItem state="idle" title="Recibido por nodo comunitario" detail="Aún no existe confirmación" label="Sin confirmar" />
            <TimelineItem state="idle" title="Recibido por plataforma central" detail="Aún no existe confirmación" label="Sin confirmar" last />
          </div>
          <ConnectionNotice />
          <div className="flow-actions"><Button variant="secondary" onClick={() => setScreen(trackingOrigin)}>Volver</Button></div>
        </>}
      </main>
      <footer className="citizen-footer">Prototipo académico · No envía solicitudes reales</footer>
    </div>
  </div>;
}

function TimelineItem({ state, title, detail, label, last = false }: { state: "complete" | "pending" | "idle"; title: string; detail: string; label: string; last?: boolean }) {
  return <div className={`timeline-item ${state}`}><div className="timeline-rail"><span>{state === "complete" ? <Icon name="check" size={15} /> : state === "pending" ? <Icon name="clock" size={15} /> : ""}</span>{!last && <i />}</div><div><div className="timeline-title"><strong>{title}</strong><em>{label}</em></div><p>{detail}</p></div></div>;
}

type View = "summary" | "map" | "reports" | "nodes" | "history";

function OperatorLogin({ onEnter, onExit }: { onEnter: () => void; onExit: () => void }) {
  return <main className="login-page"><section className="login-card">
    <Brand />
    <div className="login-heading"><span className="eyebrow">Acceso operativo</span><h1>Panel de información COEN</h1><p>Acceso exclusivo al entorno simulado para personal de demostración.</p></div>
    <div className="fake-field"><span>Usuario</span><strong>Operador de demostración</strong></div>
    <div className="fake-field"><span>Contraseña</span><strong>••••••••••••</strong></div>
    <div className="demo-notice"><Icon name="info" /><span>Esta pantalla no representa una autenticación institucional real.</span></div>
    <Button icon="shield" onClick={onEnter}>Entrar en modo demostración</Button>
    <Button variant="ghost" onClick={onExit}>Volver a selección de acceso</Button>
  </section></main>;
}

const navItems: { id: View; label: string; icon: IconName }[] = [
  { id: "summary", label: "Resumen operativo", icon: "activity" },
  { id: "map", label: "Mapa georreferenciado", icon: "map" },
  { id: "reports", label: "Reportes", icon: "reports" },
  { id: "nodes", label: "Nodos y conectividad", icon: "network" },
  { id: "history", label: "Historial", icon: "history" },
];

function Dashboard({
  onExit,
  initialView = "summary",
  initialSelected = null,
  fullPanel = false,
}: {
  onExit: () => void;
  initialView?: View;
  initialSelected?: Report | null;
  fullPanel?: boolean;
}) {
  const [view, setView] = useState<View>(initialView);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [status, setStatus] = useState("Todos");
  const [transmission, setTransmission] = useState("Todos");
  const [node, setNode] = useState("Todos");
  const [validation, setValidation] = useState("Todos");
  const [selected, setSelected] = useState<Report | null>(initialSelected);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setView(initialView);
    setSelected(initialSelected);
  }, [initialView, initialSelected]);

  const filtered = useMemo(() => reports.filter((r) =>
    (status === "Todos" || r.state === status) &&
    (transmission === "Todos" || r.transmission === transmission) &&
    (node === "Todos" || r.node === node) &&
    (validation === "Todos" || r.validation === validation)
  ), [status, transmission, node, validation]);
  const clearFilters = () => { setStatus("Todos"); setTransmission("Todos"); setNode("Todos"); setValidation("Todos"); };
  const setCurrentView = (next: View) => { setView(next); setSidebarOpen(false); };
  const title = navItems.find((n) => n.id === view)?.label;

  return <div className={`dashboard ${fullPanel ? "full-panel-mode" : ""}`}>
    {sidebarOpen && <button className="sidebar-overlay" aria-label="Cerrar menú" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebar-brand"><Brand /></div>
      <nav>{navItems.map((item) => <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => setCurrentView(item.id)}><Icon name={item.icon} /><span>{item.label}</span></button>)}</nav>
      <div className="sidebar-user"><span className="avatar">OD</span><div><strong>Operador</strong><small>de demostración</small></div><button aria-label="Cerrar sesión" onClick={onExit}><Icon name="logout" /></button></div>
    </aside>
    <div className="dashboard-main">
      <header className="topbar">
        <div className="topbar-title"><button className="menu-button" onClick={() => setSidebarOpen(true)}><Icon name="menu" /></button><div><h1>{title}</h1><span>Panel operativo simulado</span></div></div>
        <div className="topbar-meta"><StatusPill tone="info">Entorno de demostración</StatusPill><span className="update-time"><Icon name="clock" /> Actualizado 10:48</span><span className="simulated-connection"><Icon name="signal" /> Conexión simulada</span><div style={{ position: "relative" }}><button className="operator-menu" onClick={() => setMenuOpen((o) => !o)}><span className="avatar">OD</span><Icon name="chevron" size={16} /></button>{menuOpen && <><div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setMenuOpen(false)} /><div className="operator-dropdown"><button onClick={() => { setMenuOpen(false); onExit(); }}><Icon name="logout" size={15} />Cerrar sesión</button></div></>}</div></div>
      </header>
      <main className="workspace">
        {view === "summary" && <SummaryView onNavigate={setCurrentView} setSelected={setSelected} />}
        {view === "map" && <MapView filtered={filtered} selected={selected} setSelected={setSelected} filters={{ status, transmission, node, validation }} setters={{ setStatus, setTransmission, setNode, setValidation }} clearFilters={clearFilters} />}
        {view === "reports" && <ReportsView filtered={filtered} selected={selected} setSelected={setSelected} status={status} setStatus={setStatus} />}
        {view === "nodes" && <NodesView />}
        {view === "history" && <HistoryView />}
      </main>
    </div>
  </div>;
}

function MetricCard({ label, value, icon, tone, note }: { label: string; value: number; icon: IconName; tone: string; note: string }) {
  return <article className={`metric-card metric-${tone}`}><div className="metric-top"><span>{label}</span><i><Icon name={icon} /></i></div><strong className="tabular-nums">{value}</strong><small>{note}</small></article>;
}

function SummaryView({ onNavigate, setSelected }: { onNavigate: (v: View) => void; setSelected: (r: Report) => void }) {
  const safe = reports.filter((r) => r.state === "A salvo").length;
  const help = reports.filter((r) => r.state === "Necesita ayuda").length;
  const pending = reports.filter((r) => r.transmission === "Pendiente").length;
  return <>
    <div className="workspace-intro"><div><span className="eyebrow">17 DE JUNIO DE 2025</span><h2>Situación general</h2><p>Consolidado de datos ficticios del evento sísmico de demostración.</p></div><StatusPill tone="neutral"><Icon name="database" size={14} /> Datos simulados</StatusPill></div>
    <section className="metrics">
      <MetricCard label="Reportes recibidos" value={reports.length} icon="reports" tone="info" note="Registros del prototipo" />
      <MetricCard label="Estoy a salvo" value={safe} icon="check" tone="safe" note="Estado declarado" />
      <MetricCard label="Necesito ayuda" value={help} icon="alert" tone="danger" note="Requieren revisión" />
      <MetricCard label="Pendientes de transmisión" value={pending} icon="clock" tone="pending" note="Sin confirmación central" />
    </section>
    <div className="summary-grid">
      <section className="panel map-preview-panel"><PanelHeading title="Distribución georreferenciada" subtitle="Marcadores con coordenadas ficticias" action={<Button variant="ghost" onClick={() => onNavigate("map")}>Abrir mapa <Icon name="arrow" /></Button>} /><MapCanvas reports={reports.filter((r) => r.coords)} selected={null} onSelect={(r) => { setSelected(r); onNavigate("map"); }} compact /></section>
      <section className="panel recent-panel"><PanelHeading title="Reportes recientes" subtitle="Últimos registros recibidos" action={<Button variant="ghost" onClick={() => onNavigate("reports")}>Ver todos</Button>} /><div className="recent-list">{reports.slice(0, 5).map((r) => <button key={r.id} onClick={() => { setSelected(r); onNavigate("reports"); }}><span className={`state-icon ${r.state === "A salvo" ? "safe" : "danger"}`}><Icon name={r.state === "A salvo" ? "check" : "alert"} /></span><span><strong>{r.id}</strong><small>{r.location}</small></span><span className="recent-time">{r.shortDate}</span></button>)}</div></section>
    </div>
  </>;
}

function PanelHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="panel-heading"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</div>;
}

function MapCanvas({ reports: shownReports, selected, onSelect, compact = false }: { reports: Report[]; selected: Report | null; onSelect: (r: Report) => void; compact?: boolean }) {
  const [zoom, setZoom] = useState(1);
  return <div className={`map-canvas ${compact ? "compact" : ""}`}>
    <div className="map-inner" style={{ transform: `scale(${zoom})`, transformOrigin: "center center", transition: "transform .2s" }}>
      <div className="map-grid" />
      <svg className="map-roads" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path className="water" d="M0 0h145c35 70 10 135 54 201 50 75 19 151 63 220 34 53 20 121 56 179H0Z" />
        <path className="district" d="M260 56 434 32l98 104-50 118-202-18Z" /><path className="district" d="m532 136 198-60 126 109-82 143-292-74Z" /><path className="district" d="m280 236 202 18 64 145-116 142-168-120Z" /><path className="district" d="m482 254 292 74 112 173-340-102Z" />
        <path className="main-road" d="M166 530C311 413 408 354 521 288S736 169 970 124" /><path className="main-road" d="M240 77c127 98 236 175 356 289s185 153 338 207" /><path className="road" d="M196 332c206-31 414 12 719 12M357 22c32 150 63 331 47 555M695 35c-18 144-39 294-21 519M242 185c205 49 444 44 678 0" />
      </svg>
      <span className="map-label label-lima">CERCADO<br />DE LIMA</span><span className="map-label label-brena">BREÑA</span><span className="map-label label-victoria">LA VICTORIA</span><span className="map-label label-miguel">SAN MIGUEL</span><span className="map-label label-borja">SAN BORJA</span>
      {shownReports.map((r) => <button key={r.id} aria-label={`${r.id}, ${r.state}`} className={`map-marker ${r.state === "A salvo" ? "safe" : "danger"} ${selected?.id === r.id ? "selected" : ""}`} style={{ left: `${r.x}%`, top: `${r.y}%` }} onClick={() => onSelect(r)}><Icon name={r.state === "A salvo" ? "check" : "alert"} size={compact ? 13 : 15} /></button>)}
      {!compact && <><button className="node-marker n1" aria-label="Nodo comunitario NOD-LIM-01"><Icon name="network" size={15} /></button><button className="node-marker n2" aria-label="Nodo comunitario NOD-LIM-02"><Icon name="network" size={15} /></button></>}
    </div>
    {!compact && <><div className="zoom-controls"><button aria-label="Acercar" onClick={() => setZoom((z) => Math.min(+(z + 0.35).toFixed(2), 2.5))}>+</button><button aria-label="Alejar" onClick={() => setZoom((z) => Math.max(+(z - 0.35).toFixed(2), 1))}>−</button></div><div className="map-simulation-label"><Icon name="info" size={14} /> Mapa simulado · coordenadas ficticias</div></>}
  </div>;
}

type FilterProps = {
  filters: { status: string; transmission: string; node: string; validation: string };
  setters: { setStatus: (v: string) => void; setTransmission: (v: string) => void; setNode: (v: string) => void; setValidation: (v: string) => void };
  clearFilters: () => void;
};

function MapFilters({ filters, setters, clearFilters }: FilterProps) {
  return <section className="filterbar">
    <div className="filterbar-label"><Icon name="sliders" /><span>Filtros</span></div>
    <Select label="Estado declarado" value={filters.status} onChange={setters.setStatus}><option>Todos</option><option>A salvo</option><option>Necesita ayuda</option></Select>
    <Select label="Transmisión" value={filters.transmission} onChange={setters.setTransmission}><option>Todos</option><option>Pendiente</option><option>Recibido por el nodo</option><option>Recibido por el receptor</option><option>Plataforma central</option></Select>
    <Select label="Nodo de origen" value={filters.node} onChange={setters.setNode}><option>Todos</option>{nodes.map((n) => <option key={n.id}>{n.id}</option>)}</Select>
    <Select label="Validación" value={filters.validation} onChange={setters.setValidation}><option>Todos</option><option>Sin verificar</option><option>En revisión</option><option>Verificado</option></Select>
    <Button variant="ghost" icon="close" onClick={clearFilters}>Limpiar</Button>
  </section>;
}

function MapView({ filtered, selected, setSelected, filters, setters, clearFilters }: { filtered: Report[]; selected: Report | null; setSelected: (r: Report | null) => void } & FilterProps) {
  const geoReports = filtered.filter((r) => r.coords);
  return <>
    <div className="workspace-intro"><div><span className="eyebrow">VISTA OPERATIVA PRINCIPAL</span><h2>Mapa de reportes</h2><p>Distribución espacial de reportes con ubicación ficticia disponible.</p></div><div className="map-count"><strong>{geoReports.length}</strong><span>marcadores visibles</span></div></div>
    <MapFilters filters={filters} setters={setters} clearFilters={clearFilters} />
    <div className="map-layout">
      <section className="panel map-main-panel">
        <div className="map-legend"><span><i className="safe" /> A salvo</span><span><i className="danger" /> Necesita ayuda</span><span><i className="pending" /> Pendiente</span><span><i className="node" /> Nodo comunitario</span></div>
        <MapCanvas reports={geoReports} selected={selected} onSelect={setSelected} />
      </section>
      <aside className="panel map-detail">{selected ? <ReportDetail report={selected} onClose={() => setSelected(null)} /> : <div className="empty-detail"><Icon name="location" size={30} /><h3>Selecciona un marcador</h3><p>Consulta aquí los datos del reporte.</p></div>}</aside>
    </div>
    <section className="panel map-list"><PanelHeading title="Reportes asociados" subtitle={`${filtered.length} registros coinciden con los filtros`} /><ReportRows reports={filtered.slice(0, 4)} selected={selected} onSelect={setSelected} /></section>
  </>;
}

function stateTone(report: Report) { return report.state === "A salvo" ? "safe" : "danger"; }
function transmissionTone(value: Transmission): "safe" | "pending" | "info" | "neutral" { return value === "Pendiente" ? "pending" : value === "Plataforma central" ? "safe" : "info"; }
function validationTone(value: Report["validation"]): "safe" | "pending" | "neutral" { return value === "Verificado" ? "safe" : value === "En revisión" ? "pending" : "neutral"; }

function ReportDetail({ report, onClose }: { report: Report; onClose?: () => void }) {
  return <div className="detail-content">
    <div className="detail-head"><div><span className="eyebrow">Detalle del reporte</span><h3>{report.id}</h3></div>{onClose && <button onClick={onClose} aria-label="Cerrar detalle"><Icon name="close" /></button>}</div>
    <StatusPill tone={stateTone(report)}>{report.state}</StatusPill>
    <dl><div><dt>Fecha y hora</dt><dd>{report.date}</dd></div><div><dt>Fuente</dt><dd>{report.source}</dd></div><div><dt>Transmisión</dt><dd><StatusPill tone={transmissionTone(report.transmission)}>{report.transmission}</StatusPill></dd></div>{report.category && <div><dt>Categoría de ayuda</dt><dd>{report.category}</dd></div>}<div><dt>Ubicación</dt><dd>{report.location}<small>{report.coords ? `${report.coords[0]}, ${report.coords[1]}` : "Sin coordenadas"}</small></dd></div><div><dt>Tipo de ubicación</dt><dd>{report.locationType}</dd></div><div><dt>Nodo de origen</dt><dd>{report.node}</dd></div><div><dt>Validación</dt><dd><StatusPill tone={validationTone(report.validation)}>{report.validation}</StatusPill></dd></div></dl>
    <div className="detail-note"><Icon name="info" /><span>Información ficticia para demostración. No contiene datos personales.</span></div>
  </div>;
}

function ReportRows({ reports: rows, selected, onSelect }: { reports: Report[]; selected: Report | null; onSelect: (r: Report) => void }) {
  return <div className="report-table-wrap"><table className="report-table"><thead><tr><th>ID</th><th>Fecha y hora</th><th>Estado declarado</th><th>Ubicación</th><th>Fuente</th><th>Transmisión</th><th>Validación</th><th /></tr></thead><tbody>{rows.map((r) => <tr key={r.id} className={selected?.id === r.id ? "selected" : ""} onClick={() => onSelect(r)}><td><strong>{r.id}</strong></td><td className="tabular-nums">{r.date.replace("17 jun 2025 · ", "")}</td><td><StatusPill tone={stateTone(r)}>{r.state}</StatusPill></td><td><span className="location-cell"><Icon name="location" size={15} />{r.location}</span></td><td>{r.source}</td><td><StatusPill tone={transmissionTone(r.transmission)}>{r.transmission}</StatusPill></td><td><StatusPill tone={validationTone(r.validation)}>{r.validation}</StatusPill></td><td><button aria-label={`Ver ${r.id}`} onClick={(e) => { e.stopPropagation(); onSelect(r); }}><Icon name="chevron" size={17} /></button></td></tr>)}</tbody></table></div>;
}

function ReportsView({ filtered, selected, setSelected, status, setStatus }: { filtered: Report[]; selected: Report | null; setSelected: (r: Report | null) => void; status: string; setStatus: (v: string) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Más recientes");
  const matched = filtered.filter((r) => r.id.toLowerCase().includes(query.toLowerCase()));
  const shown = sort === "Más recientes" ? matched : [...matched].reverse();
  return <>
    <div className="workspace-intro"><div><span className="eyebrow">REGISTRO CONSOLIDADO</span><h2>Reportes ciudadanos</h2><p>Distingue el estado declarado, la transmisión y la validación operativa.</p></div><StatusPill tone="neutral">{reports.length} registros ficticios</StatusPill></div>
    <section className="panel reports-panel">
      <div className="table-toolbar"><label className="search-field"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por ID" /><span>Buscar</span></label><Select label="Estado declarado" value={status} onChange={setStatus}><option>Todos</option><option>A salvo</option><option>Necesita ayuda</option></Select><Select label="Ordenar" value={sort} onChange={setSort}><option>Más recientes</option><option>Más antiguos</option></Select></div>
      <ReportRows reports={shown} selected={selected} onSelect={setSelected} />
      <div className="table-footer"><span>Mostrando {shown.length} de {reports.length} registros</span><div><Button variant="secondary" disabled>Anterior</Button><span className="page-number">1</span><Button variant="secondary" disabled>Siguiente</Button></div></div>
    </section>
    {selected && <div className="detail-drawer"><button className="drawer-overlay" onClick={() => setSelected(null)} aria-label="Cerrar detalle" /><aside><ReportDetail report={selected} onClose={() => setSelected(null)} /></aside></div>}
  </>;
}

function NodesView() {
  const [expandedId, setExpandedId] = useState<string | null>("NOD-LIM-01");
  const nodeDetails: Record<string, { log: string[]; quality: number }> = {
    "NOD-LIM-01": { log: ["10:32 — 3 reportes recibidos", "10:15 — Sincronización correcta", "09:58 — Reconexión exitosa"], quality: 87 },
    "NOD-LIM-02": { log: ["10:38 — 4 reportes recibidos", "10:22 — Sincronización correcta", "10:05 — Sin incidencias"], quality: 94 },
    "NOD-LIM-03": { log: ["10:26 — 1 reporte recibido", "09:47 — Último contacto registrado", "09:20 — Degradación de señal detectada"], quality: 41 },
    "NOD-LIM-04": { log: ["10:12 — Último registro disponible", "09:33 — Sin respuesta al sondeo", "08:54 — Tiempo de espera agotado"], quality: 0 },
  };
  return <>
    <div className="workspace-intro"><div><span className="eyebrow">INFRAESTRUCTURA SIMULADA</span><h2>Nodos y conectividad</h2><p>Estado referencial de nodos comunitarios ficticios.</p></div><StatusPill tone="info"><Icon name="signal" size={14} /> Estado simulado</StatusPill></div>
    <section className="node-summary"><div><span className="node-summary-icon online"><Icon name="network" /></span><span><strong>2</strong><small>En línea</small></span></div><div><span className="node-summary-icon warning"><Icon name="clock" /></span><span><strong>1</strong><small>Sin comunicación reciente</small></span></div><div><span className="node-summary-icon unknown"><Icon name="help" /></span><span><strong>1</strong><small>Desconocido</small></span></div></section>
    <section className="panel nodes-panel"><PanelHeading title="Nodos comunitarios" subtitle="Los datos no representan telemetría real" /><div className="node-list">{nodes.map((node) => {
      const isExpanded = expandedId === node.id;
      const detail = nodeDetails[node.id];
      return <div key={node.id}>
        <div className={`node-row ${isExpanded ? "expanded" : ""}`}><span className="node-graphic"><Icon name="network" /></span><div className="node-identity"><strong>{node.id}</strong><small><Icon name="location" size={13} />{node.place}</small></div><div><span>Última comunicación</span><strong>{node.last}</strong></div><div><span>Estado de conexión</span><StatusPill tone={node.status === "En línea" ? "safe" : node.status === "Sin comunicación reciente" ? "pending" : "neutral"}>{node.status}</StatusPill></div><div><span>Reportes recibidos</span><strong>{node.received}</strong></div><div><span>Reportes pendientes</span><strong className={node.pending ? "pending-text" : ""}>{node.pending}</strong></div><button aria-label={isExpanded ? `Cerrar ${node.id}` : `Ver ${node.id}`} onClick={() => setExpandedId(isExpanded ? null : node.id)} style={{ transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform .2s" }}><Icon name="chevron" /></button></div>
        {isExpanded && <div className="node-expand"><div className="node-expand-quality"><span>Calidad de señal simulada</span><div className="quality-bar"><div className="quality-fill" style={{ width: `${detail.quality}%`, background: detail.quality > 70 ? "var(--safe)" : detail.quality > 30 ? "var(--pending)" : "var(--danger)" }} /></div><strong style={{ color: detail.quality > 70 ? "var(--safe)" : detail.quality > 30 ? "var(--pending)" : "var(--danger)" }}>{detail.quality}%</strong></div><div className="node-expand-log"><span className="node-expand-log-title"><Icon name="history" size={13} />Registro de actividad simulada</span>{detail.log.map((entry, i) => <div key={i} className="node-log-entry"><Icon name="clock" size={12} /><span>{entry}</span></div>)}</div><p className="node-expand-note"><Icon name="info" size={12} />Datos ficticios · No representan telemetría real</p></div>}
      </div>;
    })}</div></section>
  </>;
}

const historyEvents = [
  { time: "10:46", id: "REP-240617-0182", title: "Cambio de validación", text: "El reporte pasó de “Sin verificar” a “En revisión”.", icon: "shield" as IconName, tone: "info" },
  { time: "10:44", id: "REP-240617-0182", title: "Registrado en la plataforma central", text: "Registro incorporado al consolidado de demostración.", icon: "database" as IconName, tone: "safe" },
  { time: "10:43", id: "REP-240617-0182", title: "Recibido por el receptor", text: "Transmisión simulada desde NOD-LIM-04.", icon: "signal" as IconName, tone: "info" },
  { time: "10:42", id: "REP-240617-0182", title: "Reporte recibido por un nodo", text: "Recepción simulada por el nodo comunitario.", icon: "network" as IconName, tone: "info" },
  { time: "10:42", id: "REP-240617-0182", title: "Reporte creado", text: "Estado declarado: Necesita ayuda.", icon: "reports" as IconName, tone: "danger" },
  { time: "10:39", id: "REP-240617-0181", title: "Reporte revisado por un operador", text: "Marcado como verificado en el entorno de demostración.", icon: "person" as IconName, tone: "safe" },
];

function HistoryView() {
  return <>
    <div className="workspace-intro"><div><span className="eyebrow">TRAZABILIDAD DEL PROTOTIPO</span><h2>Historial de eventos</h2><p>Secuencia cronológica de cambios y transmisiones simuladas.</p></div><label className="date-filter"><Icon name="calendar" /><span>17 jun 2025</span></label></div>
    <section className="panel history-panel"><PanelHeading title="Actividad reciente" subtitle="Hoy · zona horaria de Lima (UTC−5)" /><div className="event-list">{historyEvents.map((event, index) => <div className="event" key={`${event.time}-${index}`}><div className="event-time">{event.time}<small>17 JUN</small></div><div className="event-rail"><span className={event.tone}><Icon name={event.icon} size={17} /></span>{index !== historyEvents.length - 1 && <i />}</div><div className="event-body"><div><strong>{event.title}</strong><StatusPill tone="neutral">{event.id}</StatusPill></div><p>{event.text}</p></div></div>)}</div></section>
  </>;
}

/* =========================================================================
   SISTEMA DE ASISTENCIA Y CAPTURA DE PANTALLAS (SCREENSHOT SUITE)
   ========================================================================= */

type ScreenKey =
  | "gateway"
  | "citizen-home"
  | "citizen-safe"
  | "citizen-help"
  | "citizen-result"
  | "citizen-tracking"
  | "operator-login"
  | "dashboard-summary"
  | "dashboard-map"
  | "dashboard-map-detail"
  | "dashboard-reports"
  | "dashboard-nodes"
  | "dashboard-history";

interface ScreenCatalogItem {
  key: ScreenKey;
  group: "Portal de Selección" | "Móvil Ciudadano (360-430 px)" | "Escritorio Dashboard COEN (1440 px)";
  name: string;
  filename: string;
  isDashboard?: boolean;
}

const screenCatalog: ScreenCatalogItem[] = [
  { key: "gateway", group: "Portal de Selección", name: "Portal de Acceso", filename: "01_portal_acceso" },
  { key: "citizen-home", group: "Móvil Ciudadano (360-430 px)", name: "1. Inicio Emergencia", filename: "02_movil_ciudadano_inicio" },
  { key: "citizen-safe", group: "Móvil Ciudadano (360-430 px)", name: "2. Confirmar 'Estoy a salvo'", filename: "03_movil_ciudadano_a_salvo" },
  { key: "citizen-help", group: "Móvil Ciudadano (360-430 px)", name: "3. Solicitud de Ayuda", filename: "04_movil_ciudadano_solicitud_ayuda" },
  { key: "citizen-result", group: "Móvil Ciudadano (360-430 px)", name: "4. Comprobante de Reporte", filename: "05_movil_ciudadano_comprobante" },
  { key: "citizen-tracking", group: "Móvil Ciudadano (360-430 px)", name: "5. Trazabilidad / Seguimiento", filename: "06_movil_ciudadano_seguimiento" },
  { key: "operator-login", group: "Escritorio Dashboard COEN (1440 px)", name: "6. Login Operador COEN", filename: "07_escritorio_operador_login" },
  { key: "dashboard-summary", group: "Escritorio Dashboard COEN (1440 px)", name: "7. Dashboard: Resumen General", filename: "08_escritorio_dashboard_resumen", isDashboard: true },
  { key: "dashboard-map", group: "Escritorio Dashboard COEN (1440 px)", name: "8. Dashboard: Mapa Georreferenciado", filename: "09_escritorio_dashboard_mapa", isDashboard: true },
  { key: "dashboard-map-detail", group: "Escritorio Dashboard COEN (1440 px)", name: "9. Dashboard: Mapa con Detalle", filename: "10_escritorio_dashboard_mapa_detalle", isDashboard: true },
  { key: "dashboard-reports", group: "Escritorio Dashboard COEN (1440 px)", name: "10. Dashboard: Reportes Consolidados", filename: "11_escritorio_dashboard_reportes", isDashboard: true },
  { key: "dashboard-nodes", group: "Escritorio Dashboard COEN (1440 px)", name: "11. Dashboard: Nodos y Conectividad", filename: "12_escritorio_dashboard_nodos", isDashboard: true },
  { key: "dashboard-history", group: "Escritorio Dashboard COEN (1440 px)", name: "12. Dashboard: Historial de Eventos", filename: "13_escritorio_dashboard_historial", isDashboard: true },
];

export default function App() {
  const [screenKey, setScreenKey] = useState<ScreenKey>("gateway");
  const [toolbarHidden, setToolbarHidden] = useState(false);
  const [fullPanel, setFullPanel] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Escuchar atajo de teclado: presionar 'C' oculta o muestra el asistente para capturas manuales sin elementos superpuestos
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "SELECT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }
      if (e.key === "c" || e.key === "C") {
        setToolbarHidden((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentIndex = screenCatalog.findIndex((s) => s.key === screenKey);
  const currentItem = screenCatalog[currentIndex] || screenCatalog[0];

  const goNext = () => {
    if (currentIndex < screenCatalog.length - 1) {
      setScreenKey(screenCatalog[currentIndex + 1].key);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setScreenKey(screenCatalog[currentIndex - 1].key);
    }
  };

  // Descarga automática en PNG en 2x Retina sin barra superpuesta
  const handleDownloadPng = async () => {
    const target = document.getElementById("capture-root");
    if (!target) return;
    setIsCapturing(true);
    setDownloadSuccess(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const dataUrl = await toPng(target, {
        pixelRatio: 2,
        cacheBust: true,
        filter: (node: HTMLElement) => {
          return !node?.classList?.contains("capture-toolbar") && !node?.classList?.contains("capture-floating-trigger");
        },
      });

      const link = document.createElement("a");
      link.download = `prevenidos_${currentItem.filename}.png`;
      link.href = dataUrl;
      link.click();
      setDownloadSuccess(`Guardado: prevenidos_${currentItem.filename}.png`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error("Error al generar captura:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div id="capture-root" className={`capture-app-root ${fullPanel ? "full-panel-mode" : ""}`} style={{ position: "relative", minHeight: "100vh" }}>
      {/* 1. Portal Gateway */}
      {screenKey === "gateway" && (
        <Gateway onCitizen={() => setScreenKey("citizen-home")} onOperator={() => setScreenKey("operator-login")} />
      )}

      {/* 2-6. Acceso Ciudadano Móvil (360-430 px) */}
      {screenKey === "citizen-home" && (
        <CitizenApp onExit={() => setScreenKey("gateway")} initialScreen="home" />
      )}
      {screenKey === "citizen-safe" && (
        <CitizenApp onExit={() => setScreenKey("gateway")} initialScreen="safe" initialLocation="device" />
      )}
      {screenKey === "citizen-help" && (
        <CitizenApp onExit={() => setScreenKey("gateway")} initialScreen="help" initialCategory="Atención médica" initialLocation="device" initialResultType="help" />
      )}
      {screenKey === "citizen-result" && (
        <CitizenApp onExit={() => setScreenKey("gateway")} initialScreen="result" initialCategory="Atención médica" initialLocation="device" initialResultType="safe" />
      )}
      {screenKey === "citizen-tracking" && (
        <CitizenApp onExit={() => setScreenKey("gateway")} initialScreen="tracking" initialLocation="device" />
      )}

      {/* 7. Login Operador COEN */}
      {screenKey === "operator-login" && (
        <OperatorLogin onEnter={() => setScreenKey("dashboard-summary")} onExit={() => setScreenKey("gateway")} />
      )}

      {/* 8-13. Dashboard Operativo COEN (Escritorio 1440 px) */}
      {screenKey === "dashboard-summary" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="summary" fullPanel={fullPanel} />
      )}
      {screenKey === "dashboard-map" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="map" fullPanel={fullPanel} />
      )}
      {screenKey === "dashboard-map-detail" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="map" initialSelected={reports[0]} fullPanel={fullPanel} />
      )}
      {screenKey === "dashboard-reports" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="reports" fullPanel={fullPanel} />
      )}
      {screenKey === "dashboard-nodes" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="nodes" fullPanel={fullPanel} />
      )}
      {screenKey === "dashboard-history" && (
        <Dashboard onExit={() => setScreenKey("gateway")} initialView="history" fullPanel={fullPanel} />
      )}

      {/* Barra de Asistencia para Capturas */}
      {!toolbarHidden && (
        <aside className="capture-toolbar" aria-label="Asistente de capturas de pantalla">
          <div className="capture-badge">
            <Icon name="camera" size={16} />
            <span>Capturas ({currentIndex + 1}/13)</span>
          </div>

          <div className="capture-nav-group">
            <button className="capture-nav-btn" onClick={goPrev} disabled={currentIndex === 0} aria-label="Pantalla anterior" title="Pantalla anterior">
              <Icon name="chevronLeft" size={16} />
            </button>

            <select className="capture-select" value={screenKey} onChange={(e) => setScreenKey(e.target.value as ScreenKey)}>
              <optgroup label="Portal de Selección">
                <option value="gateway">01. Portal de Acceso</option>
              </optgroup>
              <optgroup label="📱 Móvil Ciudadano (360-430 px)">
                <option value="citizen-home">02. 1. Inicio Emergencia</option>
                <option value="citizen-safe">03. 2. Confirmar 'Estoy a salvo'</option>
                <option value="citizen-help">04. 3. Solicitud de Ayuda</option>
                <option value="citizen-result">05. 4. Comprobante de Reporte</option>
                <option value="citizen-tracking">06. 5. Trazabilidad / Seguimiento</option>
              </optgroup>
              <optgroup label="💻 Escritorio Dashboard COEN (1440 px)">
                <option value="operator-login">07. 6. Login Operador COEN</option>
                <option value="dashboard-summary">08. 7. Resumen Operativo</option>
                <option value="dashboard-map">09. 8. Mapa Georreferenciado</option>
                <option value="dashboard-map-detail">10. 9. Mapa con Detalle Abierto</option>
                <option value="dashboard-reports">11. 10. Reportes Consolidados</option>
                <option value="dashboard-nodes">12. 11. Nodos y Conectividad</option>
                <option value="dashboard-history">13. 12. Historial de Eventos</option>
              </optgroup>
            </select>

            <button className="capture-nav-btn" onClick={goNext} disabled={currentIndex === screenCatalog.length - 1} aria-label="Siguiente pantalla" title="Siguiente pantalla">
              <Icon name="chevronRight" size={16} />
            </button>
          </div>

          <div className="capture-actions">
            {currentItem.isDashboard && (
              <button
                className={`capture-action-btn ${fullPanel ? "active" : "secondary"}`}
                onClick={() => setFullPanel((p) => !p)}
                title="Muestra el panel y mapa en altura expandida sin cortes"
              >
                <Icon name="expand" size={14} />
                <span>{fullPanel ? "Panel Expandido ✓" : "Mostrar Panel Completo"}</span>
              </button>
            )}

            <button className="capture-action-btn primary" onClick={handleDownloadPng} disabled={isCapturing} title="Descarga imagen PNG nítida a resolución 2x Retina">
              <Icon name="download" size={15} />
              <span>{isCapturing ? "Capturando..." : "Descargar PNG (2x)"}</span>
            </button>

            <button className="capture-action-btn secondary" onClick={() => setToolbarHidden(true)} title="Oculta esta barra para tomar capturas manuales con tu herramienta del sistema (tecla 'C' para restaurar)">
              <Icon name="eyeOff" size={15} />
              <span>Ocultar (C)</span>
            </button>
          </div>
        </aside>
      )}

      {/* Botón flotante discreto cuando la barra está oculta */}
      {toolbarHidden && (
        <button
          className="capture-floating-trigger"
          onClick={() => setToolbarHidden(false)}
          title="Mostrar asistente de capturas (también puedes presionar la tecla 'C')"
        >
          <Icon name="camera" size={16} />
          <span>Asistente de Capturas (C)</span>
        </button>
      )}

      {/* Feedback toast de descarga exitosa */}
      {downloadSuccess && (
        <div style={{ position: "fixed", top: 18, right: 18, zIndex: 10000, background: "var(--safe)", color: "white", padding: "10px 16px", borderRadius: 8, boxShadow: "0 6px 20px rgba(0,0,0,0.18)", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="check" size={16} />
          <span>{downloadSuccess}</span>
        </div>
      )}
    </div>
  );
}
