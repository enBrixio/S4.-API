"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => {
    const jokeBtn = document.getElementById('btn');
    const jokeOutput = document.getElementById('joke');
    function fetchJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://icanhazdadjoke.com/", {
                    headers: {
                        Accept: "application/json"
                    }
                });
                const data = yield response.json();
                console.log(data);
                if (jokeOutput) {
                    jokeOutput.textContent = data.joke;
                }
            }
            catch (error) {
                console.error("Error fetching joke:", error);
                jokeOutput.textContent = "Failed to fetch a joke. Please try again later.";
            }
        });
    }
    if (jokeOutput && jokeBtn) {
        jokeBtn.addEventListener('click', fetchJoke);
    }
    fetchJoke();
});
