
// Toggle menu lock state
function toggleMenuLock() {
    const sidebar = document.getElementById('sidebar');
    const lockIcon = document.getElementById('lockIcon');
    const categoryButtons = document.querySelectorAll('.categorybtn');
    
    if (sidebar.classList.contains('unlocked')) {
        // Lock and collapse menu
        sidebar.classList.remove('unlocked');
        sidebar.classList.add('locked', 'collapsed');
        lockIcon.textContent = '🔒';
        lockIcon.title = 'Click to unlock menu';
        sidebar.style.maxHeight = '250px';
        sidebar.style.overflowY = 'auto';
        categoryButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.7';
        });
        
        document.querySelectorAll('.topics').forEach(topic => {
            topic.style.display = 'none';
        });
    } else {
        // Unlock and expand menu
        sidebar.classList.remove('locked', 'collapsed');
        sidebar.classList.add('unlocked');
        lockIcon.textContent = '🔓';
        lockIcon.title = 'Click to lock menu';
        sidebar.style.maxHeight = 'fit-content'; 
        categoryButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
        });
        document.querySelectorAll('.topics').forEach(topic => {
            topic.style.display = 'block';
        });
    }
}

// Initialize with topics visible
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lock icon (only once)
    document.getElementById('lockIcon').addEventListener('click', toggleMenuLock);
    
    // Initialize sidebar state
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('unlocked');
    
    // Show all topics by default
    document.querySelectorAll('.topics').forEach(topic => {
        topic.style.display = 'block';
    });
     // Welcome screen setup
    const welcomeScreen = document.getElementById('welcomeScreen');
    const appContent = document.getElementById('appContent');
    const enterBtn = document.getElementById('enterBtn');

    enterBtn.addEventListener('click', () => {
        welcomeScreen.style.display = 'none';
        appContent.style.display = 'block';
        showVideo('https://www.youtube.com/embed/7BpQfI981-U');
    });
});

// Toggle topic visibility
function toggleTopics(topicId) {
    const topics = document.getElementById(topicId);
    topics.style.display = topics.style.display === 'block' ? 'none' : 'block';
}

// Show video content
function showVideo(videoUrl) {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('mapContainer').style.display = 'none';
    
    const videoContainer = document.getElementById('videoContainer');
    videoContainer.style.display = 'block';
let autoplayUrl = videoUrl;
if (!autoplayUrl.includes('autoplay=1')) {
    autoplayUrl += (autoplayUrl.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
}
document.getElementById('courseVideo').src = autoplayUrl;
    
    updateActiveLink(event.target);
}

let currentAttempts = 0;

// Quizzes Content
const quizzes = {
    quiz1: {
        title: "Email Etiquette",
        questions: [{
            question: "When is it appropriate to use 'Reply All'?",
            options: [
                "When you want everyone to see your response",
                "Only when your response is relevant to all recipients",
                "When you're annoyed and want to make a point",
                "Never, it's always wrong"
            ],
            correct: 1,
            explanation: "‘Reply All’ can be a lifesaver — or a nightmare. Use it only when your reply truly matters to everyone in the thread. Overusing it makes inboxes explode!"
        }]
    },
    quiz2: {
        title: "Email Recovery",
        questions: [{
            question: "You accidentally sent an email to the wrong person. What should you do?",
            options: [
                "Send a follow-up email asking them to ignore it",
                "Use the 'recall' feature if available",
                "Apologize briefly and move on",
                "Pretend it never happened"
            ],
            correct: 2,
            explanation: "Mistakes happen! The best move? Acknowledge it briefly, apologize if needed, and move on. No drama, no panic. Bonus points if you double-check next time."
        }]
    },
    quiz3: {
        title: "Office Politics",
        questions: [{
            question: "How should you handle a passive-aggressive email from a colleague?",
            options: [
                "Respond with even more passive-aggression",
                "Call them out publicly in a reply-all",
                "Address the issue directly but professionally",
                "Forward it to HR immediately"
            ],
            correct: 2,
            explanation: "Passive-aggressive emails are traps. Don't take the bait. The mature move? Respond calmly, directly, and professionally. Let your grace speak louder than their sass."
        }]
    },
    quiz4: {
        title: "Office Culture",
        questions: [{
            question: "What's the best way to handle office gossip?",
            options: [
                "Participate enthusiastically",
                "Listen but don't contribute",
                "Report it to management immediately",
                "Start your own gossip chain"
            ],
            correct: 1,
            explanation: "Gossip travels faster than email — and does more damage. It's okay to listen, but don't pass it on."
        }]
    }
};

// Load quiz questions
function showQuiz(quizId) {
    document.getElementById('videoContainer').style.display = 'none';
    document.getElementById('mapContainer').style.display = 'none';
    
    const quizContainer = document.getElementById('quizContainer');
    quizContainer.style.display = 'block';
    
    const quiz = quizzes[quizId];
    document.getElementById('quizTitle').textContent = quiz.title;
    
    const question = quiz.questions[0];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionId = `option-${index}`;
        optionsList.innerHTML += `
            <label for="${optionId}">
                <input type="radio" id="${optionId}" name="quizOption" value="${index}">
                ${option}
            </label>
        `;
    });
    
    document.getElementById('quizForm').dataset.correctAnswer = question.correct;
    document.getElementById('quizForm').dataset.explanation = question.explanation;
    updateActiveLink(event.target);
    closeFeedback();
    currentAttempts = 0;
}

