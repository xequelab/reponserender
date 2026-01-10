# Response Renderer - Documentação Técnica

## Visão Geral

Componente WeWeb desenvolvido para renderizar respostas de formulários dinâmicos armazenadas em JSON no Supabase.

## Arquitetura

### Estrutura de Arquivos

```
ww-responseRender/
├── src/
│   ├── wwElement.vue          # Componente principal
│   └── components/
│       └── FieldItem.vue      # Sub-componente para cada campo
├── ww-config.js               # Configuração do componente
├── package.json               # Metadados do pacote
├── README.md                  # Documentação do usuário
└── CLAUDE.md                  # Documentação técnica (este arquivo)
```

## Componentes

### 1. wwElement.vue (Componente Principal)

**Responsabilidades:**
- Receber e parsear dados da resposta
- Extrair campos de `dados.campos`
- Formatar data de criação
- Renderizar header com data
- Iterar e renderizar `FieldItem` para cada campo
- Gerenciar estilos do container

**Props:**
- `content` (Object, required): Propriedades configuráveis do WeWeb
- `uid` (String, required): ID único do componente
- `wwEditorState` (Object, required): Estado do editor WeWeb

**Computed Properties:**

```javascript
responseData // Parse do JSON de entrada (string ou object)
fields       // Array de campos extraído de dados.campos
hasFields    // Boolean indicando se há campos para exibir
formattedDate // Data formatada segundo configuração
containerStyle // Estilos CSS do container
headerStyle   // Estilos CSS do header
fieldsContainerStyle // Estilos CSS do container de campos
```

**Formatação de Data:**

Suporta 3 formatos:
- `full`: DD/MM/YYYY HH:mm
- `date`: DD/MM/YYYY
- `relative`: "X horas atrás", "Agora", etc.

**Função getRelativeTime():**

Calcula tempo relativo baseado em:
- < 1 min: "Agora"
- < 60 min: "X minutos atrás"
- < 24h: "X horas atrás"
- < 7 dias: "X dias atrás"
- > 7 dias: DD/MM/YYYY

### 2. FieldItem.vue (Sub-componente)

**Responsabilidades:**
- Renderizar um único campo
- Exibir label e valor
- Aplicar estilos baseados no layout
- Mostrar divisor (se aplicável)
- Detectar valores vazios

**Props:**
- `field` (Object, required): Objeto do campo com `key`, `label`, `valor`, `tipo`
- `layout` (String): Tipo de layout (card/list/compact)
- `showDivider` (Boolean): Mostrar linha divisória
- Estilos (cores, fontes, etc.)

**Computed Properties:**

```javascript
isEmpty       // Se valor está vazio/null/undefined
displayValue  // Valor a exibir (real ou texto de vazio)
fieldStyle    // Estilos CSS do campo
labelStyle    // Estilos CSS do label
valueStyle    // Estilos CSS do valor
dividerStyle  // Estilos CSS do divisor
```

**Lógica de Valores Vazios:**

Um campo é considerado vazio se:
- `valor === null`
- `valor === undefined`
- `valor === ''` (string vazia)

Quando vazio:
- Exibe texto configurável (default: "Sem resposta")
- Aplica cor diferente (`emptyValueColor`)
- Aplica estilo itálico

## Configuração (ww-config.js)

### Estrutura

```javascript
export default {
  editor: {
    label: { en: '...', pt: '...' },
    icon: 'file-text'
  },
  properties: {
    // Propriedades configuráveis
  }
}
```

### Propriedades

#### Categoria: Data Input

- `responseData`: Binding principal (objeto da resposta)

#### Categoria: Display Settings

- `showCreatedDate`: Exibir data
- `dateFormat`: Formato da data
- `emptyValueText`: Texto para campos vazios
- `layout`: Estilo de layout (card/list/compact)

#### Categoria: Style

**Container:**
- Padding, background, border radius, border color, border width

**Header:**
- Background, text color, padding, font size

**Fields:**
- Gap, label (color, size, weight), value (color, size)
- Empty value color
- Field background, padding, border radius

**Divider (apenas list):**
- Show divider, divider color

