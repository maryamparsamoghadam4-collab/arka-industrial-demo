/* =========================================
   ARKA GLOBAL JAVASCRIPT
   Corporate Template
   ========================================= */


/* =========================================
   HEADER — HAMBURGER MENU
========================================= */

const menuButton = document.querySelector(".menu-button");
const menuPanel = document.querySelector(".menu-panel");

if (menuButton && menuPanel) {

    menuButton.addEventListener("click", function () {

        menuPanel.classList.toggle("active");
        menuButton.classList.toggle("active");

    });

}


/* =========================================
   HEADER — SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");
const hero = document.querySelector(".hero");

if (header && hero) {

    window.addEventListener("scroll", () => {

        if (window.scrollY >= hero.offsetHeight) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =========================================
   SEARCH BOX
========================================= */

const searchButton = document.querySelector(".search-button");
const searchArea = document.querySelector(".search-area");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector(".search-box input");
const searchClear = document.querySelector(".search-clear");


if (
    searchButton &&
    searchArea &&
    searchClose &&
    searchInput &&
    searchClear
) {

    // Open Search
    searchButton.addEventListener("click", () => {

        searchArea.classList.add("active");

        searchInput.focus();

    });


    // Close Search
    searchClose.addEventListener("click", () => {

        searchArea.classList.remove("active");

        searchInput.value = "";

    });


    // Clear Search
    searchClear.addEventListener("click", () => {

        searchInput.value = "";

        searchInput.focus();

    });

}

/* =========================================
   Global Search
========================================= */

if (searchInput) {

    const globalSearchSubmit =
        document.querySelector(".search-submit");

    function openSearchResults() {

        const searchValue =
            searchInput.value.trim();

        if (!searchValue) {
            return;
        }

        window.location.href =
            "search.html?q=" +
            encodeURIComponent(searchValue);

    }

    if (globalSearchSubmit) {

        globalSearchSubmit.addEventListener(
            "click",
            openSearchResults
        );

    }

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                openSearchResults();

            }

        }
    );

}








/* =========================================
   CONTACT DROPDOWN — HEADER
========================================= */

const dropdown = document.querySelector(".has-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

if (dropdown && dropdownToggle) {

    dropdownToggle.addEventListener("click", () => {

        dropdown.classList.toggle("active");

    });


    // Close when clicking outside

    document.addEventListener("click", (event) => {

        if (!dropdown.contains(event.target)) {

            dropdown.classList.remove("active");

        }

    });

}


/* =========================================
         Pagination
========================================= */

const productCards = document.querySelectorAll(".product-card");
const paginationItems = document.querySelectorAll(".pagination-item");
const paginationNext = document.querySelector(".pagination-next");

const productsPerPage = 9;
let currentPage = 1;

function showPage(page) {

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    productCards.forEach((card, index) => {

        if (index >= start && index < end) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    paginationItems.forEach((button, index) => {

        const pageNumber = index + 1;

        button.classList.toggle(
            "active",
            pageNumber === page
        );

        if (pageNumber === page) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }

    });

    currentPage = page;
}


paginationItems.forEach((button, index) => {

    button.addEventListener("click", () => {

        showPage(index + 1);

    });

});


paginationNext.addEventListener("click", () => {

    if (currentPage < paginationItems.length) {

        showPage(currentPage + 1);

    }

});

/* =========================================
   Open Product From Global Search
========================================= */

const productIdFromURL =
    window.location.hash.substring(1);

if (
    productIdFromURL &&
    productCards.length
) {

    const targetProduct =
        document.querySelector(
            `[data-product-id="${productIdFromURL}"]`
        );


    if (targetProduct) {

        const targetIndex =
            Array.from(productCards).indexOf(
                targetProduct
            );


        if (targetIndex !== -1) {

            const targetPage =
                Math.floor(
                    targetIndex / productsPerPage
                ) + 1;


            showPage(targetPage);


            targetProduct.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    }

}



showPage(1);
const paginationPrev = document.querySelector(".pagination-prev");

if (paginationPrev) {

    paginationPrev.addEventListener("click", () => {

        if (currentPage > 1) {

            showPage(currentPage - 1);

        }

    });

}






/* =========================================
   Product Filters
========================================= */

const productFilters = document.querySelectorAll(".product-filter");

if (productFilters.length && productCards.length) {

    productFilters.forEach((filterButton) => {

        filterButton.addEventListener("click", () => {

            const selectedFilter = filterButton.dataset.filter;

            productFilters.forEach((button) => {
                button.classList.remove("active");
            });

            filterButton.classList.add("active");

            productCards.forEach((card) => {

                const productCategory = card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    productCategory === selectedFilter
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

}


/* =========================================
   FOOTER CONTACT HUB
========================================= */

const contactToggle =
    document.querySelector(
        ".contact-toggle"
    );

const contactHub =
    document.querySelector(
        ".contact-hub"
    );


if (
    contactToggle &&
    contactHub
) {

    contactToggle.addEventListener(
        "click",
        () => {

            contactHub.classList.toggle(
                "active"
            );


            const isOpen =
                contactHub.classList.contains(
                    "active"
                );


            contactToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}



