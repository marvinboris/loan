import COUNTRY_NAMES from '../json/countries/names';
import COUNTRY_PHONE_CODES from '../json/countries/phone';
import { CountryIso2 } from '../types';

export function getCountries() {
  return Object.entries(COUNTRY_NAMES).map(([iso2, name]) => ({
    iso2,
    name,
    phone: COUNTRY_PHONE_CODES[iso2 as CountryIso2],
  }));
}

export function getCountryPhoneCodesByNames() {
  const result: Record<string, string> = {};
  getCountries().forEach(({ phone, name }) => {
    phone.split(' and ').forEach((phone) => {
      result[phone] = name;
    });
  });
  return result;
}

export function getCountryPhoneCodesByIso2() {
  const result: Record<string, CountryIso2> = {};
  getCountries().forEach(({ phone, iso2 }) => {
    phone.split(' and ').forEach((phone) => {
      result[phone] = iso2 as CountryIso2;
    });
  });
  return result;
}

export function getCountryIso2ByNames() {
  const result: Partial<Record<CountryIso2, string>> = {};
  getCountries().forEach(({ iso2, name }) => {
    result[iso2 as CountryIso2] = name;
  });
  return result;
}
