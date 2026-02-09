import { ReactNode } from "react";

interface ContainerProps {
   children: ReactNode;
   className?: string;
}

export default function Container({
   children,
   className = "",
}: ContainerProps) {
   return (
      <div
         className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-0 ${className}`}
      >
         {children}
      </div>
   );
}
