/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MaterialItem, Testimonial, FAQItem, PlanOption } from './types.ts';

export const MATERIALS_LIST: MaterialItem[] = [
  {
    id: 'm1',
    name: 'Cartazes de Vocabulário do Dia a Dia',
    category: 'Vocabulário',
    tag: 'VOCABULARY FLOW',
    description: 'Flashcards de alto contraste em alta resolução com ilustrações modernas de rotina, objetos da escola e verbos principais. Ideal para memorização imediata.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#ffebe6] text-[#ff6f61] border-[#ffb3a3]'
  },
  {
    id: 'm2',
    name: 'Calendário Escolar e Rotina Diária',
    category: 'Rotina',
    tag: 'DAILY SCHEDULE',
    description: 'Mural interativo completo com dias da semana, meses, estações e termômetro do clima para criar rituais matinais eficientes na língua inglesa.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#eafaf1] text-[#10b981] border-[#a3e9c4]'
  },
  {
    id: 'm3',
    name: 'Mural de Cores & Números Ilustrados',
    category: 'Fundamentos',
    tag: 'COLORS & NUMBERS',
    description: 'Painel visual brilhante com contagem de 1 a 20 e arco-íris de tonalidades com escrita por extenso, excelente para guiar referências de escrita rápidas.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#efecff] text-[#5c3beb] border-[#cbc1ff]'
  },
  {
    id: 'm4',
    name: 'Placas de Greetings e Frases de Apoio',
    category: 'Comunicação',
    tag: 'CLASSROOM ENGLISH',
    description: 'Cartazes de expressões de sobrevivência como "May I drink water?", "Please" e "Thank you" para estimular os alunos a falarem apenas em inglês de forma espontânea.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#fff5e6] text-[#ffbe2b] border-[#ffe2a3]'
  },
  {
    id: 'm5',
    name: 'Mural Decorativo "Welcome to English Class"',
    category: 'Decoração',
    tag: 'WELCOME BANNER',
    description: 'Peças gigantes em letreiros coloridos e geométricos para entrada ou parede focal da sala. Cria aquele impacto acolhedor imediato nos alunos e pais.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#ffdff2] text-[#e040ad] border-[#ffafd8]'
  },
  {
    id: 'm6',
    name: 'Livro de Memórias de Fim de Ano',
    category: 'Lembrança',
    tag: 'MEMORIES BOOK',
    description: 'Edição especial tanto em inglês quanto espanhol para os alunos registrarem seus momentos marcantes, autógrafos de colegas e amizades.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#e7f3ff] text-[#0070f3] border-[#afd4ff]'
  },
  {
    id: 'm7',
    name: 'Livro de Colorir Bilíngue Premium',
    category: 'Atividades',
    tag: 'COLORING EDITION',
    description: 'Encartes divertidos associando palavras, ilustrações amigáveis e cenários lúdicos de vocabulário básico. Perfeito para preencher tempos livres de forma produtiva.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#eafcf9] text-[#0dbc9b] border-[#aeefe3]'
  },
  {
    id: 'm8',
    name: 'Caderno de Traçado de Letras Avançado',
    category: 'Alfabetização',
    tag: 'PHONICS & TRACING',
    description: 'Fichas metodológicas com traçado de letras de A a Z integradas a fonemas iniciais em inglês. Auxilia na coordenação motora e letramento de forma natural.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#fff0f5] text-[#db7093] border-[#ffc0cb]'
  },
  {
    id: 'm9',
    name: 'Controle de Frequência "How many are we today?"',
    category: 'Gestão',
    tag: 'ATTENDANCE CHART',
    description: 'Quadro editável com marcadores de presença para os próprios alunos manipularem, engajando responsabilidade e contagem numérica.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#f4f6f8] text-[#4a5568] border-[#cbd5e0]'
  },
  {
    id: 'm10',
    name: 'Sinalizadores de Cartões de Horário Visual',
    category: 'Gestão',
    tag: 'VISUAL CHRONOLOGY',
    description: 'Cartões ilustrados que mostram sequencialmente o que vai acontecer na aula (Listening, Reading, Game, Goodbye) reduzindo a ansiedade infantil.',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#f3eafb] text-[#8e44ad] border-[#d8bbf0]'
  },
  {
    id: 'm11',
    name: 'Marcadores de Livro e Ficha de Leitura',
    category: 'Leitura',
    tag: 'READING TRACKER',
    description: 'Incentivos visuais recortáveis para marcar as leituras do mês e fichas ilustradas simplificadas para resenhas de estorinhas infantis em inglês.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#fffae6] text-[#d4ac0d] border-[#f9e79f]'
  },
  {
    id: 'm12',
    name: 'Cartões de Sequenciamento de Histórias',
    category: 'Pedagógico',
    tag: 'LOGIC & STORYTELLING',
    description: 'Conjunto de flashcards ordenáveis para os alunos reconstruírem narrativas simples em inglês, estimulando conectores lógicos temporais.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#ffe8e8] text-[#c0392b] border-[#f5b7b1]'
  },
  {
    id: 'm13',
    name: 'Cartazes Visuais de Segurança e Alergias',
    category: 'Segurança',
    tag: 'SAFETY CARDS',
    description: 'Placas protetivas e avisos informativos com ícones intuitivos para identificar cuidados em sala de aula, alergias e contatos de emergência de forma amigável.',
    image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&auto=format&fit=crop&q=80',
    colorTheme: 'bg-[#f0f3f4] text-[#7f8c8d] border-[#bdc3c7]'
  }
];

