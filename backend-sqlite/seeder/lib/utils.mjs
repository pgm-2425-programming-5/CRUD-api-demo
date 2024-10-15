/*
 * Generate Timestamps
 */
export const generateTimestamps = () => {
  return {
    createdAt: Date.now(),
    modifiedAt: null,
    deletedAt: null,
  };
};

/*
 * Generate Integer between min and max
 */
export const generateValueBetweenMinAndMax = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
};

/**
 * Slugify a string
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
