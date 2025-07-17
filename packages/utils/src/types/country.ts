import COUNTRY_NAMES from '../json/countries/names';

export type CountryIso2 = keyof typeof COUNTRY_NAMES;

export type Country = {
  iso2: CountryIso2;
  phone: string;
  name: string;
};
