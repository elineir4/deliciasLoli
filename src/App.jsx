import { useEffect, useState } from 'react'
import './App.css'
import imagenHero from './assets/heroanimado3-Photoroom.png'

const enlacesMenu = [
  'Mesas dulces',
  'Mesas saladas',
  'Comidas',
  'Reseñas',
  'Contacto',
]

const beneficios = [
  {
    icono: 'cookie',
    titulo: 'Todo casero y hecho a pedido',
    descripcion: 'Ingredientes de primera calidad, sin conservantes y horneado en el día para garantizar sabor inigualable.',
  },
  {
    icono: 'dinner_dining',
    titulo: 'Mesas armadas según invitados',
    descripcion: 'Cálculo exacto de porciones dulces y saladas para que tu festejo sea perfecto y nadie se quede con ganas.',
  },
  {
    icono: 'local_shipping',
    titulo: 'Entrega a domicilio y retiro',
    descripcion: 'Coordinamos el horario exacto para que todo llegue impecable, fresco y listo para servir en tu evento.',
  },
]

const productos = [
  {
    nombre: 'Mesa dulce clásica (para 20 personas)',
    tipo: 'Dulce',
    precio: '$45.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6lwwviX4UNHI7rF4y9WmJVpMSkvSn_HlDeFlSUD14BTKT7H5Doncq6ub2gC1NfBWsAnRElOj9o8_K4wL3NKBhZhHPUFUvV3b4DMlPGEhGCOcDpjWb8NrQgEhfE__OFIzXG6cB4XTwyOjYwqqgBwr0CpdSMugeOWWWq6CXPhJKuYbDEauvDmz_rVScPOtfVWp9e7oZBOim363FdX1cNCieznV4w8ko-pkjnH6zNpdERD0hPa8l4tfKA',
  },
  {
    nombre: 'Mesa salada completa (para 20 personas)',
    tipo: 'Salado',
    precio: '$52.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCui5RBt-J0VHmu4-dBdxEMyp9UU4_ErBbjlHPhewHZVjbbHOc3MKcWFe0oDfivCAHUpgWpNHgC3vDNjZ0xnef_KRb46_WCM7upK6qvpvmOa9HmxcL0Bvv0sq8wtt_9Fjk8RQewYDEKDUY_yUh9yfr76x7-04C_HmbUui3FKOujgFIzOXT6rL0sE5wKmsr7ufEmYUhs-1E_JuhtaEYzCsW13SsTPo1dSMXWiqgB7th0lRkw9kNvYj4JyQ',
  },
  {
    nombre: 'Docena de empanadas caseras',
    tipo: 'Salado',
    precio: '$16.000',
    imagen:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUNWXsJgLwtiOnmQbjzsS3vKBbxVgh4tZ9PLpDJZMB9uPFFRjum3CkGkwOPxq96D94UJKBdbWoFqtnSXbYPSSUvnV48zRP9kj3IbCU_wwi76z3WLOQTrnVrVXIUkThihU0fdG1nyCj9_i4GLXDBVHQmsrW0jAreU_FQIAEwTGeGMY_9nD6rchy4GfvRzBabfYJtkm8MoYrdpwAXZoUhcx3PdOf2hNAFENZ999jZGLH8V5p-suuQnGcw',
  },
]

const zonasEntrega = ['Córdoba Capital', 'Villa Allende', 'La Calera', 'Mendiolaza', 'Unquillo']

