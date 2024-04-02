import Icon from "@assets/icon.svg";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="card w-3/5 max-sm:w-4/5 flex items-center gap-4 overflow-x-auto">
        <Link to={"/products"}>
          <button className="card flex flex-col items-center">
            <ShoppingCartIcon className="h-10 mr-2 text-primary" />{" "}
            <span>Lista de Productos</span>
          </button>
        </Link>
        <div className="p-4">
          <img src={Icon} className="" alt="logo" />
          <p>
            Nuestra aplicación de gestión de productos es la solución perfecta
            para empresas y emprendedores que buscan optimizar sus procesos y
            llevar su negocio al siguiente nivel.
          </p>
          <p className="text-primary">
            ¡Únete a nosotros hoy y descubre todo lo que nuestra plataforma
            puede hacer por ti!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
