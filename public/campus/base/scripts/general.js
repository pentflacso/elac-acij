/* SCRIPT PARA HABILITAR UN CSS DE MODO DEV */

document.addEventListener("DOMContentLoaded", () => {
    const DEV_CSS_HOST = "https://localhost:3000";
    const ORIGINAL_CSS_PATH = document.getElementById("pent-styles").href;
    const LOCAL_STORAGE_KEY = "devModeEnabled";

    let devUpdateInterval = null;

    const pageHeader = document.querySelector("#page-header");

    if (!pageHeader) {
        console.error("El elemento #page-header no existe en la página.");
        return;
    }

    // Verificar si el body tiene la clase "editing"
    if (!document.body.classList.contains("editing")) {
        return;
    }

    // Crear el switch de modo dev
    const devSwitchContainer = document.createElement("div");
    devSwitchContainer.style.display = "flex";
    devSwitchContainer.style.alignItems = "center";
    devSwitchContainer.style.gap = "0.5rem";
    devSwitchContainer.style.marginTop = "1rem";

    const devSwitchLabel = document.createElement("label");
    devSwitchLabel.textContent = "Modo Dev";
    devSwitchLabel.style.cursor = "pointer";

    const devSwitch = document.createElement("input");
    devSwitch.type = "checkbox";
    devSwitch.id = "dev-mode-toggle";
    devSwitch.style.cursor = "pointer";

    devSwitchContainer.appendChild(devSwitch);
    devSwitchContainer.appendChild(devSwitchLabel);
    pageHeader.appendChild(devSwitchContainer);

    // Leer estado inicial de localStorage
    const isDevModeEnabled = localStorage.getItem(LOCAL_STORAGE_KEY) === "true";
    devSwitch.checked = isDevModeEnabled;
    toggleDevMode(isDevModeEnabled);

    // Manejar el evento de cambio del switch
    devSwitch.addEventListener("change", () => {
        const isEnabled = devSwitch.checked;
        localStorage.setItem(LOCAL_STORAGE_KEY, isEnabled);
        toggleDevMode(isEnabled);
    });

    function toggleDevMode(enabled) {
        const stylesLink = document.getElementById("pent-styles");
        if (!stylesLink) {
            console.error("El elemento <link id=\"pent-styles\"> no existe en la página.");
            return;
        }

        clearInterval(devUpdateInterval);

        if (enabled) {
            updateDevStyles();
            devUpdateInterval = setInterval(updateDevStyles, 2000);
        } else {
            stylesLink.href = ORIGINAL_CSS_PATH;
        }
    }

    function updateDevStyles() {
        const stylesLink = document.getElementById("pent-styles");
        if (!stylesLink) {
            console.error("El elemento <link id=\"pent-styles\"> no existe en la página.");
            return;
        }

        // Extraer la ruta del archivo CSS original
        const originalURL = new URL(ORIGINAL_CSS_PATH);
        const cssPath = originalURL.pathname; // Ruta interna del archivo

        // Construir la nueva URL con el host de desarrollo
        const devCSSURL = new URL(cssPath, DEV_CSS_HOST);

        // Añadir un timestamp para evitar el caché
        const timestamp = new Date().getTime();
        stylesLink.href = `${devCSSURL.href}?t=${timestamp}`;
    }
});




// Para que la section-0 muestre el titulo o el volver según este en la portada o en un módulo. 

// Espera a que el DOM esté completamente cargado

document.addEventListener("DOMContentLoaded", function() {
    let body = document.body;

    //SI estamos en la portada del curso
    if (body.classList.contains('pagelayout-course')) {
        if (window.innerWidth < 1200) {

            let regionMainBox = document.getElementById('region-main-box');
            let regionMain = document.getElementById('region-main');
            let columna = document.querySelector('[data-region="blocks-column"]');

            // Crear contenedor de menu
            const contentMenu = document.createElement('div');
            contentMenu.id = 'content-menu-column';

            const overley = document.createElement('div');
            overley.id = 'overley';
            body.appendChild(overley);

            // Crear el botón
            const btnBlocksColumn = document.createElement('button');
            btnBlocksColumn.id = 'btn-blocks-column';
            btnBlocksColumn.textContent = 'Mas Info';

            contentMenu.appendChild(btnBlocksColumn);
            contentMenu.appendChild(columna);
            body.appendChild(contentMenu);

            btnBlocksColumn.addEventListener('click', function() {
                body.classList.toggle('active-menu-column');

                setTimeout(function() {
                    overley.classList.toggle('visible');
                    contentMenu.classList.toggle('active');
                    btnBlocksColumn.classList.toggle('active');
                }, 1);
            });

        }

    }
});