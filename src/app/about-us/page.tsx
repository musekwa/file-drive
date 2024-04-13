import { LocateIcon, Mail, MapIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AboutUsPage() {
  return (
    <div className="flex gap-2 md:flex-row  flex-col  min-h-screen">

      <div className="px-4 md:px-6 lg:px-20 pt-16 w-full md:w-1/2">
        <h1 className="text-3xl font-bold pb-6">Quem Somos?</h1>
        <div className="text-[17px] space-y-4 leading-relaxed">
          <p className="">
            A <span className="font-bold">Tecmoza</span> é uma empresa de
            desenvolvimento de aplicações web e móveis, bem como de consultoria
            e treinamento na área digital. Fundada com o objetivo de criar
            soluções tecnológicas de alta qualidade, a Tecmoza desenvolve
            aplicações web e móveis personalizados que atendem às necessidades
            específicas dos seus clientes.
          </p>
          <p>
            Além do desenvolvimento de software, a Tecmoza também oferece
            serviços de consultoria informática e treinamento na área digital,
            ajudando empresas e profissionais a se adaptarem às constantes
            mudanças tecnológicas.
          </p>
          <p>
            A presente aplicação web{" "}
            <span className="font-bold">FileDrive</span> desenvolvido pela
            Tecmoza serve como um exemplo da sua capacidade de criar soluções
            web de excelência, combinando design atraente, funcionalidades
            avançadas e usabilidade intuitiva.
          </p>
        </div>
      </div>
      <div className="px-4 md:px-6 lg:px-20 pt-16 w-full md:w-1/2">
        <div className="relative">

        <Image 
            src={"/team.svg"}
            alt="drawn team"
            width={400}
            height={400}
            className="object-contain absolute top-1/3 opacity-10 -z-20"
            />
            </div>
        <h1 className="text-3xl font-bold text-right pb-6">Contacte-Nos</h1>
        <div className="text-[17px] space-y-4 leading-relaxed">
          <div className="flex gap-4 items-center justify-end">
            <Phone className="w-6 h-6" />
            <div className="space-y-2">
              <p>+258 840445375</p>
              <p>+258 860140080</p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <Mail className="w-6 h-6" />
            <div className="space-y-2">
              <p>musekwa@tecmoza.com</p>
              <Link href={"https://www.tecmoza.com/en/contact-us"} className="hover:text-sky-800 cursor-pointer" target="_blank" rel="noopener noreferrer">
                www.tecmoza.com
              </Link>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <MapPin className="w-6 h-6" />
            <div className="space-y-2">
              <p>Av. 25 de Setembro, Nr. 412,</p>
              <p>Maputo, Moçambique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
