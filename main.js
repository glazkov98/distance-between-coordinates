/** Class representing a CoordsLengthDistance. */
class CoordsLengthDistance {

    /**
     * Create a CoordsLengthDistance instance.
     * @param {string} selector - CSS selector.
     * @param {Object} options - Object with options.
     */
    constructor(selector, options) {
        if (!selector || !options) return false;

        this.selector = selector;
        this.users = options.users;
        this.EARTH_RADIUS = 6372795;
        this.navigator = navigator;
        this.window = window;
        this.document = document;
    }

    /** Initialization method. */
    init() {
        this.$app = this.document.querySelector(this.selector);
        if (this.$app == null) return false;

        this.$app.innerHTML = '<p class="not-connection">Необходимо предоставить доступ к местоположению<p>';

        this.navigator.geolocation.getCurrentPosition(result => {
            this.$app.innerHTML = '';
            this.users.forEach(user => {
                const lat1 = result.coords.latitude;
                const long1 = result.coords.longitude;
                const lat2 = user.coords.lat;
                const long2 = user.coords.long;
                user.distance = this.calculateDistance(lat1, long1, lat2, long2);
            });
            this.users.sort((a, b) => {
                if (a.distance > b.distance) return 1;
                if (a.distance < b.distance) return -1;
                return 0;
            });
            this.users.forEach(user => {
                const userDistance = (user.distance < 1000) ? `${user.distance} м` : `${(user.distance / 1000).toFixed(2)} км`;
                this.$app.insertAdjacentHTML('beforeend', `<div class="user-item"><span>${user.name}</span> <span>${userDistance}</span></div>`);
            });
        });
    }

    /**
     * Сalculates distance between coordinates.
     * @param {number} lat1 - Latitude 1.
     * @param {number} long1 - Longitude 1.
     * @param {number} lat2 - Latitude 2.
     * @param {number} long2 - Longitude 2.
     * @return {number}
     */
    calculateDistance(lat1, long1, lat2, long2) {
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        long1 = long1 * Math.PI / 180;
        long2 = long2 * Math.PI / 180;
    
        const cl1 = Math.cos(lat1);
        const cl2 = Math.cos(lat2);
        const sl1 = Math.sin(lat1);
        const sl2 = Math.sin(lat2);
        const delta = long2 - long1;
        const cdelta = Math.cos(delta);
        const sdelta = Math.sin(delta);
    
        const y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
        const x = sl1 * sl2 + cl1 * cl2 * cdelta;
    
        const ad = Math.atan2(y, x);
    
        return Math.round(ad * this.EARTH_RADIUS);
    }
}

//mock users
const users = [
    {name: 'Dmitry', coords: {lat: 55.75997082507456, long: 37.61880091717522}},
    {name: 'Arseniy', coords: {lat: 55.75715520072312, long: 37.59930911096237}},
    {name: 'Vladimir', coords: {lat: 55.76534722706627, long: 37.6381087219935}},
    {name: 'Alexey', coords: {lat: 55.7313717263022, long: 37.63652230967238}},
    {name: 'Vlad', coords: {lat: 55.72829490711412, long: 37.578260951637525}}
];

(new CoordsLengthDistance('#app', {users})).init();