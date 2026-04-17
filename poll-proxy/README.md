# Poll Proxy — Cloudflare Worker

Thin proxy that creates Discord polls on behalf of the Tranquilo app.
Required because Discord Bot tokens must never be exposed in client-side code.

## Setup

1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Set secrets:
   ```
   wrangler secret put DISCORD_BOT_TOKEN
   wrangler secret put DISCORD_CHANNEL_ID
   ```
4. Deploy: `wrangler deploy`
5. Copy the Worker URL into your app's `.env`:
   ```
   VITE_POLL_PROXY_URL=https://tranquilo-poll-proxy.<your-subdomain>.workers.dev
   ```

## Discord Bot setup

1. Go to https://discord.com/developers/applications
2. Create a new Application → Bot
3. Enable "Send Messages" and "Send Polls" permissions
4. Copy the Bot Token → use as `DISCORD_BOT_TOKEN`
5. Invite the bot to your server with the OAuth2 URL Generator
6. Copy your target channel ID (right-click channel → Copy Channel ID) → use as `DISCORD_CHANNEL_ID`
