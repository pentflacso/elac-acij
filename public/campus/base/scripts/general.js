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

    // Función para controlar la visibilidad del h1 y la etiqueta a
    function controlarVisibilidad() {
        var singleSection = document.querySelector(".course-content .single-section");
        var section0H1 = document.querySelector(".course-content #section-0 h1");
        var section0Link = document.querySelector(".course-content #section-0 p#volver a");

        if (singleSection) {
            // Si existe el div .single-section, ocultar el h1
            section0H1.style.display = "none";
        } else {
            // Si no existe el div .single-section, ocultar la etiqueta a
            section0Link.style.display = "none";
            // Agregar la clase .home al body
            document.body.classList.add("home");
        }
    }

    // Llama a la función para controlar la visibilidad cuando se cargue la página
    controlarVisibilidad();

    // Observador de mutaciones para detectar cambios en el DOM
    var observer = new MutationObserver(function(mutationsList, observer) {
        // Llama a la función para controlar la visibilidad cada vez que haya cambios en el DOM
        controlarVisibilidad();
    });

    // Configura el observador para que observe cambios en el div .course-content
    observer.observe(document.querySelector(".course-content"), { childList: true, subtree: true });


    // AGREGA CLASES A ETIQUETAS LI PARA DIFERENCIAR LAS CARDS DE LOS MÓDULOS EN COMPLETOS E INCOMPLETOS

    // Encontrar la etiqueta <li> con la clase .current
    var currentListItem = document.querySelector(".course-content .current");

    // Verificar si se encontró la etiqueta <li> con la clase .current
    if (currentListItem) {
        // Obtener todos los elementos <li> dentro de la misma lista (<ul>)
        var listItems = currentListItem.parentElement.querySelectorAll("li");

        // Bandera para indicar si ya hemos encontrado la etiqueta <li> con la clase .current
        var foundCurrent = false;

        // Iterar sobre los elementos <li> y agregar la clase .completo o .incompleto
        listItems.forEach(function(item) {
            if (!foundCurrent) {
                // Si aún no hemos encontrado la etiqueta <li> con la clase .current, agregamos la clase .completo
                if (item !== currentListItem) {
                    item.classList.add("completo");
                }

                // Si encontramos la etiqueta <li> con la clase .current, cambiamos la bandera
                if (item === currentListItem) {
                    foundCurrent = true;
                }
            } else {
                // Si ya hemos encontrado la etiqueta <li> con la clase .current, agregamos la clase .incompleto
                item.classList.add("incompleto");
            }
        });
    }


});

document.addEventListener("DOMContentLoaded", function() {
    // TP - TABS ETAPAS

    // Función para actualizar los botones y el contenido
    function updateTabs() {
        let lastAvailableStage = -1;
        for (let i = 0; i <= 6; i++) {
            const button = document.getElementById(`etapa-${i}`);
            const contents = document.querySelectorAll(`.etapa-${i}`);
            if (button) {
                if (contents.length > 0) {
                    lastAvailableStage = i;
                    button.classList.add('completed');
                    button.classList.remove('inactive');
                    button.disabled = false;
                } else {
                    button.classList.add('inactive');
                    button.classList.remove('completed', 'active');
                    button.disabled = true;
                }
            }

        }

        if (lastAvailableStage >= 0) {

            const activeButton = document.getElementById(`etapa-${lastAvailableStage}`);
            const activeContent = document.querySelectorAll(`.etapa-${lastAvailableStage}`);
            const activeContents = document.querySelectorAll(".tp-tab-content");

            activeButton.classList.add('active');
            activeContents.forEach(content => {
                content.classList.add('active');
                const liParent = content.closest('li');
                if (liParent) liParent.style.display = 'none';
            });
            activeContent.forEach(content => {
                content.classList.add('active');
                const liParent = content.closest('li');
                if (liParent) liParent.style.display = 'list-item';
            });
        }
    }

    // Función para manejar el clic en los botones
    function handleButtonClick(event) {
        const selectedStage = parseInt(event.target.id.split('-')[1]);

        for (let i = 0; i <= 6; i++) {
            const button = document.getElementById(`etapa-${i}`);
            const contents = document.querySelectorAll(`.etapa-${i}`);
            if (button) {
                if (i === selectedStage) {
                    button.classList.add('active');
                    contents.forEach(content => {
                        content.classList.add('active');
                        const liParent = content.closest('li');
                        if (liParent) liParent.style.display = 'list-item';
                    });
                } else {
                    button.classList.remove('active');
                    contents.forEach(content => {
                        content.classList.remove('active');
                        const liParent = content.closest('li');
                        if (liParent) liParent.style.display = 'none';
                    });
                }
            }

        }
    }

    // Añadimos event listeners a los botones
    for (let i = 0; i <= 6; i++) {
        const button = document.getElementById(`etapa-${i}`);
        if (button) {
            button.addEventListener('click', handleButtonClick);
        }

    }

    // Actualizamos las tabs inicialmente
    updateTabs();
});