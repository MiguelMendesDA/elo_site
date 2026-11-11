# Elo · Site de apresentação

Landing page estática para divulgação da Elo e recolha de manifestações de interesse.

## Conteúdo

- `index.html` — estrutura, copy em português de Portugal e metadados para redes sociais.
- `styles.css` — identidade visual, responsividade e acessibilidade básica.
- `script.js` — modal do botão “Quero saber mais”, sem backend; abre um email pré-preenchido.
- `favicon.svg` — ícone da Elo.

## Personalização rápida

Em `script.js`, altera `INTEREST_EMAIL` para a caixa de email que deve receber os pedidos. Em `index.html`, atualiza `og:url` quando existir o domínio final.

## Publicação

Esta pasta pode ser publicada diretamente como site estático:

- Cloudflare Pages: criar projeto, escolher “Direct Upload” e enviar o conteúdo desta pasta; ou ligar o repositório com `marketing-site` como diretório de saída.
- GitHub Pages: publicar a partir de uma branch e escolher `/marketing-site` se o repositório permitir esse diretório, ou copiar estes ficheiros para a raiz de uma branch de publicação.

Não são necessárias dependências, build, API ou base de dados. O CTA de interesse usa `mailto:`; para recolher contactos de forma estruturada, pode ser substituído mais tarde por um formulário externo (por exemplo, Tally ou Formspree) sem mudar o resto da página.
