export async function fetchQuestion(id) {
    try {
        const response = await fetch(`https://courselab.lnu.se/quiz/question/${id}`);
        if (!response.ok) throw new Error('Failed to fetch question');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
    }
}
