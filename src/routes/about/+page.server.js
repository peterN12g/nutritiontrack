/*export async function load() {
    const apiKey = API_KEY;
    const query = 'beef';
    const url = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;
    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
        },
    };

    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error('HTTP Error!');
        }
        
        const response = await res.json();
        if (response.length === 0) {
            throw new Error('No data found. Check query or spelling.');
        }

        console.log(response);

        return {
            // Your data for the page
            apiResponse: response,
        };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;  // Rethrow the error to trigger error handling in SvelteKit
    }
}
*/