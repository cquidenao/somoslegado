"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);
    const comuna = String(data.get("comuna") ?? "").trim();
    const mensaje = String(data.get("mensaje") ?? "").trim();

    try {
      const { error } = await createClient().from("solicitudes").insert({
        nombre: String(data.get("nombre") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        telefono: String(data.get("telefono") ?? "").trim(),
        servicio: String(data.get("servicio") ?? "").trim(),
        mensaje: comuna ? `Comuna: ${comuna}\n\n${mensaje}` : mensaje,
        acepta_privacidad: data.get("acepta_privacidad") === "on",
      });

      if (error) throw error;
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Nombre completo<input name="nombre" type="text" placeholder="Tu nombre" required maxLength={120} /></label>
      <div className="form-grid">
        <label>Correo electrónico<input name="email" type="email" placeholder="nombre@correo.cl" required maxLength={160} /></label>
        <label>Teléfono o WhatsApp<input name="telefono" type="tel" placeholder="+56 9..." required maxLength={30} /></label>
      </div>
      <label>Servicio de interés
        <select name="servicio" required defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option>Diagnóstico SomosLegado</option><option>Sucesión Esencial</option><option>Sucesión Estándar</option>
          <option>Sucesión Patrimonial</option><option>Sucesión Compleja</option><option>Necesito orientación</option>
        </select>
      </label>
      <label>Comuna<input name="comuna" type="text" placeholder="Valdivia, Puerto Montt, Osorno..." maxLength={100} /></label>
      <label>¿En qué te podemos ayudar?<textarea name="mensaje" rows={4} placeholder="Cuéntanos brevemente tu situación" required maxLength={2000} /></label>
      <label className="consent"><input name="acepta_privacidad" type="checkbox" required /> <span>Acepto la política de privacidad y el tratamiento de mis datos para recibir respuesta.</span></label>
      <button type="submit" disabled={status === "sending"}>{status === "sending" ? "Enviando..." : "Quiero que me contacten"}</button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {status === "success" && "Solicitud enviada correctamente. Te contactaremos dentro de las próximas 4 horas hábiles."}
        {status === "error" && "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp."}
      </p>
    </form>
  );
}
