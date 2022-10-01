export const useMediaQuery = (queryString: string) => {
  let mediaQueryList: MediaQueryList;
  mediaQueryList = window.matchMedia(queryString);

  return mediaQueryList;
};
