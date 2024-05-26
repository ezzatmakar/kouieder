export type ProductData = {
  id: number;
  slug: string;
  sku?: string;
  name?: string;
  ar_name?: string;
  title?: string;
  ar_title?: string;
  is_on_sale?: boolean;
  price: number;
  regular_price?: number;
  sale_price?: number;
  // attributes?: string;
  attributes?: {
    pa_size?: any;
    attribute_pa_size?: any;
    pa_biscuit?: any;
    pa_cream?: any;
    // other properties...
  };
  variations?: Variation[];
  main_image?: string;
  main_image_small?: string;
  thumbnail?: string;
  images?: string[];
  category?: string;
  type?: string;
  category_name?: any;
  category_name_ar?: any;
  availability?: string;
  stock_uae?: string;
  description?: any;
  ar_description?: any;
  short_desc?: any;
  short_desc_ar?: any;
};

export type Variation = {
  price?: number;
  sale_price?: number;
  attributes?: {
    attribute_pa_size?: string | undefined;
    attribute_pa_biscuit?: string | undefined;
    attribute_pa_cream?: string | undefined;
  };
  id: number
};
export type ErrorResponse = {
  status: string;
  msg: string;
};
export type CategoryType = {
  
};

export type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
  formatCurrency: (value: number, currency: string) => string;
};


export type AddressData = {
  id: string;
  status: string;
  gov_id: string;
  area_id: string;
  full_address: string;
  building_number: string;
  apartment_type: string;
  floor: string;
  apartment: string;
  area_name_en: string;
  area_name_ar: string;
  gov_name_en: string;
  gov_name_ar: string;
}
export type UserInfo = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  gender: string;
  points: string;
  rank: string;
}
export type LocationInfo = {
  ip: string;
  countryName: string;
  countryCode: string;
  city: string;
  timezone: string;
}

export type  ApiLocation = {
  ID: number;
  slug: string;
  title: string;
  // Add other properties from your API response as needed
  extra_data: {
    type: string;
    name_ar: string;
    address_ar: string;
    name: string;
    address: string;
    phone: string;
    location: string;
    city: string;
  };
  created_time: string;
  image: string;
}
export type Place = {
  type: string;
  place_name: string;
  details: string;
  number: string;
  direction: string;
  branch: boolean;
}
export type  Location = {
  name: string;
  label: string;
  places: Place[];
}
export type  RecipeData = {
  ID: number;
}

export type WalletHistoryItem = {
  type: string;
  points: string;
  date: string;
  msg: string;
  points_before: string | null;
  points_after: string;
};

export type WalletNextLevelInfo = {
  next_level_points: string;
  next_level_name: string;
};
export type UserWallet = {
  points: string;
  total_points_gained: string;
  rank: string;
  cash: number;
  next_level_info: WalletNextLevelInfo;
  gain_x: string;
  gain_y: string;
  redeem_x: string;
  redeem_y: string;
  history: WalletHistoryItem[];
}