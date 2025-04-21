import { BiChevronDown } from "react-icons/bi";
import { FaDoorOpen, FaGear } from "react-icons/fa6";
import { useAuth } from "../../../contexts/AuthContext";
import Menu from "./Menu/Menu";
import { menuItems } from "./menuPaths";


const Navbar = () => {
    const {user,signOut}=useAuth();

  return (
    <div className="navbar bg-base-200">
      <div className="ps-4">
        <a className="text-3xl font-bold">NeoEduc</a>
      </div>
      <div>
      <Menu 
        items={menuItems} 
      />
      </div>
      <div className="flex grow justify-end px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-field text-lg"
            >
              Olá {user?.name   }!
              <BiChevronDown />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a href="">
                  <FaGear size={20} />
                  Configurações
                </a>
              </li>
              <li>
                <button onClick={signOut}>
                  <FaDoorOpen className="text-red-500" size={20} />
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
