const pokemonName = document.querySelector('.pokemon_name'); /* Criamos essa função para colocar o nome do pokemon*/
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

/*A função fechPokemon é uma função async (assincrona), então ela torna uma promessa, mas não vai executa, por isso a função renderPokemon precisa ser async também, pois irá a usar a função anterior */
const fetchPokemon = async (pokemon) => { /*Nossa função fetchPokemon vai receber uma informação pokemon*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); /* O await(mas só podemos usa-la em funções async, por isso vamos colocar nossa função como async) vai esperar o fetch concluir para passar para as próximas linhas*/
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => { /*Função para renderizar as informações pegadas da API pela função anterior*/
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data){
        pokemonImage.style.display = 'block'; /*Para que a imagem apareça já que esocndemos ela*/
        pokemonName.innerHTML = data.name; /*Tudo que está na API está sendo chamada pela função data, e dentro da API tem o 'name', por isso data.name*/
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];/*Podemos usar ponto como no data.id ou como conchetes nesse caso, usamos o conchetes, pois em generation-v daria problema com o ponto. Como tem várias imagens e queriamos uma especifica, temos que fazer o caminho de onde está a imagem que queremos na API*/

        input.value=''; /*Ele pesquisa e apaga o que esta no input*/
        searchPokemon = data.id; /*Se ele encontrar algo o searchPokemon vai ser esse número e vai facilitar os botões de prev e next para que eles funcionem*/
    } else {
        pokemonImage.style.display = 'none'; /*Vai esconder a imagem*/
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        input.value='';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()); /* O toLowerCase vai colocar tudo em letra minuscula para que não de erro quando a pessoa pesquisar com letra maiscula.Ele vai renderizar o que passamos no input. */  
}); /*Ele vai executar uma função apartir desse evento, nesse caso o evento é o submit*/

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);  /*Quando abrir a página vai aparecer o primeiro pokemon*/
