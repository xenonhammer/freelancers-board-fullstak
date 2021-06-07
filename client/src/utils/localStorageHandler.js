const FAVORITES = 'FV_FB';

export const localStorageHandler = {
  setItem: (key, data) => localStorage.setItem(key, JSON.stringify(data ?? [])),
  addInFavorites: (data) => {
    try {
      let favorites = localStorage.getItem(FAVORITES);
      if (favorites) favorites = JSON.parse(favorites);
      else favorites = [];
      if (favorites.find(el => el.id === data.id) > 0) return;
      favorites = [ ...favorites, data]

      localStorage.setItem(FAVORITES, JSON.stringify(favorites))
    } catch (error) {
      console.error(error.message);
    }
  },
  getItem: (key) => localStorage.getItem(key?.toString()),
  removeFromFavoritesById: (id) => {
    let favorites = localStorage.getItem(FAVORITES);
    if (favorites) favorites = JSON.parse(favorites);
    else return ;
    favorites = favorites.filter(el => el.id !== id);
    localStorage.setItem(FAVORITES, JSON.stringify(favorites));
  },
  getAllFavorites: () => {
    const favorites = localStorage.getItem(FAVORITES);
    if (favorites) return JSON.parse(favorites) ?? [];
    return [];
  },
  removeAllFavorites: () => localStorage.setItem(FAVORITES, JSON.stringify([]))
};