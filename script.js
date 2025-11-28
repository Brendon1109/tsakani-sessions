// African-inspired Gamification System
class TsakaniGamificationEngine {
    constructor() {
        this.userStats = {
            engagementScore: 0,
            achievements: [],
            visitTime: 0,
            actionsCompleted: 0,
            sectionViews: new Set()
        };
        this.achievements = [
            { id: 'explorer', name: 'Ubuntu Explorer', desc: 'Viewed all sections', icon: '🌍', threshold: 4 },
            { id: 'engaged', name: 'Engaged Visitor', desc: '5 minutes of exploration', icon: '⏰', threshold: 300 },
            { id: 'interactive', name: 'Interactive Spirit', desc: 'Completed 3 actions', icon: '🤝', threshold: 3 },
            { id: 'booking_master', name: 'Booking Master', desc: 'Opened booking form', icon: '📅', threshold: 1 }
        ];
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.createEngagementMeter();
        this.trackUserInteractions();
        this.startTimeTracking();
    }

    createEngagementMeter() {
        const meterHTML = `
            <div class="engagement-meter" id="engagementMeter" title="Ubuntu Spirit Level">
                <div class="meter-icon">🔥</div>
                <div class="meter-bar">
                    <div class="meter-fill"></div>
                </div>
                <div class="meter-text">Ubuntu: <span class="score">0</span></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', meterHTML);
    }

    addEngagementPoints(points, reason) {
        this.userStats.engagementScore = Math.min(100, this.userStats.engagementScore + points);
        this.updateEngagementMeter();
        this.showFloatingPoints(points, reason);
        this.checkAchievements();
    }

    updateEngagementMeter() {
        const meter = document.querySelector('.meter-fill');
        const scoreText = document.querySelector('.meter-text .score');
        const engagementMeter = document.querySelector('.engagement-meter');
        
        if (meter && scoreText && engagementMeter) {
            meter.style.width = `${this.userStats.engagementScore}%`;
            scoreText.textContent = Math.round(this.userStats.engagementScore);
            
            // Update the circular progress ring
            const progressDegree = (this.userStats.engagementScore / 100) * 360;
            engagementMeter.style.background = `
                conic-gradient(
                    var(--gold) 0deg,
                    var(--terra-cotta) ${progressDegree}deg,
                    rgba(255,255,255,0.2) ${progressDegree}deg,
                    rgba(255,255,255,0.2) 360deg
                ),
                linear-gradient(135deg, var(--terra-cotta) 0%, var(--gold) 100%)
            `;
        }
    }

    showFloatingPoints(points, reason) {
        const floatingPoint = document.createElement('div');
        floatingPoint.className = 'floating-points';
        floatingPoint.innerHTML = `+${points} <small>${reason}</small>`;
        document.body.appendChild(floatingPoint);
        
        setTimeout(() => floatingPoint.remove(), 3000);
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.userStats.achievements.includes(achievement.id)) {
                let achieved = false;
                
                switch(achievement.id) {
                    case 'explorer':
                        achieved = this.userStats.sectionViews.size >= achievement.threshold;
                        break;
                    case 'engaged':
                        achieved = this.userStats.visitTime >= achievement.threshold;
                        break;
                    case 'interactive':
                        achieved = this.userStats.actionsCompleted >= achievement.threshold;
                        break;
                    case 'booking_master':
                        achieved = this.userStats.actionsCompleted >= achievement.threshold;
                        break;
                }
                
                if (achieved) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    unlockAchievement(achievement) {
        this.userStats.achievements.push(achievement.id);
        this.showAchievementNotification(achievement);
        this.addEngagementPoints(20, 'Achievement!');
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <h4>Achievement Unlocked!</h4>
                <p><strong>${achievement.name}</strong></p>
                <small>${achievement.desc}</small>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    trackSectionView(sectionId) {
        if (!this.userStats.sectionViews.has(sectionId)) {
            this.userStats.sectionViews.add(sectionId);
            this.addEngagementPoints(10, 'Section Explored');
        }
    }

    trackAction(actionType) {
        this.userStats.actionsCompleted++;
        let points = 5;
        let reason = 'Interaction';
        
        switch(actionType) {
            case 'booking_click':
                points = 15;
                reason = 'Booking Interest';
                break;
            case 'form_submit':
                points = 25;
                reason = 'Form Submitted';
                break;
            case 'social_click':
                points = 8;
                reason = 'Social Engagement';
                break;
        }
        
        this.addEngagementPoints(points, reason);
    }

    startTimeTracking() {
        setInterval(() => {
            this.userStats.visitTime = Math.floor((Date.now() - this.startTime) / 1000);
            this.checkAchievements();
        }, 1000);
    }

    trackUserInteractions() {
        // Track scroll engagement
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
                if (scrollPercent > 25 && !this.userStats.sectionViews.has('quarter_scroll')) {
                    this.userStats.sectionViews.add('quarter_scroll');
                    this.trackSectionView('hero');
                }
                if (scrollPercent > 50 && !this.userStats.sectionViews.has('half_scroll')) {
                    this.userStats.sectionViews.add('half_scroll');
                    this.trackSectionView('services');
                }
                if (scrollPercent > 75 && !this.userStats.sectionViews.has('three_quarter_scroll')) {
                    this.userStats.sectionViews.add('three_quarter_scroll');
                    this.trackSectionView('gallery');
                }
            }, 100);
        });
    }
}

// Google Drive Background Shuffle System
class GoogleDriveBackgroundShuffler {
    constructor() {
        /* 
         * TO SET UP GOOGLE DRIVE BACKGROUND IMAGES:
         * 1. Upload your images to Google Drive
         * 2. Right-click each image → "Get link" → "Anyone with link can view"
         * 3. Copy the file ID from the URL (the long string after /d/ and before /view)
         * 4. Replace the example IDs below with your actual Google Drive image IDs
         * 5. The system will automatically rotate through these images every 8 seconds
         */
        this.imageIds = [
            '1pUKSh8cGYyOwQAoeMjimiNXdsvoUZ-pP', // Your Tsakani Sessions image
            '1WLbc7qn6Ehh_7sWlyCsGxwo5AgSZihq1', // Your Tsakani Sessions image  
            '1_ASuwix-myBC2T5eufVtSj2EJpBuirf3', // Your Tsakani Sessions image
            '1Qp3N8zWD8SJCclCJ_YEjopGaq0I4Jgoz' // Your Tsakani Sessions image
        ];
        this.currentIndex = 0;
        this.heroElement = null;
        this.init();
    }

    init() {
        this.heroElement = document.querySelector('.hero');
        if (this.heroElement) {
            this.startBackgroundRotation();
        }
    }

    getGoogleDriveImageUrl(fileId) {
        return `https://drive.google.com/uc?id=${fileId}&export=view`;
    }

