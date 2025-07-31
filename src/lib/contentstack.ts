import contentstack from '@contentstack/delivery-sdk';
import { addEditableTags } from '@contentstack/utils';

// Initialize Contentstack Delivery SDK
const Stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || '',
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'production',
});
export default Stack; 