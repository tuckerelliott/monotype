/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Monotype site-wide cleanup.
 * Removes non-authorable content (header, footer, cookie consent, tracking iframes, skip links).
 * Selectors validated against captured DOM from https://www.monotype.com
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner (OneTrust) - found as #onetrust-consent-sdk in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    // header.global-mainheader - site header with nav, logo, search, language picker, login
    // footer - site footer with brand family, footer menu, social links
    // .mt-skip-link - accessibility skip link (non-authorable)
    // iframe#destination_publishing_iframe_monotypeimaginginc_0 - Adobe tracking iframe
    WebImporter.DOMUtils.remove(element, [
      'header.global-mainheader',
      'footer',
      '.mt-skip-link',
      'iframe[title="Adobe ID Syncing iFrame"]',
      'noscript',
      'link',
    ]);
  }
}
