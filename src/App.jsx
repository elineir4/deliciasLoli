import { useRef, useState } from 'react'
import './App.css'
import imagenHero from './assets/heroanimado3-optimized.png'

const enlacesMenu = [
  'Inicio',
  'Menu',
  'Arma tu mesa',
]

const destinosEnlacesMenu = {
  Inicio: '#hero-section',
  Menu: '#productos',
  'Arma tu mesa': '#formulario-mesa',
}

const categoriaPasteleriaIndividual = 'Pastelería individuales'
const categoriasProductos = ['Comidas', categoriaPasteleriaIndividual]

const pasosPedido = [
  { titulo: 'Contanos tu evento', descripcion: 'Fecha, lugar y cantidad de invitados.' },
  { titulo: 'Elegí tu menú', descripcion: 'Combiná opciones dulces y saladas.' },
  { titulo: 'Recibí tu presupuesto', descripcion: 'Te respondemos por WhatsApp.' },
  { titulo: 'Recibí tu pedido', descripcion: 'Retiro o entrega a domicilio.' },
]

const productos = [
  {
    nombre: 'Mesa dulce clásica (para 20 personas)',
    tipo: 'Dulce',
    categorias: ['Mesas dulces'],
    precio: '$45.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6lwwviX4UNHI7rF4y9WmJVpMSkvSn_HlDeFlSUD14BTKT7H5Doncq6ub2gC1NfBWsAnRElOj9o8_K4wL3NKBhZhHPUFUvV3b4DMlPGEhGCOcDpjWb8NrQgEhfE__OFIzXG6cB4XTwyOjYwqqgBwr0CpdSMugeOWWWq6CXPhJKuYbDEauvDmz_rVScPOtfVWp9e7oZBOim363FdX1cNCieznV4w8ko-pkjnH6zNpdERD0hPa8l4tfKA',
  },
  {
    nombre: 'Mesa salada completa (para 20 personas)',
    tipo: 'Salado',
    categorias: ['Mesas saladas'],
    precio: '$52.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCui5RBt-J0VHmu4-dBdxEMyp9UU4_ErBbjlHPhewHZVjbbHOc3MKcWFe0oDfivCAHUpgWpNHgC3vDNjZ0xnef_KRb46_WCM7upK6qvpvmOa9HmxcL0Bvv0sq8wtt_9Fjk8RQewYDEKDUY_yUh9yfr76x7-04C_HmbUui3FKOujgFIzOXT6rL0sE5wKmsr7ufEmYUhs-1E_JuhtaEYzCsW13SsTPo1dSMXWiqgB7th0lRkw9kNvYj4JyQ',
  },
  {
    nombre: 'Docena de empanadas caseras',
    tipo: 'Salado',
    categorias: ['Comidas'],
    precio: '$16.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUNWXsJgLwtiOnmQbjzsS3vKBbxVgh4tZ9PLpDJZMB9uPFFRjum3CkGkwOPxq96D94UJKBdbWoFqtnSXbYPSSUvnV48zRP9kj3IbCU_wwi76z3WLOQTrnVrVXIUkThihU0fdG1nyCj9_i4GLXDBVHQmsrW0jAreU_FQIAEwTGeGMY_9nD6rchy4GfvRzBabfYJtkm8MoYrdpwAXZoUhcx3PdOf2hNAFENZ999jZGLH8V5p-suuQnGcw',
  },
  {
    nombre:"Bandejas de alfajores de maicena x5",
    tipo:'Dulce',
    categorias:[categoriaPasteleriaIndividual],
    precio: '$40.000',
    imagen:''
  },
  {
    nombre:"Pizza Muzza",
    tipo:"Salado",
    categorias:['Comidas'],
    precio:'$14.000',
    imagen:''
  },
    {
    nombre:"Bandejas surtidas x7",
    tipo:'Dulce',
    categorias:[categoriaPasteleriaIndividual],
    precio: '$35.000',
    imagen:''
  },




]

