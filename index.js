
console.log("ok")
var typed = new Typed(".tp", {
    strings: ["Coder","CS Graduate", "Java Full Stack Developer"],
    typeSpeed: 100,
    backSpeed: 80,
    loop: true
});
var typed = new Typed(".tpp", {
    strings: ["Unique Logic Solutions"],
    typeSpeed: 300,
    backSpeed: 80,
    loop: true
});

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    // Basic validation for demonstration purposes
    if (name === "" || email === "" || phone === "" || message === "") {
        alert("All fields must be filled out");
        return false; // Prevents the form from submitting
    }

    // If all validations pass
    return true;
}

// This is for Chatbot!!!
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chatbot-messages');

    function navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    chatSend.addEventListener('click', function() {
        const userMessage = chatInput.value.trim().toLowerCase();
        if (userMessage) {
            chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
            chatInput.value = '';

            let botResponse;
            switch (userMessage) {
                case 'home':
                    botResponse = "Navigating to Home...";
                    navigateToSection('section-home');
                    break;
                case 'skills':
                    botResponse = "Navigating to Skills...";
                    navigateToSection('section-skills');
                    break;
                case 'about me':
                    botResponse = "Navigating to About Me...";
                    navigateToSection('section-about');
                    break;
                case 'projects':
                    botResponse = "Navigating to Projects...";
                    navigateToSection('section-resume'); // Assuming 'section-resume' is for Projects
                    break;
                default:
                    botResponse = "Sorry, I didn't understand that. Please type 'home', 'skills', 'about me', or 'projects'.";
                    break;
            }

            setTimeout(() => {
                chatMessages.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
            }, 500);
        }
    });
});
