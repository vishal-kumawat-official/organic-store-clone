import { useState } from "react";
import { Menu, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const leftNavbarLinks = [
    { name: "Everything", href: "/shop" },
    { name: "Groceries", href: "/groceries" },
    { name: "Juice", href: "/juice" },
  ];

  const rightNavbarLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const logo =
    "https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/06/organic-store-logo5.svg";

  return (
    <>
      <nav className="p-4 px-8 bg-white flex items-center justify-between w-full">
        <div className="flex items-center">
          <img src={logo} alt="nav-logo" width={145} />
          <ul className="hidden lg:flex gap-11 ml-8">
            {leftNavbarLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-gray-800">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden lg:flex gap-11">
          {rightNavbarLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="text-gray-800">
                {link.name}
              </Link>
            </li>
          ))}
          <div className="flex items-center gap-4 cursor-pointer">
            <p className="text-[#8bc34a] font-bold">£225.00</p>
            <div onClick={() => setDrawerOpen(true)}>
              <ShoppingBag size={18} color="#8bc34a" />
            </div>
            <div>
              <User size={22} color="#000000" />
            </div>
          </div>
        </ul>
        <div className="flex items-center gap-3 lg:hidden">
          <p className="text-[#8bc34a] font-bold">£225.00</p>
          <div onClick={() => setDrawerOpen(true)}>
            <ShoppingBag size={18} color="#8bc34a" />
          </div>
          <div>
            <Menu color="#ffffff" className="bg-[#8bc34a]" />
          </div>
        </div>
      </nav>

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Navbar;