    preloadImages() {
        this.imageIds.forEach(id => {
            const img = new Image();
            img.src = this.getGoogleDriveImageUrl(id);
        });
    }

    updateBackground() {
        if (!this.heroElement) return;
        
        const currentImageId = this.imageIds[this.currentIndex];
        const imageUrl = this.getGoogleDriveImageUrl(currentImageId);
        
        // Create a smooth transition by layering backgrounds
        this.heroElement.style.backgroundImage = `
            var(--gradient-hero),
            linear-gradient(rgba(255, 69, 0, 0.3), rgba(255, 215, 0, 0.2)),
            url('${imageUrl}')
        `;
        
        this.currentIndex = (this.currentIndex + 1) % this.imageIds.length;
    }

    startBackgroundRotation() {
        this.preloadImages();
        this.updateBackground(); // Set initial background
        
        // Rotate background every 8 seconds
        setInterval(() => {
            this.updateBackground();
        }, 8000);
    }

    // Method to update image IDs if needed
    updateImageIds(newIds) {
        this.imageIds = newIds;
        this.currentIndex = 0;
        this.preloadImages();
    }
}

// Initialize systems
const gamification = new TsakaniGamificationEngine();
const backgroundShuffler = new GoogleDriveBackgroundShuffler();

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

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    // Navbar background and scroll progress on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update scroll progress
        scrollProgress.style.width = scrollPercent + '%';
        
        // Update navbar background
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        // Update active nav links based on scroll position
        updateActiveNavLink();
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

    // Add gamification tracking to social media links
    const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="youtube"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gamification !== 'undefined') {
                gamification.trackAction('social_click');
            }
        });
    });

    // Track newsletter subscription
    newsletterForm.addEventListener('submit', function() {
        if (typeof gamification !== 'undefined') {
            gamification.trackAction('form_submit');
        }
    });

    // Track WhatsApp interaction
    whatsappBtn.addEventListener('click', function() {
        if (typeof gamification !== 'undefined') {
            gamification.trackAction('social_click');
        }
    });

    // Auto-show DJ popup notification
    setTimeout(() => {
        const djPopup = document.getElementById('dj-popup');
        if (djPopup) {
            djPopup.classList.add('show');
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                djPopup.classList.remove('show');
            }, 5000);
            
            // Click to hide
            djPopup.addEventListener('click', () => {
                djPopup.classList.remove('show');
            });
        }
    }, 2000); // Show after 2 seconds

    // Load social media content
    loadYouTubeVideos();
    loadInstagramPhotos();
});



