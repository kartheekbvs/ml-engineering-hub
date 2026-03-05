const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
const apiKey = "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";

document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatWindow = document.getElementById('ai-chat-window');
    const chatClose = document.getElementById('ai-chat-close');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSend = document.getElementById('ai-chat-send');
    const chatMessages = document.getElementById('ai-chat-messages');

    // Toggle Chat Window
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Handle Sending Message
    const sendMessage = async () => {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage('user', text);
        chatInput.value = '';

        // Add AI Loading State
        const loadingId = 'msg-' + Date.now();
        appendMessage('ai', '<span class="typing-indicator"><span>.</span><span>.</span><span>.</span></span>', loadingId);

        try {
            const response = await fetch(invokeUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "google/gemma-3n-e4b-it",
                    "messages": [{ "role": "user", "content": text }],
                    "max_tokens": 512,
                    "temperature": 0.20,
                    "top_p": 0.70,
                    "stream": false
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const aiReply = data.choices[0].message.content;

            // Remove Loading State and Type Response
            document.getElementById(loadingId).remove();
            typeWriterEffect('ai', formatMarkdown(aiReply));

        } catch (error) {
            console.error("AI Error:", error);
            document.getElementById(loadingId).remove();
            appendMessage('error', 'Sorry, I encountered an error connecting to the model.');
        }
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Helper functions
    function appendMessage(role, content, id = null) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-message fade-up`;
        if (id) msgDiv.id = id;
        msgDiv.innerHTML = content;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function typeWriterEffect(role, content) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${role}-message fade-up`;
        chatMessages.appendChild(msgDiv);

        let i = 0;
        msgDiv.innerHTML = content; // Using innerHTML directly for markdown
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Basic markdown formatter
    function formatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
            .replace(/\n\n/g, '<br><br>');
    }
});
