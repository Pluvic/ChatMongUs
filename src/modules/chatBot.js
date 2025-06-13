// This file contains the logic for generating bot messages using the Ollama API.
// It includes a function to generate a bot message based on the theme and conversation history.

// Import the Ollama library
const { Ollama } = require('ollama');

// Constants definition
const ollama = new Ollama({ host :'http://ollama:11434' });

// Function to generate a bot message based on the theme and conversation history
async function generateBotMessage(theme, conversation, language = 'en') {
    // Check if the theme is empty or undefined
    if (!theme || theme.trim() === "") {
        return "Please provide a valid theme for the conversation.";
    }

    // Set up the messages for the chat model
    const messages = [
        { role: "system", content: `You are a human who take part of discussion on the theme: ${theme}. Stay relevant to this theme and try to give no more than 10 words for each answer. You're human, so don't use too complicated words, and you can use abbreviations if you think it's relevant.` },
        { role: "user", content : `I like to talk about ${theme}` },
        ...conversation.map(msg => ({ role: 'user', content: msg.text }))
    ];

    const messagesFR = [
        { role: "system", content: `Tu es un humain qui participe à une conversation sur le thème : ${theme}. Restez pertinent par rapport à ce thème et essayez de ne pas dépasser 10 mots pour chaque réponse. Tu es un humain donc n'utilise pas des mots trop compliqués et tu peux utiliser des abréviations si tu trouves ça pertinent` },
        { role: "user", content : `J'aime parler de ${theme}` },
        ...conversation.map(msg => ({ role: 'user', content: msg.text }))
    ]
    
    // Generate the bot message using the Ollama API
    try {
        console.log("Generate Answer...");
        // Choose the appropriate language for the messages
        const messages = language === 'fr' ? messagesFR : messages;
        const response = await ollama.chat({
            model: "llama3.2",
            messages: messages,
        });
        console.log("Response:", response);
        
        return response.message.content;
    
    // Handle errors during the API call
    } catch (error) {
        console.error("Error generating bot message:", error);
        return "I'm having trouble generating a response right now.";
    }
}

// Function to preload the model to improve response time
async function preloadModel() {
    console.log("Preloading model...");

    // Attempt to preload the model by sending a test message
    try {
        await ollama.chat({
            model: "llama3.2",
            messages: [{ role: "system", content: "Warming up the model." }],
            options: { max_tokens: 5 }
        });
        console.log("Model preloaded successfully!");
    
    // Handle errors during the preloading process
    } catch (error) {
        console.error("Error preloading model:", error);
    }
}

// Export the functions for use in other modules
module.exports = { generateBotMessage, preloadModel };