const muestrasMesas = [
  { nombre: 'Mesa dulce clásica', tipo: 'Mesa dulce clásica', imagen: productos[0].imagen },
  { nombre: 'Mesa salada completa', tipo: 'Mesa salada', imagen: productos[1].imagen },
  { nombre: 'Candy Bar', tipo: 'Candy bar / mesa de golosinas', imagen: productos[2].imagen },
  {
    nombre: 'Mesa dulce mini',
    tipo: 'Mesa dulce mini / individual',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBuzR50vRBViucR6ZEl0eScTa2zYI-M7e8kAH6yRQIDV3ecVQ9P-C--bnCwUxme0OoBdY501dcX5iYWPcNpPxS6leL2uNGr6oXkSSapucRc0Z7GdlsjwlvbLlH-jm23IEesbU1I7Vg7YtByhHq20eLC30yKzq3CBFhb6jNVdnXo1WuXopX7SNH6L1A2hx4YtKh0Zu3mDicki_qzIOC-BvMtDrNT6KNlT0TeJKJ_o6FmxAF4wrjUlFpRQ',
  },
  { nombre: 'Grazing table dulce', tipo: 'Grazing table dulce', imagen: productos[0].imagen },
  { nombre: 'Mesa dulce celiacos', tipo: 'Mesa dulce apta celiacos', imagen: productos[1].imagen },
]

const zonasEntrega = ['Córdoba Capital', 'Villa Allende', 'La Calera', 'Mendiolaza', 'Unquillo']

