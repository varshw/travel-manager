document.addEventListener("DOMContentLoaded", function () {
    // Sample Destination Data
    const destinations = [
        { name: "Paris, France", image: "images/parry.jpeg", description: "The city of love, famous for the Eiffel Tower, cafes, and rich history.", popularity: 5 },
        { name: "Maldives", image: "images/maldives.jpg", description: "A paradise of clear waters, white sand beaches, and luxury resorts.", popularity: 9 },
        { name: "Tokyo, Japan", image: "images/hero-japan.jpg", description: "A vibrant city blending modern skyscrapers with traditional temples.", popularity: 8 },
        { name: "Rome, Italy", image: "images/rome.jpeg", description: "The city of architecture.", popularity: 7 }
    ];

    let currentPage = 1;
    const perPage = 2; 
    const totalPages = Math.ceil(destinations.length / perPage);

    function renderDestinations() {
        const container = document.getElementById("destinationContainer");
        if (!container) return;
        container.innerHTML = "";

        let sortedData = [...destinations];
        const sortBy = document.getElementById("sortOptions")?.value || "name";

        if (sortBy === "name") {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "popularity") {
            sortedData.sort((a, b) => b.popularity - a.popularity);
        }

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const paginatedData = sortedData.slice(start, end);

        paginatedData.forEach(dest => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <button class="view-more" onclick="openPopup('${dest.image}', '${dest.name}', '${dest.description}')">View More</button>
            `;
            container.appendChild(card);
        });

        console.log(`Current Page: ${currentPage}, Total Pages: ${totalPages}`);

        const pageNumber = document.getElementById("pageNumber");
        if (pageNumber) pageNumber.innerText = `${currentPage} / ${totalPages}`;

        document.getElementById("prevPage")?.removeAttribute("disabled");
        document.getElementById("nextPage")?.removeAttribute("disabled");

        if (currentPage === 1) {
            document.getElementById("prevPage")?.setAttribute("disabled", "true");
        }
        if (currentPage === totalPages) {
            document.getElementById("nextPage")?.setAttribute("disabled", "true");
        }
    }

    // Pagination Controls
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            console.log("Prev Clicked");
            if (currentPage > 1) {
                currentPage--;
                renderDestinations();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            console.log("Next Clicked");
            if (currentPage < totalPages) {
                currentPage++;
                renderDestinations();
            }
        });
    }

    document.getElementById("sortOptions")?.addEventListener("change", renderDestinations);

    // Popup Functions
    function openPopup(imageSrc, title, description) {
        const popup = document.getElementById("popup");
        if (!popup) return;
        document.getElementById("popupImage").src = imageSrc;
        document.getElementById("popupTitle").innerText = title;
        document.getElementById("popupDescription").innerText = description;
        popup.style.display = "flex";
    }

    function closePopup() {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.style.display = "none";
        }
    }
    
    // Slideshow Functionality
    const slides = document.querySelectorAll(".slide");
    let index = 0;

    if (slides.length > 0) {
        function showNextSlide() {
            slides[index].classList.remove("active");
            index = (index + 1) % slides.length; 
            slides[index].classList.add("active");
        }

        slides[index].classList.add("active");

        setInterval(showNextSlide, 3000);
    }

    // Login & Logout Functionality
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    if (loginBtn && logoutBtn) {
        loginBtn.addEventListener("click", function () {
            alert("Login Successful!");
            loginBtn.style.display = "none";
            logoutBtn.style.display = "inline-block";
        });

        logoutBtn.addEventListener("click", function () {
            alert("Logged Out!");
            loginBtn.style.display = "inline-block";
            logoutBtn.style.display = "none";
        });
    }

    renderDestinations();
});
