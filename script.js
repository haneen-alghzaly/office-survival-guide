// Toggle menu lock state
function toggleMenuLock() {
    const sidebar = document.getElementById('sidebar');
    const lockIcon = document.getElementById('lockIcon');
    const categoryButtons = document.querySelectorAll('.categorybtn');
    
    if (sidebar.classList.contains('unlocked')) {

        sidebar.classList.remove('unlocked');
        sidebar.classList.add('locked');
        lockIcon.textContent = '🔒';
        lockIcon.title = 'Click to unlock menu';
        
        categoryButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.opacity = '0.7';
        });
        
        document.querySelectorAll('.topics').forEach(topic => {
            topic.style.display = 'none';
        });
        
    } else {

        sidebar.classList.remove('locked');
        sidebar.classList.add('unlocked');
        lockIcon.textContent = '🔓';
        lockIcon.title = 'Click to lock menu';
        
        categoryButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
        });
    }
}

// Initialize lock icon
document.getElementById('lockIcon').addEventListener('click', toggleMenuLock);
document.getElementById('sidebar').classList.add('expanded');

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
    document.getElementById('courseVideo').src = videoUrl;
    
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
            explanation: "Gossip travels faster than email — and does more damage. It’s okay to listen, but don’t pass it on."
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
    const activeLink = document.querySelector('.topics a.active');
    if (activeLink && activeLink.nextElementSibling) {
        activeLink.nextElementSibling.click();
    } else {
        alert("You've reached the end of this section!");
    }
}

// Saudi Arabia Map Locations Data (restored all locations)
const saudiMapLocations = {
    riyadh: {
        top: '48%',
        left: '55%',
        risk: 'high',
        tooltip: 'Riyadh: Corporate Email Hub'
    },
    jeddah: {
        top: '62%',
        left: '28%',
        risk: 'medium',
        tooltip: 'Jeddah: International Business Emails'
    },
    dammam: {
        top: '37%',
        left: '66%',
        risk: 'low',
        tooltip: 'Dammam: Formal Email Zone'
    },
    mecca: {
        top: '66%',
        left: '31%',
        risk: 'medium',
        tooltip: 'Mecca: Cultural Considerations'
    },
    medina: {
        top: '47.5%',
        left: '30.2%',
        risk: 'low',
        tooltip: 'Medina: Traditional Communication'
    }
};

// Initialize Saudi Map with Pins
function initSaudiMap() {
    const mapContent = document.querySelector('.map-content');
    mapContent.innerHTML = '';
    
    // Create Saudi map image
    const img = document.createElement('img');
    img.src = 'images/saudi-arabia-map.png';
    img.alt = 'Saudi Arabia Email Map';
    img.className = 'map-img';
    mapContent.appendChild(img);
    
    // Create pins for Saudi cities
    Object.entries(saudiMapLocations).forEach(([id, loc]) => {
        const pin = document.createElement('div');
        pin.className = `map-pin ${loc.risk}-risk`;
        pin.style.top = loc.top;
        pin.style.left = loc.left;
        pin.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <div class="pin-tooltip">${loc.tooltip}</div>
        `;
        pin.onclick = () => showLocationDetail(id);
        mapContent.appendChild(pin);
    });
    
    // Update map title
    document.getElementById('mapTitle').textContent = 'Saudi Arabia Email Zones';
    
    // Show filter controls
    document.querySelector('.map-controls').style.display = 'flex';
}

// Show location details when pin is clicked
function showLocationDetail(locationId) {
    const loc = saudiMapLocations[locationId];
    alert(`${loc.tooltip}\nRisk Level: ${loc.risk.toUpperCase()}`);
}

// Filter pins by risk level
function filterMap(riskLevel) {
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter pins
    document.querySelectorAll('.map-pin').forEach(pin => {
        if (riskLevel === 'all' || pin.classList.contains(`${riskLevel}-risk`)) {
            pin.style.display = 'block';
        } else {
            pin.style.display = 'none';
        }
    });
}

// Show map function
function showMap(mapImage) {
    document.getElementById('videoContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'none';
    
    const mapContainer = document.getElementById('mapContainer');
    mapContainer.style.display = 'block';
    
    if (mapImage.includes('saudi-arabia')) {
        initSaudiMap();
    } else {
        // Default map display
        const mapContent = document.querySelector('.map-content');
        mapContent.innerHTML = `<img src="${mapImage}" class="map-img">`;
        document.querySelector('.map-controls').style.display = 'none';
    }
    
    updateActiveLink(event.target);
}