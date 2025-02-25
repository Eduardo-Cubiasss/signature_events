/**
Responsive HTML Table With Pure CSS - Web Design/UI Design

Code written by:
👨🏻‍⚕️ @Coding Design (Jeet Saru)

> You can do whatever you want with the code. However if you love my content, you can **SUBSCRIBED** my YouTube Channel.

🌎link: www.youtube.com/codingdesign 
*/

let modal = null;
let modal2 = null;
let modal3 = null;
window.onload = () => { 
    modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal2 = new bootstrap.Modal(document.getElementById('exampleModal2'));
    modal3 = new bootstrap.Modal(document.getElementById('exampleModal3'));
    const countrySelect = document.getElementById('country-code');
    const phoneInput = document.getElementById('phone-number');
    const errorText = document.getElementById('phone-error');
    const countrySelect2 = document.getElementById('country-code2');
    const phoneInput2 = document.getElementById('phone-number2');
    const errorText2 = document.getElementById('phone-error2');
    const countries = [
        // América
        { name: 'Argentina', code: '+54', maxDigits: 10 },
        { name: 'Bolivia', code: '+591', maxDigits: 8 },
        { name: 'Brasil', code: '+55', maxDigits: 11 },
        { name: 'Canadá', code: '+1', maxDigits: 10 },
        { name: 'Chile', code: '+56', maxDigits: 9 },
        { name: 'Colombia', code: '+57', maxDigits: 10 },
        { name: 'Costa Rica', code: '+506', maxDigits: 8 },
        { name: 'Cuba', code: '+53', maxDigits: 8 },
        { name: 'Ecuador', code: '+593', maxDigits: 9 },
        { name: 'El Salvador', code: '+503', maxDigits: 8 },
        { name: 'Guatemala', code: '+502', maxDigits: 8 },
        { name: 'Honduras', code: '+504', maxDigits: 8 },
        { name: 'México', code: '+52', maxDigits: 10 },
        { name: 'Nicaragua', code: '+505', maxDigits: 8 },
        { name: 'Panamá', code: '+507', maxDigits: 8 },
        { name: 'Paraguay', code: '+595', maxDigits: 9 },
        { name: 'Perú', code: '+51', maxDigits: 9 },
        { name: 'República Dominicana', code: '+1', maxDigits: 10 },
        { name: 'Uruguay', code: '+598', maxDigits: 9 },
        { name: 'Venezuela', code: '+58', maxDigits: 10 },

        // Europa
        { name: 'Alemania', code: '+49', maxDigits: 11 },
        { name: 'España', code: '+34', maxDigits: 9 },
        { name: 'Francia', code: '+33', maxDigits: 9 },
        { name: 'Italia', code: '+39', maxDigits: 10 },
        { name: 'Países Bajos', code: '+31', maxDigits: 9 },
        { name: 'Portugal', code: '+351', maxDigits: 9 },
        { name: 'Reino Unido', code: '+44', maxDigits: 10 },
        { name: 'Rusia', code: '+7', maxDigits: 10 },
        { name: 'Suecia', code: '+46', maxDigits: 10 },
        { name: 'Suiza', code: '+41', maxDigits: 10 },

        // Asia (países más poblados)
        { name: 'Bangladesh', code: '+880', maxDigits: 10 },
        { name: 'China', code: '+86', maxDigits: 11 },
        { name: 'India', code: '+91', maxDigits: 10 },
        { name: 'Indonesia', code: '+62', maxDigits: 10 },
        { name: 'Japón', code: '+81', maxDigits: 10 },
        { name: 'Pakistán', code: '+92', maxDigits: 10 },
        { name: 'Turquía', code: '+90', maxDigits: 10 },
        { name: 'Vietnam', code: '+84', maxDigits: 10 }
    ];

    countries.sort((a, b) => a.name.localeCompare(b.name));
    countrySelect.innerHTML = '';

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        countrySelect.appendChild(option);
        countrySelect2.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        phoneInput.value = '';
        errorText.classList.add('d-none');
    });

    countrySelect2.addEventListener('change', () => {
        phoneInput2.value = '';
        errorText2.classList.add('d-none');
    }); 

    phoneInput.addEventListener('input', () => {
        const selectedPrefix = countrySelect.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        phoneInput.value = phoneInput.value.replace(/\s/g, '');

        if (phoneInput.value.length > maxDigits) {
            phoneInput.value = phoneInput.value.slice(0, maxDigits);
        }
    });

    phoneInput2.addEventListener('input', () => {
        const selectedPrefix = countrySelect2.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        phoneInput2.value = phoneInput2.value.replace(/\s/g, '');

        if (phoneInput2.value.length > maxDigits) {
            phoneInput2.value = phoneInput2.value.slice(0, maxDigits);
        }
    });

    phoneInput.addEventListener('blur', () => {
        const selectedPrefix = countrySelect.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        if (phoneInput.value.length < 5 || phoneInput.value.length > maxDigits) {
            errorText.classList.remove('d-none');
        } else {
            errorText.classList.add('d-none');
        }
    });

    phoneInput2.addEventListener('blur', () => {
        const selectedPrefix = countrySelect2.value;
        const country = countries.find(c => c.code === selectedPrefix);
        const maxDigits = country ? country.maxDigits : 10;

        if (phoneInput2.value.length < 5 || phoneInput2.value.length > maxDigits) {
            errorText2.classList.remove('d-none');
        } else {
            errorText2.classList.add('d-none');
        }
    });
};


