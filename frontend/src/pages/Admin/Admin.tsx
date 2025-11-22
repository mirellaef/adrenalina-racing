import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/api';
import './Admin.css';

interface Product {
  id?: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    category: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se está autenticado
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products');
      setProducts(response.data);
      setError('');
    } catch (err: any) {
      setError('Erro ao carregar produtos. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: 0,
        image: '',
        category: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: 0,
      image: '',
      category: '',
      description: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct && editingProduct.id) {
        // Editar produto
        await api.put(`/api/products/${editingProduct.id}`, formData);
      } else {
        // Criar produto
        await api.post('/api/products', formData);
      }
      await fetchProducts();
      handleCloseModal();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar produto. Tente novamente.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      await api.delete(`/api/products/${id}`);
      await fetchProducts();
    } catch (err: any) {
      setError('Erro ao excluir produto. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </div>

      <div className="admin-content">
        <div className="admin-actions">
          <button onClick={() => handleOpenModal()} className="add-button">
            + Novo Produto
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-message">
                    Nenhum produto cadastrado
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>R$ {product.price.toFixed(2).replace('.', ',')}</td>
                    <td>{product.category}</td>
                    <td>
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => product.id && handleDelete(product.id)}
                        className="delete-button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button className="close-button" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preço</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL da Imagem</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Para Moto">Para Moto</option>
                  <option value="Para Pilotos">Para Pilotos</option>
                  <option value="Oficina">Oficina</option>
                </select>
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="save-button">
                  {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