function Pagina() {
  const [zonaElegida, establecerZonaElegida] = useState('Córdoba Capital')
  const [selectorZonaAbierto, establecerSelectorZonaAbierto] = useState(false)
  const [carrito, establecerCarrito] = useState([])
  const [carritoAbierto, establecerCarritoAbierto] = useState(false)

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

  useEffect(() => {
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (movimientoReducido.matches) return

    const seccionHero = document.getElementById('hero-section')
    const contenedorTorta = document.getElementById('parallax-cake-wrapper')
    const elementosParallax = document.querySelectorAll('.parallax-item')
    if (!seccionHero || !contenedorTorta) return

    let objetivoX = 0
    let objetivoY = 0
    let actualX = 0
    let actualY = 0

    seccionHero.addEventListener('mousemove', (evento) => {
      const limites = seccionHero.getBoundingClientRect()
      const posicionX = (evento.clientX - limites.left) / limites.width - 0.5
      const posicionY = (evento.clientY - limites.top) / limites.height - 0.5
      objetivoX = posicionX
      objetivoY = posicionY
    })

    seccionHero.addEventListener('mouseleave', () => {
      objetivoX = 0
      objetivoY = 0
    })

    function actualizarParallax() {
      actualX += (objetivoX - actualX) * 0.08
      actualY += (objetivoY - actualY) * 0.08

      const inclinacionTortaX = -actualY * 12
      const inclinacionTortaY = actualX * 14
      const desplazamientoTortaX = actualX * 18
      const desplazamientoTortaY = actualY * 14

      contenedorTorta.style.transform = `translate3d(${desplazamientoTortaX}px, ${desplazamientoTortaY}px, 0) rotateX(${inclinacionTortaX}deg) rotateY(${inclinacionTortaY}deg)`

      elementosParallax.forEach((elemento) => {
        const velocidad = Number(elemento.getAttribute('data-parallax-speed') || 0.04)
        const desplazamientoX = actualX * 100 * velocidad
        const desplazamientoY = actualY * 100 * velocidad
        elemento.style.transform = `translate3d(${desplazamientoX}px, ${desplazamientoY}px, 0)`
      })

      requestAnimationFrame(actualizarParallax)
    }

    const idAnimacion = requestAnimationFrame(actualizarParallax)
    return () => cancelAnimationFrame(idAnimacion)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_8px_24px_-4px_rgba(138,11,61,0.06)]">
        <div className="h-20 max-w-[1280px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-sm">
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
                href="#"
              >
                {enlace}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
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
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider shadow-[0_4px_12px_rgba(229,18,79,0.18)] hover:shadow-lg transition-all shrink-0"
              href={enlaceWhatsApp}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden sm:inline">Hablar por WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full">
          <section className="relative w-full bg-primary-fixed/30 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24" id="hero-section">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-7 flex flex-col gap-space-sm items-start text-left animar-entrada-izquierda">
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
                      href={enlaceWhatsApp}
                      rel="noopener noreferrer"
                      target="_blank"
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

                <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center min-h-[420px] lg:min-h-[480px] animar-entrada-derecha">
                  <div className="relative w-full max-w-[430px] flex flex-col items-center justify-center select-none" id="cake-interactive-stage">
                    <div className="absolute bottom-2 w-[74%] h-12 rounded-[50%] blur-md anim-cake-shadow pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138, 11, 61, 0.22) 0%, rgba(138, 11, 61, 0.08) 45%, transparent 75%)' }} />
                    <div className="relative w-full flex items-center justify-center transition-transform duration-200 ease-out z-10" id="parallax-cake-wrapper">
                      <div className="relative w-full anim-floating-cake flex items-center justify-center">
                        <img
                          alt="Pastel artesanal con crema chantilly, fresas frescas y frambuesas"
                          className="w-full max-w-[390px] lg:max-w-[420px] h-auto object-contain pointer-events-none transition-transform duration-300 ease-out"
                          id="hero-floating-cake"
                          src={imagenHero}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <div className="w-full absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
              <svg className="w-full h-12 md:h-16 text-surface-container-lowest fill-current preserve-3d" fill="none" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,32 C240,75 480,10 720,48 C960,86 1200,20 1440,55 L1440,80 L0,80 Z" />
              </svg>
            </div>
          </section>

          <section className="w-full bg-surface-container-lowest py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {beneficios.map((beneficio) => (
                  <div key={beneficio.titulo} className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-low transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary-fixed/50 flex items-center justify-center text-secondary mb-4 shadow-sm">
                      <span className="material-symbols-outlined text-[32px]">{beneficio.icono}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold mb-2">{beneficio.titulo}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{beneficio.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-lowest py-16 md:py-24" id="productos">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container uppercase font-bold tracking-tight">
                  MIRÁ LO QUE PODEMOS PREPARAR PARA VOS
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                  Variedades seleccionadas con dedicación artesanal para consentir a tus invitados.
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-fixed text-primary-container font-label-md text-label-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary-container" />
                    Mesas dulces
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
                    Mesas saladas
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
                    Empanadas
                  </button>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md">
                    Comidas
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {productos.map((producto) => (
                  <div key={producto.nombre} className="group flex flex-col bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_-4px_rgba(138,11,61,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(138,11,61,0.14)] transition-all duration-300 overflow-hidden">
                    <div className="relative h-60 overflow-hidden bg-surface-container-low">
                      <img
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={producto.imagen}
                      />
                      <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-primary-fixed text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                        {producto.tipo}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary font-bold uppercase leading-snug">{producto.nombre}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                          {producto.tipo === 'Dulce'
                            ? 'Mini tortas, alfajores, brownies, frutas con chocolate y postrecitos en vasito.'
                            : producto.tipo === 'Salado'
                              ? 'Empanadas, tartas, sándwiches de miga, pizzetas y bocaditos calientes.'
                              : 'Carne cortada a cuchillo, jamón y queso o pollo, con masa hojaldrada casera.'}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 flex items-center justify-between border-t-0">
                        <span className="font-headline-md text-headline-md text-primary-container font-bold">{producto.precio}</span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
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
            </div>
          </section>

          <section className="relative w-full bg-primary-fixed/30 py-20 overflow-hidden" id="como-pedir">
            <div className="w-full absolute top-0 left-0 right-0 leading-none pointer-events-none transform rotate-180">
              <svg className="w-full h-10 text-surface-container-lowest fill-current" fill="none" viewBox="0 0 1440 60">
                <path d="M0,20 C360,50 720,0 1080,30 C1260,45 1380,10 1440,25 L1440,60 L0,60 Z" />
              </svg>
            </div>
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin relative z-10 pt-4">
              <div className="text-center max-w-xl mx-auto mb-14">
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container uppercase font-bold tracking-tight">
                  ARMAR TU MESA ES FÁCIL
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 font-medium">
                  En cuatro pasos tenés todo listo para tu evento
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1">
                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right p-5 rounded-2xl bg-surface-container-lowest/80 backdrop-blur shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary flex items-center justify-center font-headline-sm font-bold shadow-[0_4px_16px_rgba(229,18,79,0.35)] mb-3">1</div>
                    <h4 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">1. Contanos tu evento</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Fecha, lugar y cantidad de agasajados.</p>
                  </div>

                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right p-5 rounded-2xl bg-surface-container-lowest/50">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-primary-container flex items-center justify-center font-headline-sm font-bold shadow-sm mb-3">2</div>
                    <h4 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">2. Elegí tu menú</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Combiná opciones dulces y saladas.</p>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
                  <div className="relative w-full max-w-md">
                    <div className="rounded-3xl overflow-hidden shadow-[0_20px_40px_-8px_rgba(138,11,61,0.18)] bg-surface-container-lowest">
                      <img
                        alt="Mesa de varios pisos con mini cakes, alfajores y macarons para eventos"
                        className="w-full h-80 sm:h-96 object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBuzR50vRBViucR6ZEl0eScTa2zYI-M7e8kAH6yRQIDV3ecVQ9P-C--bnCwUxme0OoBdY501dcX5iYWPcNpPxS6leL2uNGr6oXkSSapucRc0Z7GdlsjwlvbLlH-jm23IEesbU1I7Vg7YtByhHq20eLC30yKzq3CBFhb6jNVdnXo1WuXopX7SNH6L1A2hx4YtKh0Zu3mDicki_qzIOC-BvMtDrNT6KNlT0TeJKJ_o6FmxAF4wrjUlFpRQ"
                      />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-surface-container-lowest/95 backdrop-blur px-5 py-2 rounded-full shadow-md text-center whitespace-nowrap">
                      <span className="font-script text-2xl text-primary-container">Hecho con dedicación</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 flex flex-col gap-8 order-3">
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-5 rounded-2xl bg-surface-container-lowest/50">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-primary-container flex items-center justify-center font-headline-sm font-bold shadow-sm mb-3">3</div>
                    <h4 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">3. Recibí tu presupuesto</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Detalle claro y personalizado por WhatsApp.</p>
                  </div>

                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-5 rounded-2xl bg-surface-container-lowest/50">
                    <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-primary-container flex items-center justify-center font-headline-sm font-bold shadow-sm mb-3">4</div>
                    <h4 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">4. Retirá o recibí en tu casa</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">Llega todo fresco y listo para presentar.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-lowest py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin">
              <div className="relative overflow-hidden rounded-3xl bg-primary-fixed/40 p-8 sm:p-12 md:p-16 text-center shadow-[0_12px_32px_-4px_rgba(138,11,61,0.08)]">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-space-sm">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-container-lowest text-secondary shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    <span className="font-label-sm text-label-sm font-bold tracking-wide">Respondemos en menos de 1 hora</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase font-bold tracking-tight">
                    ¿TENÉS UN EVENTO EN MENTE?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                    Escribinos por WhatsApp y Loli te arma un presupuesto sin compromiso
                  </p>
                  <div className="mt-4">
                    <a
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-lg text-label-lg uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
                      href={enlaceWhatsApp}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                      Hablar por WhatsApp
                    </a>
                  </div>
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
