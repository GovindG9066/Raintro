let buttons = document.querySelectorAll(".city-btn");

let Location = document.querySelector("#location-section"); 
let list_home_items = document.querySelector(".list-home-items"); 

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let city = btn.textContent.trim();
        console.log("City selected:", city);

        getWeather(city);
    


        if (Location) {
            Location.classList.remove('top-0');
            Location.classList.add('bottom-[-150%]');
        }

        if (list_home_items) {
            list_home_items.classList.add('left-[-100%]');
        }
        
    });
});
