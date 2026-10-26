
const perfis = [
    {
        id: 1,
        nome: "Decifrador Cósmico",
        categoria: "Análise e Descoberta",
        descricao: "Interpreta sinais misteriosos, símbolos e mensagens vindas do espaço.",
        imagem: "imagens/perfil-1.jpg",
        recomendacao: "Analise os sinais recebidos e tente descobrir o que eles escondem."
    },
    {
        id: 2,
        nome: "Engenheiro de Ecossistemas Alienígenas",
        categoria: "Engenharia e Natureza",
        descricao: "Cria ambientes habitáveis e desenvolve ecossistemas para formas de vida extraterrestres.",
        imagem: "imagens/perfil-2.jpg",
        recomendacao: "Estude as condições do planeta e desenvolva um ambiente adequado para a vida."
    },
    {
        id: 3,
        nome: "Investigador de Anomalias Temporais",
        categoria: "Investigação Temporal",
        descricao: "Investiga falhas no tempo, eventos impossíveis e alterações na realidade.",
        imagem: "imagens/perfil-3.jpg",
        recomendacao: "Investigue as alterações temporais e descubra a origem das anomalias."
    },
    {
        id: 4,
        nome: "Cartógrafo de Dimensões",
        categoria: "Exploração Espacial",
        descricao: "Mapeia dimensões desconhecidas, portais e caminhos entre diferentes realidades.",
        imagem: "imagens/perfil-4.jpg",
        recomendacao: "Explore os portais e registre as rotas para mapear as dimensões desconhecidas."
    }
];

const formulario = document.getElementById("formulario");
const telaTeste = document.getElementById("tela-teste");
const telaResultado = document.getElementById("tela-resultado");
const mensagem = document.getElementById("mensagem");
const mensagemEmpate = document.getElementById("mensagem-empate");
const campoNascimento = document.getElementById("nascimento");

// Impede datas futuras no calendário
const agora = new Date();
const ano = agora.getFullYear();
const mes = String(agora.getMonth() + 1).padStart(2, "0");
const dia = String(agora.getDate()).padStart(2, "0");

campoNascimento.max = `${ano}-${mes}-${dia}`;

// Envia o formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    mensagem.textContent = "";
    mensagemEmpate.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const nascimento = campoNascimento.value;

    // Verifica os campos
    const respostas = [
        document.getElementById("p1").value,
        document.getElementById("p2").value,
        document.getElementById("p3").value,
        document.getElementById("p4").value
    ];

    if (nome === "" || nascimento === "" || respostas.includes("")) {
        mensagem.textContent = "Preencha todos os campos.";
        return;
    }

    // Verifica a data de nascimento
    const dataNascimento = new Date(nascimento + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (isNaN(dataNascimento.getTime()) || dataNascimento > hoje) {
        mensagem.textContent = "Informe uma data de nascimento válida.";
        return;
    }

    // Calcula a idade
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    if (
        hoje.getMonth() < dataNascimento.getMonth() ||
        (
            hoje.getMonth() === dataNascimento.getMonth() &&
            hoje.getDate() < dataNascimento.getDate()
        )
    ) {
        idade--;
    }

    // Conta os pontos de cada perfil
    const pontos = [0, 0, 0, 0];

    respostas.forEach(function(resposta) {
        pontos[Number(resposta) - 1]++;
    });

    // Descobre a maior pontuação
    const maiorPontos = Math.max(...pontos);

    // Identifica o perfil vencedor
    const vencedores = [];

    for (let i = 0; i < pontos.length; i++) {
        if (pontos[i] === maiorPontos) {
            vencedores.push(i);
        }
    }

    // Se houver empate, escolhe aleatoriamente entre os empatados
    const indiceVencedor = vencedores[
        Math.floor(Math.random() * vencedores.length)
    ];

    const perfil = perfis[indiceVencedor];

    // Preenche os dados do resultado
    document.getElementById("saudacao").textContent =
        "Missão concluída, " + nome + "!";

    document.getElementById("imagem-perfil").src = perfil.imagem;
    document.getElementById("imagem-perfil").alt = perfil.nome;

    document.getElementById("nome-perfil").textContent = perfil.nome;
    document.getElementById("categoria-perfil").textContent = perfil.categoria;
    document.getElementById("resultado-nome").textContent = nome;
    document.getElementById("resultado-idade").textContent = idade + " anos";
    document.getElementById("descricao-perfil").textContent = perfil.descricao;
    document.getElementById("recomendacao-perfil").textContent = perfil.recomendacao;

    // Mensagem de empate
    if (vencedores.length > 1) {
        mensagemEmpate.textContent =
            "Você teve um empate entre perfis! Um deles foi escolhido para sua missão.";
    } else {
        mensagemEmpate.textContent =
            "Seu perfil foi identificado com sucesso!";
    }

    // Esconde o formulário e mostra o resultado
    telaTeste.hidden = true;
    telaResultado.hidden = false;

    // Leva o resultado para o início da tela
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Botão para refazer o teste
document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();

    mensagem.textContent = "";
    mensagemEmpate.textContent = "";

    telaResultado.hidden = true;
    telaTeste.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
