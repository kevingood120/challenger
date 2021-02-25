
const tableEl = $('#tblMedic')
const paginationInfoEl = $('.pagination-info')
const modalEl = $('.backdrop')
const btnAddEl = $('#btnAdd')
const btnCloseModal = $('#btnCloseModal')
const frmMedic = $('#frmMedic')
const txtZipcode = $('form [name="zipcode"]')

txtZipcode.on('blur', ev => {
    const value = ev.target.value || ''
    if(value.length === 9) {
        const url = `http://viacep.com.br/ws/${value}/json/`
        axios.get(url).then(({ data }) => {
            if(!data.erro) {
                const { neighborhood, city, state, street, complement } = frmMedic.get(0)
                city.value = data.localidade
                neighborhood.value = data.bairro
                state.value = data.uf
                complement.value = data.complemento
                street.value = data.logradouro
            }
            else
                alert('CEP inválido')
        })
    }
})

const columns = [
    { name: 'Nome', property: 'name', width: '250px' },
    { name: 'CRM', property: 'crm', mask: '00.000.00', width: '100px' },
    { name: 'Telefone', property: 'phone',  mask: '(00) 0000-0000', width: '145px' },
    { name: 'Celular', property: 'cellPhone',  mask: '(00) 00000-0000', width: '145px' },
    { name: 'Especialidades', property: 'specialties', width: '240px', customRender: customSpecialtiesRender, customHeader: customSpecialtiesHeader },
    { name: 'CEP', property: 'zipcode', mask: '00000-000', width: '108px' },
    { name: 'Endereço', property: 'street', width: '250px' },
    { name: 'Número', property: 'addressNumber', width: '100px' },
    { name: 'Bairro', property: 'neighborhood', width: '120px' },
    { name: 'Cidade', property: 'city', width: '120px' },
    { name: 'UF', property: 'state', width: '60px' },
    { name: '', property: 'actions', customRender: customActionsRender, empty: true }
]

let id = null

function customActionsRender(tdEl, row, column) {
    const trashIcon = `<i class="fas fa-trash"></i>`
    const editIcon = `<i class="fas fa-pen"></i>`

    const editLinkEl = $('<a>').append(editIcon)
    editLinkEl.attr('href', 'javascript:void(0)')

    editLinkEl.css({
        'margin-right': '10px',
        'color': 'black'
    })

    const trashLinkEl = $('<a>').append(trashIcon)
    trashLinkEl.attr('href', 'javascript:void(0)')

    trashLinkEl.css({
        'color': 'black'
    })

    trashLinkEl.on('click', ev => {
        http.delete(`medic/${row.id}`).then(response => getDataFromApi())
    })

    editLinkEl.on('click', ev => {
        id = row.id
        http.get(`medic/findOne`, {
            params: { id: row.id }
        }).then(response => {
            setValues(response.data)
            openModal()
        })
    })

    tdEl.append(editLinkEl, trashLinkEl)
}

function customSpecialtiesRender(tdEl, row, column) {
    const value = row[column.property] || []
    const specialties = value.map(item => item.desc).join(', ').toLowerCase()
    const divEl = $('<div>')
    divEl.css({
        'text-transform': 'capitalize',
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        'width': '200px'
    })
    divEl.text(specialties)
    divEl.attr('title', specialties)
    tdEl.append(divEl)
}

function customSpecialtiesHeader(thEl, column) {
    const selectEl = $('<select class="form-control">')
    selectEl.on('change', handleEnterFilter)
    const emptyOptEl = $('<option>')
    emptyOptEl.val('')
    emptyOptEl.text('Selecione uma Especialidade')
    emptyOptEl.prop({
        'disabled': false,
        'selected': true
    })
    selectEl.append(emptyOptEl)
    populateSelect(selectEl, false)
    thEl.append(selectEl)
}

function createColumnInput(column) {
    const inputEl = $('<input>')
    if(column.mask)
        inputEl.mask(column.mask)
    inputEl.addClass('form-control')
    inputEl.attr('type', 'text')
    inputEl.attr('placeholder', column.name)
    inputEl.on('keyup', ev => {
        if(ev.key == 'Enter')
            handleEnterFilter()
    })
    
    return inputEl
}

function createColumns() {
    const trEl = $('<tr>')

    for(let column of columns) {
        const thEl = $('<th>')
        thEl.css({
            'min-width': column.width || 'auto'
        })
        thEl.attr('data-column', column.property)
        if(!column.empty) {
            if(column.customHeader) 
                column.customHeader(thEl, column)
            else
                thEl.append(createColumnInput(column))
        }
        trEl.append(thEl)
    }

    tableEl.find('thead').append(trEl)
}

