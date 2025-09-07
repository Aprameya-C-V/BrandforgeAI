import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { BrandIdentityResult, SocialPost, ContentIdea } from '../types';

// Assuming API_KEY is set in the environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// 1. Strategy Planner
export const generateStrategy = async (goals: string, audience: string, budget: string): Promise<string> => {
    const prompt = `
        You are an expert marketing strategist. Create a detailed marketing strategy for a business with the following characteristics.
        The output must be in markdown format. Use headings, lists, and bold text to structure the strategy.
        Cover these key areas:
        1.  **Executive Summary:** A brief overview of the strategy.
        2.  **Target Audience Analysis:** Deeper dive into the audience personas.
        3.  **Core Messaging & Positioning:** What is the brand's unique value proposition?
        4.  **Key Marketing Channels:** Recommend specific channels (e.g., Social Media, SEO, Content Marketing, Email, PPC).
        5.  **Actionable Initiatives:** Provide 3-5 specific, creative campaign ideas for the recommended channels.
        6.  **Budget Allocation:** Suggest how to allocate the budget (if provided).
        7.  **Success Metrics (KPIs):** How to measure the success of this strategy.

        **Business Goals:** ${goals}
        **Target Audience:** ${audience}
        **Approximate Budget:** ${budget || 'Not specified'}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating strategy:", error);
        throw new Error("Failed to generate marketing strategy. Please try again.");
    }
};


// 2. Market Research
export const performMarketResearch = async (topic: string): Promise<{ summary: string; sources: any[] }> => {
    const prompt = `
        As a professional market research analyst, provide a comprehensive market analysis report on the following topic: "${topic}".
        Your report should be well-structured and easy to read.
        Include the following sections in your analysis:
        -   **Market Overview:** Size, growth, and key trends.
        -   **Target Audience:** Who are the primary customers?
        -   **Competitive Landscape:** Who are the key players and what are their strengths/weaknesses?
        -   **Opportunities:** What are the untapped opportunities in this market?
        -   **Potential Challenges:** What are the risks or challenges to be aware of?
        -   **Final Recommendations:** Concluding thoughts and strategic advice.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const summary = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        return { summary, sources };
    } catch (error) {
        console.error("Error performing market research:", error);
        throw new Error("Failed to perform market research. Please ensure your query is specific.");
    }
};


// 3. Brand Identity
export const generateBrandIdentity = async (businessInfo: string): Promise<BrandIdentityResult> => {
    const prompt = `
        Analyze the following business description and generate a complete brand identity.
        Business Description: "${businessInfo}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                         logoDescription: {
                            type: Type.STRING,
                            description: "A detailed, descriptive prompt for an AI image generator to create a logo. Describe the style, elements, colors, and feel."
                         },
                         colorPalette: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    hex: { type: Type.STRING }
                                },
                                required: ['name', 'hex']
                            }
                         },
                         typography: {
                            type: Type.OBJECT,
                            properties: {
                                headline: { type: Type.STRING, description: "Name of a Google Font suitable for headlines (e.g., 'Montserrat')" },
                                body: { type: Type.STRING, description: "Name of a Google Font suitable for body text (e.g., 'Lato')" }
                            },
                            required: ['headline', 'body']
                         }
                    },
                    required: ['logoDescription', 'colorPalette', 'typography']
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse;
    } catch (error) {
        console.error("Error generating brand identity:", error);
        throw new Error("Failed to generate brand identity. The model may have returned an invalid format.");
    }
};


// 4. Logo Generator (Also used by Brand Identity)
export const generateLogo = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png', // Use PNG for potential transparency
              aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating logo:", error);
        throw new Error("Failed to generate logo. Please check the prompt and try again.");
    }
};

// 5. Content Engine
export const generateContentIdeas = async (topic: string, audience: string): Promise<ContentIdea[]> => {
    const prompt = `
        You are a creative content strategist. For a business focused on "${topic}" targeting "${audience}", generate 5 diverse content ideas.
    `;

    try {
         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: "A catchy title for the content piece" },
                            format: { type: Type.STRING, description: "The format (e.g., 'Blog Post', 'Short Video (Reels/Shorts)', 'Infographic', 'Email Newsletter', 'Podcast Episode')" },
                            description: { type: Type.STRING, description: "A brief 1-2 sentence description of the content idea." },
                            keywords: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ['title', 'format', 'description', 'keywords']
                    }
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        return jsonResponse;

    } catch (error) {
        console.error("Error generating content ideas:", error);
        throw new Error("Failed to generate content ideas. The model response was not valid JSON.");
    }
};


// 6. Social Post Generator
export const generateSocialPosts = async (topic: string, tone: string): Promise<SocialPost[]> => {
    const prompt = `
        You are a social media manager. Create 3 social media posts about "${topic}" with a "${tone}" tone.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            platform: { type: Type.STRING, description: "The social media platform (e.g., 'Twitter', 'Instagram', 'LinkedIn')" },
                            content: { type: Type.STRING, description: "The text for the post, including relevant hashtags." },
                            visualSuggestion: { type: Type.STRING, description: "A brief description of a suitable visual (e.g., 'A vibrant photo of...', 'An animated GIF showing...', 'A clean infographic with...')" }
                        },
                        required: ['platform', 'content', 'visualSuggestion']
                    }
                }
            }
        });
        const jsonResponse = JSON.parse(response.text);
        return jsonResponse;

    } catch (error) {
        console.error("Error generating social posts:", error);
        throw new Error("Failed to generate social posts. The model response was not valid JSON.");
    }
};

// 7. Visual Studio
export const editImage = async (prompt: string, base64ImageData: string, mimeType: string): Promise<{ text: string, image?: string }> => {
    if (!base64ImageData || !mimeType) {
        throw new Error("Image data and mime type are required for editing.");
    }

    try {
        const imagePart = {
            inlineData: {
                data: base64ImageData,
                mimeType: mimeType,
            },
        };
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [imagePart, textPart],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        let resultText = "Image processed.";
        let resultImage: string | undefined = undefined;

        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                resultText = part.text;
            } else if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                resultImage = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }

        return { text: resultText, image: resultImage };

    } catch (error) {
        console.error("Error editing image:", error);
        throw new Error("Failed to edit the image. Please try a different prompt or image.");
    }
};
