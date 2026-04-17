const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { movies, question, duration } = body;

    if (!Array.isArray(movies) || movies.length < 2 || movies.length > 10) {
      return new Response(
        JSON.stringify({ error: "Select between 2 and 10 movies" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const discordRes = await fetch(
      `https://discord.com/api/v10/channels/${env.DISCORD_CHANNEL_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          poll: {
            question: { text: question || "Bovie?" },
            answers: movies.map((title) => ({ poll_media: { text: title } })),
            duration: duration || 4,
            allow_multiselect: false,
          },
        }),
      },
    );

    const data = await discordRes.json();

    return new Response(JSON.stringify(data), {
      status: discordRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};
