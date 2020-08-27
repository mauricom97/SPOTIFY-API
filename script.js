const token = 'BQBQVk4fZso4CuyTvteRufEpFzEwE0J2JOsLNE0K6L4xOrkuP_KOMkWdjqktrWeP_lz3Yhl-ZYWIokLucgzCJp4H6WMHU-HwIFjgshucFBycaFoJW30co9pJychW-DKsgNJim9dN4d7T_TYU-tcU2JCWzpc42ZoTmv62Aisih1f7JtQdwErkV7Svb5zedPGh6hPxr7Q-JeB-VTQZ8cbQg-VJVNcVNBKF1ma8U8tR9_BMISoaogZHeZi4YdLKz7-NGZz9RVbFOekjL-p07jJvE5p75rQiJnUCqwU_'
//fazendo requisição
function req(e1){
  var settings = {
    "url": `https://api.spotify.com/v1/search?q=${e1}&type=track%2Cartist&limit=20`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": `Bearer ${token}` 
    },
  };
  
  $.ajax(settings).done(function (response) {
    construct(response)
    console.log(response)
  });
  
  }

//Operdores elementos pais do html
var campArtists = document.getElementById('campArtist')

function names(){
    var nome = document.getElementById('nameArtist').value
    if(nome.length >= 3){
     req(nome)
    }
}
var position = 0
var guardaArtists = []


//função para criar os cards 
function construct(e2){
if(guardaArtists.length > 50){
  guardaArtists = []
  limpaArtistas = document.getElementById('campArtist')
  limpaArtistas.innerHTML = ''
}
if(guardaArtists.indexOf(e2.artists.items[0].images[0].url) == -1){
guardaArtists.push(e2.artists.items[0].images[0].url)

let elementUl = document.createElement('ul')
    elementUl.setAttribute('class', 'list-unstyled')
    elementUl.setAttribute('id', `list-unstyled${position}`)
    elementUl.setAttribute('onclick', `selectArtist("${e2.artists.items[0].name}", "${e2.artists.items[0].images[0].url}", "${e2.artists.items[0].genres[0]}")`)
    elementUl.setAttribute('onMouseOver', `alterBackColor("list-unstyled${position}")`)
    elementUl.setAttribute('onMouseOut', `alterBackColor1("list-unstyled${position}")`)
    campArtists.appendChild(elementUl)
let selectUl = document.getElementById(`list-unstyled${position}`)
let elementLi = document.createElement('li')
    elementLi.setAttribute('class', 'media')
    elementLi.setAttribute('id', `media${position}`)
    selectUl.appendChild(elementLi)
let selectLi = document.getElementById(`media${position}`)
let elementImg = document.createElement('img')
    elementImg.setAttribute('src', `${e2.artists.items[0].images[0].url}`)
    elementImg.setAttribute('class', 'mr-3 mt-2')
    elementImg.setAttribute('onclick', `selectArtist("${e2.artists.items[0].name}", "${e2.artists.items[0].images[0].url}", "${e2.artists.items[0].genres[0]}")`)
    selectLi.appendChild(elementImg)
let elementMediaBody = document.createElement('div')
    elementMediaBody.setAttribute('class', 'media-body')
    elementMediaBody.setAttribute('id', `media-body${position}`)
    selectLi.appendChild(elementMediaBody)
let selectMediaPosition = document.getElementById(`media-body${position}`)
let elementH5 = document.createElement('h5')
    elementH5.setAttribute('class', 'mt-2 mb-1')
    elementH5.setAttribute('id', `titleName${position}`)
    selectMediaPosition.appendChild(elementH5)
let selectH5 = document.getElementById(`titleName${position}`)
    selectH5.innerHTML = `${e2.artists.items[0].name}`

    position++
  }
}

//funcção passando os paramentros
function selectArtist(name, image, genres){

  let nameArtist = document.getElementById('nameArtist')
  nameArtist.value = name
  campArtists.innerHTML = `
  <ul class="list-unstyled">
  <li class="media">
    <img src='${image}' class="mr-3" alt="...">
    <div class="media-body">
      <h5 class=" mb-1">${name}</h5>
      <small>GENERO: ${genres.toUpperCase()}</small>
    </div>
  </li>
  
  `
    var ulSelect = document.querySelector('ul')
    ulSelect.style.background = 'chartreuse'
  }

  function alterBackColor(eID){
    var cardBack = document.getElementById(`${eID}`)
      cardBack.style.background = 'chartreuse'


  }

function alterBackColor1(eID){
    var cardBack = document.getElementById(`${eID}`)
    cardBack.style.background = 'blue'

}
