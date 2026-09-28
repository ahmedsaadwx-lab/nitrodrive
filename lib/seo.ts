export const SITE_URL = 'https://nitrodrive.games';
export const SITE_NAME = 'NitroDrive';

/** Turns a site-relative path (or an already-absolute URL) into an absolute production URL. */
export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();
