export const serviceDisplayOrder = [
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

export const sortServicesByDisplayOrder = (services = []) => {
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

export const normalizeVisibleServices = (services = []) => {
  return sortServicesByDisplayOrder(
    services.filter((service) => service.slug && service.slug !== 'recruitment-services' && service.visible !== false)
  );
};
