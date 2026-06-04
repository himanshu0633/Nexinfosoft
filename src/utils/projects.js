export const makeProjectSlug = (value = '') => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const getProjectSlug = (project) => project.slug || makeProjectSlug(project.name);
