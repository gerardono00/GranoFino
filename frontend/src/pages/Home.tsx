import { useEffect, useState } from "react";
import { getProducts, type Product } from "../api/products";
import { useCart } from "../context/CartContext";
import Map from "../components/Map";
// Importamos íconos para mejorar la UI y añadir redes sociales
import { Instagram, Facebook, Coffee } from "lucide-react"; 

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();


  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Función mejorada para agregar al carrito
  const handleAddToCart = (product: Product) => {
      // Aseguramos que el precio sea numérico antes de agregarlo
      const priceAsNumber = parseFloat(product.price.toString()); 
      
      addToCart({
          id: product.id!,
          name: product.name,
          price: priceAsNumber,
      });
      alert(`${product.name} añadido al carrito.`);
  };


  return (
    <div className="home-page-container">
      <div className="home-page-wrapper">
        <section className="hero-section">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93" // Mantener tu imagen
            alt="Café"
            className="hero-image"
          />

          <div className="hero-content">
            <h1 className="hero-title">
              Grano Fino
            </h1>

            <p className="hero-subtitle">
              Café artesanal recién tostado  
              <br />
              <span className="hero-highlight">
                directo a tu mesa
              </span>
            </p>
            
            <div className="social-links-hero">
                <a href="#" target="_blank" aria-label="Instagram GranoFino" className="social-icon-link">
                    <Instagram size={28} />
                </a>
                <a href="#" target="_blank" aria-label="Facebook GranoFino" className="social-icon-link">
                    <Facebook size={28} />
                </a>
            </div>
          </div>
        </section>

        <section className="brand-intro-section">
            <h2 className="intro-title">Nuestra Pasión: El Café de Altura</h2>
            <p className="intro-description">
                En GranoFino, nuestra misión es simple: llevar la excelencia del café de altura directamente a tu taza. 
                Seleccionamos manualmente los granos más finos de las regiones montañosas de México, tostándolos con una 
                pasión que se siente en cada sorbo. Somos artesanos del café, dedicados a ofrecerte no solo una bebida, 
                sino una experiencia que deleita tus sentidos.
            </p>
        </section>

        <section className="products-section">
          <h2 className="products-title">
            Nuestro Menú
          </h2>

          <div className="products-grid">
            {products.map((p) => (
              <div
                key={p.id}
                className="product-card"
              >
                <div className="product-image-container">
                    {p.image ? (
                    <img
                        src={p.image}
                        alt={p.name}
                        className="product-image"
                    />
                    ) : (
                        <div className="product-no-image-placeholder">
                            <Coffee size={40} className="product-no-image-icon"/>
                        </div>
                    )}
                </div>

                <div className="product-details">
                  <h3 className="product-name">
                    {p.name}
                  </h3>

                  <p className="product-description">
                    {p.description}
                  </p>

                  <div className="product-footer">
                    <span className="product-price">
                      ${parseFloat(p.price.toString()).toFixed(2)}
                    </span>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="btn-add-to-cart"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2 className="map-title">📍 Visítanos en Nuestra Cafetería</h2>
          <div className="map-wrapper">
             <Map />
          </div>
        </section>

      </div>
    </div>
  );
}