let title = document.querySelector('.title-container');

// function handleResize() {
    //     let screen_width = window.innerWidth;
    
    //     if (screen_width < 640) {
        //         home.classList.add('hidden');
        //         title.classList.add('text-center');
        //         title.classList.remove('text-left'); // Optional: remove left align if any
        //     } else {
            //         home.classList.remove('hidden');
            //         title.classList.remove('text-center');
            //         title.classList.add('text-left'); // Optional: add left align for large screens
            //     }
            // }
            
            // let menu=document.querySelector('.menu');
            
            // menu.addEventListener('click', () => {
                //     home.classList.remove('hidden');
                //     home.classList.add('absolute');
                // });
                
                // handleResize();

// window.addEventListener('resize', handleResize);

// if (window.innerWidth < 640) {
    //     home.classList.remove('relative');
//     home.classList.add('absolute');
// }

let home = document.querySelector('.home-section');
let menu = document.querySelector('.menu-icon');

menu.addEventListener('click', () => {
    console.log("Working");
    // home.classList.replace('-translate-x-full', 'translate-x-0');
    home.classList.remove('-translate-x-full');
    home.classList.add('translate-x-0');
});
