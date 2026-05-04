// main.js - Modern Portfolio Interactivity
// Author: Sweta Merai

// Loader
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if(loader) setTimeout(() => loader.style.opacity = 0, 800);
  setTimeout(() => { if(loader) loader.style.display = 'none'; }, 1200);
});

// Smooth scroll for anchor links
const links = document.querySelectorAll('a[href^="#"]');
for(const link of links) {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Animate on scroll (AOS-like)
function animateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  for(const el of elements) {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80) {
      el.classList.add('aos-animate');
    }
  }
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Chatbot logic (basic Q&A)
const chatbotFab = document.getElementById('chatbotFab');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotForm = document.getElementById('chatbotForm');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');
if(chatbotFab && chatbotWindow && chatbotClose) {
  chatbotFab.onclick = () => chatbotWindow.classList.add('active');
  chatbotClose.onclick = () => chatbotWindow.classList.remove('active');
}
function botReply(userMsg) {
  userMsg = userMsg.toLowerCase();
  if(userMsg.includes('hello') || userMsg.includes('hi')) return "Hello! How can I assist you?";
  if(userMsg.includes('portfolio')) return "This is Sweta Merai's professional portfolio. Want to know more?";
  if(userMsg.includes('contact')) return "You can contact me via email: meraisweta11@gmail.com or LinkedIn.";
  if(userMsg.includes('skills')) return "I am skilled in WordPress, PHP, MySQL, frontend & backend development, and more.";
  if(userMsg.includes('experience')) return "I have 3+ years of experience as a WordPress Developer at August Infotech.";
  if(userMsg.includes('project')) return "Check out my projects section above for details on my work.";
  if(userMsg.includes('cv') || userMsg.includes('resume')) return "You can download my CV from the Hero section above.";
  return "Sorry, I didn't understand that. Please ask about my skills, projects, or contact info!";
}
if(chatbotForm && chatbotInput && chatbotMessages) {
  chatbotForm.onsubmit = function(e) {
    e.preventDefault();
    const userMsg = chatbotInput.value.trim();
    if(!userMsg) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'chatbot-msg-user';
    userDiv.textContent = userMsg;
    chatbotMessages.appendChild(userDiv);
    setTimeout(() => {
      const botDiv = document.createElement('div');
      botDiv.className = 'chatbot-msg-bot';
      botDiv.textContent = botReply(userMsg);
      chatbotMessages.appendChild(botDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 500);
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };
}
