/* =========================================
   Search Results Page
========================================= */

const searchResults = document.querySelector(".search-results");

if (searchResults) {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("q");

    if (searchValue) {
        async function loadSearchResults() {
            try {
                const response = await fetch("products.html");

                if (!response.ok) {
                    return;
                }

                const html = await response.text();
                const parser = new DOMParser();
                const productsDocument = parser.parseFromString(html, "text/html");

                const products = productsDocument.querySelectorAll(".product-card");
                const query = searchValue.trim().toLowerCase();
                const matches = [];

                products.forEach((product) => {
                    const text = product.textContent.trim().toLowerCase();
                    if (text.includes(query)) {
                        matches.push(product);
                    }
                });

                searchResults.innerHTML = "";

                if (!matches.length) {
                    const message = document.createElement("p");
                    message.classList.add("search-no-result");
                    message.textContent = `نتیجه‌ای برای "${searchValue}" یافت نشد.`;
                    searchResults.appendChild(message);
                    return;
                }

                matches.forEach((product) => {
                    const productId = product.dataset.productId;
                    const productClone = product.cloneNode(true);

                    // کلیک روی کارت جهت هدایت به صفحه محصول و اسکرول به آن
                    if (productId) {
                        const cardContent = productClone.querySelector('.product-card-content');
                        const cardImage = productClone.querySelector('.product-image');

                        // ساخت دکمه/لینک استعلام قیمت از طریق تماس تلفنی
const quoteBtn = productClone.querySelector('.product-quote');
if (quoteBtn) {
    const phoneNumber = '+989218541565'; // شماره تلفن مورد نظر خود را اینجا قرار دهید
    
    quoteBtn.href = `tel:${phoneNumber}`;
    
    const spanTag = quoteBtn.querySelector('span');
    if (spanTag) {
        spanTag.textContent = 'استعلام بهاء';
    } else {
        quoteBtn.textContent = 'استعلام بهاء';
    }
}

                        // در صورت تمایل به کلیک روی تصویر یا متن کارت برای انتقال به صفحه محصولات
                        [cardImage, cardContent].forEach(el => {
                            if (el) {
                                el.style.cursor = 'pointer';
                                el.addEventListener('click', () => {
                                    window.location.href = `products.html#${productId}`;
                                });
                            }
                        });
                    }

                    searchResults.appendChild(productClone);
                });

            } catch (error) {
                console.error("خطا در بارگذاری نتایج جستجو:", error);
            }
        }

        loadSearchResults();

    } else {
        const message = document.createElement("p");
        message.classList.add("search-no-result");
        message.textContent = "عبارت جستجو وارد نشده است.";
        searchResults.appendChild(message);
    }
}