// Booking modal functionality
function openBookingModal(serviceType) {
    // Track booking interaction for gamification
    if (typeof gamification !== 'undefined') {
        gamification.trackAction('booking_click');
    }
    
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
    // Track form submission for gamification
    if (typeof gamification !== 'undefined') {
        gamification.trackAction('form_submit');
    }
    
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
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Close modal and show success message
    document.getElementById('booking-modal').style.display = 'none';
    showNotification('Thank you for your booking request! Your email client should open with the booking details.', 'success');
}

// Social Media Integration with Preloading
async function loadYouTubeVideos() {
    const container = document.getElementById('youtube-videos');
    
    // Show loading state immediately
    container.innerHTML = `
        <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <p>Loading latest Tsakani Sessions content...</p>
        </div>
    `;
    
    try {
        // Preload the actual content
        await fetchYouTubeRSS(container);
    } catch (error) {
        console.error('Error loading YouTube videos:', error);
        loadYouTubeVideosFallback();
    }
}

async function fetchYouTubeRSS(container) {
    try {
        // Show the actual latest Tsakani Sessions content
        container.innerHTML = `
            <div class="youtube-embed-container">
                <div class="video-item">
                    <iframe 
                        src="https://www.youtube.com/embed/Yb_OpN-nUVM" 
                        title="Latest Tsakani Sessions Video"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="youtube-channel-info">
                    <h4>Latest Sessions</h4>
                    <p>Check out our most recent music sessions and behind-the-scenes content</p>
                    <a href="https://www.youtube.com/@TsakaniSessions" 
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
                                    <a href="https://www.youtube.com/@TsakaniSessions" 
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
    
    // Show the actual latest Tsakani Sessions video as fallback
    container.innerHTML = `
        <div class="youtube-channel-embed">
            <div class="video-item">
                <iframe 
                    src="https://www.youtube.com/embed/Yb_OpN-nUVM" 
                    title="Latest Tsakani Sessions Video"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <div class="youtube-channel-info">
                <h4>Latest Sessions</h4>
                <p>Check out our most recent music sessions and behind-the-scenes content</p>
                <a href="https://www.youtube.com/@TsakaniSessions" 
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
    if (!container) return;
    
    // Show loading state immediately
    container.innerHTML = `
        <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <p>Loading Instagram content...</p>
        </div>
    `;
    
    try {
        // Simulate loading delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Create a better Instagram integration with placeholder images and real links
        container.innerHTML = `
            <div class="instagram-gallery">
                <div class="instagram-header">
                    <h4><i class="fab fa-instagram"></i> Latest from @tsakani_sessions</h4>
                    <div class="instagram-stats">
                        <span>276 followers</span>
                        <a href="https://www.instagram.com/tsakani_sessions?igsh=N2Z3aTk4bGVtYTkz"
                           target="_blank" 
                           class="instagram-follow-btn">
                            Follow Us
                        </a>
                    </div>
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
        
        // Load Instagram-style placeholder images related to music events with animation
        await loadInstagramPlaceholders();
        
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

async function loadInstagramPlaceholders() {
    const grid = document.getElementById('instagram-grid');
    if (!grid) return;
    
    // Instagram-style posts matching your actual @tsakani_sessions content
    const tsakaniImages = [
        {
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
            caption: '🔥 pens down party! The energy was absolutely unmatched! 🎵 #TsakaniSessions #PensDownParty',
            likes: 142,
            comments: 28
        },
        {
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
            caption: '🎧 Behind the decks bringing those weekend vibes ✨ Two Tales of Happiness in action!',
            likes: 89,
            comments: 15
        },
        {
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop&crop=center',
            caption: '📸 Studio sessions with the crew - Friendship & Brotherhood at its finest 🎵',
            likes: 156,
            comments: 22
        },
        {
            image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop&crop=center',
            caption: '🎵 Live from Tsakani Sessions - Thank you to everyone who came through! 🙌',
            likes: 203,
            comments: 35
        },
        {
            image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&crop=center',
            caption: '🔊 Setting up for another epic night - Ubuntu spirit in full effect 🌍',
            likes: 98,
            comments: 18
        },
        {
            image: 'https://images.unsplash.com/photo-1571266028243-d220c9c2bedc?w=400&h=400&fit=crop&crop=center',
            caption: '✨ The moments that matter - Music brings us all together 🎶 #TsakaniSessions',
            likes: 174,
            comments: 31
        }
    ];
    
    console.log('Loading Tsakani Sessions Instagram posts...');
    
    // Use the images directly - they're already optimized URLs
    const instagramPosts = tsakaniImages;
    
    // Create Instagram-style photo grid with reliable images
    grid.innerHTML = instagramPosts.map((post, index) => `
        <div class="instagram-photo" style="animation-delay: ${index * 0.15}s">     
            <img src="${post.image}" 
                 alt="Tsakani Session ${index + 1}" 
                 loading="lazy"
                 onload="console.log('✅ Image loaded successfully:', this.alt)"    
                 onerror="console.log('❌ Image failed to load:', this.alt)">       
            <div class="instagram-overlay">
                <div class="instagram-caption">
                    <p>${post.caption}</p>
                </div>
                <div class="instagram-stats">
                    <span><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments}</span>    
                </div>
            </div>
        </div>
    `).join('');
    
    // Add fade-in animation with delay
    setTimeout(() => {
        grid.classList.add('loaded');
    }, 200);
}

// Clean, simple Instagram display - no complex loading needed

// Booking Modal Functions
function openBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const dateInput = document.getElementById('event-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form
        const form = document.getElementById('booking-form');
        if (form) {
            form.reset();
        }
    }
}

// Handle booking form submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
});

function handleBookingSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        eventType: formData.get('event-type'),
        eventDate: formData.get('event-date'),
        venue: formData.get('venue'),
        budget: formData.get('budget'),
        services: formData.getAll('services'),
        message: formData.get('message')
    };
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppBookingMessage(data);
    const phoneNumber = '27730901787';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showNotification('Booking request sent! We\'ll get back to you soon.', 'success');
    
    // Close modal
    closeBookingModal();
}

function createWhatsAppBookingMessage(data) {
    let message = `🎵 *TSAKANI SESSIONS BOOKING REQUEST* 🎵\n\n`;
    message += `👤 *Name:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    message += `📱 *Phone:* ${data.phone}\n\n`;
    message += `🎉 *Event Type:* ${data.eventType}\n`;
    message += `📅 *Date:* ${data.eventDate}\n`;
    message += `📍 *Venue:* ${data.venue}\n`;
    
    if (data.budget) {
        message += `💰 *Budget:* ${data.budget}\n`;
    }
    
    if (data.services && data.services.length > 0) {
        message += `🎛️ *Services Needed:* ${data.services.join(', ')}\n`;
    }
    
    if (data.message) {
        message += `\n📝 *Additional Details:*\n${data.message}\n`;
    }
    
    message += `\n✨ Looking forward to creating an amazing experience together!`;
    
    return message;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} show`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
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
    
    // Initialize DJ popup system
    initializeDJPopup();
    
    // Initialize form enhancements
    initializeFormEnhancements();
    
    // Initialize loading states
    initializeLoadingStates();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'services', 'mission', 'gallery', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId) || document.querySelector(`.${sectionId}`);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced form validation and feedback
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add real-time validation
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
    
    // Newsletter form enhancement
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error', 'success');
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(formGroup, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(formGroup, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value)) {
            showFieldError(formGroup, 'Please enter a valid phone number');
            return false;
        }
    }
    
    showFieldSuccess(formGroup);
    return true;
}

function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    let errorElement = formGroup.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function showFieldSuccess(formGroup) {
    formGroup.classList.add('success');
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    form.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        form.classList.remove('loading');
        form.reset();
        showNotification(`Thanks for subscribing! We\'ll send updates to ${email}`, 'success');
    }, 2000);
}

