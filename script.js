// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const modal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Modal functionality
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        this.reset();
    });

    // WhatsApp channel button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    whatsappBtn.addEventListener('click', function() {
        // Replace with actual WhatsApp channel link
        window.open('https://wa.me/27769961477', '_blank');
    });

    // Load social media content
    loadYouTubeVideos();
    loadInstagramPhotos();
});

// Booking modal functionality
function openBookingModal(serviceType) {
    const modal = document.getElementById('booking-modal');
    const title = document.getElementById('booking-title');
    const formContent = document.getElementById('booking-form-content');
    
    let titleText = '';
    let formHTML = '';

    switch(serviceType) {
        case 'full-session':
            titleText = 'Book Full Tsakani Session';
            formHTML = `
                <div class="form-group">
                    <label for="event-name">Event Name *</label>
                    <input type="text" id="event-name" name="event-name" required>
                </div>
                <div class="form-group">
                    <label for="event-date">Event Date *</label>
                    <input type="date" id="event-date" name="event-date" required>
                </div>
                <div class="form-group">
                    <label for="event-location">Event Location *</label>
                    <input type="text" id="event-location" name="event-location" required>
                </div>
                <div class="form-group">
                    <label for="num-djs">Number of DJs Required *</label>
                    <select id="num-djs" name="num-djs" required>
                        <option value="">Select number of DJs</option>
                        <option value="1">1 DJ</option>
                        <option value="2">2 DJs</option>
                        <option value="3">3 DJs</option>
                        <option value="4">4+ DJs</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="play-time">Play Time Duration *</label>
                    <select id="play-time" name="play-time" required>
                        <option value="">Select duration</option>
                        <option value="2-hours">2 Hours</option>
                        <option value="4-hours">4 Hours</option>
                        <option value="6-hours">6 Hours</option>
                        <option value="8-hours">8 Hours</option>
                        <option value="custom">Custom Duration</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Additional Services Required:</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="setup-assistance" name="services" value="setup-assistance">
                            <label for="setup-assistance">Setup Assistance</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="crowd-control" name="services" value="crowd-control">
                            <label for="crowd-control">Crowd Control</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="dj-equipment" name="services" value="dj-equipment">
                            <label for="dj-equipment">DJ Equipment</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="guest-count">Expected Number of Guests</label>
                    <input type="number" id="guest-count" name="guest-count" min="1">
                </div>
                <div class="form-group">
                    <label for="contact-name">Your Name *</label>
                    <input type="text" id="contact-name" name="contact-name" required>
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone Number *</label>
                    <input type="tel" id="contact-phone" name="contact-phone" required>
                </div>
                <div class="form-group">
                    <label for="contact-email">Email Address *</label>
                    <input type="email" id="contact-email" name="contact-email" required>
                </div>
                <div class="form-group">
                    <label for="special-requests">Special Requests or Additional Information</label>
                    <textarea id="special-requests" name="special-requests" placeholder="Tell us about your event, music preferences, or any special requirements..."></textarea>
                </div>
            `;
            break;
        case 'dj-only':
            titleText = 'Book DJ Services';
            formHTML = `
                <div class="form-group">
                    <label for="event-name">Event Name *</label>
                    <input type="text" id="event-name" name="event-name" required>
                </div>
                <div class="form-group">
                    <label for="event-date">Event Date *</label>
                    <input type="date" id="event-date" name="event-date" required>
                </div>
                <div class="form-group">
                    <label for="event-location">Event Location *</label>
                    <input type="text" id="event-location" name="event-location" required>
                </div>
                <div class="form-group">
                    <label for="dj-preference">DJ Preference</label>
                    <select id="dj-preference" name="dj-preference">
                        <option value="">Any available DJ</option>
                        <option value="specific">I have a specific DJ in mind</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="play-time">Play Time Duration *</label>
                    <select id="play-time" name="play-time" required>
                        <option value="">Select duration</option>
                        <option value="2-hours">2 Hours</option>
                        <option value="4-hours">4 Hours</option>
                        <option value="6-hours">6 Hours</option>
                        <option value="8-hours">8 Hours</option>
                        <option value="custom">Custom Duration</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="music-genre">Preferred Music Genre/Style</label>
                    <input type="text" id="music-genre" name="music-genre" placeholder="e.g., Afrobeats, House, Hip-Hop, Amapiano">
                </div>
                <div class="form-group">
                    <label for="guest-count">Expected Number of Guests</label>
                    <input type="number" id="guest-count" name="guest-count" min="1">
                </div>
                <div class="form-group">
                    <label for="contact-name">Your Name *</label>
                    <input type="text" id="contact-name" name="contact-name" required>
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone Number *</label>
                    <input type="tel" id="contact-phone" name="contact-phone" required>
                </div>
                <div class="form-group">
                    <label for="contact-email">Email Address *</label>
                    <input type="email" id="contact-email" name="contact-email" required>
                </div>
                <div class="form-group">
                    <label for="special-requests">Special Requests or Additional Information</label>
                    <textarea id="special-requests" name="special-requests" placeholder="Tell us about your event, music preferences, or any special requirements..."></textarea>
                </div>
            `;
            break;
        case 'content-only':
            titleText = 'Book Content Creation & Camera Crew';
            formHTML = `
                <div class="form-group">
                    <label for="event-name">Event/Project Name *</label>
                    <input type="text" id="event-name" name="event-name" required>
                </div>
                <div class="form-group">
                    <label for="event-date">Event Date *</label>
                    <input type="date" id="event-date" name="event-date" required>
                </div>
                <div class="form-group">
                    <label for="event-location">Event Location *</label>
                    <input type="text" id="event-location" name="event-location" required>
                </div>
                <div class="form-group">
                    <label for="content-type">Type of Content Required *</label>
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <input type="checkbox" id="photography" name="content-type" value="photography">
                            <label for="photography">Photography</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="videography" name="content-type" value="videography">
                            <label for="videography">Videography</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="social-media" name="content-type" value="social-media">
                            <label for="social-media">Social Media Content</label>
                        </div>
                        <div class="checkbox-item">
                            <input type="checkbox" id="live-streaming" name="content-type" value="live-streaming">
                            <label for="live-streaming">Live Streaming</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="duration">Coverage Duration *</label>
                    <select id="duration" name="duration" required>
                        <option value="">Select duration</option>
                        <option value="2-hours">2 Hours</option>
                        <option value="4-hours">4 Hours</option>
                        <option value="6-hours">6 Hours</option>
                        <option value="full-day">Full Day</option>
                        <option value="custom">Custom Duration</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="crew-size">Preferred Crew Size</label>
                    <select id="crew-size" name="crew-size">
                        <option value="">Standard crew</option>
                        <option value="minimal">Minimal crew (1-2 people)</option>
                        <option value="standard">Standard crew (3-4 people)</option>
                        <option value="large">Large crew (5+ people)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="deliverables">Expected Deliverables</label>
                    <textarea id="deliverables" name="deliverables" placeholder="e.g., edited video highlights, social media posts, full event coverage, etc."></textarea>
                </div>
                <div class="form-group">
                    <label for="contact-name">Your Name *</label>
                    <input type="text" id="contact-name" name="contact-name" required>
                </div>
                <div class="form-group">
                    <label for="contact-phone">Phone Number *</label>
                    <input type="tel" id="contact-phone" name="contact-phone" required>
                </div>
                <div class="form-group">
                    <label for="contact-email">Email Address *</label>
                    <input type="email" id="contact-email" name="contact-email" required>
                </div>
                <div class="form-group">
                    <label for="special-requests">Special Requests or Additional Information</label>
                    <textarea id="special-requests" name="special-requests" placeholder="Tell us about your vision, specific shots needed, or any special requirements..."></textarea>
                </div>
            `;
            break;
    }

    title.textContent = titleText;
    formContent.innerHTML = formHTML;
    modal.style.display = 'block';

    // Form submission handler
    const form = document.getElementById('booking-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        handleBookingSubmission(serviceType);
    };
}

