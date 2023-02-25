import { useEffect, useState } from "react"

const getWindowDimensions = () => {
  if(typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  return {
    width: 0,
    height: 0,
  }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}


export {
  useWindowDimensions,
  useDebounce,
  useMediaQuery
}