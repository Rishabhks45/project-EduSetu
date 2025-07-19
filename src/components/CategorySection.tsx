import React from 'react';
import { FileText, BookOpen, GraduationCap, MapPin } from 'lucide-react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, description, href, imageSrc }) => {
  return (
    <a 
      href={href}
      className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 rounded-full bg-primary-50 text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </a>
  );
};

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Explore Question Papers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CategoryCard 
            icon={<FileText size={28} />}
            title="Board Wise"
            description="Access question papers from different educational boards across the country"
            href="/board-papers"
            imageSrc="https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg"
          />
          
          <CategoryCard 
            icon={<GraduationCap size={28} />}
            title="University Wise"
            description="Find previous year papers from various universities"
            href="/university-papers"
            imageSrc="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
          />
          
          <CategoryCard 
            icon={<BookOpen size={28} />}
            title="Exam Wise"
            description="Practice with papers from competitive and entrance exams"
            href="/exam-papers"
            imageSrc="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg"
          />
          
          <CategoryCard 
            icon={<MapPin size={28} />}
            title="State Wise"
            description="Browse question papers by different states"
            href="/state-papers"
            imageSrc="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg"
          />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;