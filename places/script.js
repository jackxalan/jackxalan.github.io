 // Initialize the map centered over the USA.
    const map = L.map('map', {
     center: [40, -100], // Center at a neutral global position
    zoom: 3,
    worldCopyJump: false, // Prevents the infinite wrapping issue
    maxBounds: [
      [-85, -180], // Southwest corner
      [85, 180]    // Northeast corner
    ],
    maxBoundsViscosity: 1.0,
      scrollWheelZoom: false
    });
    
    // Add the OpenStreetMap tile layer.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Fetch both places.json and cities.json
    Promise.all([
      fetch('places.json').then(res => res.json()),
      fetch('cities.json').then(res => res.json())
    ])
    .then(([placesData, citiesData]) => {
      const locations = [];
      
      // Process U.S. states: For each state in placesData.states, add each city's coordinates.
      for (const state in placesData.states) {
        if (placesData.states.hasOwnProperty(state)) {
          placesData.states[state].forEach(city => {
            const key = `${city}, ${state}`;
            if (citiesData[key]) {
              locations.push({
                name: city,
                region: state,
                latitude: citiesData[key][0],
                longitude: citiesData[key][1]
              });
            }
          });
        }
      }
      
      // Process global countries: For each country in placesData.countries, add each city's coordinates.
      for (const country in placesData.countries) {
        if (placesData.countries.hasOwnProperty(country)) {
          placesData.countries[country].forEach(city => {
            const key = `${city}, ${country}`;
            if (citiesData[key]) {
              locations.push({
                name: city,
                region: country,
                latitude: citiesData[key][0],
                longitude: citiesData[key][1]
              });
            }
          });
        }
      }
      
      // Add markers for all locations.
      locations.forEach(loc => {
        L.marker([loc.latitude, loc.longitude]).addTo(map)
          .bindPopup(`<b>${loc.name}</b><br>${loc.region}`);
      });
      
      // Highlight visited U.S. states.
      const visitedStates = Object.keys(placesData.states);
      fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')
        .then(response => response.json())
        .then(geojsonData => {
          L.geoJSON(geojsonData, {
            style: feature => ({
              fillColor: visitedStates.includes(feature.properties.name) ? 'blue' : 'lightgray',
              color: 'white',
              weight: 1,
              fillOpacity: 0.5
            })
          }).addTo(map);
        });
      
      // Highlight visited international countries.
      const visitedCountries = Object.keys(placesData.countries);
      fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
        .then(response => response.json())
        .then(geojsonData => {
          // Use the "ADMIN" property from the GeoJSON for country names.
          const worldLayer = L.geoJSON(geojsonData, {
            style: feature => ({
              fillColor: visitedCountries.includes(feature.properties.ADMIN) ? 'blue' : 'lightgray',
              color: 'white',
              weight: 1,
              fillOpacity: 0.5
            })
          }).addTo(map);
          // Send the world layer to the back so markers and US states remain on top.
          worldLayer.bringToBack();
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));