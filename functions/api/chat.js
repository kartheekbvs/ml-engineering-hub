export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();

        const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
        // It's safer to store this in Cloudflare Pages Environment Variables, 
        // but keeping it here for simplicity of deployment right now.
        const apiKey = "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";

        const response = await fetch(invokeUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(JSON.stringify({ error: `NVIDIA API Error: ${response.status}`, details: errorText }), {
                status: response.status,
                headers: { "Content-Type": "application/json" }
            });
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to connect to API proxy", details: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
