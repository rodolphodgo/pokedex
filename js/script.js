const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonType2 = document.querySelector('.pokemon_type2');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    pokemonType.innerHTML = '';
    pokemonType2.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonType.innerHTML = data['types'][0]['type']['name'];
        if (data['types'][1]) {
            pokemonType2.innerHTML = data['types'][1]['type']['name'];
        }else{
            pokemonType2.innerHTML = '';
        };
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
    if (data.id > 649){
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
        pokemonType.innerHTML = '';
        pokemonType2.innerHTML = '';
    }
    console.log(data.id)
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon)
    }
});

renderPokemon(searchPokemon)