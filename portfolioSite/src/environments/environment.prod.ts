export const environment = {
  production: true,
  PUBLIC_KEY: process.env['EJS_PUBLIC_KEY'] || '',
  TEMPLATE_ID: process.env['EJS_TEMPLATE_ID'] || '',
  SERVICE_ID: process.env['EJS_SERVICE_ID'] || '',
};
