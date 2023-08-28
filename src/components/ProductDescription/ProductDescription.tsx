import { Description } from '../../types/ProductDetails';
import './ProductDescription.scss';

type Props = {
  description: Description[];
};

export const ProductDescription: React.FC<Props> = ({ description }) => (
  <div className="description">
    <h2 className="description__title">About</h2>

    <hr className="description__line" />

    {description.map(({ title, text }) => (
      <section key={title} className="description__topic">
        <h3 className="description__caption">{title}</h3>

        <article className="description__article">{text}</article>
      </section>
    ))}
  </div>
);
