import { useState, useEffect } from "react";
import { PostDTO } from "../models/post";

/**
 * Custom hook for infinite scroll functionality.
 * @param apiCall - Function to call the API for fetching data.
 * @returns An object containing the items, loading state, and functions to manage pagination.
 */

// ta funcionando n mexe
export function useInfiniteScroll(
  apiCall: (page: number) => Promise<any>,
  messageId?: number,
  resetKey?: string
) {
  const [items, setItems] = useState<any[]>([]);
  const [actualPage, setActualPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyReply, setVerifyReply] = useState(false);

  function loadPage(page = actualPage) {
    apiCall(page)
      .then((response) => {
        console.log(response.data.content);
        if (response.data.content.length === 0) {
          setIsLoading(false);
          return;
        }
        //prevent StrictMode duplicate this.
        //so we filter the items to avoid duplicates in the list
        setItems((prev) => [
          ...prev,
          ...response.data.content.filter(
            (n) => !prev.some((p) => p.id === n.id)
          ),
        ]);

        if (response.data.content.parent != null) {
          setVerifyReply(true);
        } else {
          setVerifyReply(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        
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

  // Reset the state when messageId changes
  // This is useful for reloading the data when navigating to a different post
  useEffect(() => {
    if (messageId) {
      reset();
      loadPage(0);
    }
  }, [messageId]);

  //reset when resetKey changes
  //this is useful for reloading the data when navigating to a different profile
  useEffect(() => {
    setItems([]);
    setActualPage(0);
  }, [resetKey]);

  function reset() {
    setItems([]);
    setActualPage(0);
    setIsLoading(false);
    setVerifyReply(false);
  }

  function removeItemById(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    console.log(`Item with id ${id} removed`);
    console.log(items);
  }

  return {
    items,
    isLoading,
    verifyReply,
    removeItemById,
    setItems,
    setActualPage,
  };
}
