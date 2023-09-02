import './EmptyContent.scss';

type Props = {
  title: string;
};

export const EmptyContent: React.FC<Props> = ({ title }) => (
  <h1 className="empty-content">
    {`Your ${title} is empty`}
  </h1>
);
