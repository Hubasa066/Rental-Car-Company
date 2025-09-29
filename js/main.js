// Hamilton Motors - Ultra-Luxury Car Rental JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Hamilton Motors...');
    // Initialize all functionality
    initNavbar();
    initScrollEffects();
    initFleetInteractions();
    initSmoothScrolling();
    initVideoBackground();
    initWhatsAppButton();
    initHolographicCards();
    forceImageVisibility();
    console.log('✅ Hamilton Motors initialized successfully!');
});

// Force image visibility
function forceImageVisibility() {
    console.log('🔧 Forcing image visibility...');
    
    // Force all images to be visible
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.style.filter = 'none';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
    
    // Force vehicle cards to be visible
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    vehicleCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.display = 'block';
        card.style.transform = 'none';
        card.style.background = 'rgba(255, 255, 255, 0.05)';
        card.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    });
    
    // Force vehicle overlays to be visible
    const vehicleOverlays = document.querySelectorAll('.vehicle-overlay');
    vehicleOverlays.forEach(overlay => {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        overlay.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))';
    });
    
    // Force vehicle images to be visible
    const vehicleImages = document.querySelectorAll('.vehicle-image img');
    vehicleImages.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
        img.style.filter = 'none';
        img.style.background = '#2a2a2a';
    });
    
    // Specific fixes for logo
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        logoImg.style.opacity = '1';
        logoImg.style.visibility = 'visible';
        logoImg.style.display = 'block';
        logoImg.style.filter = 'none';
        console.log('✅ Logo visibility forced');
    }
    
    console.log('✅ Image visibility forced for', allImages.length, 'images');
    console.log('✅ Vehicle cards forced visible:', vehicleCards.length);
    console.log('✅ Vehicle overlays forced visible:', vehicleOverlays.length);
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for fleet cards
                if (entry.target.classList.contains('vehicle-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // 100ms delay between each card
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe fleet cards with staggered animation
    const fleetCards = document.querySelectorAll('.vehicle-card');
    fleetCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // Observe features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'all 0.6s ease';
        observer.observe(feature);
    });
    
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(30px)';
        header.style.transition = 'all 0.8s ease';
        observer.observe(header);
    });
}

// Fleet interactions
function initFleetInteractions() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach(card => {
        // Add click functionality for modal
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on WhatsApp button
            if (e.target.closest('.whatsapp-card-btn')) return;
            
            const vehicleName = this.querySelector('h3').textContent;
            const vehicleYear = this.querySelector('.year').textContent;
            const vehicleSpecs = this.querySelectorAll('.specs span');
            const vehiclePrice = this.querySelector('.price').textContent;
            const vehicleImage = this.querySelector('img').src;
            
            showVehicleModal({
                name: vehicleName,
                year: vehicleYear,
                specs: Array.from(vehicleSpecs).map(span => span.textContent),
                price: vehiclePrice,
                image: vehicleImage
            });
        });
    });
    
    // Initialize view more functionality
    initViewMore();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video background optimization
function initVideoBackground() {
    const videoElement = document.querySelector('#background-video');
    const fallbackBackground = document.querySelector('#fallback-bg');
    
    if (videoElement && fallbackBackground) {
        // Show fallback by default
        fallbackBackground.style.display = 'flex';
        
        // Check if video loads successfully
        videoElement.addEventListener('loadeddata', function() {
            console.log('Local video loaded successfully');
            // Hide fallback after video starts playing
            setTimeout(function() {
                fallbackBackground.style.display = 'none';
            }, 1000);
        });
        
        // If video fails to load, show fallback
        videoElement.addEventListener('error', function() {
            console.log('Local video failed to load, showing fallback');
            fallbackBackground.style.display = 'flex';
        });
        
        // Set a timeout to show fallback if video doesn't load within 5 seconds
        setTimeout(function() {
            if (videoElement.readyState < 2) { // HAVE_CURRENT_DATA
                console.log('Video loading timeout, showing fallback');
                fallbackBackground.style.display = 'flex';
            }
        }, 5000);
        
        // Try to play video with user interaction (click anywhere)
        document.addEventListener('click', function() {
            if (videoElement.paused) {
                console.log('User interaction detected, attempting to play video');
                videoElement.play().catch(function(error) {
                    console.log('Autoplay prevented:', error);
                });
            }
        }, { once: true });
        
        // Also try on scroll
        document.addEventListener('scroll', function() {
            if (videoElement.paused) {
                console.log('Scroll detected, attempting to play video');
                videoElement.play().catch(function(error) {
                    console.log('Autoplay prevented:', error);
                });
            }
        }, { once: true });
    }
}

