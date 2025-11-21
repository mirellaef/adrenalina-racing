import { FaMotorcycle, FaTools, FaUser } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Para Moto',
      icon: FaMotorcycle,
      color: '#000000',
      link: '#para-moto'
    },
    {
      id: 2,
      name: 'Oficina',
      icon: FaTools,
      color: '#DC143C',
      link: '#oficina'
    },
    {
      id: 3,
      name: 'Para Pilotos',
      icon: FaUser,
      color: '#DAA520',
      link: '#para-pilotos'
    }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <a
              key={category.id}
              href={category.link}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <Icon className="category-icon" />
              <span className="category-name">{category.name}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;

