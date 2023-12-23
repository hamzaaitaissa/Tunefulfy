export type ImageProps = {
  height: number;
  url: string;
  width: number;
};

export type CurrentAlbum = {
  artist: string;
  artistOrigin: string;
  images: ImageProps[];
  genres: string[];
  subGenres: string[];
  name: string;
  slug: string;
  releaseDate: string;
  globalReviewsUrl: string;
  wikipediaUrl: string;
  spotifyId: string;
  appleMusicId: string;
  tidalId: number;
  amazonMusicId: string;
  youtubeMusicId: string;
};

export type ApiResponse = {
  data: CurrentAlbum;
};
