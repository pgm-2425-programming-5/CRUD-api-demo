import type { Struct, Schema } from '@strapi/strapi';

export interface NavigationTest extends Struct.ComponentSchema {
  collectionName: 'components_navigation_tests';
  info: {
    displayName: 'test';
  };
  attributes: {
    teest: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'navigation.test': NavigationTest;
    }
  }
}
