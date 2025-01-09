import React from "react";

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  children,
  bgColor = "white",
}) => {
  return (
    <section id={id} className={`py-20 px-4 bg-${bgColor}`}>
      <h2 className="text-4xl font-semibold text-gray-800 text-center">
        {title}
      </h2>
      <div className="mt-12 max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

export default SectionWrapper;
