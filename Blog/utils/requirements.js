const notes = document.querySelector('.requirements-notes')
const example = document.querySelector('.requirements-example') 

function ShowNotes() {
    notes.style.display = 'flex'
    notes.style.margin = '20px'
    example.style.display = 'none'
    example.style.margin = 'none'
}

function ShowExample() {
    notes.style.display = 'none'
    notes.style.margin = 'none'
    example.style.display = 'flex'
    example.style.margin = '20px'
}