const search = document.querySelector('.input-group input'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');

// 1. Searching for specific data of HTML table
search.addEventListener('input', searchTable);

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting | Ordering data of HTML table

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}

// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');
const customers_table = document.querySelector('#customers_table');


const toPDF = function (customers_table) {
    const html_code = `
    <!DOCTYPE html>
    <link rel="stylesheet" type="text/css" href="style.css">
    <main class="table" id="customers_table">${customers_table.innerHTML}</main>`;

    const new_window = window.open();
     new_window.document.write(html_code);

    setTimeout(() => {
        new_window.print();
        new_window.close();
    }, 400);
}

pdf_btn.onclick = () => {
    toPDF(customers_table);
}

// 4. Converting HTML table to JSON

const json_btn = document.querySelector('#toJSON');

const toJSON = function (table) {
    let table_data = [],
        t_head = [],

        t_headings = table.querySelectorAll('th'),
        t_rows = table.querySelectorAll('tbody tr');

    for (let t_heading of t_headings) {
        let actual_head = t_heading.textContent.trim().split(' ');

        t_head.push(actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase());
    }

    t_rows.forEach(row => {
        const row_object = {},
            t_cells = row.querySelectorAll('td');

        t_cells.forEach((t_cell, cell_index) => {
            const img = t_cell.querySelector('img');
            if (img) {
                row_object['customer image'] = decodeURIComponent(img.src);
            }
            row_object[t_head[cell_index]] = t_cell.textContent.trim();
        })
        table_data.push(row_object);
    })

    return JSON.stringify(table_data, null, 4);
}

json_btn.onclick = () => {
    const json = toJSON(customers_table);
    downloadFile(json, 'json')
}

// 5. Converting HTML table to CSV File

const csv_btn = document.querySelector('#toCSV');

const toCSV = function (table) {
    // Code For SIMPLE TABLE
    // const t_rows = table.querySelectorAll('tr');
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll('th, td');
    //     return [...cells].map(cell => cell.textContent.trim()).join(',');
    // }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join(',') + ',' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            img = decodeURIComponent(row.querySelector('img').src),
            data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');

        return data_without_img + ',' + img;
    }).join('\n');

    return headings + '\n' + table_data;
}

csv_btn.onclick = () => {
    const csv = toCSV(customers_table);
    downloadFile(csv, 'csv', 'customer orders');
}

// 6. Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#toEXCEL');

const toExcel = function (table) {
    // Code For SIMPLE TABLE
    // const t_rows = table.querySelectorAll('tr');
    // return [...t_rows].map(row => {
    //     const cells = row.querySelectorAll('th, td');
    //     return [...cells].map(cell => cell.textContent.trim()).join('\t');
    // }).join('\n');

    const t_heads = table.querySelectorAll('th'),
        tbody_rows = table.querySelectorAll('tbody tr');

    const headings = [...t_heads].map(head => {
        let actual_head = head.textContent.trim().split(' ');
        return actual_head.splice(0, actual_head.length - 1).join(' ').toLowerCase();
    }).join('\t') + '\t' + 'image name';

    const table_data = [...tbody_rows].map(row => {
        const cells = row.querySelectorAll('td'),
            img = decodeURIComponent(row.querySelector('img').src),
            data_without_img = [...cells].map(cell => cell.textContent.trim()).join('\t');

        return data_without_img + '\t' + img;
    }).join('\n');

    return headings + '\n' + table_data;
}

// Función para abrir el modal
function abrirmodal() {
    modal.show();
}

function abrirmodal2() {
    modal2.show();
}

function abrirmodal3() {
    modal3.show();
}

// Crea una funcion que cierre el modal
function cerrarmodal() {
    console.log('Saliendo ', modal);
    modal.hide();
}

function cerrarmodal2() {
    console.log('Saliendo ', modal2)
    modal2.hide();
}

function cerrarmodal3() {
    console.log('Saliendo ', modal3)
    modal3.hide();
}
excel_btn.onclick = () => {
    const excel = toExcel(customers_table);
    downloadFile(excel, 'excel');
}

const downloadFile = function (data, fileType, fileName = '') {
    const a = document.createElement('a');
    a.download = fileName;
    const mime_types = {
        'json': 'application/json',
        'csv': 'text/csv',
        'excel': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    a.href = `
        data:${mime_types[fileType]};charset=utf-8,${encodeURIComponent(data)}
    `;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

