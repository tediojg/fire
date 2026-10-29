// Service worker mínimo: permite mostrar notificaciones cuando FIRE se usa como página instalada en el teléfono.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const chat = e.notification.data && e.notification.data.chat;
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length) {
        clients[0].focus();
        if (chat) clients[0].postMessage({ chat });
        return;
      }
      return self.clients.openWindow('./');
    })
  );
});
