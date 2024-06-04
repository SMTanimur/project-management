export function getSession(): boolean {
  // Check if the session cookie exists
  // This example assumes the session cookie is named 'orga_sid'
  return document.cookie.split('; ').some((cookie) => cookie.startsWith('orga_sid='));
}