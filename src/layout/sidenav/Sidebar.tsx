import { Link } from "react-router-dom";
import {
  HomeIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { SessionService } from "@services/session.service";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const session = SessionService.getSession();
  return (
    <aside
      className={`bg-primary-light min-h-screen max-sm:fixed left-0 top-0 z-50 ${
        isOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      <div className="content flex flex-col h-screen w-64 justify-between py-8 px-4 fixed">
        <div>
          <div className="flex item-center justify-around w-full  mb-4 ">
            <h1 className="text-primary font-bold text-lg">
              {session.username}
            </h1>
            <button onClick={() => onClose()}>
              <XMarkIcon className="h-5" />
            </button>
          </div>
          <ul>
            <li className="py-2 px-4">
              <Link to={"/"} className="flex items-center">
                <HomeIcon className="h-4 mr-2" /> Home
              </Link>
            </li>
            <li className="py-2 px-4">
              <Link to={"/products"} className="flex items-center">
                <ShoppingCartIcon className="h-4 mr-2" /> Productos
              </Link>
            </li>
          </ul>
        </div>
        <ul>
          <li className="py-2 px-4">
            <Link
              to={"/login"}
              onClick={() => SessionService.updateSession()}
              className="flex items-center text-warn"
            >
              <HomeIcon className="h-4 mr-2" /> Salir
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
