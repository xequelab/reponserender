# Response Renderer - WeWeb Component

Componente WeWeb para renderizar respostas de formulários armazenadas em formato JSON.

## 📋 Descrição

Este componente foi desenvolvido para exibir de forma clara e responsiva as respostas de formulários dinâmicos armazenados no Supabase. Ele renderiza automaticamente todos os campos do formulário, independentemente da quantidade ou tipo, com três layouts diferentes para melhor UX.

## 🎯 Características

- **Totalmente Responsivo**: Otimizado para mobile-first com breakpoints para tablet e desktop
- **3 Layouts Diferentes**: Card, List e Compact
- **Customizável**: Cores, espaçamentos, fontes e mais
- **Formatação de Data**: Suporta 3 formatos (completo, apenas data, relativo)
- **Campos Vazios**: Exibe texto configurável para campos sem resposta
- **Design Limpo**: Interface minimalista focada em legibilidade

## 📦 Estrutura de Dados

O componente espera receber dados no seguinte formato:

```json
{
  "id": "c6bcfe08-1ca8-458a-a464-207fb6b1ee80",
  "criado_em": "2026-01-09T21:25:05.772514+00:00",
  "formulario_id": "00000000-0000-0000-0000-000000000001",
  "servico_id": "acb26291-8894-4a61-90ef-2f5ea4412bae",
  "dados": {
    "campos": [
      {
        "key": "seu_nome",
        "tipo": "text",
        "label": "Seu Nome",
        "valor": "Cliente"
      },
      {
        "key": "email",
        "tipo": "email",
        "label": "E-mail",
        "valor": "cliente@example.com"
      }
    ]
  }
}
```

## 🚀 Como Usar

### 1. Instalação no WeWeb

1. Clone ou baixe este repositório
2. No WeWeb, vá em **Extensions** > **Custom Components**
3. Clique em **Add Component** e selecione a pasta do componente

### 2. Configuração

1. Adicione o componente **Response Renderer** à sua página
2. No painel de propriedades, faça o binding do campo **Response Data**:
   - Conecte à sua collection do Supabase (tabela `respostas_formularios`)
   - Faça binding do item atual: `item`

### 3. Exemplo de Binding

```
Response Data: {{item}}
```

O componente automaticamente extrairá `dados.campos` e renderizará todos os campos.

## 🎨 Layouts Disponíveis

### Card (Padrão)
- Cada campo em um card com fundo
- Melhor para formulários com poucos campos
- Visual mais destacado

### List
- Campos em lista simples com divisores
- Melhor para formulários com muitos campos
- Visual mais compacto

### Compact
- Layout ainda mais compacto
- Ideal para espaços limitados
- Menor espaçamento entre campos

## ⚙️ Propriedades Principais

### Dados
- **Response Data**: Objeto com os dados da resposta (binding obrigatório)

### Display
- **Show Created Date**: Exibir data de criação (padrão: true)
- **Date Format**: Formato da data (full/date/relative)
- **Empty Value Text**: Texto para campos vazios (padrão: "Sem resposta")
- **Layout Style**: Estilo do layout (card/list/compact)

### Estilo - Container
- **Container Padding**: Espaçamento interno (padrão: 24px)
- **Container Background**: Cor de fundo (padrão: #ffffff)
- **Container Border Radius**: Arredondamento (padrão: 8px)
- **Container Border Color**: Cor da borda (padrão: #e0e0e0)

### Estilo - Cabeçalho
- **Header Background**: Fundo do cabeçalho (padrão: #081B4E)
- **Header Text Color**: Cor do texto (padrão: #ffffff)
- **Header Font Size**: Tamanho da fonte (padrão: 14px)

### Estilo - Campos
- **Field Gap**: Espaçamento entre campos (padrão: 16px)
- **Label Color**: Cor do label (padrão: #081B4E)
- **Label Font Size**: Tamanho da fonte do label (padrão: 14px)
- **Label Font Weight**: Peso da fonte (padrão: 600)
- **Value Color**: Cor do valor (padrão: #333333)
- **Value Font Size**: Tamanho da fonte do valor (padrão: 15px)
- **Empty Value Color**: Cor para valores vazios (padrão: #999999)
- **Field Background**: Fundo dos campos (padrão: #f8f9fa)
- **Field Padding**: Padding dos campos (padrão: 12px 16px)
- **Field Border Radius**: Arredondamento dos campos (padrão: 6px)

### Estilo - Divisor (apenas layout List)
- **Show Divider**: Mostrar divisor entre campos (padrão: true)
- **Divider Color**: Cor do divisor (padrão: #e0e0e0)

## 📱 Responsividade

O componente possui 3 breakpoints:

- **Desktop** (> 768px): Layout completo
- **Tablet** (481px - 768px): Fontes e espaçamentos reduzidos
- **Mobile** (≤ 480px): Layout otimizado para mobile com menor padding

## 🎯 Casos de Uso

1. **Dashboard de Respostas**: Exibir respostas de formulários em uma lista
2. **Detalhes de Resposta**: Página dedicada para visualizar uma resposta específica
3. **Modal de Visualização**: Popup para ver rapidamente uma resposta
4. **Impressão**: Layout limpo ideal para impressão ou PDF

## 🔧 Customização Avançada

### Cores do Tema

Para usar as cores do seu app (#081B4E e branco):

```
Header Background: #081B4E
Header Text Color: #ffffff
Label Color: #081B4E
Container Background: #ffffff
```

### Layout Responsivo

Todos os campos numéricos (padding, font-size, etc) são responsivos. Configure valores diferentes para cada breakpoint:

1. Clique no ícone de responsividade ao lado da propriedade
2. Configure valores para Mobile, Tablet e Desktop

## 📝 Notas Importantes

- O componente é **read-only** (apenas visualização)
- Campos são renderizados na ordem que aparecem no array `campos`
- Campos com `valor` vazio, null ou undefined mostram o texto configurado em "Empty Value Text"
- O componente suporta qualquer quantidade de campos (dinâmico)
- Tipos de campo (`tipo`) não afetam a renderização (todos são exibidos como texto)

## 🐛 Troubleshooting

### Componente não mostra dados

Verifique se:
1. O binding de `Response Data` está correto
2. O objeto possui a estrutura `dados.campos`
3. `campos` é um array válido

### Data não aparece

Verifique se:
1. `Show Created Date` está ativado
2. O campo `criado_em` existe no objeto
3. O formato de data está correto (ISO 8601)

### Campos não aparecem

Verifique se:
1. Array `campos` contém objetos válidos
2. Cada campo possui pelo menos `key` ou `label`
3. Console do navegador para erros de parsing

## 📄 Licença

MIT

## 🤝 Contribuições

Sinta-se à vontade para reportar issues ou sugerir melhorias!
