let buttons = document.querySelectorAll(".city-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let city = btn.textContent.trim();
        console.log("City selected:", city); // Check console output

        getWeather(city); 

        Location.classList.remove('top-0');
        Location.classList.add('bottom-[-150%]');
    });
});
