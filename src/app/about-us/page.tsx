import { LocateIcon, Mail, MapIcon, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

function AboutUsPage() {
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <div className="px-4 md:px-6 lg:px-20 w-full lg:w-1/2 h-screen space-y-4 dark:text-gray-600  pt-24">
        <h1 className="text-3xl font-bold">Quem Somos?</h1>
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
      <div className="relative text-right px-4 md:px-6 lg:px-20 w-full lg:w-1/2 h-screen space-y-4 dark:text-gray-600  pt-24 ">
        <Image 
            src={"/team.svg"}
            alt="drawn team"
            width={400}
            height={400}
            className="object-contain absolute top-1/3 opacity-40 -z-20"
        />
        <h1 className="text-3xl font-bold text-right">Contacte-Nos</h1>
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
            <div>
              <p>musekwa@tecmoza.com</p>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-end">
            <MapPin className="w-6 h-6" />
            <div>
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
