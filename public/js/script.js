  document.querySelector('#menu').addEventListener('click',showMenu)

  function showMenu(){
    document.querySelector('#nav').style.height = '54vh'
    document.querySelector('#menu').style.display = 'none'

  }

  
  document.querySelector('#close').addEventListener('click',hideMenu)

  function hideMenu(){
    document.querySelector('#nav').style.height = '0'
    document.querySelector('#menu').style.display = 'flex'
  }