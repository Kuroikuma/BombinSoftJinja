/* datatable general */
let dataTable;

// @ts-ignore
window.dataTable = dataTable;

const dtb = (id, options) => {
    const table = document.getElementById(id);
    if (!table) return;

    const type = table.getAttribute("type");
    if (type == "matricial") {
        if (options == null) options = { responsive: true };
        else options.responsive = false;
        options["type"] = type;
    }

    // @ts-ignore
    const _dtbConfig = $(`#${id}`).DataTable({
        lengthMenu: [
            [15, 25, 50, -1],
            [15, 25, 50, "Todas"],
        ],
        language: {
            lengthMenu: "_MENU_",
            zeroRecords:
                "<p style='padding-bottom: 0;'> Informacion no Cargada ó No encontrada</p>",
            info: "Mostrando página _PAGE_ de _PAGES_",
            infoEmpty: "Ningún registro disponible",
            infoFiltered:
                "(información filtrada desde _MAX_ registros en total)",
            paginate: {
                first: "Primero",
                last: "Ultimo",
                next: "Próximo",
                previous: "Previo",
            },
            search: "",

            processing: `
                    <div class="mat-progress-spinner" style="margin: auto; margin-bottom: 12px;">
                        <svg preserveAspectRatio="xMidYMid meet" focusable="false" viewBox="0 0 100 100">
                            <circle cx="50%" cy="50%" r="45" class="ng-star-inserted"
                                style="animation-name: mat-progress-spinner-stroke-rotate-100;stroke-dasharray: 282.743px;stroke-width: 10%;width: 25px;height: 25px;">
                            </circle>
                        </svg>
                    </div>

                    <p>Cargando...</p>
                `,
        },
        processing: true,

        order: [],
        pageLength: 15,
        paging:
            eval(table?.getAttribute("dataTable-pagging")) == false
                ? false
                : true,
        responsive: eval(table?.getAttribute("dataTable-responsive")) || true,

        ...options,
    });

    datatableStyle(id, options || {});
    // @ts-ignore
    window.dataTable = _dtbConfig;
    dataTable = _dtbConfig;
    return _dtbConfig;
};

// @ts-ignore
window.dtb = dtb;

/* Agregando estilos con nueva img al datatable */
const datatableStyle = (id, options) => {
    const table = document.querySelector(`#${id}_wrapper`);
    if (!table) return;

    const thead = table.querySelector("thead");
    if (table == null || table.getAttribute("procesada") == "true") return;

    // Procesando buscado
    const ubicacion_buscador = document.createElement("div");
    if (table.querySelector(`.dataTables_filter`)) {
        ubicacion_buscador.appendChild(
            table.querySelector(".dataTables_filter")
        );
    }

    if (table.querySelector(".dataTables_length")) {
        ubicacion_buscador.appendChild(
            table.querySelector(".dataTables_length")
        );
    }

    ubicacion_buscador.classList.add("dt_filter");
    ubicacion_buscador
        .querySelector('input[type="search"]')
        ?.setAttribute("placeholder", "Buscar");

    try {
        table.insertBefore(ubicacion_buscador, table.querySelector("table"));
    } catch (ex) {}

    // Procesando el thead

    // - Setiando el alto del thead
    thead.children[0].setAttribute("height", "45px");

    if (options.type != "matricial") {
        // - Poniendo el espaciado entre la thead
        const rowSpaceHeader = document.createElement("tr");
        thead.append(rowSpaceHeader);
    }

    table.setAttribute("procesada", "true");
};

/* Haciendo que el datatable se carge generalmente por cada tabla que este */
const getAllTable = () => {
    const tablesId = document.querySelectorAll(
        "#myTable"
    ) ;
    const tablesClass = document.querySelectorAll(
        ".myTableClass"
    ) 

    for (const table of tablesId) {
        dtb(table.getAttribute("id"));
    }

    for (const table of tablesClass) {
        table.setAttribute("id", makeRandomId(getRandomArbitrary(100, 0)));
        dtb(table.getAttribute("id"));
    }
};

// Funcion que genere un id ramdon para pasarlo a la funcion dtb
const makeRandomId = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
};

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export { dtb, makeRandomId, getRandomArbitrary, dataTable };
