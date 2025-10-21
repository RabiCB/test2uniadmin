import { Link } from "react-router";

interface ComponentCardProps {
  title: string;
  buttontitle?: string; // Optional button title
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  routelink?: string; // Optional route link for the button
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  buttontitle,
  routelink,
  className = "",
  
}) => {

 
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between items-center+">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
        <Link to={`${routelink}`}>
         <button  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {buttontitle ?? "dlsdl"}
      </button>
        </Link>
       
      </div>
     

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
