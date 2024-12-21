export function getSession(): boolean {

  return document.cookie.split('; ').some((cookie) => cookie.startsWith('orga_sid='));
}