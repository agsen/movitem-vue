const getImageUrl = (path: string | undefined) => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/w500/${path}`;
};

export default getImageUrl;
