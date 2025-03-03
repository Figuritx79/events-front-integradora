export const Footer = () => {
  return (
    <footer className="bg-[rgba(14, 11, 14, 0.4)] flex justify-center items-center flex-row relative w-full">
      <hr />
      <div className="self-start">
        <h4 className="font-bold text-[#CCCCCC] text-xl">
          © 2025 UpEvent. Todos los derechos reservados.
        </h4>
      </div>
      <div className="">
        <a href="#" className="text-[#F2F2F2] font-light">
          Terminos
        </a>
        <a href="#" className="text-[#F2F2F2] font-light">
          Privacidad
        </a>
        <a href="#" className="text-[#F2F2F2] font-light">
          Contacto
        </a>
      </div>
    </footer>
  );
};
