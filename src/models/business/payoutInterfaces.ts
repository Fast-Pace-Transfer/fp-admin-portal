/**
 * @name payoutInterfaces
 * @description Interface for the payout countries model.
 */
export interface payoutCountriesInterface {
  name: string;
  code: string;
  currency: string;
  dial_code: string;
  symbol: string;
  flag_emoji: string;
}

export interface payoutMethodsInterface {
  id: number;
  name: string;
  code: string;
  country: string;
}
