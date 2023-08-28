import { ProductDetails as ProductType } from '../../types/ProductDetails';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import { TechSpecs as TechSpecsType } from '../../types/TechSpecs';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import './ProductDetails.scss';

type Props = {
  product: ProductType;
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const {
    name,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;

  const techSpecs: TechSpecsType = {
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  };

  return (
    <div className="product-details">
      <h1 className="product-details__title">{name}</h1>

      <div className="product-details__wrapper">
        <div className="product-details__left-info">
          <section className="product-details__photocard">
            <PhotoCard images={images} />
          </section>

          <section className="product-details__about">
            <ProductDescription description={description} />
          </section>
        </div>

        <div className="product-details__right-info">
          <section className="product-details__info">
            <ProductInfo product={product} />
          </section>

          <section className="product-details__tech-specs">
            <TechSpecs techSpecs={techSpecs} />
          </section>
        </div>
      </div>
    </div>
  );
};
