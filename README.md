# BasMY Web - Next.js with Mapbox

An interactive web mapping application built with Next.js and Mapbox GL, designed to visualize and explore locations in Malaysia.

## Features

- Modern web architecture with Next.js 14 and App Router
- Interactive Mapbox GL integration with custom controls
- Real-time location search and filtering
- Responsive design powered by Tailwind CSS
- Dark/Light mode support
- Optimized performance with server-side rendering
- TypeScript for enhanced code reliability

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Mapbox account and access token ([Get one here](https://account.mapbox.com/))
- Git (for version control)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/basmy-web.git
   cd basmy-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
