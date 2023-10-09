const version = "v1";

const resources = [
  "/",
  "/src/index.js",
  "/src/app.js",
  "/src/style.css",
  "/assets/images/Moha_tangxLogo.png",
  "/assts/fonts/Poppins-Regular.ttf",
];

let cacheResources = async (resources) => {
  let cache = await caches.open(version);
  cache.addAll(resources);
};

self.addEventListener("install", async (e) => {
  e.waitUntil(cacheResources(resources));
});

let cacheFirst = async (request) => {
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
  e.respondWith(cacheFirst(e.request));
});
