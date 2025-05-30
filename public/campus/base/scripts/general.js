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

// Espera a que el DOM esté completamente cargado

document.addEventListener("DOMContentLoaded", function() {
    let body = document.body;

    //SI estamos en la portada del curso
    if (body.classList.contains('pagelayout-course')) {
        /*
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
        */    

        /**
         * Función para colapsar todas las secciones del curso excepto la primera válida
         */

        const allSections = document.querySelectorAll('ul.topics li.course-section');

        let firstValidSection = null;

        // Encontrar la primera sección válida que no sea section-0 ni tenga .separate
        for (const section of allSections) {
            if (section.id !== 'section-0' && !section.querySelector('.separate')) {
                firstValidSection = section;
                break;
            }
        }

        // Iterar sobre todas las secciones
        allSections.forEach(section => {
            // Si contiene un .separate, marcar la sección como separador
            if (section.querySelector('.separate')) {
                section.classList.add('section-divider');
            }

            const content = section.querySelector('.course-content-item-content');
            const link = section.querySelector('a.icons-collapse-expand');

            if (section === firstValidSection) {
                // Expandir la primera sección válida
                if (content) content.classList.add('show');

                if (link) {
                    link.classList.remove('collapsed');
                    link.setAttribute('aria-expanded', 'true');
                }
            } else {
                // Colapsar todas las demás
                if (content) content.classList.remove('show');

                if (link) {
                    if (!link.classList.contains('collapsed')) {
                        link.classList.add('collapsed');
                    }

                    link.setAttribute('aria-expanded', 'false');
                }
            }

            //Numeradores para los separadores
            const divider_number = [...document.querySelectorAll('li.section-divider')].reverse();

            divider_number.forEach((el, index) => {
                el.style.setProperty('--count', `'${index + 1}'`);
            });
        });

    }else{
        const breadcrumb = document.querySelector('.breadcrumb');

        if (breadcrumb) {
            const firstBreadcrumbItem = breadcrumb.querySelector('li.breadcrumb-item a');

            if (firstBreadcrumbItem) {
                const href = firstBreadcrumbItem.getAttribute('href');
                const title = firstBreadcrumbItem.getAttribute('title');

                // 2. Crear el nuevo elemento <div class="back"><a ...>← Volver</a></div>
                const backDiv = document.createElement('div');
                backDiv.className = 'back';

                const backLink = document.createElement('a');
                backLink.href = href;
                backLink.title = title;
                backLink.textContent = 'Volver';

                backDiv.appendChild(backLink);

                // 3. Insertar div.back al principio del elemento con id="topofscroll"
                const pageContent = document.querySelector('#page-content');

                if (pageContent && pageContent.parentNode) {
                pageContent.parentNode.insertBefore(backDiv, pageContent);
                }
            }
        }

        /**
         * Si la pagina es de edición de datos, reemplaza los inputs de texto por textareas
         * 
         */
        replaceTextInputs();

        /**
         * Funcion para agregar un enlace "Avanzar" al sticky footer en la página de vista de datos
         */
        stickyFooter(breadcrumb);
    }


    //Remplazos de input tipo text a textarea
    function replaceTextInputs() {
        // 1. Verificar si el body tiene el ID correcto
        if (document.body.id !== 'page-mod-data-edit') return;

        const textInputs = document.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => {
            const textarea = document.createElement('textarea');
            textarea.value = input.value;
            textarea.className = input.className;
            textarea.id = input.id;
            textarea.name = input.name;
            textarea.placeholder = input.placeholder;
            
            // Reemplazar el input por el textarea
            input.parentNode.replaceChild(textarea, input);
        });
    }

    /**
     * Función para agregar un enlace "Avanzar" al sticky footer en la página de vista de datos
     * y cambiar el texto del botón "Agregar nota" a "Escribir" si es necesario.
     */

    function stickyFooter(breadcrumb) {
        const text_btn_new_entry = document.querySelector(".base-libreta") ? 'Agregar nota' : "Escribir";

        if (document.body.id !== 'page-mod-data-view') return;
        
        let breadcrumbUrl = '#';
        let breadcrumbTitle = '';

        if (breadcrumb) {
            const firstItem = breadcrumb.querySelector('li.breadcrumb-item a');

            if (firstItem) {
                breadcrumbUrl = firstItem.getAttribute('href');
                breadcrumbTitle = firstItem.getAttribute('title') || firstItem.textContent.trim();
            }
        }

        // 2. Verifica si existe el contenedor del sticky footer
        const stickyFooter = document.querySelector('#page-mod-data-view #sticky-footer');

        if (stickyFooter) {
            const navItems = stickyFooter.querySelectorAll('div.navitem');

            navItems.forEach(item => {
                // Asegura que el div tenga solo la clase "navitem"
                if (item.classList.length === 1 && item.classList.contains('navitem')) {
                    // Crear el nuevo enlace "Avanzar"
                    const avanzarLink = document.createElement('a');
                    avanzarLink.href = breadcrumbUrl;
                    avanzarLink.title = breadcrumbTitle;
                    avanzarLink.textContent = 'Avanzar';
                    avanzarLink.className = 'btn btn-secondary';

                    // Agregar el nuevo enlace al final del navitem
                    item.appendChild(avanzarLink);

                    // Buscar un <a> con clase "btn-primary" y cambiar su texto
                    const btnPrimary = item.querySelector('a.btn-primary');
                    if (btnPrimary) {
                        btnPrimary.textContent = text_btn_new_entry;
                    }
                }
            });
        }
        
    }


});