// WhatsApp button functionality
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

// Booking modal functionality
function showBookingModal(vehicleName) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'booking-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'booking-modal-content';
    modalContent.style.cssText = `
        background: #111111;
        padding: 40px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h2 style="font-family: 'Playfair Display', serif; font-size: 28px; margin-bottom: 20px; color: #ffffff;">Book ${vehicleName}</h2>
        <p style="color: #aaaaaa; margin-bottom: 30px;">Ready to experience the ultimate in automotive luxury?</p>
        <div style="display: flex; gap: 20px; justify-content: center; margin-top: 30px;">
            <a href="https://wa.me/15551234567?text=Hi, I'm interested in booking the ${encodeURIComponent(vehicleName)}" 
               target="_blank" 
               style="padding: 15px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">
                WhatsApp Booking
            </a>
            <button onclick="closeBookingModal()" 
                    style="padding: 15px 30px; background: transparent; color: #ffffff; border: 1px solid #ffffff; border-radius: 4px; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeBookingModal();
        }
    });
}

// Close booking modal
function closeBookingModal() {
    const modal = document.querySelector('.booking-modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        const content = modal.querySelector('.booking-modal-content');
        content.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Vehicle Modal Functions
function showVehicleModal(vehicleData) {
    const modal = document.getElementById('vehicle-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalYear = document.getElementById('modal-year');
    const modalEngine = document.getElementById('modal-engine');
    const modalHp = document.getElementById('modal-hp');
    const modalAcceleration = document.getElementById('modal-acceleration');
    const modalPrice = document.getElementById('modal-price');
    const modalWhatsapp = document.getElementById('modal-whatsapp');
    
    // Populate modal with vehicle data
    modalImage.src = vehicleData.image;
    modalTitle.textContent = vehicleData.name;
    modalYear.textContent = vehicleData.year;
    modalPrice.textContent = vehicleData.price;
    
    // Parse specs
    if (vehicleData.specs.length >= 2) {
        const engineSpec = vehicleData.specs[0].split(' • ');
        modalEngine.textContent = engineSpec[0];
        modalHp.textContent = engineSpec[1];
        modalAcceleration.textContent = vehicleData.specs[1];
    }
    
    // Update WhatsApp link
    modalWhatsapp.href = `https://wa.me/15551234567?text=Hi, I'm interested in the ${encodeURIComponent(vehicleData.name)}`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVehicleModal() {
    const modal = document.getElementById('vehicle-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// View More Functionality
function initViewMore() {
    console.log('🔧 Initializing View More functionality...');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const fullFleet = document.getElementById('full-fleet');
    const featuredFleet = document.getElementById('featured-fleet');
    
    console.log('View More Button:', viewMoreBtn);
    console.log('Full Fleet:', fullFleet);
    
    if (viewMoreBtn && fullFleet) {
        console.log('✅ View More elements found!');
        let isExpanded = false;
        
        viewMoreBtn.addEventListener('click', function() {
            console.log('🔘 View More button clicked!');
            if (!isExpanded) {
                console.log('📖 Expanding fleet...');
                // Show full fleet
                fullFleet.style.display = 'grid';
                fullFleet.style.opacity = '0';
                fullFleet.style.transform = 'translateY(30px)';
                
                // Animate in
                setTimeout(() => {
                    fullFleet.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    fullFleet.style.opacity = '1';
                    fullFleet.style.transform = 'translateY(0)';
                }, 50);
                
                // Update button
                this.classList.add('expanded');
                this.querySelector('.btn-text').textContent = 'Voir Moins';
                
                // Scroll to new content
                setTimeout(() => {
                    fullFleet.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
                
                isExpanded = true;
            } else {
                // Hide full fleet
                fullFleet.style.transition = 'all 0.4s ease';
                fullFleet.style.opacity = '0';
                fullFleet.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    fullFleet.style.display = 'none';
                }, 400);
                
                // Update button
                this.classList.remove('expanded');
                this.querySelector('.btn-text').textContent = 'Voir Plus';
                
                // Scroll back to featured fleet
                setTimeout(() => {
                    featuredFleet.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 200);
                
                isExpanded = false;
            }
        });
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const videoBackground = document.querySelector('.video-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (videoBackground) {
            videoBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Initialize parallax
initParallaxEffect();

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBookingModal();
        closeVehicleModal();
    }
});

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Vehicle modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeVehicleModal);
    }
    
    // Close modal on overlay click
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeVehicleModal();
            }
        });
    }
    
    // Book button functionality
    const bookButtons = document.querySelectorAll('.btn-book');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleName = document.getElementById('modal-title').textContent;
            showBookingModal(vehicleName);
            closeVehicleModal();
        });
    });
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    // Any scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Holographic Cards Functionality
function initHolographicCards() {
    console.log('🔮 Initializing Holographic Cards...');
    
    const holographicCards = document.querySelectorAll('.holographic-card');
    const fullscreenModal = document.getElementById('vehicle-fullscreen-modal');
    const closeModalBtn = document.getElementById('close-fullscreen-modal');
    
    if (!holographicCards.length || !fullscreenModal) {
        console.log('⚠️ Holographic cards or modal not found');
        return;
    }
    
    // Vehicle data
    const vehicleData = {
        'mercedes-gt63': {
            name: 'Mercedes-AMG GT 63 S 4-Door Coupé',
            year: '2024',
            images: [
                'image/mercedes.jpeg',
                'image/mercedes2.jpeg',
                'image/wheel_Mercedes.jpeg',
                'image/seats_Mercedes.jpeg',
                'image/back_Mercedes2.jpeg',
                'image/back_Mercedes.jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '630 CV' },
                    { label: 'Couple', value: '900 Nm' },
                    { label: '0-100 km/h', value: '3.2s' },
                    { label: 'Vitesse max', value: '315 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'V8 Biturbo' },
                    { label: 'Cylindrée', value: '4.0L' },
                    { label: 'Transmission', value: 'AMG SPEEDSHIFT MCT 9G' },
                    { label: 'Consommation', value: '12.5L/100km' }
                ]
            },
            price: '1\'500 CHF',
            available: true
        },
        'audi-r8': {
            name: 'Audi R8 V10 Performance',
            year: '2024',
            images: [
                'image/audi (1).jpeg',
                'image/audi (2).jpeg',
                'image/audi (3).jpeg',
                'image/audi (5).jpeg',
                'image/audi (4).jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '620 CV' },
                    { label: 'Couple', value: '580 Nm' },
                    { label: '0-100 km/h', value: '3.1s' },
                    { label: 'Vitesse max', value: '331 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'V10 Atmo' },
                    { label: 'Cylindrée', value: '5.2L' },
                    { label: 'Transmission', value: 'S tronic 7' },
                    { label: 'Consommation', value: '13.7L/100km' }
                ]
            },
            price: '1\'800 CHF',
            available: false,
            status: 'reserved'
        },
        'audi-rs6': {
            name: 'Audi RS6 Avant Performance',
            year: '2024',
            images: [
                'image/AudiRS6 (1).jpeg',
                'image/AudiRS6 (2).jpeg',
                'image/AudiRS6 (3).jpeg',
                'image/AudiRS6 (4).jpeg',
                'image/AudiRS6 (5).jpeg',
                'image/AudiRS6 (6).jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '630 CV' },
                    { label: 'Couple', value: '850 Nm' },
                    { label: '0-100 km/h', value: '3.6s' },
                    { label: 'Vitesse max', value: '305 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'V8 Biturbo' },
                    { label: 'Cylindrée', value: '4.0L' },
                    { label: 'Transmission', value: 'Tiptronic 8' },
                    { label: 'Consommation', value: '12.1L/100km' }
                ]
            },
            price: '1\'400 CHF',
            available: true
        },
        'volkswagen-golf': {
            name: 'Volkswagen Golf R (Gris)',
            year: '2024',
            images: [
                'image/wolkswagen_gris (1).jpeg',
                'image/wolkswagen_gris (2).jpeg',
                'image/wolkswagen_gris (3).jpeg',
                'image/wolkswagen_gris (4).jpeg',
                'image/wolkswagen_gris (5).jpeg',
                'image/wolkswagen_gris (6).jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '320 CV' },
                    { label: 'Couple', value: '420 Nm' },
                    { label: '0-100 km/h', value: '4.7s' },
                    { label: 'Vitesse max', value: '270 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'I4 Turbo' },
                    { label: 'Cylindrée', value: '2.0L' },
                    { label: 'Transmission', value: 'DSG 7' },
                    { label: 'Consommation', value: '8.5L/100km' }
                ]
            },
            price: '800 CHF',
            available: false,
            status: 'unavailable'
        },
        'volkswagen-golf-noir': {
            name: 'Volkswagen Golf R (Noir)',
            year: '2024',
            images: [
                'image/wolkswagen_noir (1).jpeg',
                'image/wolkswagen_noir (2).jpeg',
                'image/wolkswagen_gris (3).jpeg',
                'image/wolkswagen_gris (4).jpeg',
                'image/wolkswagen_noir (3).jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '320 CV' },
                    { label: 'Couple', value: '420 Nm' },
                    { label: '0-100 km/h', value: '4.7s' },
                    { label: 'Vitesse max', value: '270 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'I4 Turbo' },
                    { label: 'Cylindrée', value: '2.0L' },
                    { label: 'Transmission', value: 'DSG 7' },
                    { label: 'Consommation', value: '8.5L/100km' }
                ]
            },
            price: '800 CHF',
            available: true
        },
        'mercedes-g63': {
            name: 'Mercedes-AMG G63',
            year: '2024',
            images: [
                'image/jWagon.jpeg',
                'image/jWagon2.jpeg',
                'image/wheel_jWagon.jpeg',
                'image/jWagon_back (2).jpeg',
                'image/jWagon_back (1).jpeg'
            ],
            specs: {
                performance: [
                    { label: 'Puissance', value: '577 CV' },
                    { label: 'Couple', value: '850 Nm' },
                    { label: '0-100 km/h', value: '4.5s' },
                    { label: 'Vitesse max', value: '220 km/h' }
                ],
                engine: [
                    { label: 'Type', value: 'V8 Biturbo' },
                    { label: 'Cylindrée', value: '4.0L' },
                    { label: 'Transmission', value: '9G-TRONIC' },
                    { label: 'Consommation', value: '13.1L/100km' }
                ]
            },
            price: '1\'200 CHF',
            available: true
        }
    };
    
    // Card click handlers
    holographicCards.forEach(card => {
        card.addEventListener('click', function() {
            const vehicleId = this.getAttribute('data-vehicle');
            
            if (vehicleId === 'coming-soon' || vehicleId === 'coming-soon-2') {
                console.log('🚧 Coming soon vehicle clicked');
                return;
            }
            
            if (vehicleData[vehicleId]) {
                openFullscreenModal(vehicleData[vehicleId]);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gallery navigation variables
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const modalMainImage = document.getElementById('modal-main-image');
    const galleryThumbnails = document.getElementById('gallery-thumbnails');
    
    let currentImageIndex = 0;
    let currentVehicleImages = [];
    
    // Gallery functions
    function updateGallery(images) {
        currentVehicleImages = images;
        currentImageIndex = 0;
        
        if (modalMainImage && images.length > 0) {
            modalMainImage.src = images[0];
        }
        
        // Update thumbnails
        if (galleryThumbnails && images.length > 1) {
            galleryThumbnails.innerHTML = images.map((img, index) => `
                <img src="${img}" alt="Image ${index + 1}" 
                     class="thumbnail ${index === 0 ? 'active' : ''}" 
                     data-index="${index}"
                     style="width: 80px; height: 60px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid ${index === 0 ? '#00E1FF' : 'transparent'};">
            `).join('');
            
            // Add click handlers to thumbnails
            galleryThumbnails.querySelectorAll('.thumbnail').forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    currentImageIndex = index;
                    updateMainImage();
                    updateThumbnailSelection();
                });
            });
        } else if (galleryThumbnails) {
            galleryThumbnails.innerHTML = '';
        }
        
        // Show/hide navigation buttons
        if (galleryPrev && galleryNext) {
            galleryPrev.style.display = images.length > 1 ? 'flex' : 'none';
            galleryNext.style.display = images.length > 1 ? 'flex' : 'none';
        }
    }
    
    function updateMainImage() {
        if (modalMainImage && currentVehicleImages[currentImageIndex]) {
            modalMainImage.src = currentVehicleImages[currentImageIndex];
        }
    }
    
    function updateThumbnailSelection() {
        const thumbnails = galleryThumbnails.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
            thumb.style.borderColor = index === currentImageIndex ? '#00E1FF' : 'transparent';
        });
    }
    
    // Modal functions
    function openFullscreenModal(vehicle) {
        console.log('🚗 Opening fullscreen modal for:', vehicle.name);
        
        // Populate modal content
        document.getElementById('modal-vehicle-name').textContent = vehicle.name;
        document.getElementById('modal-vehicle-year').textContent = vehicle.year;
        
        // Update gallery
        updateGallery(vehicle.images || []);
        
        // Update specs
        updateVehicleSpecs(vehicle.specs);
        
        // Update pricing
        const priceAmount = document.querySelector('.price-amount');
        const availabilityStatus = document.querySelector('.availability-status span');
        if (priceAmount) priceAmount.textContent = vehicle.price;
        
        // Update availability status
        if (availabilityStatus) {
            if (vehicle.status === 'reserved') {
                availabilityStatus.textContent = 'Réservée';
            } else if (vehicle.status === 'unavailable') {
                availabilityStatus.textContent = 'Indisponible';
            } else {
                availabilityStatus.textContent = 'Disponible';
            }
        }
        
        // Update WhatsApp link
        const reserveBtn = document.querySelector('.reserve-btn');
        if (reserveBtn) {
            reserveBtn.href = `https://wa.me/41791962868?text=Bonjour, je suis intéressé par la ${encodeURIComponent(vehicle.name)}`;
        }
        
        // Show modal with animation
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add zoom + glow animation
        const modalContainer = fullscreenModal.querySelector('.modal-container');
        // Reset any previous styles
        modalContainer.style.transition = '';
        modalContainer.style.transform = 'scale(0.9)';
        modalContainer.style.opacity = '0';
        
        // Force a reflow to ensure the initial state is applied
        modalContainer.offsetHeight;
        
        setTimeout(() => {
            modalContainer.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            modalContainer.style.transform = 'scale(1)';
            modalContainer.style.opacity = '1';
        }, 10);
    }
    
    function updateVehicleSpecs(specs) {
        const performanceGrid = document.querySelector('.spec-category:first-of-type .spec-grid');
        const engineGrid = document.querySelector('.spec-category:last-of-type .spec-grid');
        
        if (performanceGrid && specs.performance) {
            performanceGrid.innerHTML = specs.performance.map(spec => `
                <div class="spec-detail">
                    <span class="spec-label">${spec.label}</span>
                    <span class="spec-value">${spec.value}</span>
                </div>
            `).join('');
        }
        
        if (engineGrid && specs.engine) {
            engineGrid.innerHTML = specs.engine.map(spec => `
                <div class="spec-detail">
                    <span class="spec-label">${spec.label}</span>
                    <span class="spec-value">${spec.value}</span>
                </div>
            `).join('');
        }
    }
    
    function closeFullscreenModal() {
        console.log('❌ Closing fullscreen modal');
        
        const modalContainer = fullscreenModal.querySelector('.modal-container');
        modalContainer.style.transition = 'all 0.3s ease';
        modalContainer.style.transform = 'scale(0.9)';
        modalContainer.style.opacity = '0';
        
        setTimeout(() => {
            fullscreenModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Reset modal container styles for next opening
            modalContainer.style.transform = 'scale(1)';
            modalContainer.style.opacity = '1';
            modalContainer.style.transition = '';
        }, 300);
    }
    
    // Close modal handlers
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeFullscreenModal);
    }
    
    // Close on backdrop click
    const modalBackdrop = fullscreenModal.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeFullscreenModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenModal.classList.contains('active')) {
            closeFullscreenModal();
        }
    });
    
    // Gallery navigation
    
    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', () => {
            if (currentVehicleImages.length > 1) {
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentVehicleImages.length - 1;
                updateMainImage();
                updateThumbnailSelection();
            }
        });
        
        galleryNext.addEventListener('click', () => {
            if (currentVehicleImages.length > 1) {
                currentImageIndex = currentImageIndex < currentVehicleImages.length - 1 ? currentImageIndex + 1 : 0;
                updateMainImage();
                updateThumbnailSelection();
            }
        });
    }
    
    console.log('✅ Holographic Cards initialized successfully!');
}