export const TESTIMONIALS_LIST: Testimonial[] = [
  {
    id: 't1',
    author: 'Teacher Amanda Rezende',
    role: 'Educadora Infantil • São Paulo - SP',
    text: 'Eu gastava domingos inteiros procurando ilustrações fofas no Canva e tentando combinar fontes. Com o Pack Aula Mágica, eu só fiz baixar, levei na gráfica rápida e minha sala parece uma escola internacional! Os alunos comentam até hoje!',
    rating: 5,
    avatarText: 'AR',
    badge: 'Compradora Verificada'
  },
  {
    id: 't2',
    author: 'Professora Letícia Albuquerque',
    role: 'Bilingual Educator • Curitiba - PR',
    text: 'O que mais me encantou foram os cartões de rotina diária (Visual Schedule). Os alunos agora já sabem o que esperar e ficam muito mais tranquilos. É um material pedagógico de verdade, feito por quem entende de sala de aula!',
    rating: 5,
    avatarText: 'LA',
    badge: 'Super recomendo! ⭐'
  },
  {
    id: 't3',
    author: 'Teacher Carla Souza Reis',
    role: 'Ensino Fundamental • Salvador - BA',
    text: 'Custo-benefício inacreditável. Por apenas R$ 27,90 eu recebi um tesouro de arquivos. O livro de memórias bilíngue de fim de ano é uma delicadeza sem tamanho. Valeu cada centavo!',
    rating: 5,
    avatarText: 'CR',
    badge: 'Acesso imediato no WhatsApp'
  },
  {
    id: 't4',
    author: 'Teacher Patrícia Mendes',
    role: 'Professora Particular • Niterói - RJ',
    text: 'Eu levo os cartazes impressos nas minhas aulas particulares e as crianças adoram manusear. Visual incrível, cores vivas e o conteúdo em Inglês e Espanhol é de extrema utilidade. Parabéns pelo capricho!',
    rating: 5,
    avatarText: 'PM',
    badge: 'Cliente Wiapy'
  },
  {
    id: 't5',
    author: 'Prof. Marina G. Fontes',
    role: 'Escola de Idiomas • Porto Alegre - RS',
    text: 'Comprei o Plano Premium com todos os materiais. O traçado de letras com fonética ajudou muito o meu centro de alfabetização bilíngue. Prático, limpo, de altíssima qualidade estética.',
    rating: 5,
    avatarText: 'MF',
    badge: 'Uso Prático Diário'
  }
];

