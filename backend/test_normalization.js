const { normalizeVisibleServices } = require('../src/utils/services');
// Wait, we need to run it in a way that handles CommonJS/ES Modules.
// Let's write a simple pure JS script with the logic copied.

const serviceDisplayOrder = [
  'business-website',
  'ecommerce-website',
  'custom-web-development',
  'mobile-applications',
  'branding-graphic-design',
  'video-editing-promotional-content',
  'digital-marketing',
  'erp-development',
  'custom-crm-development',
  'mvp-development'
];

const sortServicesByDisplayOrder = (services = []) => {
  const orderMap = new Map(serviceDisplayOrder.map((slug, index) => [slug, index]));

  return [...services].sort((a, b) => {
    const aOrder = orderMap.has(a.slug) ? orderMap.get(a.slug) : Number.MAX_SAFE_INTEGER;
    const bOrder = orderMap.has(b.slug) ? orderMap.get(b.slug) : Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aCreated = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bCreated = b.createdAt ? new Date(b.createdAt).getTime() : 0;

    if (aCreated !== bCreated) {
      return aCreated - bCreated;
    }

    return (a.title || '').localeCompare(b.title || '');
  });
};

const normalizeVisibleServices = (services = []) => {
  return sortServicesByDisplayOrder(
    services.filter((service) => service.slug && service.slug !== 'recruitment-services' && service.visible !== false)
  );
};

// Mock data returned by API
const mockData = [
  { slug: "branding-graphic-design", title: "Branding & Graphic Design", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "business-website", title: "Business Website", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "custom-crm-development", title: "Custom CRM Development", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "custom-web-development", title: "Custom Web Development", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "digital-marketing", title: "Digital Marketing", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "ecommerce-website", title: "E-Commerce Website", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "erp-development", title: "ERP Development", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "mobile-applications", title: "Mobile Applications", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "mvp-development", title: "MVP Development", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "video-editing-promotional-content", title: "Video Editing & Promotional Content", visible: true, createdAt: "2026-06-01T05:59:04.309Z" },
  { slug: "test", title: "test", visible: true, createdAt: "2026-06-09T10:46:43.683Z" }
];

console.log('Normalized output:');
const result = normalizeVisibleServices(mockData);
result.forEach((r, i) => console.log(`${i+1}. ${r.slug}`));
