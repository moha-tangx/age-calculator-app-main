const version = "v1";

const resources = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/serviceWorker.js",
  "/assets/images/app-icon.png",
  "/assets/images/icon-arrow.svg",
  "/assets/images/Moha_tangx logo.jpg",
  "/assts/fonts/Poppins-Regular.ttf",
];

let cacheResources = async (resources) => {
  let cache = await caches.open(version);
  cache.addAll(resources);
};

self.addEventListener("install", async (e) => {
  await e.waitUntil(cacheResources(resources));
});

let useCached = async (request) => {
  let cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  let serverRes = await fetch(request);
  let cache = await caches.open(version);

  if (request.method !== "GET") {
    return;
  }
  cache.put(request, serverRes.clone());
  return serverRes;
};

self.addEventListener("fetch", (e) => {
  e.respondWith(useCached(e.request));
});
