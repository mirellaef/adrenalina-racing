import { useNavigate } from 'react-router-dom';
import { FaMotorcycle, FaTools, FaUser } from 'react-icons/fa';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Para Moto',
      icon: FaMotorcycle,
      color: '#000000',
      category: 'Para Moto'
    },
    {
      id: 2,
      name: 'Oficina',
      icon: FaTools,
      color: '#DC143C',
      category: 'Oficina'
    },
    {
      id: 3,
      name: 'Para Pilotos',
      icon: FaUser,
      color: '#DAA520',
      category: 'Para Pilotos'
    }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.category)}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <Icon className="category-icon" />
              <span className="category-name">{category.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;

