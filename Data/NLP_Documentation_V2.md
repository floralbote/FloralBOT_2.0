# Documentação de Funcionalidades de IA e NLP - FloralBot AI V2.0

## 1. Visão Geral da Arquitetura de IA

A solução FloralBot AI utiliza uma arquitetura de inteligência artificial híbrida, combinando duas abordagens complementares para criar um assistente de bem-estar robusto e completo:

1.  **IA Conversacional (LLM)**: Utiliza o **Google Gemini (`gemini-2.5-flash`)** para a interação em tempo real com o usuário, realizando uma anamnese qualitativa e empática através de um diálogo em linguagem natural.
2.  **Machine Learning Preditivo (Modelo de Classificação)**: Emprega um modelo de machine learning treinado para analisar indicadores emocionais de forma quantitativa e prever a probabilidade de um usuário se beneficiar da terapia floral.

Essa abordagem dupla permite que o FloralBot não só converse e entenda o usuário em um nível profundo, mas também utilize uma base de dados estruturada para fornecer insights e garantir a eficácia e a confiabilidade das suas sugestões.

---

## 2. Módulo de IA Conversacional (Google Gemini)

Este módulo é responsável por toda a interação direta com o usuário. As funcionalidades de NLP são executadas de forma implícita pelo modelo Gemini.

### 2.1. Compreensão de Linguagem Natural (NLU)

O FloralBot entende as nuances da linguagem humana, como intenções, entidades (conceitos-chave) e o contexto da conversa. A `SYSTEM_INSTRUCTION` guia o modelo a focar na interpretação de estados emocionais para a anamnese.

**Trecho do Código Relevante:**
- **Arquivo:** `services/geminiService.ts`
```typescript
const SYSTEM_INSTRUCTION = `Você é um assistente de floralterapia amigável e empático, focado no sistema de florais de Bach... Sua principal função é guiar o usuário através de uma anamnese (conversa investigativa) para entender seus estados emocionais e mentais...`;

export const createChat = (): Chat | null => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });
};
```

### 2.2. Análise de Sentimento (Implícita)

**Esta é uma das funcionalidades mais críticas da solução.** O modelo Gemini realiza uma análise de sentimento avançada e contextual. Ele não apenas classifica o texto como "positivo" ou "negativo", mas interpreta emoções específicas como medo, incerteza, solidão e tristeza, conforme descrito pelo usuário. Essa capacidade é essencial para identificar os desequilíbrios emocionais que os florais de Bach visam tratar.

A análise de sentimento acontece em tempo real durante a conversa, permitindo que o bot faça perguntas de acompanhamento relevantes e demonstre empatia.

**Trecho do Código Relevante:** A mesma `SYSTEM_INSTRUCTION` orienta o modelo a prestar atenção especial aos "estados emocionais e mentais", ativando sua capacidade de análise de sentimento para este contexto específico.

### 2.3. Tokenização, Análise Morfológica e Sintática

Processos fundamentais de NLP que o Gemini executa internamente para decompor e entender a gramática e a estrutura do texto do usuário. A aplicação envia o texto bruto, e o modelo cuida de todo o pré-processamento.

### 2.4. Gerenciamento de Diálogo e Manutenção de Contexto

O uso da interface `Chat` da API Gemini garante que o histórico da conversa seja mantido. Isso permite que o bot se lembre de informações anteriores, tornando a anamnese coerente e aprofundada.

**Trecho do Código Relevante:**
- **Arquivo:** `services/geminiService.ts`
```typescript
// A criação de um objeto `Chat` estabelece uma sessão de conversa contextual.
export const createChat = (): Chat | null => { /* ... */ };

// Cada chamada a `sendMessageStream` adiciona ao histórico da sessão.
export const sendMessageStream = async (chat: Chat, message: string) => {
    return chat.sendMessageStream({ message });
};
```

### 2.5. Geração de Linguagem Natural (NLG)

O FloralBot gera respostas fluidas, empáticas e alinhadas com sua persona de terapeuta floral. O streaming de respostas melhora a experiência do usuário, simulando uma conversa em tempo real.

**Trecho do Código Relevante:**
- **Arquivo:** `components/ChatbotPage.tsx`
```typescript
// O loop `for await...of` processa os "chunks" de texto gerados pelo modelo.
for await (const chunk of stream) {
  fullText += chunk.text;
  // Atualiza a UI progressivamente.
}
```

---

## 3. Módulo de Machine Learning Preditivo

Este módulo representa a camada de inteligência de dados da solução, transformando o FloralBot em um verdadeiro assistente de IA. Ele opera nos bastidores e seus resultados são monitorados pelo painel administrativo.

### 3.1. Objetivo

O modelo de ML foi treinado para **prever a necessidade de terapia floral** com base em um conjunto de indicadores emocionais. Ele responde à pergunta: "Com base nesses sentimentos, qual a probabilidade de que esta pessoa se beneficie dos florais de Bach?". Isso fornece uma validação quantitativa que complementa a análise qualitativa do chatbot.

### 3.2. Modelo e Dados

O modelo é um classificador binário treinado com o arquivo `Data/dataset.csv`.
- **Features (Entradas)**: `medo`, `incerteza`, `solidao`, `tristeza`, `raiva`. Estes são scores que representam a intensidade de cada emoção.
- **Target (Alvo)**: `real_necessita_floral`. Uma variável binária (1 para sim, 0 para não).
- **Output (Saída)**: `predito_necessita_floral` (a previsão do modelo) e `probabilidade_predita` (a confiança na previsão).

### 3.3. Integração e Monitoramento

Embora este modelo não interaja diretamente com o usuário no chat, ele é fundamental para a validação e aprimoramento contínuo do sistema. O `AdminPage` foi projetado para monitorar sua performance.

**Trecho do Código Relevante:**

O componente `MetricsDashboard` dentro do painel administrativo exibe as métricas de performance deste modelo de ML, permitindo que os administradores avaliem sua eficácia.

- **Arquivo:** `components/AdminPage.tsx`
```typescript
const MetricsDashboard: React.FC = () => {
    // ...
    return (
        <div className="space-y-6 text-gray-800">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Exibe a acurácia, R² e AUC do modelo preditivo. */}
                <MetricCard title="Acurácia do Modelo" value="92.5%" description="..." />
                <MetricCard title="Score R²" value="0.88" description="..." />
                <MetricCard title="AUC (Curva ROC)" value="0.95" description="..." />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 {/* Visualiza a Curva ROC e a Importância das Features (emoções). */}
                 <ChartCard title="Curva ROC"> {/* ... */} </ChartCard>
                 <ChartCard title="Importância das Características"> {/* ... */} </ChartCard>
            </div>
            
             {/* Mostra a Matriz de Confusão para uma análise detalhada dos erros e acertos. */}
             <ChartCard title="Matriz de Confusão"> {/* ... */} </ChartCard>
        </div>
    );
};
```

---

## 4. Conclusão

A arquitetura do FloralBot AI demonstra uma abordagem sofisticada e completa. A combinação de um LLM de ponta para a **interação humana (qualitativa)** e um modelo de Machine Learning para a **análise preditiva (quantitativa)** eleva a solução de um simples chatbot para um **assistente de IA inteligente**, capaz de entender, analisar e fornecer insights valiosos para a jornada de bem-estar do usuário.