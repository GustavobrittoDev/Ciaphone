const phoneNumber = "5512997537483";
const defaultMessage =
  "Ol\u00E1! Vim pelo site da Cia Phone e quero verificar os iPhones dispon\u00EDveis.";

const productCatalog = {
  "iPhone 13": {
    capacities: ["128GB", "256GB"],
    colors: ["Rosa", "Azul", "Meia-noite", "Estelar", "Vermelho"],
  },
  "iPhone 13 Pro / Pro Max": {
    capacities: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Grafite", "Dourado", "Prata", "Azul Sierra", "Verde Alpino"],
  },
  "iPhone 14 / 14 Plus": {
    capacities: ["128GB", "256GB", "512GB"],
    colors: ["Azul", "Meia-noite", "Roxo", "Estelar", "Amarelo", "Vermelho"],
  },
  "iPhone 14 Pro / Pro Max": {
    capacities: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Preto-espacial", "Prata", "Dourado", "Roxo Profundo"],
  },
  "iPhone 15 / 15 Plus": {
    capacities: ["128GB", "256GB", "512GB"],
    colors: ["Preto", "Azul", "Verde", "Amarelo", "Rosa"],
  },
  "iPhone 15 Pro / Pro Max": {
    capacities: ["128GB", "256GB", "512GB", "1TB"],
    colors: ["Tit\u00E2nio Preto", "Tit\u00E2nio Branco", "Tit\u00E2nio Azul", "Tit\u00E2nio Natural"],
  },
};

function buildWhatsAppUrl(productName) {
  const message = productName
    ? `Ol\u00E1! Vim pelo site da Cia Phone e quero verificar disponibilidade do ${productName}.`
    : defaultMessage;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  link.href = buildWhatsAppUrl();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const modelSelect = document.querySelector("#model-select");
const capacitySelect = document.querySelector("#capacity-select");
const colorSelect = document.querySelector("#color-select");
const productForm = document.querySelector("#product-config-form");

function populateSelect(select, placeholder, values) {
  if (!select) {
    return;
  }

  select.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  select.appendChild(placeholderOption);

  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

if (modelSelect && capacitySelect && colorSelect) {
  populateSelect(modelSelect, "Selecione o modelo", Object.keys(productCatalog));

  modelSelect.addEventListener("change", () => {
    const selectedModel = productCatalog[modelSelect.value];

    if (!selectedModel) {
      populateSelect(capacitySelect, "Selecione a capacidade", []);
      populateSelect(colorSelect, "Selecione a cor", []);
      capacitySelect.disabled = true;
      colorSelect.disabled = true;
      return;
    }

    populateSelect(capacitySelect, "Selecione a capacidade", selectedModel.capacities);
    populateSelect(colorSelect, "Selecione a cor", selectedModel.colors);
    capacitySelect.disabled = false;
    colorSelect.disabled = false;
    capacitySelect.value = "";
    colorSelect.value = "";
  });
}

if (productForm && modelSelect && capacitySelect && colorSelect) {
  productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!modelSelect.value || !capacitySelect.value || !colorSelect.value) {
      return;
    }

    const message = `Ol\u00E1! Vim pelo site da Cia Phone e quero verificar este iPhone:\nModelo: ${modelSelect.value}\nCapacidade: ${capacitySelect.value}\nCor: ${colorSelect.value}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const topbar = document.querySelector(".topbar");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

function updateTopbar() {
  if (!topbar) {
    return;
  }

  topbar.classList.toggle("is-scrolled", window.scrollY > 12);
}

updateTopbar();
window.addEventListener("scroll", updateTopbar, { passive: true });

if (topbar && mobileMenuToggle && mobileMenu) {
  function setMobileMenuState(isOpen) {
    topbar.classList.toggle("menu-open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.contains("menu-open");
    setMobileMenuState(!isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!topbar.contains(event.target)) {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });
}
