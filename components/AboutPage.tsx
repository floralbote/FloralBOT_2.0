
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-2xl font-bold text-emerald-700 font-lora mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white font-lora mb-8">
        Sobre a Terapia Floral de Bach
      </h2>
      <div className="space-y-6">
        <InfoCard title="O que é?">
          A Terapia Floral de Bach é um sistema de cura natural, desenvolvido pelo Dr. Edward Bach na década de 1930. Baseia-se no uso de 38 essências extraídas de flores silvestres, cada одна correspondendo a um estado emocional específico. O objetivo é equilibrar as emoções, promovendo bem-estar e saúde.
        </InfoCard>
        <InfoCard title="Como funciona?">
          Dr. Bach acreditava que as emoções em desordem podiam causar doenças. As essências florais ajudam a harmonizar nosso interior, transformando sentimentos ruins, como medo e incerteza, em qualidades boas, como coragem e paz.
        </InfoCard>
        <InfoCard title="Para quem é indicada?">
          A terapia floral é indicada para todas as idades, desde bebês até idosos, e também para animais e plantas. Por ser uma terapia complementar, pode ser utilizada em conjunto com outros tratamentos, sem contraindicações ou efeitos colaterais. Ela trata a pessoa, não a doença.
        </InfoCard>
         <InfoCard title="Os 7 Grupos Emocionais">
          Dr. Bach classificou as 38 essências em sete grupos principais de estados mentais e emocionais: Medo, Incerteza, Falta de interesse no presente, Solidão, Hipersensibilidade a influências e ideias, Desespero ou desalento, e Cuidado excessivo com o bem-estar dos outros.
        </InfoCard>
      </div>
    </div>
  );
};

export default AboutPage;