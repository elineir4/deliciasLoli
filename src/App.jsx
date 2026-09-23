import { useEffect, useState } from 'react'
import './App.css'
import heroAnimated from './assets/heroanimado2-Photoroom.png'

const menuLinks = [
  'Mesas dulces',
  'Mesas saladas',
  'Comidas',
  'Reseñas',
  'Contacto',
]

const benefits = [
  {
    icon: 'cookie',
    title: 'Todo casero y hecho a pedido',
    text: 'Ingredientes de primera calidad, sin conservantes y horneado en el día para garantizar sabor inigualable.',
  },
  {
    icon: 'dinner_dining',
    title: 'Mesas armadas según invitados',
    text: 'Cálculo exacto de porciones dulces y saladas para que tu festejo sea perfecto y nadie se quede con ganas.',
  },
  {
    icon: 'local_shipping',
    title: 'Entrega a domicilio y retiro',
    text: 'Coordinamos el horario exacto para que todo llegue impecable, fresco y listo para servir en tu evento.',
  },
]

const products = [
  {
    title: 'Mesa dulce clásica (para 20 personas)',
    type: 'Dulce',
    price: '$45.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6lwwviX4UNHI7rF4y9WmJVpMSkvSn_HlDeFlSUD14BTKT7H5Doncq6ub2gC1NfBWsAnRElOj9o8_K4wL3NKBhZhHPUFUvV3b4DMlPGEhGCOcDpjWb8NrQgEhfE__OFIzXG6cB4XTwyOjYwqqgBwr0CpdSMugeOWWWq6CXPhJKuYbDEauvDmz_rVScPOtfVWp9e7oZBOim363FdX1cNCieznV4w8ko-pkjnH6zNpdERD0hPa8l4tfKA',
  },
  {
    title: 'Mesa salada completa (para 20 personas)',
    type: 'Salado',
    price: '$52.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCui5RBt-J0VHmu4-dBdxEMyp9UU4_ErBbjlHPhewHZVjbbHOc3MKcWFe0oDfivCAHUpgWpNHgC3vDNjZ0xnef_KRb46_WCM7upK6qvpvmOa9HmxcL0Bvv0sq8wtt_9Fjk8RQewYDEKDUY_yUh9yfr76x7-04C_HmbUui3FKOujgFIzOXT6rL0sE5wKmsr7ufEmYUhs-1E_JuhtaEYzCsW13SsTPo1dSMXWiqgB7th0lRkw9kNvYj4JyQ',
  },
  {
    title: 'Docena de empanadas caseras',
    type: 'Salado',
    price: '$16.000',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUNWXsJgLwtiOnmQbjzsS3vKBbxVgh4tZ9PLpDJZMB9uPFFRjum3CkGkwOPxq96D94UJKBdbWoFqtnSXbYPSSUvnV48zRP9kj3IbCU_wwi76z3WLOQTrnVrVXIUkThihU0fdG1nyCj9_i4GLXDBVHQmsrW0jAreU_FQIAEwTGeGMY_9nD6rchy4GfvRzBabfYJtkm8MoYrdpwAXZoUhcx3PdOf2hNAFENZ999jZGLH8V5p-suuQnGcw',
  },
]

