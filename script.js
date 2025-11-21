// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const modal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close');

    // Add futuristic cursor trail effect
    createCursorTrail();
    
    // Add particle background effect
    createParticleBackground();
    
    // Add floating elements animation
    animateFloatingElements();

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
    
    // Start countdown timer
    startUrgencyCountdown();
    
    // Add FOMO effects
    addFOMOEffects();
});

// Urgency and FOMO functions
function startUrgencyCountdown() {
    const spotsElement = document.getElementById('spots-left');
    if (!spotsElement) return;
    
    let spots = 7;
    
    setInterval(() => {
        if (Math.random() < 0.3 && spots > 2) { // 30% chance every interval
            spots--;
            spotsElement.textContent = spots;
            spotsElement.style.animation = 'none';
            setTimeout(() => {
                spotsElement.style.animation = 'number-pulse 2s ease-in-out infinite';
            }, 10);
            
            // Show notification
            showNotification(`🔥 Someone just booked! Only ${spots} spots left!`);
        }
    }, 8000); // Check every 8 seconds
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fomo-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ff0080, #8000ff);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(255, 0, 128, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function addFOMOEffects() {
    // Simulate live activity
    const activities = [
        "🎧 DJ Marcus just got booked for this weekend!",
        "📸 Someone's event just went viral with our content team!",
        "⚡ Another epic session happening right now!",
        "🔥 3 people viewing this page right now",
        "💫 Someone just left a 5-star review!",
        "🎵 New session starting in Johannesburg!"
    ];
    
    let activityIndex = 0;
    
    setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance
            showNotification(activities[activityIndex]);
            activityIndex = (activityIndex + 1) % activities.length;
        }
    }, 12000); // Every 12 seconds
}

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
    const channelId = 'UCyour-channel-id'; // This will be extracted from the channel URL
    
    try {
        // Using YouTube RSS feed to get latest videos (no API key required)
        const channelUrl = 'https://youtube.com/@tsakanisessions';
        
        // For now, we'll use a different approach - embed the channel's latest uploads
        // This method works without API keys by using the channel's uploads playlist
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=YOUR_API_KEY&channelId=${channelId}&part=snippet,id&order=date&maxResults=2`);
        
        if (!response.ok) {
            // Fallback: Use RSS feed approach
            loadYouTubeVideosFallback();
            return;
        }
        
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            container.innerHTML = data.items.map(video => `
                <div class="video-item">
                    <iframe 
                        src="https://www.youtube.com/embed/${video.id.videoId}" 
                        title="${video.snippet.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <h4>${video.snippet.title}</h4>
                </div>
            `).join('');
        } else {
            loadYouTubeVideosFallback();
        }
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        loadYouTubeVideosFallback();
    }
}

function loadYouTubeVideosFallback() {
    const container = document.getElementById('youtube-videos');
    
    // Extract channel handle from URL and create proper embed
    // URL: https://youtube.com/@tsakanisessions?si=domAKxXuYCNI3VW3
    const channelHandle = 'tsakanisessions';
    
    container.innerHTML = `
        <div class="youtube-channel-embed">
            <div class="video-item">
                <iframe 
                    src="https://www.youtube.com/embed?listType=playlist&list=UU${channelHandle}" 
                    title="Latest Tsakani Sessions Videos"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="youtube-channel-info">
                <h4>Latest Sessions</h4>
                <p>Check out our most recent music sessions and behind-the-scenes content</p>
                <a href="https://youtube.com/@tsakanisessions?si=domAKxXuYCNI3VW3" 
                   target="_blank" 
                   class="btn btn-outline">
                    <i class="fab fa-youtube"></i>
                    Watch More on YouTube
                </a>
            </div>
        </div>
    `;
    
    // Alternative approach: Try to fetch using RSS (CORS might block this)
    tryRSSFetch(channelHandle);
}

async function tryRSSFetch(channelHandle) {
    try {
        // YouTube RSS feed URL
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelHandle}`;
        
        // Use a CORS proxy service (you may need to replace this with a reliable one)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
        
        const response = await fetch(proxyUrl);
        const data = await response.json();
        
        if (data.contents) {
            // Parse XML response
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            const entries = xmlDoc.querySelectorAll('entry');
            
            if (entries.length > 0) {
                const container = document.getElementById('youtube-videos');
                const videos = Array.from(entries).slice(0, 2); // Get latest 2 videos
                
                container.innerHTML = videos.map(entry => {
                    const title = entry.querySelector('title').textContent;
                    const videoId = entry.querySelector('videoId').textContent;
                    
                    return `
                        <div class="video-item">
                            <iframe 
                                src="https://www.youtube.com/embed/${videoId}" 
                                title="${title}"
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                            <h4>${title}</h4>
                        </div>
                    `;
                }).join('') + `
                    <div class="youtube-channel-link">
                        <a href="https://youtube.com/@tsakanisessions?si=domAKxXuYCNI3VW3" 
                           target="_blank" 
                           class="btn btn-outline">
                            <i class="fab fa-youtube"></i>
                            Watch More on YouTube
                        </a>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.log('RSS fetch failed, using fallback embed method');
        // The fallback embed is already in place
    }
}

async function loadInstagramPhotos() {
    const container = document.getElementById('instagram-photos');
    
    // Since Instagram requires authentication for API access, we'll use an embed approach
    // This creates a more authentic Instagram integration
    try {
        // For now, we'll create a link to the Instagram profile and suggest users follow
        container.innerHTML = `
            <div class="instagram-embed">
                <div class="instagram-header">
                    <h4>Follow us on Instagram for the latest photos!</h4>
                    <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz" 
                       target="_blank" 
                       class="instagram-follow-btn">
                        <i class="fab fa-instagram"></i>
                        @tsakani_sessions
                    </a>
                </div>
                <div class="instagram-placeholder">
                    <p>Latest Instagram posts will appear here once integrated with Instagram API</p>
                    <p>For now, <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz" target="_blank">visit our Instagram</a> to see our latest content!</p>
                </div>
            </div>
        `;
        
        // Alternative: You can replace this with actual Instagram embeds if you have specific post URLs
        // Example of embedding specific Instagram posts:
        /*
        const instagramPosts = [
            'https://www.instagram.com/p/POST_ID_1/',
            'https://www.instagram.com/p/POST_ID_2/',
            // Add actual post URLs here
        ];
        
        container.innerHTML = `
            <div class="instagram-posts">
                ${instagramPosts.map(postUrl => `
                    <blockquote class="instagram-media" data-instgrm-permalink="${postUrl}" data-instgrm-version="14">
                        <a href="${postUrl}" target="_blank">View this post on Instagram</a>
                    </blockquote>
                `).join('')}
            </div>
        `;
        
        // Load Instagram embed script
        if (!document.querySelector('script[src*="instagram.com/embed.js"]')) {
            const script = document.createElement('script');
            script.async = true;
            script.src = '//www.instagram.com/embed.js';
            document.body.appendChild(script);
        }
        */
        
    } catch (error) {
        console.error('Error loading Instagram content:', error);
        container.innerHTML = `
            <div class="instagram-fallback">
                <p>Follow us on Instagram: 
                    <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz" target="_blank">
                        @tsakani_sessions
                    </a>
                </p>
            </div>
        `;
    }
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

// Futuristic Effects
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #ff0080, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            opacity: ${1 - i / trailLength};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        trail.forEach((dot, index) => {
            if (index === 0) {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
            } else {
                const prevDot = trail[index - 1];
                const prevX = parseInt(prevDot.style.left);
                const prevY = parseInt(prevDot.style.top);
                
                dot.style.left = prevX + 'px';
                dot.style.top = prevY + 'px';
            }
        });
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.hue = Math.random() * 360;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            this.hue += 1;
            if (this.hue > 360) this.hue = 0;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = 0.1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = '#ff0080';
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function animateFloatingElements() {
    // Add floating animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Add floating keyframes to CSS
const floatingCSS = `
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
}

.service-card {
    animation: float 4s ease-in-out infinite;
}

.service-card:nth-child(2) {
    animation-delay: 0.5s;
}

.service-card:nth-child(3) {
    animation-delay: 1s;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = floatingCSS;
document.head.appendChild(styleSheet);

// Add scroll-triggered animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add click ripple effect to buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const btn = e.target;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);