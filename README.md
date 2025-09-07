# BrandForge AI

**Big Marketing, Small Budget.**

BrandForge AI is an all-in-one, AI-powered marketing toolkit designed for small businesses, entrepreneurs, and creators. It streamlines your entire marketing workflow, from initial market research and strategy to creating a full brand identity, generating content, and designing visuals—all from a single, intuitive interface. Powered by Google's Gemini models, BrandForge AI helps you create professional, high-impact marketing materials without the need for a large team or budget.

<img width="1919" height="830" alt="image" src="https://github.com/user-attachments/assets/b6705a6b-2088-4e95-9c6b-dc6b8c17d96b" />


<img width="1919" height="987" alt="image" src="https://github.com/user-attachments/assets/f5506a3d-2c5b-4359-b532-9bfa4f99e060" />



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


## Setup and Installation

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/brandforge-ai.git
cd brandforge-ai
```
*(Replace `your-username/brandforge-ai.git` with the actual repository URL)*

### 2. Set Up Environment Variables

The application requires a Google Gemini API key to function. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

1.  In the root of the project directory, create a new file named `.env`.
2.  Add your API key to this file as follows:

    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

    *Replace `YOUR_GEMINI_API_KEY` with your actual key. This file is ignored by git to keep your key private.*

### 3. Install Dependencies & Run

For a robust local development experience that includes hot-reloading and proper environment variable handling, we recommend using [Vite](https://vitejs.dev/).

1.  **Initialize a `package.json` file:**
    ```bash
    npm init -y
    ```
2.  **Install Vite and the React plugin:**
    ```bash
    npm install vite @vitejs/plugin-react
    ```
3.  **Create a Vite configuration file:** Create a new file named `vite.config.js` in the project root and add the following content. This tells Vite how to handle environment variables.
    ```javascript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      define: {
        'process.env': process.env
      }
    })
    ```
4.  **Run the development server:**
    ```bash
    npx vite
    ```
    Your application will now be running on `http://localhost:5173` (or another port if 5173 is busy), with your API key correctly loaded from the `.env` file. Any changes you make to the code will be reflected instantly in the browser.

---

## Technology Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI Engine:** Google Gemini API (`@google/genai`)
-   **Icons:** React Icons

---
