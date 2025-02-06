// Initialize the map
function initMap() {
    try {
        // Replace these coordinates with your actual location
        const location = { lat: 31.5204, lng: 74.3587 }; // Example: Lahore coordinates
        
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#ffffff"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"color": "#000000"}, {"lightness": 13}]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#000000"}]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{"color": "#08304b"}]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#000000"}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#000000"}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#000000"}]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{"color": "#146474"}]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{"color": "#021019"}]
                }
            ]
        });

        // Add marker
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: 'My Location',
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#64FFDA',
                fillOpacity: 1,
                strokeColor: '#64FFDA',
                strokeWeight: 2
            }
        });

        // Add hover effect
        marker.addListener('mouseover', () => {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        marker.addListener('mouseout', () => {
            marker.setAnimation(null);
        });
    } catch (error) {
        console.log('Map failed to load:', error);
        handleMapError();
    }
}

// Handle map errors
function handleMapError() {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div class="flex items-center justify-center h-full bg-white/5 rounded-lg">
                <p class="text-white/60">Map loading failed. Please try again later.</p>
            </div>
        `;
    }
}

// Handle map loading errors
window.gm_authFailure = function() {
    handleMapError();
};

// Add contact form handling
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // Add your form submission logic here
        const formData = new FormData(e.target);
        // ... handle form submission
        
        // Show success message
        showMessage('Message sent successfully!', 'success');
    } catch (error) {
        console.error('Form submission error:', error);
        showMessage('Failed to send message. Please try again.', 'error');
    }
});

// Add message handling
function showMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `fixed bottom-4 right-4 p-4 rounded-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 3000);
} 