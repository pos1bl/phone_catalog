type Props = {
  currentLink: string;
  color?: string;
  capacity?: string;
};

export const getLink = ({ currentLink, color, capacity }: Props) => {
  const splittedLink = currentLink.split('/');
  const phoneId = splittedLink[1].split('-');
  const colorId = phoneId.length - 1;
  const capacityId = phoneId.length - 2;

  if (color) {
    phoneId.splice(colorId, 1, color);
  } else if (capacity) {
    phoneId.splice(capacityId, 1, capacity);
  }

  return `${splittedLink[0]}/${phoneId.join('-')}`;
};