// Submit quiz
function submitQuiz() {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    const correctAnswer = document.getElementById('quizForm').dataset.correctAnswer;
    
    const feedback = document.getElementById('quizFeedback');
    const icon = document.getElementById('feedbackIcon');
    const message = document.getElementById('feedbackMessage');

    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    currentAttempts++;

    const activeQuizId = document.querySelector('.topics a.active')
        .getAttribute('onclick')
        .match(/quiz\d+/)[0];

    const explanation = quizzes[activeQuizId].questions[0].explanation;

    if (selectedOption.value === correctAnswer) {
        icon.textContent = "✓";
        icon.className = "correct";

        if (currentAttempts === 1) {
            message.textContent = "Correct! Good job!";
        } else {
            message.innerHTML = "Correct! Well done fixing it!<br><br><em>" + explanation + "</em>";
        }
    } else {
        icon.textContent = "✗";
        icon.className = "incorrect";
        message.textContent = "Incorrect. Try again.";
    }

    feedback.style.display = "flex";
}

function closeFeedback() {
    document.getElementById('quizFeedback').style.display = "none";
}

// Update active link
function updateActiveLink(clickedLink) {
    document.querySelectorAll('.topics a').forEach(link => {
        link.classList.remove('active');
    });
    
    if (clickedLink && clickedLink.classList) {
        clickedLink.classList.add('active');
    }
}

// Continue to next item
function continueToNext() {
    const allTopics = Array.from(document.querySelectorAll('.topics a'));
    const activeIndex = allTopics.findIndex(link => link.classList.contains('active'));

    if (activeIndex === -1) return;

    const nextTopic = allTopics[activeIndex + 1];

    if (nextTopic) {
        nextTopic.click();
    } else {
        showCompletionPopup(); // Show final popup
    }
}
function showCompletionPopup() {
    document.getElementById('completionPopup').style.display = 'flex';
}

function closeCompletionPopup() {
    document.getElementById('completionPopup').style.display = 'none';
}

