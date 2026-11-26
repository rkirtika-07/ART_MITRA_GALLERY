
const ARTWORKS_KEY = "artmithra_artworks";
const ARTISTS_KEY = "artmithra_artists";

export function getArtworks() {
  return JSON.parse(localStorage.getItem(ARTWORKS_KEY) || "[]");
}

export function saveArtworks(data) {
  localStorage.setItem(ARTWORKS_KEY, JSON.stringify(data));
}

export function getArtists() {
  return JSON.parse(localStorage.getItem(ARTISTS_KEY) || "[]");
}

export function saveArtists(data) {
  localStorage.setItem(ARTISTS_KEY, JSON.stringify(data));
}
