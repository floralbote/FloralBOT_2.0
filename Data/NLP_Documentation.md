
# Documentação de Funcionalidades de NLP - FloralBot AI

## 1. Visão Geral da Arquitetura de NLP

A solução FloralBot AI adota uma abordagem moderna e eficiente para o Processamento de Linguagem Natural (NLP), delegando todas as tarefas complexas de compreensão e geração de texto para um poderoso modelo de linguagem grande (LLM): o **Google Gemini (`gemini-2.5-flash`)**.

Isso significa que, em vez de implementar um pipeline de NLP manual no lado do cliente (com etapas como tokenização, lematização, remoção de stop words, etc.), a aplicação envia o texto do usuário diretamente para a API do Gemini. O modelo, pré-treinado em um vasto corpus de dados, realiza todas essas tarefas de forma implícita e com um nível de sofisticação muito elevado para entender a intenção, o sentimento e o contexto do usuário.

A seguir, detalhamos as principais funcionalidades de NLP presentes na solução e os trechos de código que viabilizam sua execução através da API.

---

## 2. Funcionalidades de NLP (Executadas pelo Google Gemini)

### 2.1. Compreensão de Linguagem Natural (NLU)

O FloralBot é capaz de entender as nuances da linguagem humana, como intenções, sentimentos e entidades (conceitos-chave). Isso é fundamental para a anamnese, onde o bot precisa interpretar as emoções descritas pelo usuário.

A `SYSTEM_INSTRUCTION` (instrução de sistema) é o ponto-chave que guia o modelo a atuar como um terapeuta floral, focando na interpretação de estados emocionais.

**Trecho do Código Relevante:**

A instrução de sistema define a persona e o objetivo do bot, direcionando a capacidade de NLU do Gemini para o contexto da terapia floral.

- **Arquivo:** `services/geminiService.ts`
```typescript
const SYSTEM_INSTRUCTION = `Você é um assistente de floralterapia amigável e empático, focado no sistema de florais de Bach. Seu nome é FloralBot. Sua principal função é guiar o usuário através de uma anamnese (conversa investigativa) para entender seus estados emocionais e mentais. Faça perguntas abertas para encorajar o usuário a se expressar. Evite dar diagnósticos médicos ou substituir um profissional de saúde. Seu objetivo é, ao final da conversa, sugerir uma ou mais essências florais de Bach que possam ajudar o usuário. Mantenha um tom calmo, acolhedor e profissional. Responda sempre em português do Brasil.`;

// ...

export const createChat = (): Chat | null => {
  // ...
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};
```

### 2.2. Tokenização, Análise Morfológica e Sintática

Embora não visível no código do frontend, o modelo Gemini realiza internamente:
- **Tokenização**: Divide o texto do usuário em unidades menores (palavras ou subpalavras).
- **Análise Morfológica**: Entende a estrutura das palavras (prefixos, sufixos, raiz).
- **Análise Sintática**: Compreende a estrutura gramatical das frases.

Esses processos são a base para que o modelo entenda a mensagem do usuário. A aplicação apenas precisa enviar o texto bruto.

**Trecho do Código Relevante:**

A função `handleSend` pega o input do usuário e o envia diretamente para o serviço, que o repassa ao Gemini. O modelo se encarrega de todo o pré-processamento complexo.

- **Arquivo:** `components/ChatbotPage.tsx`
```typescript
const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    // ...

    try {
      // A mensagem do usuário é enviada sem nenhum pré-processamento de NLP.
      const stream = await sendMessageStream(chat, userMessage.text);
      // ...
    } catch (e) {
      // ...
    }
  }, [input, isLoading, chat]);
```

### 2.3. Gerenciamento de Diálogo e Manutenção de Contexto

Para uma conversa de anamnese eficaz, o bot precisa lembrar o que foi dito anteriormente. O Gemini API gerencia o estado da conversa (contexto) automaticamente quando usamos a interface `Chat`.

**Trecho do Código Relevante:**

A criação de um objeto `chat` e o uso contínuo do método `sendMessageStream` nele garantem que o histórico da conversa seja mantido, permitindo respostas contextuais.

- **Arquivo:** `services/geminiService.ts`
```typescript
export const createChat = (): Chat | null => {
  // ...
  // Esta função cria uma sessão de chat que manterá o contexto.
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
    // ...
    // Cada chamada a sendMessageStream adiciona a nova mensagem ao histórico
    // e permite que o modelo a considere para gerar a próxima resposta.
    return chat.sendMessageStream({ message });
};
```

### 2.4. Geração de Linguagem Natural (NLG)

Após entender a mensagem do usuário, o FloralBot gera respostas em linguagem natural que são empáticas, relevantes e alinhadas com sua persona. A resposta é recebida em tempo real (streaming) para uma melhor experiência do usuário.

**Trecho do Código Relevante:**

O loop `for await...of` processa os "chunks" (pedaços) de texto à medida que são gerados pelo modelo e os exibe na tela, criando o efeito de digitação em tempo real.

- **Arquivo:** `components/ChatbotPage.tsx`
```typescript
try {
  const stream = await sendMessageStream(chat, userMessage.text);
  let fullText = '';
  // Itera sobre o stream de dados gerado pelo modelo
  for await (const chunk of stream) {
    fullText += chunk.text;
    // Atualiza a interface do usuário com o novo pedaço de texto
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === botMessageId ? { ...msg, text: fullText } : msg
      )
    );
  }
  // ...
}
```

---

## 3. Conclusão

O FloralBot AI é um excelente exemplo de como aplicações modernas podem se beneficiar de APIs de IA avançadas. Ao invés de reinventar a roda com complexos pipelines de NLP, o projeto foca em uma integração inteligente com o Google Gemini, que oferece funcionalidades de ponta para compreensão e geração de linguagem, permitindo que o desenvolvimento se concentre na experiência do usuário e na lógica de negócio da aplicação.
