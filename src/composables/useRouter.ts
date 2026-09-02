export const useRouter = () => {
  const push = (path: string) => {
    if (typeof window !== "undefined") {
      // Hash-based routing so deep links & refresh work on GitHub Pages (subpath).
      window.location.hash = "#" + path;
    }
  };

  const replace = (path: string) => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.href.split("#")[0];
      window.history.replaceState(null, "", `${baseUrl}#${path}`);
      window.dispatchEvent(new Event("route-change"));
    }
  };

  const back = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return {
    push,
    replace,
    back,
  };
};
