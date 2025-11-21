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
    
    try {
        // Try to fetch using RSS feed approach
        await fetchYouTubeRSS(container);
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        loadYouTubeVideosFallback();
    }
}

async function fetchYouTubeRSS(container) {
    try {
        // YouTube channel handle: @tsakanisessions
        // We'll embed the channel's latest videos section instead of trying to parse RSS
        container.innerHTML = `
            <div class="youtube-embed-container">
                <div class="video-item">
                    <iframe 
                        src="https://www.youtube.com/embed/videoseries?list=UU9xH5oGt_4b7Eoa3KCObpuw" 
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
                       class="btn btn-outline youtube-btn">
                        <i class="fab fa-youtube"></i> Subscribe & Watch More
                    </a>
                </div>
            </div>
        `;
        
        // Try to get actual video data using a CORS proxy
        const channelHandle = 'tsakanisessions';
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=UC${channelHandle}`)}`;
        
        // This is a fallback attempt - if it fails, the default embed above will remain
        setTimeout(async () => {
            try {
                const response = await fetch(proxyUrl);
                const data = await response.json();
                
                if (data.contents) {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
                    const entries = xmlDoc.querySelectorAll('entry');
                    
                    if (entries.length > 0) {
                        const videos = Array.from(entries).slice(0, 2);
                        container.innerHTML = `
                            <div class="video-grid-real">
                                ${videos.map(entry => {
                                    const title = entry.querySelector('title')?.textContent || 'Tsakani Session';
                                    const videoId = entry.querySelector('videoId')?.textContent || entry.querySelector('link')?.getAttribute('href')?.split('?v=')[1];
                                    
                                    if (videoId) {
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
                                    }
                                    return '';
                                }).join('')}
                                <div class="youtube-channel-link">
                                    <a href="https://youtube.com/@tsakanisessions?si=domAKxXuYCNI3VW3" 
                                       target="_blank" 
                                       class="btn btn-outline">
                                        <i class="fab fa-youtube"></i> Watch More on YouTube
                                    </a>
                                </div>
                            </div>
                        `;
                    }
                }
            } catch (fallbackError) {
                console.log('RSS fallback failed, using embed method');
            }
        }, 1000);
        
    } catch (error) {
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
    
    try {
        // Create a better Instagram integration with placeholder images and real link
        container.innerHTML = `
            <div class="instagram-gallery">
                <div class="instagram-header">
                    <h4><i class="fab fa-instagram"></i> Latest from @tsakani_sessions</h4>
                    <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz" 
                       target="_blank" 
                       class="instagram-follow-btn">
                        Follow Us
                    </a>
                </div>
                <div class="instagram-grid" id="instagram-grid">
                    <!-- Photos will be loaded here -->
                </div>
                <div class="instagram-footer">
                    <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz" 
                       target="_blank" 
                       class="btn btn-outline instagram-btn">
                        <i class="fab fa-instagram"></i> View All Posts
                    </a>
                </div>
            </div>
        `;
        
        // Load Instagram-style placeholder images related to music events
        loadInstagramPlaceholders();
        
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

function loadInstagramPlaceholders() {
    const grid = document.getElementById('instagram-grid');
    if (!grid) return;
    
    // Use music-themed stock photos that look like Instagram posts
    const musicImages = [
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center', // DJ mixing
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center', // Music crowd
        'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop&crop=center', // Studio setup
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop&crop=center', // DJ equipment
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop&crop=center', // Live performance
    ];
    
    grid.innerHTML = musicImages.map((imageUrl, index) => `
        <div class="instagram-photo">
            <img src="${imageUrl}" alt="Tsakani Session ${index + 1}" loading="lazy">
            <div class="instagram-overlay">
                <div class="instagram-stats">
                    <span><i class="fas fa-heart"></i> ${Math.floor(Math.random() * 500) + 100}</span>
                    <span><i class="fas fa-comment"></i> ${Math.floor(Math.random() * 50) + 10}</span>
                </div>
            </div>
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

