/**
 * PayGate payment utilities for webinar bookings
 */

/**
 * Redirects the user to the PayGate checkout page
 * @param reference - Unique transaction reference (e.g., "BOOK_123_250115_456")
 * @param amount - Transaction amount in Rands (not cents)
 * @param email - Cardholder email address
 */
export function redirectToPayGate(
  reference: string,
  amount: number,
  email: string
): void {
  // Use dedicated payment URL env var, fallback to thelcsystem.com
  const payGateBaseUrl = import.meta.env.VITE_PAYGATE_CHECKOUT_URL || 'https://www.thelcsystem.com/paygate_checkout.php';

  // Pass the current app's origin as the return URL so PayGate returns to the React app
  const returnUrl = `${window.location.origin}/webinars`;

  const url = `${payGateBaseUrl}?ref=${encodeURIComponent(reference)}&amount=${amount}&email=${encodeURIComponent(email)}&return_url=${encodeURIComponent(returnUrl)}`;
  window.location.href = url;
}
