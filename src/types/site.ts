export interface SiteConfig {
  name: string;

  description: string;

  contacts: {
    organization: string;

    address: {
      street: string;
      zip: string;
      city: string;
      district?: string;
    };

    phone: string;

    fax?: string;

    email: string;
  };

  legal: {
    imprint: string;

    privacy: string;
  };
}