// Enhanced location data with detailed explanations
const saudiMapLocations = {
    riyadh: {
        top: 24.7136,
        left: 46.6753,
        risk: 'high',
        tooltip: 'Riyadh: Corporate Email Hub',
        explanation: `
            <h3>Corporate Email Hazard Zone</h3>
            <p><strong>Why risky?</strong> High concentration of multinational HQ offices where email mistakes can escalate quickly.</p>
            <ul>
                <li><i class="fas fa-reply-all"></i> <strong>Reply-all storms</strong> frequently originate here</li>
                <li><i class="fas fa-eye-slash"></i> <strong>CC/BCC misuse</strong> causes 73% of HR incidents</li>
                <li><i class="fas fa-chart-line"></i> <strong>Promotion emails</strong> have highest mis-send rate</li>
            </ul>
            <div class="popup-tip">
                <i class="fas fa-lightbulb"></i> <strong>Survival tip:</strong> Triple-check recipient lists before sending!
            </div>
        `
    },
    jeddah: {
        top: 21.5433,
        left: 39.1829,
        risk: 'medium',
        tooltip: 'Jeddah: International Business Emails',
        explanation: `
            <h3>International Business Zone</h3>
            <p><strong>Key challenges:</strong> Cross-cultural communication pitfalls</p>
            <ul>
                <li><i class="fas fa-globe"></i> <strong>Timezone confusion</strong> causes delayed responses</li>
                <li><i class="fas fa-handshake"></i> <strong>Formality mismatches</strong> common with global partners</li>
                <li><i class="fas fa-calendar-alt"></i> <strong>Holiday conflicts</strong> affect scheduling</li>
            </ul>
            <div class="popup-tip">
                <i class="fas fa-lightbulb"></i> <strong>Pro tip:</strong> Use clear UTC timestamps in meeting invites
            </div>
        `
    },
    dammam: {
        top: 26.4207,
        left: 50.0888,
        risk: 'low',
        tooltip: 'Dammam: Formal Email Zone',
        explanation: `
            <h3>Formal Communication Zone</h3>
            <p><strong>Characteristics:</strong> Traditional business etiquette expected</p>
            <ul>
                <li><i class="fas fa-envelope-open-text"></i> <strong>Formal salutations</strong> are mandatory</li>
                <li><i class="fas fa-paperclip"></i> <strong>Attachment etiquette</strong> strictly followed</li>
                <li><i class="fas fa-clock"></i> <strong>Response times</strong> slower but more deliberate</li>
            </ul>
            <div class="popup-tip">
                <i class="fas fa-lightbulb"></i> <strong>Best practice:</strong> Always use "Dear [Title] [Last Name]" format
            </div>
        `
    },
    mecca: {
        top: 21.3891,
        left: 39.8579,
        risk: 'medium',
        tooltip: 'Mecca: Cultural Considerations',
        explanation: `
            <h3>Cultural Sensitivity Zone</h3>
            <p><strong>Special considerations:</strong> Religious and cultural norms affect communication</p>
            <ul>
                <li><i class="fas fa-mosque"></i> <strong>Prayer times</strong> affect response expectations</li>
                <li><i class="fas fa-users"></i> <strong>Relationship-building</strong> precedes business</li>
                <li><i class="fas fa-calendar-check"></i> <strong>Islamic calendar</strong> dates often preferred</li>
            </ul>
            <div class="popup-tip">
                <i class="fas fa-lightbulb"></i> <strong>Key tip:</strong> Avoid scheduling emails during Friday prayers
            </div>
        `
    },
    medina: {
        top: 24.5247,
        left: 39.5692,
        risk: 'low',
        tooltip: 'Medina: Traditional Communication',
        explanation: `
            <h3>Traditional Communication Hub</h3>
            <p><strong>Communication style:</strong> More personal and indirect</p>
            <ul>
                <li><i class="fas fa-phone-alt"></i> <strong>Phone follow-ups</strong> often expected</li>
                <li><i class="fas fa-smile"></i> <strong>Personal greetings</strong> valued over brevity</li>
                <li><i class="fas fa-hourglass-half"></i> <strong>Patience</strong> with slower digital adoption</li>
            </ul>
            <div class="popup-tip">
                <i class="fas fa-lightbulb"></i> <strong>Remember:</strong> Always begin with personal inquiries before business
            </div>
        `
    }
};

let map; // Global map variable

