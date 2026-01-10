# Guia de Instalação - Response Renderer

## 📦 Instalação no WeWeb

### Passo 1: Preparar o Componente

1. Certifique-se de que todos os arquivos estão na pasta `ww-responseRender`
2. A estrutura deve estar assim:
```
ww-responseRender/
├── src/
│   ├── wwElement.vue
│   └── components/
│       └── FieldItem.vue
├── ww-config.js
└── package.json
```

### Passo 2: Adicionar ao WeWeb

#### Opção A: Via Interface do WeWeb

1. Abra seu projeto no WeWeb
2. Vá para **Extensions** no menu lateral
3. Clique em **Custom Components**
4. Clique em **+ Add Component**
5. Selecione a pasta `ww-responseRender`
6. Aguarde o upload e compilação

#### Opção B: Via Git (Recomendado)

1. Commit e push desta pasta para um repositório Git
2. No WeWeb, vá em **Extensions** > **Custom Components**
3. Clique em **+ Add Component**
4. Selecione **From Git Repository**
5. Cole a URL do repositório
6. Configure branch (geralmente `main` ou `master`)

### Passo 3: Configurar Supabase Collection

1. No WeWeb, vá em **Data** > **Collections**
2. Adicione uma nova collection conectada ao Supabase
3. Configure:
   - **Table**: `respostas_formularios`
   - **Columns**: Selecione todas as colunas necessárias
   - Certifique-se de incluir: `id`, `criado_em`, `dados`

### Passo 4: Adicionar Componente à Página

1. Na página desejada, abra o **Add** menu (+)
2. Procure por **Response Renderer** na categoria de Custom Components
3. Arraste o componente para a página

### Passo 5: Configurar Binding

#### Para Lista de Respostas:

1. Adicione um **Collection List** antes
2. Configure para iterar sobre sua collection de respostas
3. Dentro do Collection List, adicione o **Response Renderer**
4. No painel de propriedades do Response Renderer:
   - **Response Data**: Bind para `{{item}}`

#### Para Resposta Individual:

1. Configure uma variável de página com os dados da resposta
2. No **Response Renderer**:
   - **Response Data**: Bind para sua variável

### Passo 6: Personalizar Estilos

No painel de propriedades, personalize:

**Cores do seu app:**
- **Header Background**: `#081B4E`
- **Header Text Color**: `#ffffff`
- **Label Color**: `#081B4E`
- **Container Background**: `#ffffff`

**Layout:**
- **Layout Style**: Escolha entre Card, List ou Compact
- **Show Created Date**: true/false

**Espaçamentos:**
- Ajuste conforme necessário para seu design

## 🎨 Exemplo Completo de Configuração

### Cenário: Lista de Respostas em uma Página

```
Página: "Respostas do Formulário"
├── Text: "Respostas Recebidas" (Título)
├── Collection List (Supabase - respostas_formularios)
│   └── Response Renderer
│       ├── Response Data: {{item}}
│       ├── Layout: card
│       ├── Show Created Date: true
│       ├── Date Format: full
│       └── (Estilos personalizados)
```

### Configuração da Collection List:

- **Collection**: Supabase - respostas_formularios
- **Order By**: criado_em (descending)
- **Limit**: 10 (ou conforme necessário)
- **Filter**: (opcional) Por formulário_id, servico_id, etc.

## 🔧 Configurações Recomendadas

### Mobile-First (Responsivo)

1. **Container Padding**:
   - Desktop: 24px
   - Tablet: 20px
   - Mobile: 16px

2. **Field Gap**:
   - Desktop: 16px
   - Tablet: 14px
   - Mobile: 12px

3. **Font Sizes** (se necessário ajustar):
   - Configure valores diferentes por breakpoint
   - Clique no ícone de responsividade ao lado da propriedade

### Paleta de Cores Sugerida

```
Header Background: #081B4E
Header Text: #ffffff
Label Color: #081B4E
Value Color: #333333
Empty Value Color: #999999
Container Background: #ffffff
Container Border: #e0e0e0
Field Background: #f8f9fa
```

## ✅ Checklist de Verificação

Após instalação, verifique:

- [ ] Componente aparece na lista de Custom Components
- [ ] Componente pode ser arrastado para a página
- [ ] Painel de propriedades mostra todas as opções
- [ ] Binding de `Response Data` funciona
- [ ] Campos são renderizados corretamente
- [ ] Data de criação aparece (se ativado)
- [ ] Campos vazios mostram "Sem resposta"
- [ ] Layout escolhido é aplicado
- [ ] Estilos customizados funcionam
- [ ] Responsividade funciona em diferentes telas

## 🐛 Troubleshooting

### Componente não aparece na lista

**Possíveis causas:**
- Estrutura de pastas incorreta
- Falta de arquivo obrigatório (ww-config.js ou wwElement.vue)
- Erro de sintaxe em algum arquivo

**Solução:**
1. Verifique a estrutura de pastas
2. Abra o console do WeWeb para ver erros
3. Re-upload do componente

### Erro: "Cannot read property 'campos' of undefined"

**Causa:**
- Binding incorreto
- Dados não têm a estrutura esperada

**Solução:**
1. Verifique o binding: deve ser `{{item}}` ou variável com objeto completo
2. No console, verifique: `dados.campos` existe e é um array
3. Teste com dados de exemplo (example-data.json)

### Campos não aparecem

**Possíveis causas:**
- Array `campos` vazio
- Estrutura de dados incorreta

**Solução:**
1. Verifique se `dados.campos` é um array válido
2. Cada campo deve ter pelo menos `label` ou `key`
3. Console: `console.log(responseData.value)`

### Estilos não aplicam

**Causa:**
- Cache do WeWeb
- Propriedades não bindadas corretamente

**Solução:**
1. Force refresh (Ctrl+F5)
2. Re-configure as propriedades
3. Publique e teste no preview

## 📱 Teste em Diferentes Dispositivos

Após configuração, teste em:

1. **Desktop** (> 1024px):
   - Layout deve estar espaçado
   - Todas as informações visíveis

2. **Tablet** (768px - 1024px):
   - Fontes reduzidas automaticamente
   - Padding ajustado

3. **Mobile** (< 768px):
   - Layout compacto
   - Fácil leitura em tela pequena
   - Touch-friendly

Use o modo de visualização do WeWeb ou publique e teste em dispositivos reais.

## 🚀 Próximos Passos

Após instalação bem-sucedida:

1. ✅ Configure uma página de teste
2. ✅ Adicione Collection List com dados reais
3. ✅ Personalize cores para seu brand
4. ✅ Teste responsividade
5. ✅ Configure filtros na collection (se necessário)
6. ✅ Adicione navegação/links para detalhes
7. ✅ Publique e teste em produção

## 💡 Dicas

- Use **Layout Card** para visual destacado
- Use **Layout List** para economizar espaço vertical
- Use **Layout Compact** em sidebars ou modais
- Ative **Show Created Date** para contexto temporal
- Configure **Empty Value Text** para sua preferência ("Não informado", "N/A", etc.)

## 📞 Suporte

Se encontrar problemas:

1. Consulte o README.md para documentação completa
2. Consulte o CLAUDE.md para detalhes técnicos
3. Verifique o example-data.json para estrutura correta dos dados
4. Abra uma issue no repositório (se aplicável)

Boa sorte! 🎉
