import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Logo } from "../../global/components/Logo";
import { Footer } from "../components/Footer";
import { Link } from "react-router";
import Rectangule from "../components/Rectangule";
export const GlobalLayout = ({ children }) => {
  return (
    <div className="bg-[#0D0D0D]">
      {/* HEADER */}
      <Navbar className="dark:bg-[rgba(29, 22, 29, 0.4)] bg-[230,230,230, 0.4]">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              className="bg-[#00C3FF] text-[#F2F2F2] font-bold text-base shadow-lg shadow-[#00C3FF]/40"
            >
              <Link to="/login">Iniciar Sesion</Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="bg-[rgba(29, 22, 29, 0.4)] border border-[#B23BC4] text-[#D189DC]"
            >
              <Link to="/register">Registrate</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/*  */}

      {children}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};
