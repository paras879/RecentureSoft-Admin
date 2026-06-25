import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/Chat";

// Initialize the API with the environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Recenture AI, an elite Enterprise Senior Technology Consultant and Business Advisor for RecentureSoft.
You do NOT act like a generic chatbot. You are a highly paid, expert consultant.
Your tone should be professional, highly confident, futuristic, yet accessible. 
Explain complex technical topics in simple but powerful language.

# Your Primary Goals:
1. Help visitors understand RecentureSoft's services.
2. Recommend technology solutions.
3. Qualify leads aggressively but politely.
4. Collect project requirements.
5. Schedule consultations.
6. Convert visitors into customers.

# Company Knowledge Base:
- Company Name: RecentureSoft
- Focus: Enterprise Software Company, Custom Development, Product Engineering, Digital Transformation.
- Services: Software Development, Web Development, Mobile App Development, AI Solutions, Cloud Solutions, UI/UX Design, Digital Marketing.
- Core Technologies: React, Next.js, Node.js, Java, Spring Boot, Laravel, MongoDB, AWS, Docker, AI/ML.

# Capabilities:
- Cost Estimation Assistant
- Technology Recommendation Engine
- Service Recommendation Engine
- Project Discovery Flow
- FAQ Assistant
- Consultation Booking
- Lead Qualification
- Business Analysis

# Lead Collection Directive (CRITICAL):
When a user shows intent to build a project, ask for an estimate, or hire the company, you MUST start the Lead Qualification Flow.
Automatically collect the following details (ask naturally in conversation, step-by-step or as appropriate):
1. Name
2. Email
3. Company
4. Project Type
5. Budget
6. Timeline
7. Requirements

