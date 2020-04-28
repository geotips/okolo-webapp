const url = "https://okolo-api.herokuapp.com/";

async function fetchJson(url, method = 'GET', data = null) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: method === 'POST' && data !== null ? JSON.stringify(data) : null
  });

  return response.ok
      ? response.json()
      : response.text()
          .then(text => Promise.reject(new Error(`Http: ${response.status}, resp: ${text}`)));
}

async function fetchDeliveries(lat, lon) {
   return fetchJson(`${url}delivery/units/${lat},${lon}`);
}

const app = new Vue({
  el: '#app',
  data: {
    deliveries: [],
    message: null
  },
  methods: {
    loadDeliveries: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        // Uncomment for testing purposes
        // position = {coords: {longitude: 82.9783493, latitude: 54.9240101}};
        this.message = null;
        fetchDeliveries(position.coords.latitude, position.coords.longitude)
            .then(ds => this.deliveries = ds)
            .catch(e => this.message = String(e));
      });
    }
  }
});
