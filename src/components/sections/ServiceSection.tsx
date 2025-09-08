// components/sections/ServiceSection.tsx (keep 'use client' due to modal state, add dict for translations)
'use client';

import React, { useState } from 'react';
import { User, Zap, Users, Award, X } from 'lucide-react';

interface ServiceSectionProps {
  dict: any;
}

// Update services with keys for title and description
const getServices = (dict: any) => [
  {
    title: dict.personal_coaching,
    icon: <User className="w-6 h-6" />,
    description: dict.personal_coaching_description,
  },
  {
    title: dict.skill_development,
    icon: <Zap className="w-6 h-6" />,
    description: dict.skill_development_description,
  },
  {
    title: dict.group_training,
    icon: <Users className="w-6 h-6" />,
    description: dict.group_training_description,
  },
  {
    title: dict.training_camps,
    icon: <Award className="w-6 h-6" />,
    description: dict.training_camps_description,
  },
];

// Reusable component for a single service card.
const ServiceCard = ({ title, icon, onClick }: { title: string; icon: React.ReactNode; onClick: () => void }) => {
  return (
    <div
      className="p-6 rounded-xl border border-gray-700 text-center
                 hover:border-[#4ef5ff] hover:shadow-lg hover:bg-[#2a2847]
                 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center
                      mx-auto mb-4 text-[#4ef5ff] text-xl bg-[#2a2847]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    </div>
  );
};

// Component for the pop-up modal.
const ServiceModal = ({ service, onClose }: { service: any; onClose: () => void }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4" id='offer'>
      <div className="bg-[#1a1a2e] text-white p-8 md:p-12 rounded-xl border border-gray-700 max-w-lg md:max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-[#4ef5ff] bg-[#2a2847]">
            {React.cloneElement(service.icon as React.ReactElement, { className: 'w-8 h-8' })}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">{service.title}</h2>
        </div>
        <p className="text-gray-300 text-base leading-relaxed text-center">{service.description}</p>
      </div>
    </div>
  );
};

// The main component that renders the entire section.
export default function ServiceSection({ dict }: ServiceSectionProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const services = getServices(dict);

  const handleOpenModal = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <section className="px-4 md:px-6 py-16 rounded-2xl shadow-xl border max-w-7xl mx-auto bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-gray-700 mb-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            {dict.what_we_offer}
          </h2>
          <div className="w-24 h-1 bg-[#4ef5ff] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              icon={service.icon}
              onClick={() => handleOpenModal(service)}
            />
          ))}
        </div>
      </section>

      {isModalOpen && selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </>
  );
}