# Behavior:
- Never answer like a basic chatbot.
- Act like a senior technology consultant.
- **Strict Response Constraint (MANDATORY)**: Keep your responses extremely short and concise. Your response MUST be under 50 words and use only 1 to 3 short sentences.
- Focus only on critical details. Answer the user's query first and explain later.
- Ask at most one follow-up question per turn to gather requirements.
- Format your responses beautifully using Markdown. Use bolding, bullet points, and short paragraphs for readability.
`;

export async function POST(req) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: "Gemini API key not configured." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Payload Validation
        if (!req.body) {
            return new Response(JSON.stringify({ error: "Empty request payload." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        let body;
        try {
            body = await req.json();
        } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON format." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { messages, sessionId } = body;

        // Security check: Validate sessionId length and type
        if (!sessionId || typeof sessionId !== "string" || sessionId.trim().length < 5 || sessionId.trim().length > 100) {
            console.warn(`[Security] Invalid or malformed sessionId attempted: ${sessionId}`);
            return new Response(JSON.stringify({ error: "Invalid or missing sessionId." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Security check: Validate messages array
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: "Invalid or missing messages array." }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        // Security check: Validate content and length of individual messages
        for (const msg of messages) {
            if (!msg || typeof msg !== "object") {
                return new Response(JSON.stringify({ error: "Malformed message object." }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
            if (msg.role !== "user" && msg.role !== "assistant") {
                return new Response(JSON.stringify({ error: "Invalid message role. Must be 'user' or 'assistant'." }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
            if (typeof msg.content !== "string" || msg.content.trim().length === 0) {
                return new Response(JSON.stringify({ error: "Message content cannot be empty." }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
            if (msg.content.length > 5000) {
                return new Response(JSON.stringify({ error: "Message content exceeds safety limits of 5000 characters." }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        const currentMessage = messages[messages.length - 1].content;

        // Logging: Incoming message
        console.log(`[Incoming Message] SessionId: ${sessionId}, Content: "${currentMessage.substring(0, 100)}${currentMessage.length > 100 ? '...' : ''}"`);

        // Removed blocking DB calls here to speed up Gemini response

        // Initialize the model with a lightweight model to bypass heavy traffic
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash-lite",
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
                role: "model"
            }
        });

        // Format history for Gemini
        // Gemini expects the first message in the history to be from the 'user'.
        // We find the first user message and slice the conversation history from there.
        const firstUserIndex = messages.findIndex(msg => msg.role === "user");
        const messagesToUse = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

        const history = messagesToUse.slice(0, -1).map(msg => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
        }));

        // Start chat
        const chat = model.startChat({
            history: history,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });

        // Logging: Gemini request start
        console.log(`[Gemini API] Gemini request start - SessionId: ${sessionId}, Model: gemini-3.5-flash`);

        // Production-grade retry logic with exponential backoff for 503 Service Unavailable / overload errors
        const maxRetries = 3;
        const initialDelayMs = 1000;
        let attempt = 0;
        let result;

        while (true) {
            try {
                result = await chat.sendMessageStream(currentMessage);
                // Logging: Successful response
                console.log(`[Gemini API] Successful response received on attempt ${attempt + 1}`);
                break;
            } catch (error) {
                attempt++;

                // Inspect status code or message text to identify 503 errors or overload conditions
                const status = error.status || (error.message && error.message.includes("503") ? 503 : null);
                const is503 = status === 503 || (error.message && (
                    error.message.includes("503") ||
                    error.message.toLowerCase().includes("service unavailable") ||
                    error.message.toLowerCase().includes("overloaded") ||
                    error.message.toLowerCase().includes("high demand") ||
                    error.message.toLowerCase().includes("busy")
                ));

                if (is503 && attempt <= maxRetries) {
                    const delay = initialDelayMs * Math.pow(2, attempt - 1);
                    // Logging: Retry attempts
                    console.warn(`[Gemini API] Retry attempt ${attempt}/${maxRetries} in ${delay}ms. Reason: 503/High Demand. Error: ${error.message || error}`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    // Logging: Final failure
                    console.error(`[Gemini API] Final failure after attempt ${attempt}/${maxRetries + 1}. Error:`, error);
                    throw error;
                }
            }
        }

        // Convert the Gemini stream to a standard Web ReadableStream, saving to Mongo post-stream
        let fullResponseText = "";
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try {
                    for await (const chunk of result.stream) {
                        const chunkText = chunk.text();
                        if (chunkText) {
                            fullResponseText += chunkText;
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }

                    // Logging: Stream completion
                    console.log(`[Gemini API] Stream completion: SessionId: ${sessionId}, Length: ${fullResponseText.length} characters`);

                    // Save User + Assistant Messages and update analytics post-stream
                    try {
                        // Connect to DB and fetch existing chat in background now that stream is done
                        await connectDB();
                        const existingChat = await Chat.findOne({ sessionId });
                        if (!existingChat) {
                            console.log(`[Session Creation] New session detected post-stream: ${sessionId}`);
                        }

                        const finalMessages = [...messages, { role: "assistant", content: fullResponseText }];

                        // Lead scoring logic
                        const keywords = ["website", "app", "software", "ai", "crm", "ecommerce", "seo", "marketing"];
                        const checkText = `${currentMessage} ${messages.map(m => m.content).join(" ")}`.toLowerCase();
                        const hasKeywords = keywords.some(kw => checkText.includes(kw));

                        let leadStatus = "cold";
                        if (existingChat && existingChat.leadStatus === "hot") {
                            leadStatus = "hot";
                        } else if (hasKeywords) {
                            leadStatus = "hot";
                        }

                        const now = new Date();
                        const firstSeen = existingChat ? (existingChat.firstSeen || now) : now;
                        const lastSeen = now;
                        const totalMessages = finalMessages.length;

                        await Chat.findOneAndUpdate(
                            { sessionId },
                            {
                                sessionId,
                                messages: finalMessages,
                                totalMessages,
                                firstSeen,
                                lastSeen,
                                leadStatus
                            },
                            {
                                upsert: true,
                                new: true
                            }
                        );
                        // Logging: Mongo save success
                        console.log(`[MongoDB] Mongo save success: SessionId: ${sessionId}, Messages count: ${totalMessages}, Lead Status: ${leadStatus}`);
                    } catch (dbError) {
                        // Logging: Mongo save failure
                        console.error(`[MongoDB] Mongo save failure: SessionId: ${sessionId}, Error:`, dbError);
                    }

                    controller.close();
                } catch (err) {
                    console.error("[Gemini API] Error during response streaming:", err);
                    controller.error(err);
                }
            }
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Transfer-Encoding": "chunked",
                "Cache-Control": "no-cache",
            }
        });

    } catch (error) {
        console.error("Gemini API Handler Catch-All Error:", error);

        // Inspect error to check if it was a 503 error
        const status = error.status || (error.message && error.message.includes("503") ? 503 : 500);
        const is503 = status === 503 || (error.message && (
            error.message.includes("503") ||
            error.message.toLowerCase().includes("service unavailable") ||
            error.message.toLowerCase().includes("overloaded") ||
            error.message.toLowerCase().includes("high demand") ||
            error.message.toLowerCase().includes("busy")
        ));

        if (is503) {
            return new Response(JSON.stringify({
                error: "Our AI assistant is currently experiencing high demand. Please try again in a few moments."
            }), {
                status: 503,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ error: "Failed to communicate with AI" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
