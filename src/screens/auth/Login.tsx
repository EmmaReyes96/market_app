import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@services/auth.service";
import { SessionService } from "@services/session.service";

import Spinner from "@components/spinner/Spinner";
import Person from "@assets/person.svg";
import Icon from "@assets/icon.svg";
import "./Login.css";
import { useSnackbar } from "notistack";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username && !password) {
      enqueueSnackbar("Usuario y Contraseña son requeridos", {
        variant: "warning",
      });
      return;
    }
    if (!username) {
      enqueueSnackbar("El usuario es requerido", {
        variant: "warning",
      });
      return;
    }
    if (!password) {
      enqueueSnackbar("La contraseña es requerida", {
        variant: "warning",
      });
      return;
    }
    try {
      setLoading(true);
      const { token } = await AuthService.login({
        username,
        password,
      });
      const newSession = { username, token: token };
      SessionService.updateSession(newSession);
      navigate("/");
    } catch (e: any) {
      enqueueSnackbar(
        "Usuario o contraseña incorrectos. ¡Inténtalo de nuevo!",
        { variant: "warning" }
      );
    } finally {
      setLoading(false);
    }
  };

  const SubmitTmp: React.FC = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <button className="btn-primary mb-4" type="submit">
          Entrar
        </button>
      );
    }
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <form
        className="flex items-center justify-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="card  w-9/12 h-4/5 flex flex-col  justify-center ">
          <h2 className="text-primary min-[750px]:hidden">Logo Here</h2>
          <span className="text-gray-500">¡Bienvenido!</span>
          <h1 className="text-2xl mt-2 mb-8">Iniciar sesión</h1>
          <div className="flex flex-col  mb-4">
            <span className="text-sm text-gray-500">Usuario</span>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <span className="text-sm text-gray-500">Contraseña</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="self-center">
            <SubmitTmp />
          </div>
          <nav className="text-center">
            <span className="text-sm text-gray-500">
              ¡No tengo una cuenta!{" "}
              <Link to="/" className="text-primary">
                Registrate
              </Link>
            </span>
          </nav>
        </div>
      </form>
      <div className="bg-primary-light flex justify-center  w-2/4 max-[750px]:hidden">
        <div className="max-lg:mt-[50%]  mt-[20%] p-4">
          <img src={Icon} className="" alt="logo" />
          <h1 className="font-bold text-8xl">Market</h1>
        </div>
        <img
          src={Person}
          className="person  max-lg:h-2/4 max-xl:h-3/5 h-3/4"
          alt="person"
        />
      </div>
    </div>
  );
};

export default Login;
