import { PhoneCard } from '../types/PhoneCard';
import API_URL from './data/api-url';

type FetchPhones = (amount?: number) => Promise<PhoneCard[]>;

export const getPhones: FetchPhones = async () => {
  const response = await fetch(API_URL);

  return response.json();
};

export const getHotPricePhones: FetchPhones = async (amount = 12) => {
  const phones = await getPhones();

  return phones
    .sort((phone1, phone2) => (phone2.fullPrice - phone2.price)
      - (phone1.fullPrice - phone1.price))
    .slice(0, amount);
};

export const getBrandNewProducts: FetchPhones = async () => {
  const phones = await getPhones();
  const lastYear = Math.max(...phones.map(phone => phone.year));

  return phones
    .filter(phone_1 => phone_1.year >= lastYear - 1)
    .sort((phone1, phone2) => (phone2.price - phone1.price));
};
