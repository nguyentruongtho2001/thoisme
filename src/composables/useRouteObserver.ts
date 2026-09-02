import { ref, computed, onMounted, onUnmounted } from "vue";
import { isTransitioning } from "./useProjectTransition";

// -----------------------------------------------------------------------------
// GLOBAL REACTIVE PATH (hash-based so it survives GitHub Pages subpath + refresh)
// -----------------------------------------------------------------------------

const getRoute = () => {
  if (typeof window === "undefined") return "/";
  return window.location.hash.replace(/^#/, "") || "/";
};

export const path = ref(getRoute());

// -----------------------------------------------------------------------------
// COMPUTED HELPERS
// -----------------------------------------------------------------------------

export const isProjectRoute = (path: string) => {
  return path.match(/^\/project\/([^/]+)$/);
};

export const projectId = computed(() => {
  const match = isProjectRoute(path.value);
  return match ? match[1] : null;
});

export const projectVisible = computed(() => {
  return projectId.value !== null && !isTransitioning.value;
});

export const recentProject = ref<string | null>(null);

export const recentProjectId = computed(() => {
  if (projectId.value) {
    recentProject.value = projectId.value;
  }
  return recentProject.value;
});

// -----------------------------------------------------------------------------
// COMPOSABLE
// -----------------------------------------------------------------------------

export function useRouteObserver() {
  const update = () => {
    const newPath = getRoute();
    if (newPath !== path.value) {
      path.value = newPath;
    }
  };

  onMounted(() => {
    update();

    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    window.addEventListener("route-change", update);
  });

  onUnmounted(() => {
    window.removeEventListener("hashchange", update);
    window.removeEventListener("popstate", update);
    window.removeEventListener("route-change", update);
  });

  return {
    path,
    projectId,
    recentProjectId,
  };
}
