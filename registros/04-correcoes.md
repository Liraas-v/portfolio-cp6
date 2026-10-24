# Registro de correções

O QA foi feito por medição no navegador, em larguras de 320 a 1440 px.

## C1 · Título do contato estoura a largura

| Campo | |
|---|---|
| **Problema** | "CONVERSAR?" passava da borda direita: 323 contra 305 px (320), 381 contra 375 (390) e 1453 contra 1425 (1440). No celular o "?" ficava cortado |
| **Prompt de correção** | Pedi para ajustar só o tamanho da fonte do título do contato, para ocupar cerca de 95% da largura útil (prompt 2) |
| **Resultado** | Resolveu totalmente: borda em 299/320, 362/390, 746/820 e 1300/1440 px |
| **Aprendizado** | A regra de ocupação da largura vale para todo título gigante, não só o do hero. `overflow-x: clip` esconde o defeito; só medir `scrollWidth` mostra |

## C2 · Diagramas no lugar das telas dos sistemas

| Campo | |
|---|---|
| **Problema** | Os diagramas de fluxo do Manager e do Farol ficavam pequenos, com espaço vazio, e não mostravam o produto de verdade |
| **Prompt de correção** | Pedi para trocar os diagramas por capturas reais com nomes e valores borrados, remover os links de login e fazer uma galeria de miniaturas por card (prompt 3) |
| **Resultado** | Resolveu totalmente: cada card mostra a tela real, com galeria de miniaturas, nomes e valores borrados e sem link de login |
| **Aprendizado** | Para sistemas com login, pedir desde o início capturas reais com dados borrados em vez de diagramas |

## C3 · Informações incompletas

| Campo | |
|---|---|
| **Problema** | O contato só tinha o GitHub e a Trajetória citava "10 certificados", número que não batia com o certificado |
| **Prompt de correção** | Pedi para adicionar e-mail e LinkedIn e trocar "10 certificados" pelos dados do certificado da Alura (prompt 4) |
| **Resultado** | Resolveu totalmente: e-mail e LinkedIn no contato e "18 cursos e imersão, 130 h", conferido no PDF da Alura |
| **Aprendizado** | Conferir cada número da página contra a fonte antes de publicar |

## C4 · Galeria estoura a largura no celular

| Campo | |
|---|---|
| **Problema** | Em 393 px o card, o cabeçalho e o botão "Menu" ficavam cortados à direita. `scrollWidth` de 400 a 404 px em telas de 320 a 393 px |
| **Prompt de correção** | Informei que em 393 px a página passava da tela e pedi a correção sem mexer no resto (prompt 5) |
| **Resultado** | Resolveu totalmente: `scrollWidth` igual à largura da tela de 320 a 1440 px |
| **Aprendizado** | Cinco miniaturas de 44 px empurravam a coluna do grid, porque `1fr` não encolhe abaixo do conteúdo. Usar `minmax(0, 1fr)` e medir `scrollWidth` a cada componente novo |

## C5 · Botões de contato em duas linhas

| Campo | |
|---|---|
| **Problema** | Com o LinkedIn, os três botões quebravam em duas linhas em 393 px, com o GitHub sozinho embaixo |
| **Prompt de correção** | Pedi E-mail, LinkedIn e GitHub em uma linha só no celular (prompt 6) |
| **Resultado** | Resolveu totalmente: uma linha só de 320 a 1440 px, sem texto cortado (87 px por botão em 320 px) |
| **Aprendizado** | Ao adicionar um item a um grupo de botões, conferir a quebra de linha no celular |

## C6 · Trajetória em uma coluna no celular

| Campo | |
|---|---|
| **Problema** | Abaixo de 820 px as duas listas empilhavam e a seção ficava muito longa |
| **Prompt de correção** | Pedi as duas colunas da Trajetória lado a lado no celular (prompt 7) |
| **Resultado** | Resolveu totalmente: colunas lado a lado, títulos alinhados e sem texto cortado (134 px por coluna em 320 px) |
| **Aprendizado** | Colunas estreitas pedem fonte menor e título com altura mínima. Definir o layout do celular desde o prompt inicial evita o retrabalho |

## C7 · Menu do celular grande demais

| Campo | |
|---|---|
| **Problema** | As opções do menu aberto tinham fonte de 36 a 64 px, ocupando a tela com só cinco links |
| **Prompt de correção** | Pedi para reduzir a fonte e a altura das linhas do menu do celular (prompt 8) |
| **Resultado** | Resolveu totalmente: fonte de 20 a 28 px e linhas de 56 px, mantendo o alvo de toque acima de 44 px |
| **Aprendizado** | Menu de celular não precisa de tipografia de cartaz. Pedir no prompt inicial um tamanho máximo para os links |

## QA final

| Verificação | Resultado |
|---|---|
| Rolagem horizontal (`scrollWidth`) em 320, 360, 393, 430, 819, 820 e 1440 px | Sem estouro |
| Links externos (Finance Agent, Orbitrace, GitHub, repositórios) | Todos respondem 200 |
| LinkedIn | O servidor bloqueia checagem automática (999); abrir manualmente |
| Caminhos das imagens | Todos existem; imagens com `alt` |
| Contraste de texto (WCAG, medido) | Mínimo de 5,05:1 (apoio sobre papel); coral só como preenchimento |
| Menu do celular, galerias e botões de contato | Testados por clique e medição |
