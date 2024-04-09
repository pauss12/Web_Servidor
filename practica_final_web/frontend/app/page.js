import Link from 'next/link';
import "./styles/homePage.css"

export default function Home() {
  return (
      <div className="pagina-principal">
        
        <br></br>
        <h1 className="titulo">HOME</h1>
          
        <div className="contenedor bg-gray-100 p-8">
        {/* Sección de Registro */}
        <div className="cuadrado-registro mb-8">
          <Link href="./registro">
              <img src="/imagenes/imagenRegistro.jpg" className="imagen-registro"  alt="Registro" />
            </Link>
        </div>

        {/* Sección de iniciar sesión */}
        <div className="cuadrado-login">
            <Link href="./iniciar_sesion">
                <img src="imagenes/inicioSesion.jpg" className="imagen-inicio" alt="Iniciar sesión" />
            </Link>
        </div>
        </div>
    </div>
  );
}
