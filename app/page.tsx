import ContactForm from "./contact-form";

const services = [
  {
    name: "Diagnóstico SomosLegado",
    price: "Desde $139.000",
    note: "Pago al contado · 5 a 7 días hábiles",
    featured: true,
    items: [
      "Identificación de herederos legales",
      "Mapeo de beneficios, seguros y cuentas",
      "Inventario patrimonial preliminar",
      "Estimación del impuesto a las herencias",
      "Plan de trámites, plazos y costos",
    ],
  },
  {
    name: "Sucesión Esencial",
    price: "$620.000",
    note: "Hasta 6 cuotas sin interés",
    items: [
      "Posesión efectiva administrativa",
      "Beneficios previsionales y seguros simples",
      "Declaración del impuesto a las herencias",
    ],
  },
  {
    name: "Sucesión Estándar",
    price: "$890.000",
    note: "Hasta 6 cuotas sin interés",
    items: [
      "Todo lo incluido en Esencial",
      "Inscripción de un inmueble y un vehículo",
      "Hasta tres bancos y dos seguros",
    ],
  },
  {
    name: "Sucesión Patrimonial",
    price: "$1.490.000",
    note: "Hasta 6 cuotas sin interés",
    items: [
      "Hasta tres inmuebles y dos vehículos",
      "Patrimonio diversificado y sociedad simple",
      "Cesión de derechos hereditarios",
    ],
  },
  {
    name: "Sucesión Compleja",
    price: "Desde $2.490.000",
    note: "Cotización personalizada",
    items: [
      "Sociedades activas o vía judicial",
      "Bienes en distintas regiones o en el extranjero",
      "Casos con dificultades registrales o disputas",
    ],
  },
];

const principles = [
  [
    "Dignidad antes que velocidad",
    "Trabajamos con agilidad, sin sacrificar la calidad ni el respeto por el momento que atraviesa tu familia.",
  ],
  [
    "Transparencia económica total",
    "Conoces el precio del servicio antes de comenzar. Los costos externos se informan y respaldan sin sobreprecio.",
  ],
  [
    "Un equipo, una conversación",
    "Tienes una persona responsable que conoce el caso completo y mantiene una comunicación clara.",
  ],
  [
    "Tecnología al servicio del cliente",
    "La información y los documentos del proceso se organizan para que siempre sepas qué sigue.",
  ],
  [
    "Plazos comprometidos",
    "Definimos por escrito los tiempos de cada etapa y hacemos seguimiento de cada gestión.",
  ],
  [
    "Confidencialidad absoluta",
    "Tu información familiar y patrimonial se trata bajo secreto profesional y medidas de seguridad.",
  ],
];

function FlowerMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`flower-mark ${light ? "light" : ""}`}
      aria-hidden="true"
    >
      ✦ <b>❀</b> ✦
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#inicio"
          aria-label="SomosLegado, ir al inicio"
        >
          <span className="brand-symbol">❀</span>
          <span>
            <strong>SomosLegado</strong>
            <small>Lo que se sembró, florece</small>
          </span>
        </a>

        <nav aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Quiénes somos</a>
          <a href="#principios">Lo que nos define</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
          <a href="/admin">Admin</a>
        </nav>

        <a className="header-cta" href="#contacto">
          Solicitar diagnóstico
        </a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-leaves leaves-left" aria-hidden="true">
          ❧
        </div>
        <div className="hero-leaves leaves-right" aria-hidden="true">
          ❧
        </div>

        <div className="hero-content">
          <p className="eyebrow">Asesoría legal sucesoria</p>
          <FlowerMark />

          <h1>
            Cuando alguien que amas ya no está, los trámites legales no
            deberían ser otra carga.
          </h1>

          <p className="lead">
            Posesión efectiva, herencias, seguros y bancos. Todo lo que viene
            después, en un solo lugar, con precio cerrado, plazos claros y
            acompañamiento humano.
          </p>

          <div className="actions">
            <a className="button primary" href="#contacto">
              Empieza con un diagnóstico
            </a>

            <a
              className="button secondary"
              href="https://wa.me/56953155900?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20SomosLegado"
              target="_blank"
              rel="noreferrer"
            >
              Conversemos por WhatsApp
            </a>
          </div>

          <div className="trust-row">
            <span>✓ Atención en Los Ríos y Los Lagos</span>
            <span>✓ Honorarios informados desde el inicio</span>
            <span>✓ Respaldo jurídico especializado</span>
          </div>
        </div>
      </section>

      <section className="section problem">
        <div className="section-heading">
          <p className="eyebrow">El problema que resolvemos</p>
          <h2>Más de 40 trámites pueden aparecer después de una pérdida</h2>
          <p>
            Las familias deben coordinar instituciones, documentos y plazos
            distintos justo cuando menos energía tienen para hacerlo. Nosotros
            ordenamos el proceso completo.
          </p>
        </div>

        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Un solo lugar</h3>
            <p>
              Un equipo coordina el proceso sucesorio completo, sin obligarte a
              buscar distintos profesionales.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Precio claro</h3>
            <p>
              Conoces el alcance y los honorarios antes de empezar, sin cobros
              inesperados.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Plazos definidos</h3>
            <p>
              Cada etapa tiene un seguimiento claro y una explicación sencilla
              de lo que viene.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Respaldo profesional</h3>
            <p>
              Una empresa de OlaveEchenique Abogados | Consultores, con
              presencia en el sur de Chile.
            </p>
          </article>
        </div>
      </section>

      <section className="section story" id="nosotros">
        <div className="story-copy">
          <p className="eyebrow">Quiénes somos</p>

          <h2>
            Una empresa pensada para acompañar a las familias del sur de Chile.
          </h2>

          <p>
            SomosLegado nace en 2026 como un servicio legal especializado,
            creado por OlaveEchenique Abogados | Consultores para transformar
            la experiencia sucesoria en un proceso más ordenado, transparente y
            humano.
          </p>

          <p>
            Sus socios, Andrés Olave y Franz Schaffer, atravesaron personalmente
            la pérdida temprana de sus padres y los trámites que siguieron. Esa
            experiencia dio forma a una pregunta que guía cada decisión:{" "}
            <em>¿esto es lo que hubiéramos querido encontrar nosotros?</em>
          </p>

          <div className="region-tags">
            <span>Región de Los Ríos</span>
            <span>Región de Los Lagos</span>
          </div>
        </div>

        <aside className="story-card">
          <FlowerMark />
          <blockquote>
            “Ordenamos lo legal con el cuidado que cada historia merece.”
          </blockquote>
          <p>
            Experiencia jurídica, procesos claros y cercanía durante todo el
            acompañamiento.
          </p>
          <div className="signature">SomosLegado</div>
        </aside>
      </section>

      <section className="section founders">
        <div className="section-heading">
          <p className="eyebrow">El equipo</p>
          <h2>Los socios que lideran SomosLegado</h2>
        </div>

        <div className="founder-grid">
          <article>
            <div className="avatar">AO</div>
            <div>
              <h3>Andrés Javier Olave Echenique</h3>
              <small>Socio principal · Dirección jurídica</small>
              <p>
                Abogado por la Universidad Austral de Chile, con experiencia en
                derecho civil, sucesorio y tributario. Lidera la dirección
                jurídica y estratégica del servicio.
              </p>
            </div>
          </article>

          <article>
            <div className="avatar">FS</div>
            <div>
              <h3>Franz Emil Schaffer Guerrero</h3>
              <small>Socio · Gestión y operaciones</small>
              <p>
                Formado en la Universidad Adolfo Ibáñez. Aporta la visión de
                gestión, procesos y diseño operativo para entregar un servicio
                transparente y consistente.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="principles" id="principios">
        <div className="section">
          <div className="section-heading light">
            <p className="eyebrow">Lo que nos define</p>
            <h2>Lo que se sembró, florece.</h2>
            <p>Seis compromisos que orientan cada caso y cada conversación.</p>
          </div>

          <div className="principle-grid">
            {principles.map(([title, text], i) => (
              <article key={title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services" id="servicios">
        <div className="section-heading">
          <p className="eyebrow">Nuestros servicios</p>
          <h2>Una solución para cada tipo de necesidad</h2>
          <p>
            Todo comienza con un diagnóstico. Con esa información te indicamos
            qué nivel corresponde realmente a tu familia.
          </p>
        </div>

        <div className="payment-note">
          <span>❦</span>
          <div>
            <strong>Pago hasta en 6 cuotas sin interés</strong>
            <p>
              Disponible en los servicios sucesorios integrales. El Diagnóstico
              se paga al contado.
            </p>
          </div>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article
              className={service.featured ? "featured" : ""}
              key={service.name}
            >
              <div className="service-top">
                <div>
                  <small>
                    {service.featured
                      ? "Primer paso recomendado"
                      : "Servicio integral"}
                  </small>
                  <h3>{service.name}</h3>
                </div>

                <div className="service-price">
                  <strong>{service.price}</strong>
                  <span>{service.note}</span>
                </div>
              </div>

              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {service.featured && (
                <a href="#contacto">Solicitar diagnóstico →</a>
              )}
            </article>
          ))}
        </div>

        <p className="legal-note">
          <strong>Importante:</strong> Los honorarios no incluyen aranceles,
          certificados, escrituras u otros costos cobrados por terceros. Estos
          se estiman previamente y se pagan contra comprobante, sin sobreprecio.
        </p>
      </section>

      <section className="contact" id="contacto">
        <div className="section contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">Contacto</p>
            <h2>Conversemos cuando estés listo.</h2>

            <p>
              Cuéntanos brevemente tu situación. Te contactaremos dentro de las
              próximas 4 horas hábiles para orientarte, sin compromiso.
            </p>

            <dl>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href="https://wa.me/56953155900">+56 9 5315 5900</a>
                </dd>
              </div>

              <div>
                <dt>Correo</dt>
                <dd>
                  <a href="mailto:aolave@somoslegado.cl">
                    aolave@somoslegado.cl
                  </a>
                </dd>
              </div>

              <div>
                <dt>Horario</dt>
                <dd>Lunes a viernes, 9:00 a 19:00</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div>
            <div className="footer-brand">
              <span>❀</span>
              <strong>SomosLegado</strong>
            </div>
            <p>Lo que se sembró, florece.</p>
          </div>

          <div>
            <strong>Una empresa de</strong>
            <p>OlaveEchenique Abogados | Consultores</p>
          </div>

          <div>
            <a href="#">Política de privacidad</a>
            <a href="#">Términos y condiciones</a>
            <a href="#">Política de cookies</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 SomosLegado · Todos los derechos reservados
        </div>
      </footer>
    </main>
  );
}
