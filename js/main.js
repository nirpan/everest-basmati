(function () {
    'use strict';

    var year = document.getElementById('year');
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    // Map: MapLibre GL with OpenFreeMap tiles (free, no API key, no usage limits).
    // The library is only fetched once the map scrolls near the viewport, so the
    // rest of the page does not pay for it. It is loaded as a classic script (not
    // an ES module) so the page also works when opened straight from a file.
    // If anything fails, the fallback link in the HTML stays visible.
    var mapEl = document.getElementById('map');
    if (!mapEl) {
        return;
    }

    var position = [-1.405652, 50.911403]; // [longitude, latitude]

    function drawMap() {
        var maplibregl = window.maplibregl;
        if (!maplibregl) {
            return;
        }

        var map = new maplibregl.Map({
            container: mapEl,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: position,
            zoom: 16.5,
            scrollZoom: false,
            cooperativeGestures: true,
            attributionControl: { compact: false }
        });

        map.addControl(new maplibregl.NavigationControl({ showCompass: false }));

        var popup = new maplibregl.Popup({ offset: 32, closeButton: false })
            .setHTML('<strong>Basmati</strong><br>4 Bedford Place<br>Southampton SO15 2DB');

        new maplibregl.Marker({ color: '#6b1f2a' })
            .setLngLat(position)
            .setPopup(popup)
            .addTo(map)
            .togglePopup();

        map.once('load', function () {
            mapEl.classList.add('map--ready');
        });
    }

    function loadMap() {
        var script = document.createElement('script');
        script.src = 'vendor/maplibre/maplibre-gl.js';
        script.async = true;
        script.onload = drawMap;
        script.onerror = function () {
            console.warn('Map library could not be loaded');
        };
        document.head.appendChild(script);
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            if (entries.some(function (e) { return e.isIntersecting; })) {
                observer.disconnect();
                loadMap();
            }
        }, { rootMargin: '400px 0px' });
        observer.observe(mapEl);
    } else {
        loadMap();
    }
}());
