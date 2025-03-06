import { Form, Input, Button, Link } from "@heroui/react";
import { label } from "framer-motion/client";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import React from "react";
export const FormLogin = () => {
  const [isVisble, setIsVisible] = React.useState(false);
  const visibility = () => setIsVisible(!isVisble);
  return (
    <Form className="mt-10 flex justify-center items-center">
      <div>
        <Input
          type="email"
          labelPlacement="outside"
          label="Correo"
          placeholder="joeDoe@gmail.com"
          isRequired
          endContent={<Mail />}
          errorMessage="Ingres un correo valido"
          variant="bordered"
          classNames={{
            inputWrapper: [
              "w-80",
              "shadow-xl",
              "bg-transparent",
              "border-[#D189DC]",
              "backdrop-blur-xl",
              "group-data-[focus=true]:border-[#B23BC4]",
            ],
          }}
          color="success"
          size="lg"
        />
      </div>
      <div className="mt-6">
        <Input
          variant="bordered"
          isRequired
          labelPlacement="outside"
          color="success"
          placeholder="****"
          label="Contraseña"
          endContent={
            <button
              aria-label="toggle password visibility "
              className="focus:outline-none"
              type="button"
              onClick={visibility}
            >
              {isVisble ? (
                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <Eye className="text-2xl pointer-events-none" />
              )}
            </button>
          }
          type={isVisble ? "text" : "password"}
          classNames={{
            inputWrapper: [
              "w-80",
              "shadow-xl",
              "bg-transparent",
              "border-[#D189DC]",
              "backdrop-blur-xl",
              "group-data-[focus=true]:border-[#B23BC4]",
            ],
          }}
          size="lg"
        />
        <p className="text-right mt-1">
          <Link className="text-[10px] text-[#D189DC]" href="/recover-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
      <Button
        className=" w-80 bg-[#00C3FF] text-[#F2F2F2] font-bold text-base shadow-lg shadow-[#00C3FF]/40 "
        size="lg"
      >
        Iniciar Sesion
      </Button>
      <div className="mt-2 flex flex-row ">
        <hr className="w-[74px] border-1 border-white relative mt-[14px] mr-2" />
        <p className="text-[#F2F2F2] font-light">¿No tienes una cuenta?</p>
        <hr className="w-[74px] border-1 border-white relative mt-[14px] ml-2" />
      </div>
      <Button
        className="mt-2 border-[#B23BC4] text-[#F2F2F2] w-80  font-bold text-base shadow-lg shadow-[#B23BC4]/40 bg-[#B23BC4]"
        size="lg"
      >
        <Link className="text-[#F2F2F2]" href="/register">
          Registrate
        </Link>
      </Button>
    </Form>
  );
};