function App() {
  const [selectedZone, setSelectedZone] = useState('Córdoba Capital')

  const whatsappMessage = `Hola Loli! Soy de ${selectedZone} y me gustaría consultar sobre mi evento.`
  const whatsappHref = `https://wa.me/543515290303?text=${encodeURIComponent(whatsappMessage)}`

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) return

    const hero = document.getElementById('hero-section')
    const cakeWrapper = document.getElementById('parallax-cake-wrapper')
    const parallaxItems = document.querySelectorAll('.parallax-item')
    if (!hero || !cakeWrapper) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetX = x
      targetY = y
    })

    hero.addEventListener('mouseleave', () => {
      targetX = 0
      targetY = 0
    })

    function updateParallax() {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      const cakeTiltX = -currentY * 12
      const cakeTiltY = currentX * 14
      const cakeTransX = currentX * 18
      const cakeTransY = currentY * 14

      cakeWrapper.style.transform = `translate3d(${cakeTransX}px, ${cakeTransY}px, 0) rotateX(${cakeTiltX}deg) rotateY(${cakeTiltY}deg)`

      parallaxItems.forEach((item) => {
        const speed = Number(item.getAttribute('data-parallax-speed') || 0.04)
        const itemX = currentX * 100 * speed
        const itemY = currentY * 100 * speed
        item.style.transform = `translate3d(${itemX}px, ${itemY}px, 0)`
      })

      requestAnimationFrame(updateParallax)
    }

    const frameId = requestAnimationFrame(updateParallax)
    return () => cancelAnimationFrame(frameId)
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
            {menuLinks.map((link) => (
              <a
                key={link}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            <a
              className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider shadow-[0_4px_12px_rgba(229,18,79,0.18)] hover:shadow-lg transition-all shrink-0"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 bg-background">
        <div className="flex flex-col w-full">
          <section className="relative w-full bg-primary-fixed/30 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24" id="hero-section">
            <div className="absolute top-10 left-6 pointer-events-none opacity-40 select-none animate-pulse">
              <svg fill="none" height="42" viewBox="0 0 42 42" width="42">
                <path d="M12 28C8 22 10 12 18 10C26 8 30 16 28 24C26 32 16 34 12 28Z" fill="#ad2b55" fillOpacity="0.3" />
                <path d="M18 10C16 18 20 22 28 24" stroke="#630029" strokeLinecap="round" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="absolute top-1/3 right-4 pointer-events-none opacity-30 select-none blur-[1px]">
              <svg fill="none" height="56" viewBox="0 0 56 56" width="56">
                <circle cx="28" cy="28" fill="#b9003c" fillOpacity="0.4" r="14" />
                <circle cx="22" cy="22" fill="#e5124f" fillOpacity="0.5" r="8" />
                <circle cx="34" cy="22" fill="#e5124f" fillOpacity="0.5" r="8" />
                <circle cx="28" cy="36" fill="#8a0b3d" fillOpacity="0.5" r="9" />
              </svg>
            </div>

            <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-7 flex flex-col gap-space-sm items-start text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                    <span className="font-label-md text-label-md text-secondary font-bold tracking-wide">Elegí tu zona de entrega:</span>
                    <div className="relative inline-block">
                      <select
                        className="appearance-none bg-transparent pr-6 font-label-md text-label-md text-primary font-bold focus:outline-none cursor-pointer"
                        value={selectedZone}
                        onChange={(event) => setSelectedZone(event.target.value)}
                      >
                        <option value="Córdoba Capital">Córdoba Capital</option>
                        <option value="Villa Allende">Villa Allende</option>
                        <option value="Villa Carlos Paz">Villa Carlos Paz</option>
                        <option value="Alta Gracia">Alta Gracia</option>
                        <option value="La Calera">La Calera</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">expand_more</span>
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
                      href={whatsappHref}
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

                <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center min-h-[420px] lg:min-h-[480px]">
                  <div className="relative w-full max-w-[430px] flex flex-col items-center justify-center select-none" id="cake-interactive-stage">
                    <div className="absolute bottom-2 w-[74%] h-12 rounded-[50%] blur-md anim-cake-shadow pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(138, 11, 61, 0.22) 0%, rgba(138, 11, 61, 0.08) 45%, transparent 75%)' }} />
                    <div className="relative w-full flex items-center justify-center transition-transform duration-200 ease-out z-10" id="parallax-cake-wrapper">
                      <div className="relative w-full anim-floating-cake flex items-center justify-center">
                        <img
                          alt="Pastel artesanal con crema chantilly, fresas frescas y frambuesas"
                          className="w-full max-w-[390px] lg:max-w-[420px] h-auto object-contain pointer-events-none transition-transform duration-300 ease-out"
                          id="hero-floating-cake"
                          src={heroAnimated}
                        />
                      </div>
                    </div>

                    <div className="parallax-item anim-float-slow absolute -top-4 left-6 pointer-events-none transition-transform duration-200 ease-out drop-shadow-md z-20" data-parallax-speed="0.04">
                      <svg fill="none" height="38" viewBox="0 0 34 38" width="34" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="17" cy="18" fill="#b9003c" r="13" />
                        <circle cx="12" cy="13" fill="#e5124f" r="5" />
                        <circle cx="21" cy="13" fill="#e5124f" r="5" />
                        <circle cx="11" cy="21" fill="#e5124f" r="5" />
                        <circle cx="21" cy="21" fill="#e5124f" r="5" />
                        <circle cx="16" cy="27" fill="#8a0b3d" r="4.5" />
                        <circle cx="17" cy="17" fill="#ffb1c1" fillOpacity="0.6" r="4" />
                        <path d="M17 5C17 2 19 1 19 1" stroke="#2d6a4f" strokeLinecap="round" strokeWidth="2" />
                        <path d="M15 6C13 4 11 5 11 5" stroke="#40916c" strokeLinecap="round" strokeWidth="2" />
                        <path d="M19 6C22 5 23 7 23 7" stroke="#40916c" strokeLinecap="round" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="parallax-item anim-float-medium absolute top-4 -right-5 pointer-events-none transition-transform duration-200 ease-out drop-shadow-sm z-20" data-parallax-speed="0.06">
                      <svg fill="none" height="36" viewBox="0 0 40 36" width="40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 28C14 26 28 22 34 8C26 6 12 10 6 22C4 26 6 28 8 28Z" fill="#52b788" />
                        <path d="M8 28C14 26 28 22 34 8" stroke="#2d6a4f" strokeLinecap="round" strokeWidth="1.5" />
                        <path d="M18 20L22 17M14 23L16 21M24 16L27 13" stroke="#2d6a4f" strokeLinecap="round" strokeWidth="1.2" />
                      </svg>
                    </div>

                    <div className="parallax-item anim-float-fast absolute bottom-10 -right-4 pointer-events-none transition-transform duration-200 ease-out drop-shadow-md z-20" data-parallax-speed="-0.05">
                      <svg fill="none" height="32" viewBox="0 0 28 32" width="28" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14" cy="16" fill="#b9003c" r="11" />
                        <circle cx="10" cy="12" fill="#e5124f" r="4.2" />
                        <circle cx="18" cy="12" fill="#e5124f" r="4.2" />
                        <circle cx="9" cy="19" fill="#8a0b3d" r="4" />
                        <circle cx="18" cy="19" fill="#8a0b3d" r="4" />
                        <circle cx="14" cy="23" fill="#630029" r="3.5" />
                        <circle cx="14" cy="15" fill="#ffdadb" fillOpacity="0.6" r="3" />
                      </svg>
                    </div>

                    <div className="parallax-item anim-float-slow absolute bottom-6 -left-3 pointer-events-none transition-transform duration-200 ease-out drop-shadow-sm z-20" data-parallax-speed="-0.03">
                      <svg className="transform -rotate-45" fill="none" height="30" viewBox="0 0 32 30" width="32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 24C12 22 22 16 26 6C18 5 9 10 5 19C4 22 5 24 6 24Z" fill="#74c69d" />
                        <path d="M6 24C12 22 22 16 26 6" stroke="#2d6a4f" strokeLinecap="round" strokeWidth="1.4" />
                        <path d="M14 17L17 15M10 20L12 18" stroke="#2d6a4f" strokeLinecap="round" strokeWidth="1.0" />
                      </svg>
                    </div>

                    <div className="parallax-item anim-float-medium absolute top-1/2 -left-8 pointer-events-none transition-transform duration-200 ease-out drop-shadow-md z-20" data-parallax-speed="0.05">
                      <svg className="transform rotate-12" fill="none" height="30" viewBox="0 0 26 30" width="26" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 28C6 24 3 17 4 10C5 6 9 5 13 5C17 5 21 6 22 10C23 17 20 24 13 28Z" fill="#d90429" />
                        <circle cx="9" cy="12" fill="#ffea00" r="0.9" />
                        <circle cx="15" cy="11" fill="#ffea00" r="0.9" />
                        <circle cx="12" cy="16" fill="#ffea00" r="0.9" />
                        <circle cx="17" cy="18" fill="#ffea00" r="0.9" />
                        <circle cx="9" cy="20" fill="#ffea00" r="0.9" />
                        <circle cx="13" cy="23" fill="#ffea00" r="0.9" />
                        <path d="M13 2V6M9 4L13 6M17 4L13 6" stroke="#40916c" strokeLinecap="round" strokeWidth="1.8" />
                      </svg>
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
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-container-low/40 hover:bg-surface-container-low transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary-fixed/50 flex items-center justify-center text-secondary mb-4 shadow-sm">
                      <span className="material-symbols-outlined text-[32px]">{benefit.icon}</span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold mb-2">{benefit.title}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{benefit.text}</p>
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
                {products.map((product) => (
                  <div key={product.title} className="group flex flex-col bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_-4px_rgba(138,11,61,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(138,11,61,0.14)] transition-all duration-300 overflow-hidden">
                    <div className="relative h-60 overflow-hidden bg-surface-container-low">
                      <img
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={product.image}
                      />
                      <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-primary-fixed text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
                        {product.type}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-primary font-bold uppercase leading-snug">{product.title}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                          {product.type === 'Dulce'
                            ? 'Mini tortas, alfajores, brownies, frutas con chocolate y postrecitos en vasito.'
                            : product.type === 'Salado'
                              ? 'Empanadas, tartas, sándwiches de miga, pizzetas y bocaditos calientes.'
                              : 'Carne cortada a cuchillo, jamón y queso o pollo, con masa hojaldrada casera.'}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 flex items-center justify-between border-t-0">
                        <span className="font-headline-md text-headline-md text-primary-container font-bold">{product.price}</span>
                        <a
                          className="px-6 py-2 rounded-full bg-gradient-to-r from-secondary-container to-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider shadow-sm hover:shadow-md transition-all"
                          href="https://wa.me/5493510000000?text=Hola%20Loli!%20Quiero%20pedir%20un%20presupuesto"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Pedir
                        </a>
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
                      href={whatsappHref}
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

export default App