export const FAQS_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'O material é físico ou digital?',
    answer: 'O material é 100% digital. Você recebe os arquivos digitais de altíssima definição em formato PDF prontos para baixar, imprimir em casa ou na gráfica rápida e começar a usar.'
  },
  {
    id: 'faq-2',
    question: 'Preciso editar alguma coisa?',
    answer: 'Não. Todos os arquivos já foram editados, revisados e formatados por designers e pedagogos. Eles estão 100% prontos para imprimir, recortar, plastificar (se preferir) e decorar.'
  },
  {
    id: 'faq-3',
    question: 'Para qual faixa etária é indicado?',
    answer: 'O Pack Aula Mágica foi pensado especialmente para professoras de inglês que atendem a Educação Infantil (Maternal ao Jardim) e o Ensino Fundamental I (1º ao 5º ano). Os materiais possuem cores chamativas e fonemas de fácil absorção.'
  },
  {
    id: 'faq-4',
    question: 'Como recebo os arquivos após a compra?',
    answer: 'Imediatamente após a confirmação do pagamento, você recebe as orientações e o link direto para download tanto pelo WhatsApp (para maior agilidade no celular) quanto no e-mail cadastrado.'
  },
  {
    id: 'faq-5',
    question: 'Posso pagar parcelado ou no pix?',
    answer: 'Sim! Aceitamos pagamento instantâneo via Pix (liberação em 10 segundos) ou no cartão de crédito em até 3x para o Plano Básico e 6x para o Plano Premium através da plataforma segura Wiapy.'
  },
  {
    id: 'faq-6',
    question: 'E se eu não gostar? Como funciona a garantia?',
    answer: 'Você tem 7 dias de garantia incondicional e total. Se você baixar, imprimir e não ficar absolutamente encantada com a qualidade, basta nos enviar um e-mail ou WhatsApp que fazemos o estorno imediato de 100% do seu dinheiro, sem burocracias ou perguntas.'
  }
];

export const PLANS_LIST: PlanOption[] = [
  {
    id: 'basic',
    name: 'PLANO BÁSICO',
    price: 17.90,
    installmentsText: 'ou 3x de R$ 6,52 no cartão',
    image: '/Plano básico.png',
    description: 'Para quem quer dar os primeiros passos na organização visual da sala de inglês sem pesar no bolso.',
    includes: [
      'Banner para Mural Imprimível em alta resolução',
      '50 Cartazes de alergias importantes para sala de aula',
      'Acesso imediato e seguro em PDF',
      'Suporte via e-mail e WhatsApp',
      'Garantia protegida de 7 dias'
    ]
  },
  {
    id: 'premium',
    name: 'PLANO PREMIUM',
    price: 27.90,
    originalPrice: 197.00,
    installmentsText: 'ou 6x de R$ 5,18 no cartão',
    savingsText: 'Você economiza R$ 169,10',
    image: '/Plano Premium.png',
    description: 'A coleção pedagógica completa! Todos os materiais reunidos em suas versões definitivas para impulsionar suas aulas por um ano inteiro.',
    includes: [
      'LIVRO DE COLORIR INGLÊS E ESPANHOL (Completo)',
      'Livro de Memórias de Fim de Ano (Inglês e Espanhol)',
      'Traçado de Letras Centro de Alfabetização',
      'Mural de avisos, decoração de porta e controle de frequência',
      'Cartões de Horário Visual para Gestão Dinâmica de Sala',
      'Bilhetes fofos de agradecimento e elogio para os pais',
      'Atividades de Sequenciamento de Palavras e Cartões Lógicos',
      'Marcadores de Livros e Registro Divertido de Leitura',
      'Banner para Mural Imprimível em alta definição',
      '50 Cartazes de alergias e cuidados em sala de aula'
    ],
    isPopular: true
  }
];
