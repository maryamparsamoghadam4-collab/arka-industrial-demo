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
   PRODUCTS CAROUSEL
========================================= */

const productCards =
    document.querySelectorAll(".product-card");

const prevButton =
    document.querySelector(".products-prev");

const nextButton =
    document.querySelector(".products-next");


let currentProduct = 1;

let autoPlay;


/*
   IMPORTANT:
   Products exist only on pages that contain
   the Products component.

   If the component is missing,
   the rest of app.js continues normally.
*/

if (
    productCards.length &&
    prevButton &&
    nextButton
) {


    /* =========================================
       UPDATE PRODUCTS
    ========================================= */

    function updateProducts() {

        const totalProducts =
            productCards.length;


        productCards.forEach((card, index) => {

            card.classList.remove(
                "product-left",
                "product-active",
                "product-right",
                "product-hidden"
            );


            // Active

            if (index === currentProduct) {

                card.classList.add(
                    "product-active"
                );

            }


            // Left

            else if (
                index ===
                (currentProduct - 1 + totalProducts)
                % totalProducts
            ) {

                card.classList.add(
                    "product-left"
                );

            }


            // Right

            else if (
                index ===
                (currentProduct + 1)
                % totalProducts
            ) {

                card.classList.add(
                    "product-right"
                );

            }


            // Hidden

            else {

                card.classList.add(
                    "product-hidden"
                );

            }

        });

    }


    /* =========================================
       NEXT
    ========================================= */

    function nextProduct() {

        currentProduct++;


        if (
            currentProduct >=
            productCards.length
        ) {

            currentProduct = 0;

        }


        updateProducts();

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousProduct() {

        currentProduct--;


        if (currentProduct < 0) {

            currentProduct =
                productCards.length - 1;

        }


        updateProducts();

    }


    /* =========================================
       AUTO PLAY
    ========================================= */

    function startAutoPlay() {

        autoPlay = setInterval(() => {

            nextProduct();

        }, 4500);

    }


    /* =========================================
       RESTART AUTO PLAY
    ========================================= */

    function restartAutoPlay() {

        clearInterval(autoPlay);

        startAutoPlay();

    }


    /* =========================================
       BUTTONS
    ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            nextProduct();

            restartAutoPlay();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            previousProduct();

            restartAutoPlay();

        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateProducts();

    startAutoPlay();

}


/* =========================================
   ARKA HERO — CINEMATIC SCENE CONTROLLER
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const hero =
            document.querySelector(".hero");

        const slides =
            document.querySelectorAll(
                ".hero-media img"
            );

        const currentNumber =
            document.querySelector(
                ".hero-current"
            );

        const totalNumber =
            document.querySelector(
                ".hero-total"
            );


        /*
           Safety check:
           If Hero does not exist on the page,
           simply skip this component.
        */

        if (
            !hero ||
            !slides.length ||
            !currentNumber ||
            !totalNumber
        ) {

            return;

        }


        /* =========================================
           VARIABLES
        ========================================= */

        let currentIndex = 0;

        let sceneTimer;

        const totalSlides =
            slides.length;


        /* =========================================
           INDICATOR
        ========================================= */

        totalNumber.textContent =
            String(totalSlides).padStart(2, "0");


        /* =========================================
           SHOW SCENE
        ========================================= */

        function showScene(index) {

            slides.forEach((slide) => {

                slide.classList.remove("active");

            });


            const currentSlide =
                slides[index];


            if (!currentSlide) return;


            currentSlide.classList.add("active");


            currentNumber.textContent =
                String(index + 1).padStart(2, "0");

        }


        /* =========================================
           NEXT SCENE
        ========================================= */

        function nextScene() {

            currentIndex++;


            if (
                currentIndex >=
                totalSlides
            ) {

                currentIndex = 0;

            }


            showScene(currentIndex);

            startSceneTimer();

        }


        /* =========================================
           TIMER
        ========================================= */

        function startSceneTimer() {

            clearTimeout(sceneTimer);


            sceneTimer = setTimeout(
                () => {

                    nextScene();

                },
                8000
            );

        }


        /* =========================================
           INITIAL SCENE
        ========================================= */

        showScene(0);


        /* =========================================
           START HERO
        ========================================= */

        requestAnimationFrame(() => {

            hero.classList.add("is-loaded");

        });


        startSceneTimer();


        /* =========================================
           TAB VISIBILITY
        ========================================= */

        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    clearTimeout(sceneTimer);

                } else {

                    startSceneTimer();

                }

            }
        );

    }
);


