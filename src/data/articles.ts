export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export const articles: Article[] = [
  {
    id: "isencao-ir-cancer",
    title: "Como solicitar isenção de IR para Câncer",
    excerpt: "Entenda o passo a passo e os documentos médicos necessários para garantir seu direito à isenção.",
    content: `
      <h2>O que é a isenção de Imposto de Renda para portadores de câncer?</h2>
      <p>A Lei nº 7.713/88 garante aos portadores de neoplasia maligna (câncer) o direito à isenção do Imposto de Renda sobre os rendimentos relativos a aposentadoria, pensão ou reforma.</p>
      
      <h2>Quais são os requisitos?</h2>
      <ul>
        <li>Ser aposentado, pensionista ou militar reformado.</li>
        <li>Possuir laudo médico oficial comprovando a doença.</li>
      </ul>

      <h2>Passo a passo para solicitar</h2>
      <p>1. Obtenha um laudo médico pericial emitido por um serviço médico oficial (União, Estados, DF ou Municípios).</p>
      <p>2. Acesse o portal Meu INSS ou o órgão pagador da sua aposentadoria/pensão.</p>
      <p>3. Preencha o requerimento de isenção e anexe os documentos.</p>
      <p>4. Aguarde a análise. Em caso de negativa, é possível recorrer judicialmente.</p>
    `,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    date: "15 Mar 2026",
    readTime: "5 min",
    category: "Isenção"
  },
  {
    id: "restituicao-retroativa",
    title: "Restituição retroativa: recupere até 5 anos",
    excerpt: "Descubra como é possível recuperar os valores pagos indevidamente nos últimos 5 anos.",
    content: `
      <h2>O que é a restituição retroativa?</h2>
      <p>Muitos contribuintes que adquirem o direito à isenção do Imposto de Renda por doença grave não sabem que podem recuperar os valores descontados indevidamente desde a data do diagnóstico da doença, limitados aos últimos 5 anos.</p>
      
      <h2>Como funciona?</h2>
      <p>Se o laudo médico atestar que a doença iniciou em uma data anterior ao pedido de isenção, você tem o direito de solicitar a restituição do imposto pago desde aquela data.</p>

      <h2>Como solicitar a restituição?</h2>
      <p>Após ter a isenção reconhecida, você deve retificar as declarações de Imposto de Renda dos anos anteriores (até 5 anos) ou ingressar com uma ação judicial para reaver os valores com correção monetária (taxa Selic).</p>
    `,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    date: "10 Mar 2026",
    readTime: "4 min",
    category: "Restituição"
  },
  {
    id: "aposentados-pensionistas",
    title: "Aposentados e Pensionistas: Direitos e Deveres",
    excerpt: "Um guia completo sobre os direitos tributários de aposentados e pensionistas do INSS.",
    content: `
      <h2>Direitos Tributários</h2>
      <p>Aposentados e pensionistas possuem direitos específicos em relação ao Imposto de Renda, especialmente a partir dos 65 anos de idade, quando passam a ter uma parcela extra de isenção.</p>
      
      <h2>Isenção por Doença Grave</h2>
      <p>Além da isenção por idade, caso o aposentado ou pensionista seja acometido por uma das doenças graves listadas na Lei 7.713/88, ele passa a ter isenção total sobre esses rendimentos.</p>

      <h2>Deveres</h2>
      <p>Apesar das isenções, é fundamental continuar entregando a Declaração de Ajuste Anual do Imposto de Renda caso se enquadre nas regras de obrigatoriedade da Receita Federal, informando os rendimentos isentos e não tributáveis.</p>
    `,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    date: "05 Mar 2026",
    readTime: "6 min",
    category: "Direitos"
  },
  {
    id: "doencas-graves-lista",
    title: "Lista completa de doenças graves que dão isenção",
    excerpt: "Conheça todas as doenças previstas em lei que garantem a isenção do Imposto de Renda.",
    content: `
      <h2>Doenças previstas na Lei 7.713/88</h2>
      <p>A lei estabelece um rol taxativo de doenças que garantem o direito à isenção. Algumas delas incluem:</p>
      <ul>
        <li>Câncer (Neoplasia Maligna)</li>
        <li>Cardiopatia Grave</li>
        <li>Doença de Parkinson</li>
        <li>Esclerose Múltipla</li>
        <li>Alienação Mental</li>
        <li>Cegueira (inclusive monocular)</li>
        <li>Hepatopatia Grave</li>
      </ul>
      <p>Para ter direito, é necessário comprovação por laudo médico oficial.</p>
    `,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
    date: "01 Mar 2026",
    readTime: "3 min",
    category: "Isenção"
  },
  {
    id: "isencao-ir-parkinson",
    title: "Isenção de IR para Parkinson: como funciona na prática?",
    excerpt: "Entenda os critérios específicos para portadores de Parkinson e como garantir o benefício retroativo.",
    content: `
      <h2>O direito à isenção para portadores de Parkinson</h2>
      <p>A Doença de Parkinson é uma das patologias expressamente listadas na Lei 7.713/88 como garantidora da isenção do Imposto de Renda sobre aposentadoria e pensão.</p>
      
      <h2>Critérios de Avaliação</h2>
      <p>Diferente de outras doenças, o Parkinson é progressivo. No entanto, a lei não exige que o paciente esteja em estágio avançado ou incapacitante para ter direito à isenção; o diagnóstico por si só já é suficiente.</p>

      <h2>Documentação Necessária</h2>
      <p>É fundamental apresentar um laudo médico detalhado, preferencialmente de um neurologista, indicando o CID da doença e a data em que os sintomas ou o diagnóstico foram estabelecidos.</p>
    `,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    date: "28 Fev 2026",
    readTime: "5 min",
    category: "Isenção"
  },
  {
    id: "isencao-ir-cardiopatia",
    title: "Isenção de IR para Cardiopatia Grave: o que você precisa saber",
    excerpt: "A cardiopatia grave é uma das doenças que mais geram dúvidas. Veja o que o laudo médico deve conter.",
    content: `
      <h2>O que caracteriza a Cardiopatia Grave?</h2>
      <p>Para fins de isenção de IR, a cardiopatia grave não é uma doença única, mas um conjunto de condições que reduzem a capacidade funcional do coração.</p>
      
      <h2>Exemplos de Condições</h2>
      <ul>
        <li>Insuficiência cardíaca grave</li>
        <li>Arritmias complexas</li>
        <li>Pós-operatório de cirurgias cardíacas complexas</li>
      </ul>

      <h2>A importância do Laudo</h2>
      <p>O laudo deve ser emitido por cardiologista e deve descrever a limitação funcional, utilizando preferencialmente a classificação da NYHA (New York Heart Association).</p>
    `,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
    date: "25 Fev 2026",
    readTime: "6 min",
    category: "Isenção"
  },
  {
    id: "como-declarar-isento",
    title: "Como declarar no IR sendo isento por doença grave",
    excerpt: "O passo a passo para preencher sua declaração anual sem erros e evitar a malha fina.",
    content: `
      <h2>Onde informar os rendimentos isentos?</h2>
      <p>Mesmo sendo isento, você deve informar os valores recebidos na ficha de 'Rendimentos Isentos e Não Tributáveis', sob o código específico para moléstia grave.</p>
      
      <h2>E os valores retroativos?</h2>
      <p>Valores recebidos acumuladamente (RRA) de anos anteriores devem ser informados em ficha própria, observando a tributação exclusiva na fonte ou o ajuste anual conforme o caso.</p>

      <h2>Documentação de Suporte</h2>
      <p>Mantenha sempre guardado o laudo oficial e a decisão administrativa/judicial que concedeu a isenção, pois a Receita Federal pode solicitar a comprovação em até 5 anos.</p>
    `,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    date: "20 Fev 2026",
    readTime: "7 min",
    category: "Guia"
  }
];
