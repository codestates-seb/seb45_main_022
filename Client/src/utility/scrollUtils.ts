import { useEffect, MutableRefObject } from 'react';

function useInfiniteScroll(
  flexBox: MutableRefObject<HTMLElement | null>,
  fetchNextPage: () => void,
) {
  useEffect(() => {
    const handleScroll = () => {
      const container = flexBox.current;
      if (!container) return;

      const scrollPosition = container.scrollTop;
      const containerHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;

      if (scrollPosition + containerHeight >= contentHeight - 1) {
        fetchNextPage();
      }
    };

    const container = flexBox.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [flexBox, fetchNextPage]);
}

export default useInfiniteScroll;