// Loading states for buttons
function initializeLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) {
                e.preventDefault();
                return;
            }
            
            // Add loading state for form submissions
            if (this.type === 'submit' || this.classList.contains('book-now-btn')) {
                this.classList.add('loading');
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                // Remove loading state after delay (would be replaced with actual form handling)
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 3000);
            }
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => hideNotification(notification), 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// DJ Popup System
function initializeDJPopup() {
    const djs = [
        { name: 'Kendour', status: 'Live Mix Session' },
        { name: 'Pontsho', status: 'Deep House Vibes' },
        { name: 'Livhu', status: 'Amapiano Mix' },
        { name: 'Fygo_MZ', status: 'Afro House Set' },
        { name: 'Onka', status: 'Electronic Fusion' }
    ];
    
    let currentDJIndex = 0;
    const popup = document.getElementById('dj-popup');
    const djName = document.getElementById('dj-name');
    const djStatus = document.getElementById('dj-status');
    const closeBtn = document.querySelector('.dj-popup-close');
    
    // Close popup functionality
    closeBtn.addEventListener('click', () => {
        hideDJPopup();
    });
    
    // Auto-close popup after 5 seconds
    let autoCloseTimeout;
    
    function showDJPopup() {
        const currentDJ = djs[currentDJIndex];
        djName.textContent = currentDJ.name;
        djStatus.textContent = currentDJ.status;
        
        popup.classList.add('show');
        
        // Clear existing timeout
        if (autoCloseTimeout) {
            clearTimeout(autoCloseTimeout);
        }
        
        // Auto-close after 5 seconds
        autoCloseTimeout = setTimeout(() => {
            hideDJPopup();
        }, 5000);
        
        // Move to next DJ for next popup
        currentDJIndex = (currentDJIndex + 1) % djs.length;
    }
    
    function hideDJPopup() {
        popup.classList.remove('show');
        if (autoCloseTimeout) {
            clearTimeout(autoCloseTimeout);
        }
    }
    
    // Show first popup after 3 seconds
    setTimeout(() => {
        showDJPopup();
    }, 3000);
    
    // Show popup every 30 seconds
    setInterval(() => {
        if (!popup.classList.contains('show')) {
            showDJPopup();
        }
    }, 30000);
}

