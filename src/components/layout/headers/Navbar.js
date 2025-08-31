"use client";

const dropdownBannerImage1 = "/img/banner/menu-banner-1.png";
import HomeDropdown from "./HomeDropdown";
import CommonDropdown from "./CommonDropdown";
import PagesDropdown from "./PagesDropdown";
import NavItem from "./NavItem";
import Link from "next/link";
import { useHeaderContex } from "@/providers/HeaderContex";
import Logo from "./Logo";

const Navbar = () => {
  const { headerStyle, headerSize, isNavbarAppointmentBtn, isTextWhite } =
    useHeaderContex();

  const navItemsRaw = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
      dropdown: null,
    },
    {
      name: "Shop",
      path: "/shop",
      dropdown: null,
      isNestedDropdown: null,
    },
    {
      name: "Contact",
      path: "/contact",
      dropdown: null,
    },
  ];

  // Fixed dropdown assignment logic
  const navItems = navItemsRaw?.map((navItem, idx) => {
    let dropdownComponent = null;
    if (navItem.dropdownSection) {
      if (idx === 1 || idx === 2 || idx === 3) {
        dropdownComponent = <CommonDropdown items={navItem.dropdownSection} />;
      } else if (idx === 4) {
        dropdownComponent = <PagesDropdown itmes={navItem.dropdownSection} />;
      }
    }

    return {
      ...navItem,
      dropdown: dropdownComponent,
    };
  });

  return (
    <div
      className={`col header-menu-column ${
        headerStyle === 2 || isTextWhite
          ? " menu-color-white"
          : headerStyle === 5
          ? "justify-content-center align-items-center"
          : ""
      }`}
    >
      {headerStyle === 5 ? <Logo sticky={true} /> : ""}
      <div
        className={`header-menu ${
          headerStyle === 5 ? "header-menu-2" : "d-none d-xl-block "
        } `}
      >
        <nav>
          <div className="ltn__main-menu">
            <ul>
              {navItems?.map((item, idx) => (
                <NavItem key={idx} item={item} />
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
