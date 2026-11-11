import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { KEYS, hashPassword, readJson, slugify, uid, writeJson } from '../lib/storage';
import { seedListings } from '../lib/listings';

const StoreContext = createContext(null);

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used inside <StoreProvider>');
  return value;
}

const asArray = (value) => (Array.isArray(value) ? value : []);
const asObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : {};

export function StoreProvider({ children }) {
  const [users, setUsers] = useState(() => asArray(readJson(KEYS.users, [])));
  const [session, setSession] = useState(() => readJson(KEYS.session, null));
  const [userListings, setUserListings] = useState(() =>
    asArray(readJson(KEYS.listings, []))
  );
  const [favorites, setFavorites] = useState(() =>
    asObject(readJson(KEYS.favorites, {}))
  );
  const [recent, setRecent] = useState(() => asObject(readJson(KEYS.recent, {})));

  const user = useMemo(
    () => users.find((account) => account.id === session?.userId) || null,
    [users, session]
  );

  const listings = useMemo(() => {
    const newestFirst = [...userListings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return [...newestFirst, ...seedListings];
  }, [userListings]);

  const favoriteIds = user ? favorites[user.id] || [] : [];
  const recentIds = user ? recent[user.id] || [] : [];

  const myListings = useMemo(
    () =>
      user?.role === 'seller'
        ? listings.filter((listing) => listing.sellerId === user.id)
        : [],
    [listings, user]
  );

  const register = useCallback(
    async ({ fullName, email, password, role }) => {
      const cleanEmail = email.trim().toLowerCase();
      if (users.some((account) => account.email === cleanEmail)) {
        return {
          ok: false,
          field: 'email',
          error: 'An account with this email already exists.',
        };
      }
      const passwordHash = await hashPassword(password);
      const account = {
        id: uid('usr'),
        fullName: fullName.trim(),
        email: cleanEmail,
        role,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      const nextUsers = [...users, account];
      if (!writeJson(KEYS.users, nextUsers)) {
        return { ok: false, error: 'Could not save the account in this browser.' };
      }
      writeJson(KEYS.session, { userId: account.id });
      setUsers(nextUsers);
      setSession({ userId: account.id });
      return { ok: true, user: account };
    },
    [users]
  );

  const login = useCallback(
    async ({ email, password }) => {
      const cleanEmail = email.trim().toLowerCase();
      const account = users.find((item) => item.email === cleanEmail);
      if (!account) {
        return { ok: false, error: 'Email or password is incorrect.' };
      }
      const passwordHash = await hashPassword(password);
      if (passwordHash !== account.passwordHash) {
        return { ok: false, error: 'Email or password is incorrect.' };
      }
      writeJson(KEYS.session, { userId: account.id });
      setSession({ userId: account.id });
      return { ok: true, user: account };
    },
    [users]
  );

  const logout = useCallback(() => {
    writeJson(KEYS.session, null);
    setSession(null);
  }, []);

  const toggleFavorite = useCallback(
    (listingId) => {
      if (!user || user.role !== 'buyer') {
        return { ok: false, error: 'Sign in with a buyer account to save cars.' };
      }
      const current = favorites[user.id] || [];
      const exists = current.includes(listingId);
      const nextIds = exists
        ? current.filter((id) => id !== listingId)
        : [listingId, ...current];
      const next = { ...favorites, [user.id]: nextIds };
      if (!writeJson(KEYS.favorites, next)) {
        return { ok: false, error: 'Could not update your wishlist storage.' };
      }
      setFavorites(next);
      return { ok: true, added: !exists };
    },
    [favorites, user]
  );

  const recordView = useCallback(
    (listingId) => {
      if (!user) return;
      const current = recent[user.id] || [];
      const nextIds = [listingId, ...current.filter((id) => id !== listingId)].slice(0, 8);
      const next = { ...recent, [user.id]: nextIds };
      if (writeJson(KEYS.recent, next)) setRecent(next);
    },
    [recent, user]
  );

  const cleanListingFields = (input) => ({
    title: input.title.trim(),
    make: input.make.trim(),
    model: input.model.trim(),
    year: Number(input.year),
    mileage: Number(input.mileage),
    price: Number(input.price),
    type: input.type,
    condition: input.condition,
    fuel: input.fuel,
    transmission: input.transmission,
    engine: (input.engine || '').trim(),
    hp: (input.hp || '').trim(),
    exterior: (input.exterior || '').trim(),
    description: input.description.trim(),
    location: input.location.trim(),
    image: input.image,
    gallery: input.gallery || [],
  });

  const addListing = useCallback(
    (input) => {
      if (!user || user.role !== 'seller') {
        return { ok: false, error: 'Only seller accounts can publish listings.' };
      }
      const id = uid('lst');
      const listing = {
        ...cleanListingFields(input),
        id,
        slug: `${slugify(input.title) || 'listing'}-${id.slice(-6)}`,
        sellerId: user.id,
        seller: {
          id: user.id,
          name: user.fullName,
          email: user.email,
          location: input.location.trim(),
        },
        badge: null,
        owners: 1,
        previousOwners: 0,
        status: 'available',
        seed: false,
        createdAt: new Date().toISOString(),
      };
      const next = [...userListings, listing];
      if (!writeJson(KEYS.listings, next)) {
        return {
          ok: false,
          error: 'Browser storage is full. Use fewer or smaller photos and try again.',
        };
      }
      setUserListings(next);
      return { ok: true, listing };
    },
    [user, userListings]
  );

  const updateListing = useCallback(
    (listingId, input) => {
      if (!user || user.role !== 'seller') {
        return { ok: false, error: 'Only seller accounts can edit listings.' };
      }
      const target = userListings.find((listing) => listing.id === listingId);
      if (!target || target.sellerId !== user.id) {
        return { ok: false, error: 'You can only edit your own listings.' };
      }
      const next = userListings.map((listing) =>
        listing.id === listingId
          ? {
              ...listing,
              ...cleanListingFields(input),
              seller: { ...listing.seller, location: input.location.trim() },
            }
          : listing
      );
      if (!writeJson(KEYS.listings, next)) {
        return {
          ok: false,
          error: 'Browser storage is full. Use fewer or smaller photos and try again.',
        };
      }
      setUserListings(next);
      return { ok: true };
    },
    [user, userListings]
  );

  const deleteListing = useCallback(
    (listingId) => {
      if (!user || user.role !== 'seller') {
        return { ok: false, error: 'Only seller accounts can delete listings.' };
      }
      const target = userListings.find((listing) => listing.id === listingId);
      if (!target || target.sellerId !== user.id) {
        return { ok: false, error: 'You can only delete your own listings.' };
      }
      const next = userListings.filter((listing) => listing.id !== listingId);
      if (!writeJson(KEYS.listings, next)) {
        return { ok: false, error: 'Could not delete this listing from storage.' };
      }
      setUserListings(next);

      const nextFavorites = Object.fromEntries(
        Object.entries(favorites).map(([accountId, ids]) => [
          accountId,
          ids.filter((id) => id !== listingId),
        ])
      );
      if (writeJson(KEYS.favorites, nextFavorites)) setFavorites(nextFavorites);

      const nextRecent = Object.fromEntries(
        Object.entries(recent).map(([accountId, ids]) => [
          accountId,
          ids.filter((id) => id !== listingId),
        ])
      );
      if (writeJson(KEYS.recent, nextRecent)) setRecent(nextRecent);

      return { ok: true };
    },
    [favorites, recent, user, userListings]
  );

  const setListingStatus = useCallback(
    (listingId, status) => {
      if (!user || user.role !== 'seller') {
        return { ok: false, error: 'Only seller accounts can change listing status.' };
      }
      const target = userListings.find((listing) => listing.id === listingId);
      if (!target || target.sellerId !== user.id) {
        return { ok: false, error: 'You can only manage your own listings.' };
      }
      const next = userListings.map((listing) =>
        listing.id === listingId ? { ...listing, status } : listing
      );
      if (!writeJson(KEYS.listings, next)) {
        return { ok: false, error: 'Could not update the listing status.' };
      }
      setUserListings(next);
      return { ok: true };
    },
    [user, userListings]
  );

  const value = {
    user,
    listings,
    myListings,
    favoriteIds,
    recentIds,
    isFavorite: (listingId) => favoriteIds.includes(listingId),
    register,
    login,
    logout,
    toggleFavorite,
    recordView,
    addListing,
    updateListing,
    deleteListing,
    setListingStatus,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
