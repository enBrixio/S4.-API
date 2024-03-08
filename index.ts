document.addEventListener('DOMContentLoaded', () => {
    const jokeBtn = document.getElementById('btn')!;
    const jokeOutput = document.getElementById('joke')!;

    async function fetchJoke() {
        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: {
                    Accept: "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            if (jokeOutput) {
                jokeOutput.textContent = data.joke;
            }
           
        } catch (error) {
            console.error("Error fetching joke:", error);
            jokeOutput.textContent = "Failed to fetch a joke. Please try again later.";
        }       
    }
        if (jokeOutput && jokeBtn) {
            jokeBtn.addEventListener('click', fetchJoke);
        }
        fetchJoke();
});


