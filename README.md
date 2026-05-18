# MiCoffee - Smart Coffee Ordering System

Welcome to **MiCoffee**, a beautifully designed, mobile-first, zero-backend smart coffee ordering system for small coffeeshops. This app allows customers to build visually stunning coffee orders directly from their phones, and shop owners to manage and accept these orders from a kitchen tablet.

🌟 **[Live Demo](http://miiiira.com/micoffee)**

## Features
- **Ultra-Visual Ordering:** A fluid, game-like interface where customers can visually see their coffee being built.
- **Multilingual Support:** Fully translated and supports multiple languages out-of-the-box, ensuring global accessibility for any shop owner!
- **QR Code Table System:** Shop owners can generate QR codes for tables. When scanned (e.g. `example.com/?table=12`), orders are automatically tied to that table.
- **Kitchen Interface:** A dedicated `/kitchen` route for baristas to see incoming orders, set prices, and update order status.
- **Settings Panel:** A dedicated `/settings` route for shop owners to customize available ingredients and generate table QR codes.
- **Zero Backend Required:** This open-source template uses `localStorage` to simulate the full order flow (for testing/demo purposes), meaning it can be hosted anywhere without complex databases or Node.js servers.

## License
This project is completely **FREE** and open source under the **Creative Commons Attribution (CC BY 4.0)** license. You are free to use, modify, and distribute it for both personal and commercial purposes!

## Installation for Coffeeshops

If you are a small coffeeshop owner and want to host this on your own shared hosting (like cPanel, HostGator, Bluehost, etc.):

1. Clone or download this repository.
2. Ensure you have [Node.js](https://nodejs.org/) installed on your computer.
3. Open a terminal in the folder and install dependencies:
   ```bash
   npm install
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
5. A new `dist/` folder will be created. 
6. Upload the **entire contents** of the `dist/` folder to your shared hosting's `public_html` or `www` directory.

*Note: Out of the box, this uses a simulated local state for demonstration. To sync data across actual multiple devices (phones and your kitchen tablet), you can easily connect the state manager (`src/stores/orders.js`) to a free service like Firebase or Supabase!*

## Support the Developer

If you like this project, or if you don't know how to set it up on your server, I can help! Just buy me a BIG coffee here:

☕ **[Buy Me A Coffee](https://buymeacoffee.com/miiiira)**

## Usage Links
- **Client App:** `https://yourwebsite.com/` (or `/?table=X` for specific tables)
- **Kitchen Panel:** `https://yourwebsite.com/kitchen`
- **Settings:** `https://yourwebsite.com/settings`
