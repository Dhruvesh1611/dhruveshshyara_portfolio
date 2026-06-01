/**
 * Validates if a string is a valid image path for next/image.
 * Must start with "/" or be an absolute URL (http:// or https://).
 * Returns the path if valid, or null if invalid.
 */
export function isValidImageSrc(src) {
  if (!src || typeof src !== 'string') return false;
  const trimmed = src.trim();
  if (!trimmed) return false;
  return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://');
}

/**
 * Returns the src if it's valid for next/image, otherwise returns a fallback.
 */
export function safeImageSrc(src, fallback = '/placeholder.svg') {
  return isValidImageSrc(src) ? src.trim() : fallback;
}
