import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "../../api/products";
import { Plus, Edit, Trash2, X, Image, DollarSign, List, Tag, Package } from "lucide-react";

type FormProduct = Omit<Product, 'id'> & { id?: number };

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormProduct>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });

  const loadProducts = async () => {
    try {
        const data = await getProducts();
        setProducts(data);
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productToSend = { ...form, price: parseFloat(form.price.toString()) }; 

    try {
        if (editingId) {
            await updateProduct(editingId, productToSend as Product);
        } else {
            await createProduct(productToSend as Product);
        }
    } catch (error) {
        console.error("Error al guardar producto:", error);
        alert(`Error al ${editingId ? 'actualizar' : 'crear'} el producto.`);
        return;
    }

    resetForm();
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setForm({ ...product, price: parseFloat(product.price.toString()) }); 
    setEditingId(product.id!);
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar el producto.");
      }
    }
  };

  return (
    <div className="admin-content-page">
      <h1 className="dashboard-header-title">
        <Package size={30} className="header-icon"/> Gestión de Productos
      </h1>

      <div className="form-card">
        <h2 className="form-title">
            {editingId ? "Editar Producto" : "Crear Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="admin-form-grid">
            
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    placeholder="Ej: Café Blend Clásico"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
            </div>

            <div className="form-group span-full-row">
                <label>Descripción</label>
                <textarea
                    placeholder="Breve descripción del producto (máx 150 caracteres)"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    maxLength={150}
                />
            </div>
            
            <div className="form-group">
                <label><DollarSign size={14} className="input-icon"/> Precio (MXN)</label>
                <input
                    type="number"
                    placeholder="Ej: 150.00"
                    // Corrección: Usamos value={form.price || ""} para mostrar placeholder cuando price es 0
                    value={form.price || ""}
                    // Corrección: Si el input está vacío, lo tratamos como 0 para mantener el tipo number
                    onChange={e => setForm({ ...form, price: e.target.value === "" ? 0 : Number(e.target.value) })}
                    min="0.01"
                    step="0.01"
                    required
                />
            </div>

            <div className="form-group">
                <label><Tag size={14} className="input-icon"/> Categoría</label>
                <input
                    type="text"
                    placeholder="Ej: Grano, Molido, Accesorios"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    required
                />
            </div>

            <div className="form-group span-full-row">
                <label><Image size={14} className="input-icon"/> Imagen (URL)</label>
                <input
                    type="url"
                    placeholder="Ej: https://miservidor.com/imagen.jpg"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                />
            </div>

            <div className="form-actions span-full-row">
                <button type="submit" className="btn-primary-admin">
                  {editingId ? <><Edit size={20}/> Actualizar</> : <><Plus size={20}/> Crear Producto</>}
                </button>

                {editingId && (
                  <button type="button" onClick={resetForm} className="btn-secondary-admin">
                    <X size={20}/> Cancelar Edición
                  </button>
                )}
            </div>
        </form>
      </div>
      
      <h2 className="section-title-admin">
          <List size={20}/> Listado de {products.length} Productos
      </h2>
      
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className={editingId === p.id ? 'row-editing' : ''}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td className="text-right">${parseFloat(p.price.toString()).toFixed(2)}</td>
                <td>{p.category}</td>
                <td className="description-cell">{p.description}</td>
                <td>
                  <div className="actions-group">
                    <button 
                      onClick={() => handleEdit(p)} 
                      className="btn-action-edit"
                      title="Editar"
                    >
                        <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id!)} 
                      className="btn-action-delete"
                      title="Eliminar"
                    >
                        <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}