function getFilters() {
    const formControlEl = tableEl.find('th > .form-control')
    const object = {}
    for(let control of formControlEl) {
        const controlWithJquery = $(control)
        const mask = controlWithJquery.data('mask')
        let name = controlWithJquery.parent().data('column')
        let value = mask ? controlWithJquery.cleanVal() : controlWithJquery.val()
        if(value && name) {
            if('specialties' === name)
                value = JSON.parse(value).id
            object[name] = value
        }
        
    }


    return object
}

function handleEnterFilter() {
    getDataFromApi()
}

function populateTable(rows) {
    const defaultRows = rows || []
    const tbodyEl = tableEl.find('tbody')
    tbodyEl.empty()
    paginationInfoEl.text('Você está na pagina 1 de 1')

    if(defaultRows.length === 0) {
        const trEl = $('<tr>')
        const tdEl = $('<td>')
        tdEl.attr('colspan', columns.length)
        tdEl.attr('align', 'center')
        tdEl.text('Sem linhas para serem exibidas.')
        trEl.append(tdEl)
        tbodyEl.append(trEl)
    }
    else {
        for(let row of defaultRows) {
            const trEl = $('<tr>')
            for(let column of columns) {
                const { property, mask, customRender } = column
                const tdEl = $('<td>')
                if(customRender) 
                    customRender(tdEl, row, column)
                else {
                    tdEl.text(row[property])
                    if(mask)
                        tdEl.mask(mask)
                }
                trEl.append(tdEl)
            }
            tbodyEl.append(trEl)
        }
    }
}

function populateSelect(id, clear = true) {

    http.get('specialty').then(response => {
        const defaultRows = response.data || []
        const selectEl = $(id)
    
        if(clear)
            selectEl.empty()
    
        for(let row of defaultRows) {
            const optEl = $('<option>')
            optEl.css('text-transform', 'capitalize')
            optEl.append(row.desc.toLowerCase())
            optEl.val(JSON.stringify({ id: row.id }))
            selectEl.append(optEl)    
        }
    })
}

function getDataFromApi(page = 1, limit = 100) {
    http.get(`medic/${page}/${limit}`, {
        params: getFilters()
    }).then(({ data }) => {
        const { rows, count } = data
        populateTable(rows)
    }).catch(() => populateTable([]))
}

function openModal() {
    modalEl.addClass('active')
}

function closeModal() {
    modalEl.removeClass('active')
    clearForm()
}

btnCloseModal.on('click', ev => {
    closeModal()
})

btnAddEl.on('click', ev => {
    openModal()
})

function clearForm() {
    const controls = frmMedic.find('.form-control')

    for(let control of controls) {
        const controlWithJquery = $(control)
        controlWithJquery.val('')
    }

    id = null
}

function clearErrors() {
    const controls = frmMedic.find('.form-control')

    for(let control of controls) {
        const controlWithJquery = $(control)
        controlWithJquery.parent().removeClass('error')
        controlWithJquery.parent().find('.error').remove()
    }
}

function getValues() {
    const controls = frmMedic.find('.form-control')
    const object = {}
    for(let control of controls) {
        const controlWithJquery = $(control)
        const mask = controlWithJquery.data('mask')
        object[control.name] = mask ? controlWithJquery.cleanVal() : controlWithJquery.val()
    }

    object.specialties = object.specialties.map(specialty => JSON.parse(specialty))

    return object
}

function setValues(values) {
    const controls = frmMedic.find('.form-control')
    clearForm()
    id = values.id
    for(let key in values) {
        for(let control of controls) {
            const controlWithJquery = $(control)
            const name = controlWithJquery.attr('name')

            if(name == key) {
                let value = values[key]
                if(name === 'specialties')
                    value = (value || []).map(item => JSON.stringify({ id: item.id }))
                
                controlWithJquery.val(value)

                const mask = controlWithJquery.data('mask')
                mask?.init()
            }
        }
    }
}

function addErrors(errors) {
    const controls = frmMedic.find('.form-control')
    for(let key in errors) {
        const value = errors[key]
        for(let control of controls) {
            const controlWithJquery = $(control)
            const name = controlWithJquery.attr('name')
            if(name == key) {
                const smallEl = $('<small>')
                smallEl.addClass('error')
                smallEl.text(value[0])
                controlWithJquery.parent().append(smallEl)
                controlWithJquery.parent().addClass('error')
            }
        }
    }
}


frmMedic.on('submit', ev => {
    ev.preventDefault()
    
    const values = getValues()
    if(id) values.id = id

    console.log(values)

    http.post('medic', values).then(response => {
        id = null
        getDataFromApi()
        clearErrors()
        clearForm()
        closeModal()
    }).catch(err => {
        clearErrors()
        addErrors(err.response.data)
    })
})

createColumns()
getDataFromApi()
populateSelect('form [name="specialties"]')