### Propriedades Responsivas

As seguintes propriedades suportam valores diferentes por breakpoint:
- `containerPadding`
- `headerFontSize`
- `fieldGap`
- `labelFontSize`
- `valueFontSize`

## Layouts

### Card Layout
```scss
.layout-card {
  // Cada campo em um box com fundo
  // Border sutil
  // Hover effect (translateY + shadow)
  // Gap padrão entre campos
}
```

### List Layout
```scss
.layout-list {
  // Campos sem fundo
  // Divisor horizontal entre campos
  // Gap zero (divisor fornece separação)
  // Padding vertical em cada campo
}
```

### Compact Layout
```scss
.layout-compact {
  // Similar ao card mas com:
  // Gap reduzido (50% do padrão)
  // Fontes ligeiramente menores (0.95em)
  // Padding menor
}
```

## Responsividade

### Breakpoints

1. **Desktop** (> 768px)
   - Layout completo
   - Tamanhos padrão

2. **Tablet** (481px - 768px)
   - Header: font-size 13px, padding 12px 16px
   - Labels: 13px
   - Values: 14px
   - Gap reduzido: 5px

3. **Mobile** (≤ 480px)
   - Container padding: 16px
   - Header: 12px, padding 10px 14px
   - Labels: 12px
   - Values: 13px
   - Field padding reduzido
   - Gap: 4px

### Técnicas Utilizadas

- Media queries CSS
- Propriedades responsivas do WeWeb
- Unidades relativas (em) em alguns casos
- `!important` para sobrescrever em breakpoints menores

## Fluxo de Dados

```
1. WeWeb Collection (Supabase)
   ↓
2. Binding em responseData
   ↓
3. Parse em wwElement.vue (responseData computed)
   ↓
4. Extração de campos (fields computed)
   ↓
5. Iteração v-for
   ↓
6. FieldItem para cada campo
   ↓
7. Renderização final
```

## Tratamento de Erros

### Parse de JSON

```javascript
try {
  if (typeof data === 'string') {
    return JSON.parse(data);
  }
  return data;
} catch (error) {
  console.error('Error parsing response data:', error);
  return null;
}
```

### Validação de Estrutura

```javascript
const dados = responseData.value?.dados;
if (!dados) return [];

const campos = dados.campos;
if (!Array.isArray(campos)) return [];
```

### Formatação de Data

```javascript
try {
  const date = new Date(dateStr);
  // Formatação...
} catch (error) {
  console.error('Error formatting date:', error);
  return null;
}
```

## Estilos CSS

### Metodologia

- **Scoped styles**: Todos os estilos são scoped para evitar conflitos
- **BEM-like naming**: Classes descritivas (`.field-label`, `.field-value`)
- **CSS Variables**: Uso de `--field-gap` para consistência
- **Transitions**: Animações suaves (0.2s ease)

### Box Model

```scss
// Container
display: flex;
flex-direction: column;
overflow: hidden; // Previne overflow de border-radius

// Fields Container
display: flex;
flex-direction: column;
gap: var(--field-gap);

// Field Item
display: flex;
flex-direction: column;
```

### Efeitos Visuais

**Sombra do Container:**
```scss
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
```

**Hover em Cards:**
```scss
transform: translateY(-1px);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
```

**Border Radius Inteligente:**
```scss
// Header assume border-radius do container mas remove cantos inferiores
border-radius: inherit;
border-bottom-left-radius: 0;
border-bottom-right-radius: 0;
```

## Estado Vazio

Quando não há campos para exibir:

```html
<div class="no-data">
  <span class="no-data-icon">📝</span>
  <p class="no-data-text">Nenhum dado disponível</p>
</div>
```

Estilizado com:
- Flexbox centralizado
- Padding generoso (48px 24px)
- Ícone grande (48px)
- Opacidade reduzida (0.6)

## Acessibilidade

### Semântica HTML

- `<label>` para labels de campos
- `<div>` para valores (não inputs, pois é read-only)
- Hierarquia clara de elementos

### Legibilidade

- Contraste adequado de cores
- Line-height confortável (1.4-1.5)
- Word-wrap para textos longos
- White-space: pre-wrap (preserva quebras de linha)