// Initialize Saudi Map with Leaflet
function initSaudiMap() {
    const mapContent = document.getElementById('mapContent');
    mapContent.innerHTML = '<div id="leafletMap" style="height: 100%; width: 100%;"></div>';
    
    // Create Leaflet map centered on Saudi Arabia
    map = L.map('leafletMap').setView([23.8859, 45.0792], 5);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Custom pin icons
    const pinIcons = {
        high: L.divIcon({
            html: '<i class="fas fa-map-marker-alt" style="color: #e74c3c; font-size: 24px;"></i>',
            className: 'custom-pin'
        }),
        medium: L.divIcon({
            html: '<i class="fas fa-map-marker-alt" style="color: #f39c12; font-size: 24px;"></i>',
            className: 'custom-pin'
        }),
        low: L.divIcon({
            html: '<i class="fas fa-map-marker-alt" style="color: #2ecc71; font-size: 24px;"></i>',
            className: 'custom-pin'
        })
    };
    
    // Add markers to the map
    const markers = {};
    Object.entries(saudiMapLocations).forEach(([id, loc]) => {
        const marker = L.marker([loc.top, loc.left], {
            icon: pinIcons[loc.risk]
        }).addTo(map);
        
        marker.bindTooltip(loc.tooltip, { 
            permanent: false, 
            direction: 'top',
            className: 'custom-tooltip'
        });
        
        marker.on('click', () => showLocationDetail(id));
        
        markers[id] = {
            element: marker,
            risk: loc.risk
        };
    });
    
    // Store markers for filtering
    mapContent._markers = markers;
    
    // Update map title
    document.getElementById('mapTitle').textContent = 'Saudi Arabia Email Zones';
    document.querySelector('.map-controls').style.display = 'flex';
}

// Enhanced location detail popup
function showLocationDetail(locationId) {
    const loc = saudiMapLocations[locationId];
    
    // Create custom popup content
    const popupContent = `
        <div class="location-popup">
            <div class="popup-header ${loc.risk}-risk">
                <h3>${loc.tooltip.split(':')[0]}</h3>
                <span class="risk-badge">${loc.risk.toUpperCase()} RISK</span>
            </div>
            <div class="popup-body">
                ${loc.explanation}
                <div class="popup-stats">
                    <span><i class="fas fa-envelope"></i> ${getRandomEmailStats()} email incidents/month</span>
                    <span><i class="fas fa-clock"></i> ${getRandomResponseTime()} avg response time</span>
                </div>
            </div>
        </div>
    `;
    
    // Create Leaflet popup
    L.popup()
        .setLatLng([loc.top, loc.left])
        .setContent(popupContent)
        .openOn(map);
}

// Helper functions for realistic stats
function getRandomEmailStats() {
    const stats = {
        high: Math.floor(Math.random() * 50) + 50,
        medium: Math.floor(Math.random() * 30) + 20,
        low: Math.floor(Math.random() * 10) + 5
    };
    return stats[document.querySelector('.filter-btn.active').id.replace('-btn', '')];
}

function getRandomResponseTime() {
    const times = {
        high: `${Math.floor(Math.random() * 2) + 1} hours`,
        medium: `${Math.floor(Math.random() * 12) + 4} hours`,
        low: `${Math.floor(Math.random() * 24) + 12} hours`
    };
    return times[document.querySelector('.filter-btn.active').id.replace('-btn', '')];
}

// Filter pins by risk level
function filterMap(riskLevel) {
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter markers
    const markers = document.getElementById('mapContent')._markers;
    Object.values(markers).forEach(markerData => {
        if (riskLevel === 'all' || markerData.risk === riskLevel) {
            markerData.element.addTo(map);
        } else {
            map.removeLayer(markerData.element);
        }
    });
}
// Show map function
function showMap(mapType) {
    document.getElementById('videoContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'none';
    
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.style.display = 'block';
    
    if (mapType === 'saudi') {
        initSaudiMap();
    } else {
        // Default map display (we can add other maps later)
        const mapContent = document.getElementById('mapContent');
        mapContent.innerHTML = `<img src="images/${mapType}-map.png" class="map-img">`;
        document.querySelector('.map-controls').style.display = 'none';
    }
    
    updateActiveLink(event.target);
}

// Show welcome screen on page load, hide app content
document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const appContent = document.getElementById('appContent');
  const enterBtn = document.getElementById('enterBtn');

  // On clicking Enter Guide, hide welcome and show app content
  enterBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    appContent.style.display = 'block';

    // Show the first video by default once inside the app
     const firstTopicLink = document.querySelector('.topics a');
    if (firstTopicLink) {
        firstTopicLink.click();
    }
  });
});