function handleBookingSubmission(serviceType) {
    const form = document.getElementById('booking-form');
    const formData = new FormData(form);
    
    // Create email content
    let emailContent = `New booking request for ${serviceType}:\n\n`;
    
    for (let [key, value] of formData.entries()) {
        if (value.trim()) {
            const label = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            emailContent += `${label}: ${value}\n`;
        }
    }
    
    // Create mailto link
    const subject = encodeURIComponent(`Booking Request - ${serviceType}`);
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:tsakanisessions@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Close modal and show success message
    document.getElementById('booking-modal').style.display = 'none';
    alert('Thank you for your booking request! Your email client should open with the booking details. If not, please contact us directly at tsakanisessions@gmail.com or +27 76 996 1477.');
}

// Social Media Integration
async function loadYouTubeVideos() {
    const container = document.getElementById('youtube-videos');
    
    // Since we can't use YouTube API without key, we'll create placeholder content
    // In production, you would use YouTube Data API v3
    const placeholderVideos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Latest Tsakani Session #1'
        },
        {
            id: 'dQw4w9WgXcQ',
            title: 'Latest Tsakani Session #2'
        }
    ];
    
    container.innerHTML = placeholderVideos.map(video => `
        <div class="video-item">
            <iframe 
                src="https://www.youtube.com/embed/${video.id}" 
                title="${video.title}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `).join('');
}

async function loadInstagramPhotos() {
    const container = document.getElementById('instagram-photos');
    
    // Since Instagram Basic Display API requires authentication, we'll create placeholder content
    // In production, you would use Instagram Basic Display API or Instagram Graph API
    const placeholderPhotos = [
        'https://picsum.photos/300/300?random=1',
        'https://picsum.photos/300/300?random=2',
        'https://picsum.photos/300/300?random=3',
        'https://picsum.photos/300/300?random=4',
        'https://picsum.photos/300/300?random=5'
    ];
    
    container.innerHTML = placeholderPhotos.map((photo, index) => `
        <div class="photo-item">
            <img src="${photo}" alt="Tsakani Session Photo ${index + 1}" loading="lazy">
        </div>
    `).join('');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .photo-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});