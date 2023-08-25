/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType, getProducts } from '../../api/getProducts';
import SectionTopBar from '../SectionTopBar';
import ProductCard from '../ProductCard';
import { Product } from '../../types/Phone';

const productsAmountInfo = (products: Product[] | undefined) => {
  if (products?.length === 0 || !products) {
    return 'No models yet';
  }

  if (products.length === 1) {
    return '1 model';
  }

  return `${products.length} models`;
};

const Main = () => {
  // const [
  //   productsWithDiscount,
  //   setProductsWithDiscount,
  // ] = useState<Product[] | null>(null);

  // const [
  //   newProducts,
  //   setNewProducts,
  // ] = useState<Product[] | null>(null);

  const [products, setProducts] = useState<Product[] | null>(null);

  const [currentIndexOfHot, setCurrentIndexOfHot] = useState(0);
  const [currentIndexOfNew, setCurrentIndexOfNew] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    // getProductsWithDiscount().then((productsFromAPI) => setProductsWithDiscount(productsFromAPI));
    // getNewProducts().then((productsFromAPI) => setNewProducts(productsFromAPI));
    getProducts().then((productsFromAPI) => setProducts(productsFromAPI));
  }, []);

  const productsWithDiscount = useMemo(() => products?.filter((product) => product.discount > 0), [products]);
  const newProducts = useMemo(() => products?.filter((product) => product.discount === 0), [products]);
  const phones = useMemo(() => products?.filter((product) => product.type === ProductType.PHONE), [products]);
  const tablets = useMemo(() => products?.filter((product) => product.type === ProductType.TABLET), [products]);
  const accessories = useMemo(() => products?.filter((product) => product.type === ProductType.ACCESSORY), [products]);

  const visibleHotPrices = useMemo(() => productsWithDiscount?.slice(
    currentIndexOfHot, currentIndexOfHot + productsPerPage,
  ),
  [productsWithDiscount, currentIndexOfHot]);

  const visibleNew = useMemo(() => newProducts?.slice(
    currentIndexOfNew, currentIndexOfNew + productsPerPage,
  ),
  [newProducts, currentIndexOfNew]);

  return (
    <main className="main container">
      <section className="section">
        <SectionTopBar
          title="Hot prices"
          // productsLength={productsWithDiscount?.length || 0}
          currentIndex={currentIndexOfHot}
          setCurrentIndex={setCurrentIndexOfHot}
          productsPerPage={productsPerPage}
          filteredProducts={productsWithDiscount || []}
        />

        <div className="browse-products">
          {visibleHotPrices?.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title categories-title">Shop by category</h2>

        <div className="categories">
          <article className="categories__mobile">
            <Link to="/phones">
              <div className="categories__mobile--photo category-photo" />
            </Link>

            <h3 className="categories__title">Mobile phones</h3>

            <p className="categories__amount">
              {productsAmountInfo(phones as Product[])}
            </p>
          </article>

          <article className="categories__tablets">
            <Link to="/tablets">
              <div className="categories__tablets--photo category-photo" />
            </Link>

            <h3 className="categories__title">Tablets</h3>

            <p className="categories__amount">
              {productsAmountInfo(tablets as Product[])}
            </p>
          </article>

          <article className="categories__accessories">
            <Link to="/accessories">
              <div className="categories__accessories--photo category-photo" />
            </Link>

            <h3 className="categories__title">Accessories</h3>

            <p className="categories__amount">
              {productsAmountInfo(accessories as Product[])}
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionTopBar
          title="Brand new models"
          // productsLength={newProducts?.length || 0}
          currentIndex={currentIndexOfNew}
          setCurrentIndex={setCurrentIndexOfNew}
          productsPerPage={productsPerPage}
          filteredProducts={newProducts || []}
        />

        <div className="browse-products">
          {visibleNew?.slice(0, 4).map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
