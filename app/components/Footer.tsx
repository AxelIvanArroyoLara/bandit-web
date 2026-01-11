export default function Footer() {
  const socialIcons = ['🐦', '📸', '📘', '🎵'];
  
  return (
    <footer className="bg-gradient-to-t from-black to-comic-black border-t-4 border-gta-orange pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Logo footer */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-gta text-alucin-neon comic-border inline-block px-6 py-2">
            PerfumesBandido
          </h2>
          <p className="font-comic text-gray-400 mt-4">
            Solo para aquellos que se atreven a marcar su estilo
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialIcons.map((icon, index) => (
            <a 
              key={index}
              href="#" 
              className="text-3xl hover:text-alucin-neon hover:scale-110 transition-transform"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-comic text-gray-500">
            © 2024 PerfumesBandido. Todos los derechos reservados. 
            <span className="text-gta-orange"> ¡No somos un cartel, pero vendemos esencia!</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Este sitio es solo para fines de demostración.
          </p>
        </div>
      </div>
    </footer>
  );
}