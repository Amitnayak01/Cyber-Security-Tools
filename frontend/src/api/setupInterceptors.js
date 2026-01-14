import apiClient from "./apiClient";

export default function setupInterceptors({ refreshAccessToken, logout }) {
  let isRefreshing = false;
  let pendingRequests = [];

  function processQueue(error, token = null) {
    pendingRequests.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
    pendingRequests = [];
  }

  apiClient.interceptors.response.use(
    (r) => r,
    async (error) => {
      const originalRequest = error.config;
      const status = error?.response?.status;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            pendingRequests.push({ resolve, reject });
          }).then((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          const newToken = await refreshAccessToken();
          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch (err) {
          processQueue(err, null);
          await logout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}
