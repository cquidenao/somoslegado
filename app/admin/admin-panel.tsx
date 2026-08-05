"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Solicitud = {
  id: number;
  created_at: string;
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  servicio: string | null;
  mensaje: string | null;
  estado: string | null;
};

const ESTADOS = ["nueva", "contactada", "en proceso", "finalizada", "descartada"];
const ADMIN_EMAILS = ["c.a.p.quidenao@gmail.com", "andres@olaveechenique.cl"];

const estadoLabel = (estado: string | null) => {
  const value = estado || "nueva";
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function AdminPanel() {
  const supabase = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rows, setRows] = useState<Solicitud[]>([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [query, setQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [tab, setTab] = useState<"resumen" | "solicitudes">("resumen");

  const loadRows = useCallback(async () => {
    setLoadingRows(true);
    const { data } = await supabase
      .from("solicitudes")
      .select("id, created_at, nombre, email, telefono, servicio, mensaje, estado")
      .order("created_at", { ascending: false });
    setRows((data as Solicitud[] | null) ?? []);
    setLoadingRows(false);
  }, [supabase]);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const currentEmail = data.user?.email?.toLowerCase() ?? null;
      setUserEmail(currentEmail && ADMIN_EMAILS.includes(currentEmail) ? currentEmail : null);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentEmail = session?.user.email?.toLowerCase() ?? null;
      setUserEmail(currentEmail && ADMIN_EMAILS.includes(currentEmail) ? currentEmail : null);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (userEmail) loadRows();
  }, [userEmail, loadRows]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    if (!ADMIN_EMAILS.includes(email.trim().toLowerCase())) {
      setLoginError("Este correo no tiene acceso al panel de administración.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setLoginError("Correo o contraseña incorrectos.");
  }

  async function logout() {
    await supabase.auth.signOut();
    setRows([]);
  }

  async function updateStatus(id: number, estado: string) {
    const previous = rows;
    setRows(rows.map((row) => (row.id === id ? { ...row, estado } : row)));
    const { error } = await supabase.from("solicitudes").update({ estado }).eq("id", id);
    if (error) setRows(previous);
  }

  const services = useMemo(() => Array.from(new Set(rows.map((row) => row.servicio).filter(Boolean) as string[])), [rows]);
  const filtered = useMemo(() => rows.filter((row) => {
    const haystack = `${row.nombre ?? ""} ${row.email ?? ""} ${row.telefono ?? ""} ${row.servicio ?? ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) &&
      (serviceFilter === "todos" || row.servicio === serviceFilter) &&
      (statusFilter === "todos" || (row.estado || "nueva") === statusFilter);
  }), [rows, query, serviceFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = rows.length;
    const nuevas = rows.filter((r) => (r.estado || "nueva") === "nueva").length;
    const proceso = rows.filter((r) => ["contactada", "en proceso"].includes(r.estado || "nueva")).length;
    const finalizadas = rows.filter((r) => r.estado === "finalizada").length;
    const serviceCounts = services.map((service) => ({ service, count: rows.filter((r) => r.servicio === service).length })).sort((a, b) => b.count - a.count);
    return { total, nuevas, proceso, finalizadas, serviceCounts };
  }, [rows, services]);

  if (checking) return <main className="admin-loading">Cargando panel…</main>;

  if (!userEmail) {
    return (
      <main className="admin-login-shell">
        <section className="admin-login-card">
          <a href="/" className="admin-brand"><span>❀</span><strong>SomosLegado</strong></a>
          <p className="eyebrow">Administración</p>
          <h1>Acceso al panel</h1>
          <p>Ingresa con tu cuenta autorizada para revisar las solicitudes.</p>
          <form onSubmit={login} className="admin-login-form">
            <label>Correo electrónico<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
            <label>Contraseña<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
            <button type="submit">Ingresar</button>
            {loginError && <p className="admin-error" role="alert">{loginError}</p>}
          </form>
          <a href="/" className="admin-back">← Volver al sitio</a>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand"><span>❀</span><strong>SomosLegado</strong></a>
        <p className="admin-kicker">Administración</p>
        <nav className="admin-nav">
          <button className={tab === "resumen" ? "active" : ""} onClick={() => setTab("resumen")}>Resumen</button>
          <button className={tab === "solicitudes" ? "active" : ""} onClick={() => setTab("solicitudes")}>Solicitudes <span>{stats.nuevas}</span></button>
        </nav>
        <div className="admin-account"><small>Sesión iniciada</small><strong>{userEmail}</strong><button onClick={logout}>Cerrar sesión</button></div>
      </aside>

      <section className="admin-content">
        <header className="admin-topbar"><div><p className="eyebrow">SomosLegado</p><h1>{tab === "resumen" ? "Resumen de solicitudes" : "Solicitudes registradas"}</h1></div><button className="admin-refresh" onClick={loadRows}>↻ Actualizar</button></header>

        {tab === "resumen" ? <>
          <div className="admin-stat-grid">
            <article><small>Total solicitudes</small><strong>{stats.total}</strong><span>Desde el formulario web</span></article>
            <article className="rose"><small>Nuevas pendientes</small><strong>{stats.nuevas}</strong><span>Requieren primer contacto</span></article>
            <article className="sage"><small>En seguimiento</small><strong>{stats.proceso}</strong><span>Contactadas o en proceso</span></article>
            <article className="gold"><small>Finalizadas</small><strong>{stats.finalizadas}</strong><span>Casos cerrados</span></article>
          </div>
          <div className="admin-analytics-grid">
            <article className="admin-panel-card"><div className="panel-title"><h2>Solicitudes por servicio</h2><span>{stats.total} total</span></div>{stats.serviceCounts.length ? <div className="service-bars">{stats.serviceCounts.map((item) => <div key={item.service}><div><span>{item.service}</span><strong>{item.count}</strong></div><i><b style={{ width: `${stats.total ? Math.max(6, item.count / stats.total * 100) : 0}%` }} /></i></div>)}</div> : <EmptyState />}</article>
            <article className="admin-panel-card"><div className="panel-title"><h2>Estado de gestión</h2></div><div className="status-summary">{ESTADOS.map((estado) => { const count = rows.filter((r) => (r.estado || "nueva") === estado).length; return <div key={estado}><span className={`status-dot ${estado.replace(" ", "-")}`} /><span>{estadoLabel(estado)}</span><strong>{count}</strong></div>; })}</div></article>
          </div>
          <article className="admin-panel-card recent"><div className="panel-title"><h2>Solicitudes recientes</h2><button onClick={() => setTab("solicitudes")}>Ver todas →</button></div><RequestTable rows={rows.slice(0, 5)} onStatus={updateStatus} /></article>
        </> : <>
          <div className="admin-filters"><input type="search" placeholder="Buscar por nombre, correo o teléfono…" value={query} onChange={(e) => setQuery(e.target.value)} /><select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)}><option value="todos">Todos los servicios</option>{services.map((s) => <option key={s}>{s}</option>)}</select><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="todos">Todos los estados</option>{ESTADOS.map((e) => <option key={e} value={e}>{estadoLabel(e)}</option>)}</select></div>
          <article className="admin-panel-card requests"><div className="panel-title"><h2>{filtered.length} solicitudes</h2>{loadingRows && <span>Actualizando…</span>}</div><RequestTable rows={filtered} onStatus={updateStatus} /></article>
        </>}
      </section>
    </main>
  );
}

function EmptyState() { return <p className="admin-empty">Aún no hay solicitudes para mostrar.</p>; }

function RequestTable({ rows, onStatus }: { rows: Solicitud[]; onStatus: (id: number, estado: string) => void }) {
  if (!rows.length) return <EmptyState />;
  return <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Fecha</th><th>Contacto</th><th>Servicio</th><th>Estado</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><strong>{new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(row.created_at))}</strong><small>{new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit" }).format(new Date(row.created_at))}</small></td><td><strong>{row.nombre || "Sin nombre"}</strong><a href={`mailto:${row.email}`}>{row.email}</a><a href={`tel:${row.telefono}`}>{row.telefono}</a></td><td><span>{row.servicio || "Sin especificar"}</span>{row.mensaje && <details><summary>Ver mensaje</summary><p>{row.mensaje}</p></details>}</td><td><select className={`status-select ${(row.estado || "nueva").replace(" ", "-")}`} value={row.estado || "nueva"} onChange={(e) => onStatus(row.id, e.target.value)}>{ESTADOS.map((estado) => <option key={estado} value={estado}>{estadoLabel(estado)}</option>)}</select></td></tr>)}</tbody></table></div>;
}
