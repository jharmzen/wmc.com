import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Decrypts a 'tdm' payload exactly like PHP's IQ_Decrypt(urlencode($params))
 * PHP: urldecode() → base64_decode()
 */
export function decryptTdmPayload(encoded: string): Record<string, string> {
  try {
    // Step 1: URL-decode (reverse of PHP urlencode)
    const urlDecoded = decodeURIComponent(encoded);

    // Step 2: Base64-decode (reverse of PHP base64_encode)
    const rawParams = atob(urlDecoded);

    // Step 3: Parse into key=value map
    const params = new URLSearchParams(rawParams);
    const result: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      result[key] = value;
    }

    return result;
  } catch (error) {
    console.error('Failed to decrypt tdm payload:', encoded, error);
    return {};
  }
}

/**
 * Generate a URL-friendly slug from an article title
 * Converts title to lowercase, removes special characters, replaces spaces with hyphens
 */
export function generateArticleSlug(title: string): string {
  return title
    .toLowerCase()
    // Remove HTML tags if any
    .replace(/<[^>]*>/g, '')
    // Replace special characters and spaces with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    // Replace multiple spaces or hyphens with single hyphen
    .replace(/[\s-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length to reasonable URL size
    .substring(0, 100)
    // Remove trailing hyphen if substring created one
    .replace(/-+$/, '');
}

/**
 * Extract article ID and slug from a pretty URL
 * Expects format: /how-to-buy-townhouses-below-market-value-and-build-instant-equity/
 */
export function parseArticleUrl(pathname: string): { slug: string } | null {
  // Remove leading and trailing slashes and split
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');

  // Check if it looks like an article slug (no numbers, has hyphens)
  if (cleanPath && cleanPath.includes('-') && !/^\d+$/.test(cleanPath)) {
    return { slug: cleanPath };
  }

  return null;
}
