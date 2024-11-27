// Selecionar todas as camadas de cada grupo
const layersA = document.querySelectorAll('.layerA');
const layersB = document.querySelectorAll('.layerB');
const layersC = document.querySelectorAll('.layerC');
const MARGIN_ACTIVATION = 300; // Pixels antes da camada aparecer completamente

// Ajustar o deslocamento base das camadas
const MAX_OFFSET_A = 100; // Deslocamento inicial máximo para a camada A (fundo)
const MAX_OFFSET_B = 150; // Deslocamento inicial máximo para a camada B (meio)
const MAX_OFFSET_C = 200; // Deslocamento inicial máximo para a camada C (frente)

const applyParallaxEffect = () => {
    const scrollPosition = window.scrollY; // Posição atual do scroll

    layersC.forEach((layer, index) => {
        const groupOffset = index * window.innerHeight; // Offset do grupo
        const relativeScroll = scrollPosition - groupOffset + MARGIN_ACTIVATION; // Inclui a margem

        if (relativeScroll >= -MARGIN_ACTIVATION && relativeScroll < window.innerHeight) {
            const offset = Math.max(0, MAX_OFFSET_C - (relativeScroll * 0.7)); // Aumenta a velocidade da camada C
            layer.style.transform = `translateY(${offset}px)`; // Movimentação mais intensa
        }
    });

    layersB.forEach((layer, index) => {
        const groupOffset = index * window.innerHeight;
        const relativeScroll = scrollPosition - groupOffset + MARGIN_ACTIVATION;

        if (relativeScroll >= -MARGIN_ACTIVATION && relativeScroll < window.innerHeight) {
            const offset = Math.max(0, MAX_OFFSET_B - (relativeScroll * 0.5)); // Aumenta a velocidade da camada B
            layer.style.transform = `translateY(${offset}px)`; // Velocidade média mais perceptível
        }
    });

    layersA.forEach((layer, index) => {
        const groupOffset = index * window.innerHeight;
        const relativeScroll = scrollPosition - groupOffset + MARGIN_ACTIVATION;

        if (relativeScroll >= -MARGIN_ACTIVATION && relativeScroll < window.innerHeight) {
            const offset = Math.max(0, MAX_OFFSET_A - (relativeScroll * 0.3)); // Aumenta a velocidade da camada A
            layer.style.transform = `translateY(${offset}px)`; // Movimentação mais visível
        }
    });
};


// Adicionar evento de scroll com throttle para melhor desempenho
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            applyParallaxEffect();
            ticking = false;
        });
        ticking = true;
    }
});



// áudio
const audio = document.getElementById('background-audio');
const audioButton = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');

// áudio começa pausado
audio.pause();
let isPlaying = false;
audioIcon.src = 'assets/volume-off.png'; // Ícone inicial: desligado

audioButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        audioIcon.src = 'assets/volume-off.png'; // Ícone de volume desligado
    } else {
        audio.play();
        audioIcon.src = 'assets/volume-on.png'; // Ícone de volume ligado
    }
    isPlaying = !isPlaying; // Alternar estado
});

// Garantir que o ícone atualize corretamente caso o áudio acabe
audio.addEventListener('ended', () => {
    isPlaying = false;
    audioIcon.src = 'assets/volume-off.png';
});


// Quando a página terminar de carregar
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');

    // Simula um tempo de carregamento de 2 segundos (para testar)
    setTimeout(() => {
        // Remover o loading screen
        loadingScreen.style.display = 'none';

        // Exibir o conteúdo da página
        content.style.display = 'block';
    }, 2000); // Ajuste o tempo conforme necessário
});