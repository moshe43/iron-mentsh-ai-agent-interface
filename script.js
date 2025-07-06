// AI Agent Interface JavaScript
class AIAgentInterface {
    constructor() {
        this.webhookUrl = 'https://eo1t8nbql9lyw2b.m.pipedream.net';
        this.messageCount = 0;
        this.tokenCount = 0;
        this.conversationHistory = [];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateStats();
        this.setCurrentTime();
    }
    
    bindEvents() {
        const chatForm = document.getElementById('chatForm');
        const messageInput = document.getElementById('messageInput');
        const clearButton = document.getElementById('clearChat');
        const temperatureSlider = document.getElementById('temperatureSlider');
        
        // Form submission
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendMessage();
        });
        
        // Enter key handling
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Clear chat
        clearButton.addEventListener('click', () => {
            this.clearChat();
        });
        
        // Temperature slider
        temperatureSlider.addEventListener('input', (e) => {
            document.getElementById('temperatureValue').textContent = e.target.value;
        });
    }
    
    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Clear input and show loading
        messageInput.value = '';
        this.setLoading(true);
        
        try {
            // Prepare request data
            const requestData = {
                message: message,
                model: document.getElementById('modelSelect').value,
                temperature: parseFloat(document.getElementById('temperatureSlider').value),
                conversationHistory: this.conversationHistory,
                timestamp: new Date().toISOString()
            };
            
            // Send request to webhook
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Add AI response to chat
            const aiResponse = result.response || result.content || 'I received your message, but I\'m having trouble generating a response right now.';
            this.addMessage(aiResponse, 'bot');
            
            // Update token count if provided
            if (result.tokens) {
                this.tokenCount += result.tokens;
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage(`I apologize, but I encountered an error: ${error.message}`, 'bot');
        } finally {
            this.setLoading(false);
        }
    }
    
    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString();
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${this.escapeHtml(content)}</p>
            </div>
            <div class="message-timestamp">${timestamp}</div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Update conversation history
        this.conversationHistory.push({
            role: sender === 'user' ? 'user' : 'assistant',
            content: content,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 10 messages in history
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }
        
        this.messageCount++;
        this.updateStats();
    }
    
    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Chat cleared. Hello! I'm your AI assistant. How can I help you today?</p>
                </div>
                <div class="message-timestamp">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        
        this.conversationHistory = [];
        this.messageCount = 0;
        this.updateStats();
    }
    
    setLoading(isLoading) {
        const sendButton = document.getElementById('sendButton');
        const buttonText = sendButton.querySelector('.button-text');
        const loadingSpinner = sendButton.querySelector('.loading-spinner');
        
        if (isLoading) {
            buttonText.style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            sendButton.disabled = true;
        } else {
            buttonText.style.display = 'inline-block';
            loadingSpinner.style.display = 'none';
            sendButton.disabled = false;
        }
    }
    
    updateStats() {
        document.getElementById('messageCount').textContent = this.messageCount;
        document.getElementById('tokenCount').textContent = this.tokenCount;
    }
    
    setCurrentTime() {
        const timestamps = document.querySelectorAll('.message-timestamp');
        timestamps.forEach(timestamp => {
            if (!timestamp.textContent) {
                timestamp.textContent = new Date().toLocaleTimeString();
            }
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the AI Agent Interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIAgentInterface();
});

// Additional utility functions
function formatMessage(text) {
    // Basic markdown-like formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

// Export for potential external use
window.AIAgentInterface = AIAgentInterface;