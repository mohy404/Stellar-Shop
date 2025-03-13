// Theme JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initProductGallery();
  initQuantitySelectors();
  initProductTabs();
  initCollectionFilters();
  initMobileNav();
  initQuickAdd();
});

/**
 * Product Gallery
 * Handles the product image gallery on product detail pages
 */
function initProductGallery() {
  const mainImage = document.querySelector(".product-media__main img");
  const thumbnails = document.querySelectorAll(".product-media__thumbnail");

  if (!mainImage || thumbnails.length === 0) return;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Get the media ID from the thumbnail
      const mediaId = this.dataset.mediaId;

      // Update active thumbnail
      thumbnails.forEach((thumb) => {
        thumb.classList.remove("product-media__thumbnail--active");
      });
      this.classList.add("product-media__thumbnail--active");

      // Update main image
      const targetImage = document.querySelector(`#ProductMedia-${mediaId}`);
      if (targetImage) {
        mainImage.src = targetImage.src;
        mainImage.alt = targetImage.alt;
        mainImage.dataset.mediaId = mediaId;
      }
    });
  });
}

/**
 * Quantity Selectors
 * Handles the quantity selector on product pages
 */
function initQuantitySelectors() {
  const quantitySelectors = document.querySelectorAll(".quantity-selector");

  quantitySelectors.forEach((selector) => {
    const input = selector.querySelector(".quantity-selector__input");
    const increaseBtn = selector.querySelector('[data-action="increase"]');
    const decreaseBtn = selector.querySelector('[data-action="decrease"]');

    if (!input || !increaseBtn || !decreaseBtn) return;

    increaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(input.value, 10);
      input.value = currentValue + 1;
      input.dispatchEvent(new Event("change"));
    });

    decreaseBtn.addEventListener("click", function () {
      const currentValue = parseInt(input.value, 10);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        input.dispatchEvent(new Event("change"));
      }
    });

    input.addEventListener("change", function () {
      if (parseInt(this.value, 10) < 1) {
        this.value = 1;
      }
    });
  });
}

/**
 * Product Tabs
 * Handles the tabs on product detail pages
 */
function initProductTabs() {
  const tabButtons = document.querySelectorAll(".tabs__button");
  const tabPanels = document.querySelectorAll(".tabs__panel");

  if (tabButtons.length === 0 || tabPanels.length === 0) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab;

      // Update active button
      tabButtons.forEach((btn) => {
        btn.classList.remove("tabs__button--active");
        btn.setAttribute("aria-selected", "false");
      });
      this.classList.add("tabs__button--active");
      this.setAttribute("aria-selected", "true");

      // Update active panel
      tabPanels.forEach((panel) => {
        panel.classList.remove("tabs__panel--active");
      });
      document
        .querySelector(`[data-tab-panel="${tabId}"]`)
        .classList.add("tabs__panel--active");
    });
  });
}

/**
 * Collection Filters
 * Handles the filters on collection pages
 */
function initCollectionFilters() {
  // Filter toggle (mobile)
  const filterToggle = document.querySelector(".filter-toggle");
  const filterDrawer = document.getElementById("FilterDrawer");
  const filterClose = document.querySelector(".collection-filters__close");

  if (filterToggle && filterDrawer) {
    filterToggle.addEventListener("click", function () {
      filterDrawer.classList.toggle("is-active");
      this.setAttribute(
        "aria-expanded",
        filterDrawer.classList.contains("is-active")
      );
    });
  }

  if (filterClose && filterDrawer) {
    filterClose.addEventListener("click", function () {
      filterDrawer.classList.remove("is-active");
      if (filterToggle) {
        filterToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Filter group toggles
  const filterGroupToggles = document.querySelectorAll(".filter-group__toggle");

  filterGroupToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = document.getElementById(
        this.getAttribute("aria-controls")
      );
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      this.setAttribute("aria-expanded", !isExpanded);
      content.classList.toggle("is-active", !isExpanded);
    });
  });

  // Sort by functionality
  const sortBySelect = document.getElementById("SortBy");

  if (sortBySelect) {
    sortBySelect.addEventListener("change", function () {
      const url = new URL(window.location.href);
      url.searchParams.set("sort_by", this.value);
      window.location.href = url.href;
    });
  }

  // View toggle (Grid/List)
  const viewButtons = document.querySelectorAll(".view-button");
  const productGrid = document.querySelector(".product-grid");

  if (viewButtons.length > 0 && productGrid) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const view = this.dataset.view;

        // Update active button
        viewButtons.forEach((btn) => {
          btn.classList.remove("view-button--active");
        });
        this.classList.add("view-button--active");

        // Update view
        productGrid.dataset.view = view;
      });
    });
  }
}

/**
 * Mobile Navigation
 * Handles the mobile navigation menu
 */
function initMobileNav() {
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mobileNav = document.getElementById("MobileNav");

  if (!mobileNavToggle || !mobileNav) return;

  mobileNavToggle.addEventListener("click", function () {
    const isHidden = mobileNav.hidden;
    mobileNav.hidden = !isHidden;
    this.setAttribute("aria-expanded", !isHidden);
  });
}

/**
 * Quick Add
 * Handles the quick add functionality on product cards
 */
function initQuickAdd() {
  const quickAddButtons = document.querySelectorAll(".quick-add-button");

  quickAddButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const productId = this.dataset.productId;

      // Add to cart functionality would go here
      console.log(`Quick adding product ${productId} to cart`);

      // Show a success message
      this.textContent = "Added!";
      setTimeout(() => {
        this.textContent = "Quick Add";
      }, 2000);
    });
  });
}

/**
 * Buy Now Button
 * Handles the Buy Now button on product pages
 */
document.addEventListener("click", function (event) {
  if (
    event.target.matches("[data-buy-now]") ||
    event.target.closest("[data-buy-now]")
  ) {
    event.preventDefault();

    // Get the form
    const form = document.getElementById("AddToCartForm");
    if (!form) return;

    // Submit the form with redirect parameter
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "checkout";
    input.value = "true";
    form.appendChild(input);
    form.submit();
  }
});

/**
 * Search Toggle
 * Handles the search form toggle in the header
 */
document.addEventListener("click", function (event) {
  if (
    event.target.matches(".search-toggle") ||
    event.target.closest(".search-toggle")
  ) {
    const searchForm = document.querySelector(".search-form-wrapper");
    if (!searchForm) return;

    const isHidden = searchForm.hidden;
    searchForm.hidden = !isHidden;
    event.target.setAttribute("aria-expanded", !isHidden);
  }
});

/**
 * Lazy Loading
 * Lazy loads images for better performance
 */
document.addEventListener("DOMContentLoaded", function () {
  if ("loading" in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    const lazyImages = document.querySelectorAll(".lazy-image");
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});
