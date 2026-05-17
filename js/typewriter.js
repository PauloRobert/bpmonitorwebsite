// Typewriter animation for hero badge (no external lib)
(function () {
  function initTypewriter() {
    var el = document.getElementById('typewriter-badge');
    if (!el) return;

    var phrases = [
      'Tecnologia cardiovascular para sua rotina',
      'Monitore sua pressão em tempo real',
      'Saúde cardiovascular inteligente',
      'Dados precisos para decisões seguras',
      'Seu coração merece atenção',
      'Acompanhamento contínuo e confiável',
      'Pressão arterial sob controle',
      'Inteligência cardiovascular ao seu alcance',
      'Viva com mais confiança e segurança',
      'Tecnologia que cuida da sua saúde'
    ];

    var idx = 0;

    function typePhrase() {
      var phrase = phrases[idx];
      el.textContent = '';
      var c = 0;

      function typeChar() {
        if (c < phrase.length) {
          el.textContent += phrase[c++];
          setTimeout(typeChar, 50);
        } else {
          setTimeout(function () {
            idx = (idx + 1) % phrases.length;
            typePhrase();
          }, 3000);
        }
      }
      typeChar();
    }
    typePhrase();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
  } else {
    initTypewriter();
  }
})();
