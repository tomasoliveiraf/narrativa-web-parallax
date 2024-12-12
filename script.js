document.addEventListener('DOMContentLoaded', () => {
    const parallaxGroups = document.querySelectorAll('.parallax-group');

    function createParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            parallaxGroups.forEach((group, groupIndex) => {
                const layerA = group.querySelector('.layerA');
                const layerB = group.querySelector('.layerB');
                const layerC = group.querySelector('.layerC');
                if (layerA && layerB && layerC) {
                    // Calcula a posição do grupo
                    const groupTop = group.offsetTop;
                    const groupHeight = group.offsetHeight;
                    // Determina o progresso de rolagem dentro do grupo
                    const scrollProgress = (scrollPosition - groupTop + viewportHeight / 2) / groupHeight;
                    // Aumenta o range de movimento
                    layerC.style.transform = `translateY(${scrollProgress * 150}px)`;
                    layerB.style.transform = `translateY(${scrollProgress * 100}px)`;
                    layerA.style.transform = `translateY(${scrollProgress * 50}px)`;
                }
            });
        });
    }

    function scrollToNextSection() {
        const currentScrollPosition = window.scrollY;

        for (let i = 0; i < parallaxGroups.length; i++) {
            const group = parallaxGroups[i];
            const groupTop = group.offsetTop;

            if (groupTop > currentScrollPosition + window.innerHeight / 2) {
                window.scrollTo({
                    top: groupTop,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }

    function scrollToPreviousSection() {
        const currentScrollPosition = window.scrollY;

        for (let i = parallaxGroups.length - 1; i >= 0; i--) {
            const group = parallaxGroups[i];
            const groupTop = group.offsetTop;

            if (groupTop < currentScrollPosition) {
                window.scrollTo({
                    top: groupTop,
                    behavior: 'smooth'
                });
                break;
            }
        }
    }

    function handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const images = document.querySelectorAll('.parallax-layer');
        let loadedImages = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        hideLoading();
                    }
                });
            }
        });

        // Se todas as imagens já estiverem carregadas
        if (loadedImages === images.length) {
            hideLoading();
        }

        function hideLoading() {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                createParallaxEffect();
            }, 300);
        }
    }

    // Event listener para teclas de seta
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            scrollToNextSection();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            scrollToPreviousSection();
        }
    });

    const scrollTopButton = document.getElementById('scroll-top');

    // Mostrar/esconder botão baseado na posição de scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Função para voltar ao topo
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Áudio (mantido do seu script original)
    const audio = document.getElementById('background-audio');
    const audioButton = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    audio.pause();
    let isPlaying = false;
    audioIcon.src = 'assets/volume-off.png';
    audioButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audioIcon.src = 'assets/volume-off.png';
        } else {
            audio.play();
            audioIcon.src = 'assets/volume-on.png';
        }
        isPlaying = !isPlaying;
    });
    audio.addEventListener('ended', () => {
        isPlaying = false;
        audioIcon.src = 'assets/volume-off.png';
    });

    // Iniciar processo de loading
    handleLoading();
});