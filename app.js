let amigos = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();// Remove espaço no inicio e fim da string
    const listaAmigos = document.getElementById("listaAmigos");

    // Verifica se o nome está vazio ou contém números
    if (nome === "") {
        alert("Por favor, digite um nome!");
    } else if (/\d/.test(nome)) {// Nao permite que o usuario digite um numero ou um nome com numero
        alert("O nome não pode conter números!");
    } else if (!amigos.includes(nome)) {
        amigos.push(nome);
        atualizarLista();
        input.value = "";
        input.focus();
    } else {
        alert("Nome inválido ou já adicionado!");
    }
}

function atualizarLista() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear!");
        return;
    }

    let sorteio = [...amigos];
    let resultado = [];

    for (let i = 0; i < amigos.length; i++) {
        let possiveis = sorteio.filter(nome => nome !== amigos[i]);
        
        if (possiveis.length === 0) {
            return sortearAmigo(); // Reinicia o sorteio caso chegue a um beco sem saída
        }

        let escolhido = possiveis[Math.floor(Math.random() * possiveis.length)];
        resultado.push({ amigo: amigos[i], sorteado: escolhido });
        sorteio.splice(sorteio.indexOf(escolhido), 1);
    }

    exibirResultado(resultado);
}

function exibirResultado(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    resultado.forEach(par => {
        const li = document.createElement("li");
        li.textContent = `Seu amigo secreto é: ${par.amigo} → ${par.sorteado}`;
        li.style.color = "green";
        listaResultado.appendChild(li);
    });
}

function limparNomes() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}
