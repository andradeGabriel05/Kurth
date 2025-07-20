import { useState, useEffect } from "react";

/**
 * Custom hook for infinite scroll functionality.
 * @param apiCall - Function to call the API for fetching data.
 * @returns An object containing the items, loading state, and functions to manage pagination.
 */

export function useInfiniteScroll<T = any>(
  apiCall: (page: number) => Promise<any>
) {
  const [items, setItems] = useState<T[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyReply, setVerifyReply] = useState(false);

  function loadPage(page = actualPage) {
    apiCall(page)
      .then((response) => {
        console.log(response.data.content);
        setItems((prev) => [...prev, ...response.data.content]);

        if (response.data.content.parent != null) {
          setVerifyReply(true);
        } else {
          setVerifyReply(false);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const isNearBottom = scrollTop + windowHeight >= fullHeight - 100;

    if (isNearBottom && !isLoading) {
      setIsLoading(true);
      setActualPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    loadPage(0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (actualPage > 0) {
      loadPage(actualPage);
    }
  }, [actualPage]);

  return {
    items,
    isLoading,
    verifyReply,
    setItems,
    setActualPage,
  };
}
