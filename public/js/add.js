document.querySelector('#name').addEventListener('click',addHeading)

function addHeading(){
   let input = document.createElement('input')
   input.setAttribute('name', 'name')
   input.setAttribute('type', 'text')
   input.setAttribute('required', 'required')
   document.querySelector('.name').appendChild(input)
}

document.querySelector('#remove-name').addEventListener('click',removeHeading)

function removeHeading(){
let nodes = document.querySelector('.name').childNodes
    document.querySelector('.name').removeChild(nodes[nodes.length-1])
}

document.querySelector('#image').addEventListener('click',addImage)

function addImage(){
    let input = document.createElement('input')
    input.setAttribute('name', 'image')
    input.setAttribute('type', 'file')
    input.setAttribute('class', 'button')
    input.setAttribute('required', 'required')
    document.querySelector('.image').appendChild(input)
}

document.querySelector('#remove-image').addEventListener('click',removeImage)

function removeImage(){
let nodes = document.querySelector('.image').childNodes
document.querySelector('.image').removeChild(nodes[nodes.length-1])
}


