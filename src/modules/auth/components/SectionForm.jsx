import { LogoImage } from "./LogoImage";

export const SectionForm = () => {
  return (
    <div className="hidden md:flex md:flex-col md:justify-center md:items-center ">
      <LogoImage />
      <div className="text-[#F2F2F2] text-lg mt-4">
        <p>Inscribete en eventos con UpEvent que sean de tu</p>
        <p>interés para asistir y visitar los talleres disponibles,</p>
        <p>además de escuchar los temas que abordarán los</p>
        <p>ponentes principales.</p>
      </div>
    </div>
  );
};