/* =========================================
   WHY ARKA — INTERACTIVE SECTION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // -----------------------------------------
        // Main section
        // -----------------------------------------

        const whyArka =
            document.querySelector(".why-arka");


        if (!whyArka) return;


        // -----------------------------------------
        // Elements
        // -----------------------------------------

        const tabs =
            whyArka.querySelectorAll(
                ".why-arka__tab"
            );

        const canvas =
            whyArka.querySelector(
                ".why-arka__canvas"
            );

        const answerLabel =
            whyArka.querySelector(
                ".why-arka__answer-label"
            );

        const answerTitle =
            whyArka.querySelector(
                ".why-arka__answer-title"
            );

        const answerText =
            whyArka.querySelector(
                ".why-arka__answer-text"
            );

        const connectorPath =
            whyArka.querySelector(
                ".why-arka__connector-path"
            );

        const connectorStart =
            whyArka.querySelector(
                ".why-arka__connector-start"
            );

        const connectorEnd =
            whyArka.querySelector(
                ".why-arka__connector-end"
            );


        // -----------------------------------------
        // Safety check
        // -----------------------------------------

        if (
            !tabs.length ||
            !canvas ||
            !answerLabel ||
            !answerTitle ||
            !answerText ||
            !connectorPath ||
            !connectorStart ||
            !connectorEnd
        ) {

            console.warn(
                "Why Arka: required elements are missing."
            );

            return;

        }


        // =========================================
        // CONTENT
        // =========================================

        const whyArkaData = [

            {
                number: "01",

                label:
                    "01 / تخصص و توان فنی",

                title:
                    "راهکارهایی متناسب با نیازهای فنی شما",

                text:
                    "تجربه و شناخت ما از فرآیندهای صنعتی به ما کمک می‌کند نیازهای فنی هر پروژه را درک کرده و راهکارهایی عملی و متناسب با نیاز واقعی تولید ارائه دهیم."
            },


            {
                number: "02",

                label:
                    "02 / کیفیت و استاندارد",

                title:
                    "کیفیتی که در فرآیند تولید شکل می‌گیرد",

                text:
                    "کنترل فرآیند تولید، دقت در اجرا و توجه به استانداردهای مورد نیاز، به ما کمک می‌کند کیفیت محصولات را در تمام مراحل تولید به‌صورت پایدار حفظ کنیم."
            },


            {
                number: "03",

                label:
                    "03 / تأمین و تحویل",

                title:
                    "تأمین قابل اعتماد، از تولید تا تحویل",

                text:
                    "از برنامه‌ریزی تولید تا آماده‌سازی و تحویل، فرآیند تأمین را با هدف ایجاد یک همکاری منظم، قابل پیش‌بینی و قابل اعتماد مدیریت می‌کنیم."
            },


            {
                number: "04",

                label:
                    "04 / پشتیبانی و همراهی",

                title:
                    "همراهی ما با تحویل محصول تمام نمی‌شود",

                text:
                    "همکاری ما با تحویل محصول پایان نمی‌یابد. در صورت نیاز، برای هماهنگی، پاسخ‌گویی و پشتیبانی در کنار مشتری باقی می‌مانیم."
            }

        ];


        // =========================================
        // GET TAB POSITION
        // =========================================

        function getTabPosition(tab) {

            const tabRect =
                tab.getBoundingClientRect();

            const canvasRect =
                canvas.getBoundingClientRect();


            const tabCenterX =
                tabRect.left +
                (tabRect.width / 4.5);


            const tabBottomY =
                tabRect.bottom;


            const x =
                tabCenterX -
                canvasRect.left;


            const y =
                tabBottomY -
                canvasRect.top;


            return {
                x,
                y
            };

        }


        // =========================================
        // CREATE CONNECTOR PATH
        // =========================================

        function createConnectorPath(
            startX,
            startY,
            endX,
            endY
        ) {

            const distanceX =
                endX - startX;


            const curveOne =
                startX +
                (distanceX * 0.20);


            const curveTwo =
                startX +
                (distanceX * 0.65);


            const middleY =
                Math.max(
                    100,
                    endY * 0.45
                );


            return `
                M ${startX} ${startY}

                C
                ${curveOne} ${startY + 80},
                ${curveOne} ${middleY},
                ${curveTwo} ${middleY}

                S
                ${endX - 80} ${endY},
                ${endX} ${endY}
            `;

        }


        // =========================================
        // ANIMATE CONNECTOR
        // =========================================

        function animateConnector() {

            const pathLength =
                connectorPath.getTotalLength();


            connectorPath.style.strokeDasharray =
                pathLength;


            connectorPath.style.strokeDashoffset =
                pathLength;


            connectorPath.getBoundingClientRect();


            connectorPath.style.transition =
                "stroke-dashoffset 0.9s cubic-bezier(0.65, 0, 0.35, 1)";


            connectorPath.style.strokeDashoffset =
                "0";

        }


        // =========================================
        // UPDATE CONNECTOR
        // =========================================

        function updateConnector(tab) {

            const start =
                getTabPosition(tab);


            const canvasWidth =
                canvas.clientWidth;

            const canvasHeight =
                canvas.clientHeight;


            const endX =
                canvasWidth * 0.58;

            const endY =
                canvasHeight * 0.48;


            const path =
                createConnectorPath(
                    start.x,
                    start.y,
                    endX,
                    endY
                );


            connectorPath.setAttribute(
                "d",
                path
            );


            connectorStart.setAttribute(
                "cx",
                start.x
            );

            connectorStart.setAttribute(
                "cy",
                start.y
            );


            connectorEnd.setAttribute(
                "cx",
                endX
            );

            connectorEnd.setAttribute(
                "cy",
                endY
            );


            animateConnector();

        }


        // =========================================
        // UPDATE ANSWER
        // =========================================

        function updateAnswer(index) {

            const item =
                whyArkaData[index];


            if (!item) return;


            answerLabel.textContent =
                item.label;


            answerTitle.textContent =
                item.title;


            answerText.textContent =
                item.text;

        }


        // =========================================
        // ACTIVATE TAB
        // =========================================

        function activateTab(index) {

            const activeTab =
                tabs[index];


            if (!activeTab) return;


            tabs.forEach(
                (tab, tabIndex) => {

                    const isActive =
                        tabIndex === index;


                    tab.classList.toggle(
                        "active",
                        isActive
                    );


                    tab.setAttribute(
                        "aria-selected",
                        isActive
                    );

                }
            );


            updateAnswer(index);

            updateConnector(activeTab);

        }


        // =========================================
        // TAB CLICK
        // =========================================

        tabs.forEach(
            (tab, index) => {

                tab.addEventListener(
                    "click",
                    () => {

                        activateTab(index);

                    }
                );

            }
        );


        // =========================================
        // RESIZE
        // =========================================

        window.addEventListener(
            "resize",
            () => {

                const activeTab =
                    whyArka.querySelector(
                        ".why-arka__tab.active"
                    );


                if (activeTab) {

                    updateConnector(activeTab);

                }

            }
        );


        // =========================================
        // INITIAL STATE
        // =========================================

        activateTab(0);

    }
);


/* =========================================
   DYNAMIC STATS
========================================= */

const statValues =
    document.querySelectorAll(".stat-value");


if (
    statValues.length &&
    "IntersectionObserver" in window
) {

    const animateCounter =
        (element) => {

            const target =
                parseInt(
                    element.dataset.target
                );


            if (Number.isNaN(target)) return;


            const duration = 1500;

            const startTime =
                performance.now();


            const updateCounter =
                (currentTime) => {

                    const progress =
                        Math.min(
                            (currentTime - startTime)
                            / duration,
                            1
                        );


                    const currentValue =
                        Math.floor(
                            progress * target
                        );


                    element.textContent =
                        currentValue.toLocaleString()
                        + "+";


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    }

                };


            requestAnimationFrame(
                updateCounter
            );

        };


    const statsObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    statValues.forEach(
        (stat) => {

            statsObserver.observe(stat);

        }
    );

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





