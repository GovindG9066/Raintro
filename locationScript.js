let buttons = document.querySelectorAll(".city-btn");

// ⬇️ Yeh do elements ko pehle define karo
let Location = document.querySelector("#location-section"); // Replace with correct ID/class
let list_home_items = document.querySelector(".list-home-items"); // Replace with correct ID/class

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        let city = btn.textContent.trim();
        console.log("City selected:", city);

        getWeather(city);
    


        // ✅ Safe check: agar element mil gaya hai toh hi proceed karo
        if (Location) {
            Location.classList.remove('top-0');
            Location.classList.add('bottom-[-150%]');
        }

        if (list_home_items) {
            list_home_items.classList.add('left-[-100%]');
        }
        
    });
});