## Performance

### Otimizações

1. **Computed Properties**: Cálculos reativos cacheados
2. **v-for com :key**: Renderização otimizada
3. **Scoped Styles**: CSS isolado e otimizado
4. **Sem Watchers**: Apenas computed (mais performático)

### Renderização

- Todos os campos são renderizados uma vez
- Não há re-renderizações desnecessárias
- Estilos inline calculados apenas quando props mudam

## Extensibilidade

### Adicionar Novo Layout

1. Adicionar opção em `ww-config.js`:
```javascript
layout: {
  options: {
    choices: [
      // ...existentes
      { value: 'novo', title: 'Novo', icon: 'icon-name' }
    ]
  }
}
```

2. Adicionar estilos em `FieldItem.vue`:
```scss
&.layout-novo {
  // Estilos específicos
}
```

### Adicionar Formatação por Tipo

No `FieldItem.vue`, modificar `displayValue`:

```javascript
const displayValue = computed(() => {
  if (isEmpty.value) return props.emptyValueText;

  const valor = props.field.valor;
  const tipo = props.field.tipo;

  switch(tipo) {
    case 'phone':
      return formatPhone(valor);
    case 'email':
      return formatEmail(valor);
    // ...
    default:
      return valor;
  }
});
```

### Adicionar Eventos

1. Adicionar em `ww-config.js`:
```javascript
triggerEvents: [
  {
    name: 'fieldClick',
    label: { en: 'On field click' },
    event: { fieldKey: '', fieldValue: '' }
  }
]
```

2. No `FieldItem.vue`:
```javascript
emits: ['trigger-event'],

const handleClick = () => {
  emit('trigger-event', {
    name: 'fieldClick',
    event: {
      fieldKey: props.field.key,
      fieldValue: props.field.valor
    }
  });
};
```

## Boas Práticas Aplicadas

1. ✅ Componentes pequenos e focados
2. ✅ Separação de responsabilidades
3. ✅ Computed properties para lógica reativa
4. ✅ Props validadas com tipos
5. ✅ Estilos scoped
6. ✅ Código defensivo (try-catch, validações)
7. ✅ Comentários descritivos
8. ✅ Responsividade mobile-first
9. ✅ Acessibilidade básica
10. ✅ Nomenclatura clara e consistente

## Limitações Conhecidas

1. **Sem Edição**: Componente é read-only
2. **Formatação Genérica**: Todos os tipos são exibidos como texto simples
3. **Ordenação Fixa**: Campos aparecem na ordem do array
4. **Sem Filtros**: Não há como filtrar/buscar campos
5. **Sem Paginação**: Todos os campos são exibidos de uma vez

## Melhorias Futuras

1. **Formatação por Tipo**: Máscaras para telefone, link clicável para email
2. **Copy to Clipboard**: Botão para copiar valores
3. **Ações**: Editar, excluir, exportar
4. **Busca**: Campo de busca para filtrar campos
5. **Agrupamento**: Agrupar campos por categoria
6. **Validação Visual**: Indicador se campo foi validado
7. **Comparação**: Modo para comparar duas respostas lado a lado
8. **Export**: Botão para exportar como PDF ou JSON
9. **Impressão**: Estilo otimizado para impressão
10. **Animações**: Entrada suave dos campos

## Troubleshooting

### Componente não aparece

- Verifique se `ww-config.js` está na raiz
- Verifique se `src/wwElement.vue` existe
- Console do WeWeb para erros de importação

### Dados não aparecem

- Verifique binding de `responseData`
- Console do navegador: `console.log(responseData.value)`
- Verifique estrutura: `dados.campos` deve ser array

### Estilos não aplicam

- Verifique se propriedades estão bindadas
- Inspecione elemento para ver estilos computados
- Verifique ordem de especificidade CSS

### Data não formata

- Verifique formato ISO 8601 em `criado_em`
- Teste com: `new Date(criado_em)`
- Verifique locale do navegador

## Contato / Suporte

Para dúvidas ou melhorias, consulte o README.md ou abra uma issue no repositório.
