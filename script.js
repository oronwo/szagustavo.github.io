const botoes = document.querySelectorAll('.aba-btn');
const secoes = document.querySelectorAll('.aba-conteudo');

// Aba clicada fica "travada" até o usuário rolar por conta própria,
// porque seções curtas no fim da página nem sempre conseguem chegar ao topo
let abaTravada = null;

function marcarAba(id) {
  botoes.forEach(b => b.classList.toggle('ativo', b.dataset.aba === id));
}

// Clique no menu: rola suavemente até a seção
botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    const alvo = document.getElementById(botao.dataset.aba);
    abaTravada = botao.dataset.aba;
    alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    marcarAba(abaTravada);
  });
});

// Ao rolar: destaca no menu a seção que está na tela
function atualizarAbaAtiva() {
  if (abaTravada) return;
  const chegouNoFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  let atual = secoes[0].id;

  if (window.scrollY <= 4) {
    atual = secoes[0].id;
  } else if (chegouNoFim) {
    atual = secoes[secoes.length - 1].id;
  } else {
    secoes.forEach(s => {
      if (s.getBoundingClientRect().top <= window.innerHeight * 0.35) atual = s.id;
    });
  }
  marcarAba(atual);
}

['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach(evento => {
  window.addEventListener(evento, () => {
    abaTravada = null;
  }, { passive: true });
});

window.addEventListener('scroll', atualizarAbaAtiva, { passive: true });
window.addEventListener('resize', atualizarAbaAtiva);
atualizarAbaAtiva();

const traducoes = {
  pt: {
    baixar: 'Baixar Currículo',
    cargo: 'Acadêmico em Análise e Desenvolvimento de Sistemas',
    abaSobre: 'Sobre',
    abaExp: 'Experiência',
    abaForm: 'Formação',
    abaHab: 'Habilidades',
    abaProj: 'Projetos',

    tituloSobre: 'Sobre mim',
    textoSobre:
      'Olá! Sou um estudante fascinado pela tecnologia, com experiência profissional em suporte técnico tanto de hardware como software, atualmente aprimorando minhas habilidades no meio da programação e desenvolvimento de aplicações, buscando sempre adaptação para aprendizado e otimização dos meios os quais atuo.',

    tituloExp: 'Experiência Profissional',
    exp1Cargo: 'Assistente Fiscal',
    exp1t1: 'Controle de documentos fiscais',
    exp1t2: 'Operação do sistema TOTVS-RM Nucleus',
    exp1t3: 'Acompanhamento de chamados para aquisição de suprimentos',

    exp2Cargo: 'Estagiário Administrativo',
    exp2t1: 'Apuração, catálogo e documentação de processos legais',
    exp2t2: 'Trânsito de processos entre sedes da Secretaria',
    exp2t3: 'Assistência tecnológica T1 direcionada aos funcionários da Secretaria',

    exp3Cargo: 'Assistente de TI',
    exp3t1: 'Assistência técnica T1 direcionada as lojas via acesso remoto',
    exp3t2: 'Assistência técnica via Service Desk aos funcionários da empresa ',

    tituloForm: 'Formação Acadêmica',
    form1: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',

    tituloHab: 'Habilidades',

    tituloProj: 'Projetos',
    proj1: 'Portfólio Pessoal',
    proj1Desc: 'Site responsivo criado com HTML, CSS e JavaScript.',
    verGit: 'Ver no Github →',

    direitos: 'Gustavo Souza. Todos os direitos reservados.',
    pdf: 'assets/Curriculo-pt.pdf'
  },

  en: {
    baixar: 'Download Resume',
    cargo: 'Software Analysis and Development Academic',
    abaSobre: 'About',
    abaExp: 'Experience',
    abaForm: 'Education',
    abaHab: 'Skills',
    abaProj: 'Projects',

    tituloSobre: 'About me',
    textoSobre:
      'Hello! I am a technology-driven student with hands-on experience in hardware and software support. I am currently sharpening my programming and app development skills, always eager to adapt, learn, and improve the way I work.',

    tituloExp: 'Professional Experience',
    exp1Cargo: 'Tax Assistant',
    exp1t1: 'Control of tax documents',
    exp1t2: 'TOTVS-RM Nucleus system operation',
    exp1t3: 'Monitoring of requests for the acquisition of supplies',

    exp2Cargo: 'Administrative Intern',
    exp2t1: 'Compilation, Cataloguing and documentation of legal proceedings',
    exp2t2: 'Transfer of proceedings between branches of the Secretariat',
    exp2t3: 'Tier 1 Technical support for Secretariat staff',

    exp3Cargo: 'IT Assistant',
    exp3t1: 'Tier 1 technical support for stores via remote access',
    exp3t2: 'Technical support via Service Desk for company staff',

    tituloForm: 'Education',
    form1: 'Associate Degree in System Analysis and Development',

    tituloHab: 'Skills',

    tituloProj: 'Projects',
    proj1: 'Personal Portfolio',
    proj1Desc: 'Responsive website built with HTML, CSS and JavaScript.',
    verGit: 'View on GitHub →',

    direitos: 'Gustavo Souza. All rights reserved.',
    pdf: 'assets/Resume-en.pdf'
  }
};

const botoesIdioma = document.querySelectorAll('.btn-idioma');
const btnDownload = document.getElementById('btnDownload');

function aplicarIdioma(idioma) {
  const t = traducoes[idioma];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const chave = el.dataset.i18n;
    if (t[chave]) el.textContent = t[chave];
  });

  const textoBtn = btnDownload.querySelector('[data-i18n="baixar"]');
  if (textoBtn) textoBtn.textContent = t.baixar;
  btnDownload.setAttribute('href', t.pdf);
  btnDownload.setAttribute('download', t.pdf);

  botoesIdioma.forEach(b => {
    b.classList.toggle('ativo', b.dataset.idioma === idioma);
  });

  document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : 'en';


  localStorage.setItem('idioma', idioma);
}

botoesIdioma.forEach(botao => {
  botao.addEventListener('click', () => {
    aplicarIdioma(botao.dataset.idioma);
  });
});

const idiomaSalvo = localStorage.getItem('idioma') || 'pt';
aplicarIdioma(idiomaSalvo);

document.addEventListener('DOMContentLoaded', () => {
  const foto = document.getElementById('fotoPerfil');
  const fallback = document.getElementById('avatarFallback');

  if (!foto || !fallback) return;

  foto.addEventListener('error', () => {
    foto.style.display = 'none';
    fallback.classList.add('ativo');
  });

  if (foto.complete && foto.naturalWidth === 0) {
    foto.style.display = 'none';
    fallback.classList.add('ativo');
  }
});