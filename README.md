# BrandForge AI

**Big Marketing, Small Budget.**

BrandForge AI is an all-in-one, AI-powered marketing toolkit designed for small businesses, entrepreneurs, and creators. It streamlines your entire marketing workflow, from initial market research and strategy to creating a full brand identity, generating content, and designing visuals—all from a single, intuitive interface. Powered by Google's Gemini models, BrandForge AI helps you create professional, high-impact marketing materials without the need for a large team or budget.

![BrandForge AI Screenshot](./brandforge-ai-screenshot.png)

---

## Core Features

BrandForge AI offers a suite of seven powerful tools, ordered to guide you through a logical marketing workflow.

### 1. Strategy Planner
-   **What it does:** Generates a comprehensive, actionable marketing strategy based on your business goals.
-   **How to use:** Input your primary business goals, describe your target audience, and provide an optional budget.
-   **Output:** A detailed, multi-section report in markdown format, covering an executive summary, audience analysis, core messaging, recommended channels, campaign ideas, and key performance indicators (KPIs).

### 2. Market Research
-   **What it does:** Provides an up-to-date market analysis on any topic, product, or company.
-   **How to use:** Enter a research topic (e.g., "sustainable packaging industry", "competitors to Allbirds").
-   **Output:** A summary report detailing the market overview, target audience, competitive landscape, opportunities, and challenges. This tool uses Google Search for grounding, so it also provides a list of linked web sources for its information.

### 3. Brand Identity Builder
-   **What it does:** Creates a complete visual and verbal brand identity from a simple business description.
-   **How to use:** Write a paragraph describing your business, its mission, and its vibe.
-   **Output:** A full brand kit, including a detailed logo concept, a professional color palette with hex codes, and typography suggestions (headline and body fonts). It also automatically generates a logo image based on its concept.

### 4. Logo Generator
-   **What it does:** Generates a unique, professional logo from a text description.
-   **How to use:** Describe the logo you envision. Be specific about style (e.g., minimalist, vintage), elements (e.g., lion, shield, coffee cup), and colors.
-   **Output:** A high-quality, 1:1 aspect ratio PNG image of the generated logo, ready to be downloaded.

### 5. Content Engine
-   **What it does:** Brainstorms a list of tailored content ideas to engage your audience.
-   **How to use:** Provide a primary topic for your business and describe your target audience.
-   **Output:** A list of 5 diverse content ideas, each including a catchy title, a recommended format (e.g., Blog Post, Short Video, Infographic), a brief description, and relevant keywords.

### 6. Social Post Generator
-   **What it does:** Instantly creates ready-to-publish posts for various social media platforms.
-   **How to use:** Input the topic of your post and the desired tone (e.g., professional, witty, urgent).
-   **Output:** Three distinct social media posts, formatted for different platforms (e.g., Twitter, Instagram, LinkedIn), complete with engaging copy, hashtags, and a creative suggestion for a matching visual.

### 7. Visual Studio
-   **What it does:** Edits and transforms your images using simple text prompts.
-   **How to use:** Upload a source image (e.g., a product photo) and write a command describing the edit you want (e.g., "remove the background", "add a small robot next to the product", "change the lighting to be more dramatic").
-   **Output:** A new image with the requested edits applied, which can be downloaded.

---

## Technology Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Engine:** Google Gemini API (`@google/genai`)
-   **Icons:** React Icons

---

## Attribution

Conceptualization by **Aprameya**.  
Built with **Google AI Studio**.  
Powered by **Gemini**.

---

## Comprehensive Test Case for All Tools

Here is one cohesive test case designed to validate the functionality of every tool in the application.

**Fictional Business:** **"Terra Weave"** - A new e-commerce brand selling artisanal, handwoven bags and home decor. The brand is focused on sustainability, using recycled materials, and celebrating ethical craftsmanship.

### 1. Test: Strategy Planner
*   **Business Goals:** `Launch the Terra Weave brand and achieve 100 sales in the first quarter. Build a community around sustainable and ethical craftsmanship.`
*   **Target Audience:** `Environmentally conscious consumers, aged 25-45, who appreciate unique, handcrafted goods and ethical fashion. They are active on Instagram and Pinterest.`
*   **Approximate Budget:** `$1,000/month for digital advertising and content creation.`
*   **Expected Outcome:** A detailed markdown strategy document with sections for audience, messaging, channels, and KPIs.

### 2. Test: Market Research
*   **Topic:** `market for sustainable, direct-to-consumer handcrafted bags`
*   **Expected Outcome:** A market analysis report with a summary and a list of clickable web sources.

### 3. Test: Brand Identity Builder
*   **Business Description:** `Terra Weave is a new e-commerce brand selling artisanal, handwoven bags and home decor. The brand is focused on sustainability, using recycled materials, and celebrating ethical craftsmanship. The vibe should be earthy, authentic, warm, and modern.`
*   **Expected Outcome:** A generated logo image, a color palette (with earthy tones), and typography suggestions. Note the "logo description" it creates for the next step.

### 4. Test: Logo Generator
*   **Prompt:** `A minimalist logo featuring an abstract symbol that combines a woven texture and a leaf. Use earthy tones like terracotta, sage green, and sand. The style should be clean, modern, and slightly rustic.` (This is an example of what the Brand Identity tool might generate).
*   **Expected Outcome:** A downloadable PNG logo that matches the description.

### 5. Test: Content Engine
*   **Primary Topic:** `sustainable textiles and artisanal weaving techniques`
*   **Target Audience:** `eco-conscious consumers interested in ethical fashion`
*   **Expected Outcome:** A list of 5 content ideas (e.g., blog posts, videos) with titles, descriptions, and keywords.

### 6. Test: Social Post Generator
*   **Post Topic:** `the launch of our new collection of handwoven tote bags made from recycled ocean plastic`
*   **Desired Tone:** `Warm, authentic, and inspiring`
*   **Expected Outcome:** Three distinct social media posts for different platforms with copy and visual suggestions.

### 7. Test: Visual Studio
*   **Image Upload:** Upload a simple photo of a plain tote bag on a white background.
*   **Edit Description:** `Place this bag on a rustic wooden table, with a small potted succulent and a cup of coffee next to it. The lighting should be soft and natural, like early morning light.`
*   **Expected Outcome:** A new, downloadable image showing the bag in the described scene.