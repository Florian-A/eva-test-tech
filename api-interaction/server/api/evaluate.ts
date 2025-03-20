// Define the response type structure
interface OpenAIChoice {
    message: {
      content: string;
    };
}

interface OpenAIResponse {
    choices: OpenAIChoice[];
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { idea } = await readBody(event);

    if (!idea || typeof idea !== 'string') {
        return { score: null, error: 'No valid idea provided.' };
    }

    // Type-cast the response from $fetch to OpenAIResponse
    const response = await $fetch<OpenAIResponse>("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${config.openAiKey}`,
            "Content-Type": "application/json",
        },
        body: {
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are an AI that evaluates business ideas and assigns a credibility score from 0 to 10. Your response should be **only** a number between 0 and 10, with no explanation or additional text."
                },
                {
                    role: "user",
                    content: `Evaluate this business idea: ${idea}`
                },
            ],
            temperature: 0.7,
            max_tokens: 10,
        },
    });

    const aiResponse = response.choices[0].message.content.trim();
    const score = parseInt(aiResponse.match(/\d+/)?.[0] ?? '0');

    return { score };
});
