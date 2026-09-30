# Sua Voz do Jeito Certo

Página de vendas do workshop ao vivo conduzido pelo Maestro Adeildo Lopes.

## Rotas

- `/a1`
- `/a2`
- `/a3`
- `/obrigado`

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Validação

```bash
pnpm check
pnpm build
pnpm preview
```

Os CTAs usam a âncora interna da oferta até que o checkout oficial seja configurado. A contagem regressiva não é exibida enquanto a data oficial do evento não estiver disponível.

## Configuração do workshop

A versão escolhida pelo cliente é `/a3`. A primeira tela apresenta formato ao vivo, duração, horário, investimento e a apresentação curta do Maestro. A data pode ser preenchida em `workshopDetails.date`, em `src/content.ts`, após confirmação.

O comparativo de áudio está preparado em `AudioComparison`. Para ativá-lo, adicione os dois arquivos oficiais em `public/assets` e preencha `audioComparisonSources` com os caminhos `before` e `after`. O bloco permanece oculto até ambos os arquivos serem definidos. Os players possuem controles nativos e pausam um ao iniciar o outro.