function Pagina() {
  const [menuMovilAbierto, establecerMenuMovilAbierto] = useState(false)
  const [categoriaSeleccionada, establecerCategoriaSeleccionada] = useState('Comidas')
  const [zonaElegida, establecerZonaElegida] = useState('Córdoba Capital')
  const [selectorZonaAbierto, establecerSelectorZonaAbierto] = useState(false)
  const [carrito, establecerCarrito] = useState([])
  const [carritoAbierto, establecerCarritoAbierto] = useState(false)
  const [cantidadInvitados, establecerCantidadInvitados] = useState('')
  const [tipoEvento, establecerTipoEvento] = useState('')
  const [mesasElegidas, establecerMesasElegidas] = useState([])
  const [errorFormularioMesa, establecerErrorFormularioMesa] = useState('')
  const muestrasMesasRef = useRef(null)
  const productosFiltrados = productos.filter((producto) => producto.categorias.includes(categoriaSeleccionada))

  const mensajeWhatsApp = `Hola Delicias Loli! Soy de ${zonaElegida} y me gustaría consultar sobre:.`
  const enlaceWhatsApp = `https://wa.me/543515290303?text=${encodeURIComponent(mensajeWhatsApp)}`
  const cantidadEnCarrito = carrito.reduce((cantidad, producto) => cantidad + producto.cantidad, 0)
  const subtotalCarrito = carrito.reduce(
    (subtotal, producto) => subtotal + Number(producto.precio.replace(/\D/g, '')) * producto.cantidad,
    0,
  )
  const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(precio)
  const mensajePedido = [
    `Hola Delicias Loli! Quiero hacer este pedido para ${zonaElegida}:`,
    ...carrito.map((producto) => `- ${producto.cantidad} x ${producto.nombre} (${producto.precio})`),
    `Total estimado: ${formatearPrecio(subtotalCarrito)}`,
  ].join('\n')
  const enlacePedidoWhatsApp = `https://wa.me/543515290303?text=${encodeURIComponent(mensajePedido)}`

  function agregarAlCarrito(producto) {
    establecerCarrito((carritoActual) => {
      const productoEnCarrito = carritoActual.find((item) => item.nombre === producto.nombre)
      if (productoEnCarrito) {
        return carritoActual.map((item) =>
          item.nombre === producto.nombre ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...carritoActual, { ...producto, cantidad: 1 }]
    })
  }

  function cambiarCantidad(nombre, cambio) {
    establecerCarrito((carritoActual) =>
      carritoActual
        .map((producto) =>
          producto.nombre === nombre ? { ...producto, cantidad: producto.cantidad + cambio } : producto,
        )
        .filter((producto) => producto.cantidad > 0),
    )
  }

  function alternarMesa(mesa) {
    establecerMesasElegidas((mesasActuales) =>
      mesasActuales.includes(mesa)
        ? mesasActuales.filter((mesaActual) => mesaActual !== mesa)
        : [...mesasActuales, mesa],
    )
    establecerErrorFormularioMesa('')
  }

  function enviarFormularioMesa(evento) {
    evento.preventDefault()
    const datosFormulario = new FormData(evento.currentTarget)
    const cantidadInvitadosFormulario = String(datosFormulario.get('cantidadInvitados') || '')
    const tipoEventoFormulario = String(datosFormulario.get('tipoEvento') || '')

    if (mesasElegidas.length === 0) {
      establecerErrorFormularioMesa('Elegí al menos una opción: mesa dulce o mesa salada.')
      return
    }

    const mensajeMesa = [
      'Hola Delicias Loli! Quiero armar una mesa:',
      `- Cantidad de invitados: ${cantidadInvitadosFormulario}`,
      `- Tipo de evento: ${tipoEventoFormulario}`,
      `- Mesas elegidas: ${mesasElegidas.join(' y ')}`,
      `- Zona de entrega: ${zonaElegida}`,
    ].join('\n')

    const enlaceMesaWhatsApp = `https://wa.me/543515290303?text=${encodeURIComponent(mensajeMesa)}`
    window.open(enlaceMesaWhatsApp, '_blank', 'noopener,noreferrer')
  }

  function desplazarMuestras(direccion) {
    const anchoTarjeta = muestrasMesasRef.current?.firstElementChild?.getBoundingClientRect().width || 280
    muestrasMesasRef.current?.scrollBy({ left: direccion * (anchoTarjeta + 20), behavior: 'smooth' })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(138,11,61,0.06)]">
        <div className="relative flex h-20 max-w-[1280px] items-center justify-between gap-2 px-margin-mobile md:mx-auto md:gap-space-sm md:px-margin">
          <div className="flex items-center gap-space-xs shrink-0">
            <img
              alt="Logo Delicias Loli"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBR8jQpCY-C5I5ISUxfbKBo4hXYUDhssMpOb4x21U6-yvthZyFJixzHcRmEYBR83upGhhFamuK8_TYiyRgVY-iqTm15GCi7rcHa0bnPWC9P-s13yXShwQU4ItEUBbwFDalzVp1I_kpfoNd7pbBINYYXKldHHVYtxnglA1ph_PwB9fsoD-3XfSej_6DmiXRyE9-aoLm28OY_-jBXZOX70CX-QT_a0OKXHINML9EIir_GKd7BhMavL7iQg"
            />
            <a className="flex items-baseline gap-1.5 focus:outline-none" href="#">
              <span className="font-script text-3xl text-primary-container leading-none font-normal">Delicias</span>
              <span className="font-headline-sm text-headline-sm text-primary uppercase tracking-wider font-bold">LOLI</span>
            </a>
          </div>

          <nav className="hidden xl:flex items-center gap-space-md" data-active-classes="text-primary font-semibold">
            {enlacesMenu.map((enlace) => (
              <a
                key={enlace}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap"
                href={destinosEnlacesMenu[enlace]}
              >
                {enlace}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 md:gap-space-sm">
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-fixed text-primary-container transition-colors hover:bg-primary-fixed/70"
              aria-label={`Abrir carrito, ${cantidadEnCarrito} productos`}
              onClick={() => establecerCarritoAbierto(true)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">shopping_cart</span>
              {cantidadEnCarrito > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[11px] font-bold text-on-secondary">
                  {cantidadEnCarrito}
                </span>
              )}
            </button>
            <a
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-2.5 text-on-secondary shadow-[0_4px_12px_rgba(229,18,79,0.18)] transition-all hover:shadow-lg sm:h-auto sm:w-auto sm:px-space-md sm:py-2.5"
              href={enlaceWhatsApp}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden sm:inline">Hablar por WhatsApp</span>
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-low text-primary xl:hidden"
              aria-label={menuMovilAbierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuMovilAbierto}
              aria-controls="menu-movil"
              onClick={() => establecerMenuMovilAbierto(!menuMovilAbierto)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {menuMovilAbierto ? 'close' : 'menu'}
              </span>
            </button>
          </div>
          {menuMovilAbierto && (
            <nav
              id="menu-movil"
              className="absolute inset-x-0 top-full z-50 grid gap-1 border-t border-primary-fixed bg-surface-container-lowest px-margin-mobile py-3 shadow-lg xl:hidden md:px-margin"
              aria-label="Navegación principal"
            >
              {enlacesMenu.map((enlace) => (
                <a
                  key={enlace}
                  className="rounded-lg px-4 py-3 font-label-md text-label-md font-semibold text-on-surface-variant transition-colors hover:bg-primary-fixed hover:text-primary"
                  href={destinosEnlacesMenu[enlace]}
                  onClick={() => establecerMenuMovilAbierto(false)}
                >
                  {enlace}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full">
          <section className="relative w-full scroll-mt-20 border-b border-primary-fixed bg-primary-fixed/30 overflow-hidden pb-8 pt-3 sm:pb-10 sm:pt-4 lg:pb-12 lg:pt-4" id="hero-section">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin relative z-10">
              <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7 flex flex-col gap-space-sm items-start text-left animar-entrada-izquierda lg:pt-24">
                  <div className="zona-entrega-selector">
                    <span className="zona-entrega-selector__icon material-symbols-outlined" aria-hidden="true">location_on</span>
                    <div className="zona-entrega-selector__copy">
                      <span className="zona-entrega-selector__eyebrow">Entrega</span>
                      <span className="zona-entrega-selector__label">Elegí tu zona</span>
                    </div>
                    <div className="zona-entrega-selector__control">
                      <button
                        type="button"
                        className="zona-entrega-selector__trigger"
                        aria-expanded={selectorZonaAbierto}
                        aria-haspopup="listbox"
                        onClick={() => establecerSelectorZonaAbierto(!selectorZonaAbierto)}
                      >
                        {zonaElegida}
                        <span className="zona-entrega-selector__arrow material-symbols-outlined" aria-hidden="true">expand_more</span>
                      </button>
                      {selectorZonaAbierto && (
                        <div className="zona-entrega-selector__menu" role="listbox" aria-label="Zonas de entrega">
                          {zonasEntrega.map((zona) => (
                            <button
                              key={zona}
                              type="button"
                              className={`zona-entrega-selector__option${zona === zonaElegida ? ' is-selected' : ''}`}
                              role="option"
                              aria-selected={zona === zonaElegida}
                              onClick={() => {
                                establecerZonaElegida(zona)
                                establecerSelectorZonaAbierto(false)
                              }}
                            >
                              <span className="zona-entrega-selector__option-icon material-symbols-outlined" aria-hidden="true">location_on</span>
                              <span className="zona-entrega-selector__option-copy"><strong>{zona}</strong></span>
                              {zona === zonaElegida && <span className="zona-entrega-selector__check material-symbols-outlined" aria-hidden="true">check</span>}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container uppercase tracking-tight leading-[1.08] mt-2 font-bold">
                    MESAS DULCES Y SALADAS PARA TUS MEJORES MOMENTOS
                  </h1>

                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                    En Delicias Loli preparamos todo casero, fresco y a tu medida: cumpleaños, reuniones, casamientos o un antojo cualquiera. ¡Vos disfrutá, nosotros armamos la mesa!
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <a className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300" href="#productos">
                      Ver menú
                    </a>
                    <a
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-surface-container-lowest text-primary-container font-label-lg text-label-lg uppercase tracking-wider shadow-sm hover:bg-primary-container hover:text-on-primary transition-all duration-300"
                      href="#como-pedir"
                    >
                      Armar mi mesa
                    </a>
                  </div>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t-0 text-on-surface-variant">
                    <div className="flex items-center gap-1 text-on-tertiary-container">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: 'FILL 1' }}>star</span>
                    </div>
                    <span className="font-label-sm text-label-sm font-semibold tracking-wide text-primary">Más de 850 mesas entregadas en Córdoba</span>
                  </div>
                </div>

                <div className="hidden lg:col-span-5 relative min-h-[480px] items-center justify-center animar-entrada-derecha lg:flex">
                  <div className="relative w-full max-w-[430px] flex flex-col items-center justify-center select-none" id="cake-interactive-stage">
                    <div className="absolute bottom-2 w-[74%] h-12 rounded-[50%] blur-md anim-cake-shadow pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138, 11, 61, 0.22) 0%, rgba(138, 11, 61, 0.08) 45%, transparent 75%)' }} />
                    <div className="relative w-full flex items-center justify-center z-10">
                      <div className="relative w-full anim-floating-cake flex items-center justify-center">
                        <img
                          alt="Pastel artesanal con crema chantilly, fresas frescas y frambuesas"
                          className="w-full max-w-[390px] lg:max-w-[420px] h-auto object-contain pointer-events-none transition-transform duration-300 ease-out"
                          decoding="async"
                          fetchPriority="high"
                          id="hero-floating-cake"
                          src={imagenHero}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </section>

          <section className="w-full scroll-mt-24 border-b border-primary-fixed bg-surface-container-lowest py-10 md:py-16" id="productos">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container uppercase font-bold tracking-tight">
                  MIRÁ LO QUE PODEMOS PREPARAR PARA VOS
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                  Variedades seleccionadas con dedicación artesanal para consentir a tus invitados.
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2 mt-5" aria-label="Filtrar productos por categoría">
                  {categoriasProductos.map((categoria) => {
                    const seleccionada = categoria === categoriaSeleccionada
                    return (
                      <button
                        key={categoria}
                        type="button"
                        aria-pressed={seleccionada}
                        onClick={() => establecerCategoriaSeleccionada(categoria)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md transition-colors ${
                          seleccionada
                            ? 'bg-primary-fixed text-primary-container shadow-sm'
                            : 'bg-surface-container-low text-on-surface-variant hover:text-primary'
                        }`}
                      >
                        {seleccionada && <span className="w-2 h-2 rounded-full bg-secondary-container" />}
                        {categoria}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {productosFiltrados.map((producto) => (
                  <div key={producto.nombre} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-[0_6px_18px_-5px_rgba(138,11,61,0.1)] transition-all duration-300 hover:shadow-[0_12px_24px_-6px_rgba(138,11,61,0.16)]">
                    <div className="relative h-40 overflow-hidden bg-surface-container-low sm:h-44">
                      {producto.imagen ? (
                        <img
                          alt={producto.nombre}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={producto.imagen}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary-fixed/40 text-primary-container" aria-hidden="true">
                          <span className="material-symbols-outlined text-4xl">bakery_dining</span>
                        </div>
                      )}
                      <span className="absolute left-3 top-3 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary-container shadow-sm">
                        {producto.tipo}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="font-headline-md text-lg text-primary font-bold uppercase leading-snug">{producto.nombre}</h3>
                        <p className="font-body-md text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                          {producto.tipo === 'Dulce'
                            ? 'Mini tortas, alfajores, brownies, frutas con chocolate y postrecitos en vasito.'
                            : producto.tipo === 'Salado'
                              ? 'Empanadas, tartas, sándwiches de miga, pizzetas y bocaditos calientes.'
                              : 'Carne cortada a cuchillo, jamón y queso o pollo, con masa hojaldrada casera.'}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-2">
                        <span className="font-headline-md text-lg text-primary-container font-bold">{producto.precio}</span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-4 py-2 text-sm font-bold uppercase tracking-wider text-on-secondary shadow-sm transition-all hover:shadow-md"
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">add_shopping_cart</span>
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {productosFiltrados.length === 0 && (
                <p className="mt-8 text-center font-body-md text-on-surface-variant" role="status">
                  Todavía no hay productos disponibles en {categoriaSeleccionada.toLowerCase()}.
                </p>
              )}
            </div>
          </section>

          <section className="relative w-full scroll-mt-24 border-b border-primary-fixed bg-primary-fixed/30 py-12 overflow-hidden lg:py-20" id="como-pedir">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin relative z-10">
              <div className="text-center max-w-xl mx-auto mb-8 lg:mb-14">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container uppercase font-bold tracking-tight">
                  ARMAR TU MESA ES FÁCIL
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 font-medium">
                  Completá el formulario y te respondemos por WhatsApp con una propuesta a medida
                </p>
              </div>

              <div className="mx-auto w-full max-w-4xl lg:max-w-none">
                <ol className="mb-7 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-5 lg:hidden" aria-label="Pasos para armar tu mesa">
                  {pasosPedido.map((paso, indice) => (
                    <li key={paso.titulo} className="flex min-w-0 items-start gap-2.5">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primary text-sm font-bold text-on-primary">{indice + 1}</span>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-sm font-bold leading-snug text-primary">{paso.titulo}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{paso.descripcion}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12 lg:items-center">
                  <div className="hidden flex-col gap-8 lg:col-span-3 lg:order-1 lg:flex">
                    {pasosPedido.slice(0, 2).map((paso, indice) => (
                      <div
                        key={paso.titulo}
                        className={`flex flex-col items-center p-5 text-center lg:items-end lg:text-right ${
                          indice === 0
                            ? 'rounded-2xl bg-surface-container-lowest/80 shadow-sm backdrop-blur'
                            : 'rounded-2xl bg-surface-container-lowest/50'
                        }`}
                      >
                        <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full font-headline-sm font-bold ${
                          indice === 0
                            ? 'bg-gradient-to-r from-secondary-container to-secondary text-on-secondary shadow-[0_4px_16px_rgba(229,18,79,0.35)]'
                            : 'bg-surface-container-lowest text-primary-container shadow-sm'
                        }`}>{indice + 1}</div>
                        <h4 className="font-headline-sm text-headline-sm font-bold uppercase text-primary">{indice + 1}. {paso.titulo}</h4>
                        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{paso.descripcion}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center lg:col-span-6 lg:order-2">
                  <form
                    id="formulario-mesa"
                    className="w-full scroll-mt-24 max-w-md rounded-3xl bg-surface-container-lowest p-6 shadow-[0_20px_40px_-8px_rgba(138,11,61,0.18)] sm:p-8"
                    onSubmit={enviarFormularioMesa}
                  >
                    <div className="mb-6">
                      <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">Presupuesto personalizado</span>
                      <h3 className="mt-1 font-headline-md text-headline-md text-primary uppercase font-bold">Contanos sobre tu evento</h3>
                    </div>

                    <div className="flex flex-col gap-5">
                      <label className="flex flex-col gap-2" htmlFor="cantidad-invitados">
                        <span className="font-label-md text-label-md font-bold text-primary">Cantidad de invitados</span>
                        <input
                          id="cantidad-invitados"
                          className="rounded-xl border border-primary-fixed bg-surface-container-low px-4 py-3 text-primary outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                          min="1"
                          name="cantidadInvitados"
                          onChange={(evento) => establecerCantidadInvitados(evento.target.value)}
                          placeholder="Ej: 30"
                          required
                          type="number"
                          value={cantidadInvitados}
                        />
                      </label>

                      <label className="flex flex-col gap-2" htmlFor="tipo-evento">
                        <span className="font-label-md text-label-md font-bold text-primary">Tipo de evento</span>
                        <select
                          id="tipo-evento"
                          className="rounded-xl border border-primary-fixed bg-surface-container-low px-4 py-3 text-primary outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                          name="tipoEvento"
                          onChange={(evento) => establecerTipoEvento(evento.target.value)}
                          required
                          value={tipoEvento}
                        >
                          <option value="" disabled>Elegí una opción</option>
                          <option value="Cumpleaños">Cumpleaños</option>
                          <option value="Baby Shower">Baby Shower</option>
                          <option value="Reunión familiar">Reunión familiar</option>
                          <option value="Casamiento">Casamiento</option>
                          <option value="Evento corporativo">Evento corporativo</option>
                          <option value="Otro evento">Otro evento</option>
                        </select>
                      </label>

                      <fieldset>
                        <legend className="mb-2 font-label-md text-label-md font-bold text-primary">¿Qué mesas querés elegir?</legend>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {[
                            { nombre: 'Mesa dulce', descripcion: 'Tortas, postres y cosas ricas.' },
                            { nombre: 'Mesa salada', descripcion: 'Variedad de empanadas, pizzetas y bocaditos.' },
                          ].map((mesa) => {
                            const seleccionada = mesasElegidas.includes(mesa.nombre)
                            return (
                              <button
                                key={mesa.nombre}
                                aria-pressed={seleccionada}
                                className={`rounded-2xl border p-4 text-left transition ${
                                  seleccionada
                                    ? 'border-secondary bg-primary-fixed text-primary shadow-sm'
                                    : 'border-primary-fixed bg-surface-container-low text-on-surface-variant hover:border-secondary/50'
                                }`}
                                onClick={() => alternarMesa(mesa.nombre)}
                                type="button"
                              >
                                <span className="flex items-center justify-between gap-2 font-label-md font-bold text-primary">
                                  {mesa.nombre}
                                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                                    {seleccionada ? 'check_circle' : 'add_circle'}
                                  </span>
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-on-surface-variant">{mesa.descripcion}</span>
                              </button>
                            )
                          })}
                        </div>
                      </fieldset>
                    </div>

                    {errorFormularioMesa && (
                      <p className="mt-4 text-sm font-semibold text-secondary" role="alert">{errorFormularioMesa}</p>
                    )}

                    <button
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-5 py-3.5 font-label-md text-label-md font-bold uppercase tracking-wider text-on-secondary shadow-md transition hover:shadow-lg"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">chat</span>
                      Enviar por WhatsApp
                    </button>
                  </form>
                  </div>

                  <div className="hidden flex-col gap-8 lg:col-span-3 lg:order-3 lg:flex">
                    {pasosPedido.slice(2).map((paso, indice) => (
                      <div key={paso.titulo} className="flex flex-col items-center rounded-2xl bg-surface-container-lowest/50 p-5 text-center lg:items-start lg:text-left">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-lowest font-headline-sm font-bold text-primary-container shadow-sm">{indice + 3}</div>
                        <h4 className="font-headline-sm text-headline-sm font-bold uppercase text-primary">{indice + 3}. {paso.titulo}</h4>
                        <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{paso.descripcion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="mx-auto mb-6 max-w-xl text-center">
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">Inspiración</span>
                  <h3 className="mt-1 font-headline-md text-headline-md text-primary uppercase font-bold">Mirá nuestras mesas</h3>
                  <p className="mt-1 font-body-sm text-on-surface-variant">Una muestra de las opciones que podemos preparar para tu evento.</p>
                </div>
                <div className="relative mx-auto max-w-6xl">
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest/95 text-primary transition hover:bg-primary hover:text-on-primary"
                    aria-label="Ver muestras anteriores"
                    onClick={() => desplazarMuestras(-1)}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                  </button>
                  <div ref={muestrasMesasRef} className="flex gap-5 overflow-x-auto px-2 pb-3 scroll-smooth">
                  {muestrasMesas.map((mesa) => (
                    <figure key={mesa.nombre} className="group relative aspect-video w-[230px] flex-none overflow-hidden rounded-2xl bg-surface-container-low sm:w-[280px]">
                      <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={mesa.imagen} alt={mesa.nombre} />
                      <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-surface-container-lowest/95 px-4 py-3 text-center font-label-sm text-label-sm font-bold text-primary">
                        {mesa.tipo}
                      </figcaption>
                    </figure>
                  ))}
                  </div>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface-container-lowest/95 text-primary transition hover:bg-primary hover:text-on-primary"
                    aria-label="Ver más muestras"
                    onClick={() => desplazarMuestras(1)}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {carritoAbierto && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Cerrar carrito"
            onClick={() => establecerCarritoAbierto(false)}
          />
          <section
            className="relative flex h-full w-full max-w-md flex-col bg-surface-container-lowest shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-carrito"
          >
            <div className="flex items-center justify-between border-b border-primary-fixed px-5 py-5 sm:px-7">
              <div>
                <h2 id="titulo-carrito" className="font-headline-md text-headline-md font-bold uppercase text-primary">Tu carrito</h2>
                <p className="font-body-sm text-on-surface-variant">{cantidadEnCarrito} productos</p>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-primary hover:bg-primary-fixed"
                aria-label="Cerrar carrito"
                onClick={() => establecerCarritoAbierto(false)}
              >
                <span className="material-symbols-outlined" aria-hidden="true">close</span>
              </button>
            </div>

            {carrito.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="material-symbols-outlined mb-3 text-5xl text-primary-fixed-dim" aria-hidden="true">shopping_cart</span>
                <p className="font-headline-sm text-headline-sm font-bold text-primary">Tu carrito está vacío</p>
                <p className="mt-2 font-body-md text-on-surface-variant">Sumá productos del menú para armar tu pedido.</p>
                <button
                  type="button"
                  className="mt-6 rounded-full bg-primary-fixed px-5 py-2.5 font-label-md font-bold text-primary-container"
                  onClick={() => establecerCarritoAbierto(false)}
                >
                  Volver al menú
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7">
                  {carrito.map((producto) => (
                    <article key={producto.nombre} className="flex gap-4 border-b border-primary-fixed pb-4">
                      <img className="h-20 w-20 rounded-lg object-cover" src={producto.imagen} alt="" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-label-md font-bold text-primary">{producto.nombre}</h3>
                        <p className="mt-1 font-body-sm text-on-surface-variant">{producto.precio} c/u</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center gap-3">
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-primary-container"
                              aria-label={`Quitar una unidad de ${producto.nombre}`}
                              onClick={() => cambiarCantidad(producto.nombre, -1)}
                            >
                              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">remove</span>
                            </button>
                            <span className="min-w-4 text-center font-label-md font-bold text-primary">{producto.cantidad}</span>
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-fixed text-primary-container"
                              aria-label={`Agregar una unidad de ${producto.nombre}`}
                              onClick={() => cambiarCantidad(producto.nombre, 1)}
                            >
                              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">add</span>
                            </button>
                          </div>
                          <span className="font-label-md font-bold text-primary-container">
                            {formatearPrecio(Number(producto.precio.replace(/\D/g, '')) * producto.cantidad)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="border-t border-primary-fixed px-5 py-5 sm:px-7">
                  <div className="mb-4 flex items-center justify-between font-label-lg font-bold text-primary">
                    <span>Total estimado</span>
                    <span>{formatearPrecio(subtotalCarrito)}</span>
                  </div>
                  <a
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary-container to-secondary px-5 py-3 font-label-md font-bold uppercase tracking-wider text-on-secondary shadow-md transition hover:shadow-lg"
                    href={enlacePedidoWhatsApp}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">chat</span>
                    Enviar pedido por WhatsApp
                  </a>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      <footer className="w-full bg-primary text-on-primary">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin pt-space-xl pb-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-space-xl">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-baseline gap-1.5">
                <span className="font-script text-4xl text-primary-fixed leading-none">Delicias</span>
                <span className="font-headline-md text-headline-md text-on-primary uppercase font-bold">LOLI</span>
              </div>
              <p className="font-body-md text-body-md text-primary-fixed-dim">
                Pastelería y catering casero hecho con amor y dedicación artesanal.
              </p>
              <div className="flex items-center gap-space-xs mt-2">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container"><span className="material-symbols-outlined text-[18px]">cake</span></div>
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container"><span className="material-symbols-outlined text-[18px]">favorite</span></div>
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container"><span className="material-symbols-outlined text-[18px]">star</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <h4 className="font-headline-sm text-headline-sm text-tertiary-fixed uppercase font-semibold mb-1">Ubicación</h4>
              <div className="flex items-start gap-2 text-primary-fixed-dim">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim shrink-0 mt-0.5">location_on</span>
                <p className="font-body-md text-body-md">Av. Rafael Núñez 4250, Cerro de las Rosas, Córdoba, Argentina</p>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-tertiary-fixed uppercase font-semibold mt-3 mb-1">Horarios</h4>
              <div className="flex items-start gap-2 text-primary-fixed-dim">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim shrink-0 mt-0.5">schedule</span>
                <div className="font-body-md text-body-md">
                  <p>Mar a Sáb: 09:00 a 20:00 hs</p>
                  <p>Dom: 09:00 a 14:00 hs</p>
                  <p className="text-primary-fixed text-xs mt-1">Lunes cerrado</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <h4 className="font-headline-sm text-headline-sm text-tertiary-fixed uppercase font-semibold mb-1">Contacto</h4>
              <a className="flex items-center gap-2 text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="https://wa.me/5493510000000" rel="noopener noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">chat</span>
                +54 9 351 000-0000
              </a>
              <a className="flex items-center gap-2 text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="https://instagram.com/deliciasloli.cba" rel="noopener noreferrer" target="_blank">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">photo_camera</span>
                @deliciasloli.cba
              </a>
              <div className="flex items-center gap-2 text-primary-fixed-dim font-body-md text-body-md">
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">mail</span>
                pedidos@deliciasloli.com.ar
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <h4 className="font-headline-sm text-headline-sm text-tertiary-fixed uppercase font-semibold mb-1">Categorías</h4>
              <a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="#">Mesas Dulces para Fiestas</a>
              <a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="#">Catering y Mesas Saladas</a>
              <a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="#">Empanadas Criollas y Especiales</a>
              <a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="#">Platos Principales y Viandas</a>
              <a className="text-primary-fixed-dim hover:text-on-primary transition-colors font-body-md text-body-md" href="#">Guía de Pedidos y Tiempos</a>
            </div>
          </div>

          <div className="pt-space-md bg-primary-container/40 rounded-xl px-space-md py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-xs text-center md:text-left">
            <p className="font-label-sm text-label-sm text-primary-fixed-dim">© Delicias Loli. Todos los derechos reservados. Hecho con dedicación artesanal.</p>
            <p className="font-label-sm text-label-sm text-tertiary-fixed-dim">Córdoba, Argentina</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Pagina
