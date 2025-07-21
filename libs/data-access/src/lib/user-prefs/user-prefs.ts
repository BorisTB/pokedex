import { prefsCookie } from './prefs.cookie';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './prefs.constants';

export interface UserPrefs {
  limit: number;
  page: number;
}

export interface UserPrefsUpdate {
  limit?: number | string | null | FormDataEntryValue;
  page?: number | string | null | FormDataEntryValue;
}

async function getParsedPrefsCookie(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await prefsCookie.parse(cookieHeader)) || {};

  return cookie;
}

export async function extractUserPrefs(request: Request): Promise<UserPrefs> {
  const cookie = await getParsedPrefsCookie(request);

  const page = cookie.page || DEFAULT_PAGE;
  const limit = cookie.limit || DEFAULT_LIMIT;

  return {
    page,
    limit
  };
}

export async function updateUserPrefs(
  request: Request,
  update: Partial<UserPrefsUpdate>
): Promise<UserPrefs> {
  const cookie = await getParsedPrefsCookie(request);

  const prevPage = cookie.page || DEFAULT_PAGE;
  const prevLimit = cookie.limit || DEFAULT_LIMIT;

  cookie.page = Number(update?.page) || DEFAULT_PAGE;
  cookie.limit = Number(update?.limit) || DEFAULT_LIMIT;

  if (cookie.limit > prevLimit) {
    const d = cookie.limit / prevLimit;
    cookie.page = Math.max(1, Math.ceil(prevPage / d));
  }

  return cookie;
}

export async function serializeUserPrefs(userPrefs: UserPrefs) {
  return prefsCookie.serialize(userPrefs);
}
