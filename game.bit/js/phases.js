// ========== FASES DO JOGO ==========

const PHASES = [
  // ===== FASE 1 =====
  {
    id: 1, name: 'Os Números', icon: '🔢', type: 'number-row',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "Olá! Vou te ensinar a fileira dos números! São as teclas no topo do teclado!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">📍 A FILEIRA DOS NÚMEROS</div>
            <p>No topo do teclado existe uma fileira especial com os números de <b style="color:var(--amber)">1 a 0</b>!</p>
            <br>
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin:8px 0">
              ${['1','2','3','4','5','6','7','8','9','0'].map(n => `<span class="key-demo">${n}</span>`).join('')}
            </div>
            <br>
            <p>Estas teclas ficam logo acima das letras Q, W, E, R, T, Y, U, I, O, P!</p>
          </div>
          <div class="lesson-tip">A fileira tem 10 teclas: 1, 2, 3, 4, 5, 6, 7, 8, 9 e 0!</div>
        `
      },
      {
        speech: "Cada tecla de número tem DOIS símbolos! Olha que interessante!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">✨ DUAS FUNÇÕES EM UMA TECLA!</div>
            <p>Cada tecla de número tem <b style="color:var(--amber)">2 funções</b>:</p>
            <br>
            <table style="width:100%;font-family:var(--vt);font-size:18px;border-collapse:collapse">
              <tr style="color:var(--amber)"><th style="padding:4px;border:1px solid var(--green-dim)">Tecla</th><th style="padding:4px;border:1px solid var(--green-dim)">Sem Shift</th><th style="padding:4px;border:1px solid var(--green-dim)">Com Shift</th></tr>
              ${[['1','1','!'],['2','2','@'],['3','3','#'],['4','4','$'],['5','5','%'],['7','7','&'],['8','8','*'],['9','9','('],['0','0',')']]
                .map(([k,n,s]) => `<tr><td style="padding:4px;border:1px solid var(--green-dim);text-align:center"><span class="key-demo" style="font-size:12px">${k}</span></td><td style="padding:4px;border:1px solid var(--green-dim);text-align:center;color:var(--green)">${n}</td><td style="padding:4px;border:1px solid var(--green-dim);text-align:center;color:var(--cyan)">${s}</td></tr>`).join('')}
            </table>
          </div>
        `
      },
      {
        speech: "O número 1 é fácil! Só pressionar a tecla 1!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🔑 TECLA 1</div>
            <p>Para digitar o número <b style="color:var(--amber)">1</b>, pressione:</p>
            <br>
            <div class="combo-demo"><span class="key-demo">1</span></div>
            <br>
            <p>Simples assim! Sem precisar apertar Shift!</p>
            <br>
            <p>A tecla <b style="color:var(--amber)">1</b> fica no canto esquerdo da fileira!</p>
          </div>
          <div class="lesson-tip">Dedo indicador esquerdo ou dedo mindinho — como preferir!</div>
        `
      },
      {
        speech: "Agora vamos aprender o símbolo especial da tecla 1: o ponto de exclamação!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">❗ PONTO DE EXCLAMAÇÃO !</div>
            <p>Para digitar o <b style="color:var(--cyan)">!</b> (exclamação), você precisa do <b style="color:var(--amber)">SHIFT</b>!</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">1</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">!</span>
            </div>
            <br>
            <p>Segure <b style="color:var(--amber)">SHIFT</b> (maiúsculo) e aperte <b style="color:var(--amber)">1</b> ao mesmo tempo!</p>
          </div>
          <div class="lesson-tip">O ponto de exclamação mostra emoção e surpresa no texto!</div>
        `
      }
    ],
    practiceKeys: ['1','2','3','4','5','6','7','8','9','0'],
    practiceTime: 45,
    practiceGoal: 15,
    challengeType: 'falling',
    challengeKeys: ['1','2','3','4','5','6','7','8','9','0']
  },

  // ===== FASE 2 =====
  {
    id: 2, name: 'Shift + Números', icon: '⚡', type: 'symbols-basic',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "Agora aprenderemos os símbolos secretos! Usa-se o SHIFT para acessá-los!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🔑 A TECLA SHIFT</div>
            <p>O <b style="color:var(--amber)">SHIFT</b> é uma tecla especial que muda o comportamento de outras teclas!</p>
            <br>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <span class="key-demo shift-key" style="min-width:60px">⬆ SHIFT</span>
              <span style="color:var(--cyan);font-family:var(--vt);font-size:18px">← Existem 2, um em cada lado do teclado!</span>
            </div>
            <br>
            <p>Enquanto <b style="color:var(--amber)">segura</b> o SHIFT, pressione outra tecla para ativar a função secundária!</p>
          </div>
          <div class="lesson-tip">SHIFT da esquerda: polegar/mindinho esquerdo. SHIFT da direita: mindinho direito!</div>
        `
      },
      {
        speech: "O arroba @ é muito usado em e-mails! Veja como digitá-lo!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">📧 ARROBA @</div>
            <p>O <b style="color:var(--cyan)">@</b> (arroba) é essencial para e-mails!</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">2</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">@</span>
            </div>
            <br>
            <p>Ex: <b style="color:var(--green)">usuario@email.com</b></p>
            <br>
            <p>⚠️ ATENÇÃO: No teclado ABNT2 (Brasil), o @ fica no SHIFT+2!</p>
          </div>
          <div class="lesson-tip">No Brasil usamos o padrão ABNT2 — o @ está sempre no SHIFT+2!</div>
        `
      },
      {
        speech: "O jogo da cerquilha # é muito usado em hashtags nas redes sociais!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🏷 CERQUILHA / HASHTAG #</div>
            <p>O <b style="color:var(--cyan)">#</b> (cerquilha ou hashtag) aparece muito nas redes sociais!</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">3</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">#</span>
            </div>
            <br>
            <p>Exemplo: <b style="color:var(--green)">#AprendaTeclado #Educação</b></p>
          </div>
          <div class="lesson-tip">O # também é chamado de "jogo da velha" por ter esse formato!</div>
        `
      },
      {
        speech: "O cifrão $ representa dinheiro! Saiba como digitá-lo!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">💰 CIFRÃO $</div>
            <p>O <b style="color:var(--cyan)">$</b> é o símbolo do dólar americano!</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">4</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">$</span>
            </div>
            <br>
            <p>Exemplo: <b style="color:var(--green)">Preço: $99.99</b></p>
          </div>
          <div class="lesson-tip">Em programação, o $ é muito usado em linguagens como PHP e JavaScript!</div>
        `
      }
    ],
    practiceKeys: ['!','@','#','$','%','&','*','(',')'],
    practiceShift: true,
    practiceTime: 50,
    practiceGoal: 12,
    challengeType: 'typing',
    challengeText: '@ # $ % ! & * ( )'
  },

  // ===== FASE 3 =====
  {
    id: 3, name: 'Símbolos do Topo', icon: '⌨', type: 'symbols-advanced',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "Vamos aprender o símbolo %! Ele é muito usado!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">% PORCENTAGEM</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">5</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">%</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">6</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">&</span>
            </div>
            <br>
            <p>% = porcentagem. Ex: <b style="color:var(--green)">50% de desconto!</b></p>
          </div>
        `
      },
      {
        speech: "O E comercial & e o asterisco * são muito úteis!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">& AMPERSAND e * ASTERISCO</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">7</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">&</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">8</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">*</span>
            </div>
            <br>
            <p>& = "e" comercial. Ex: <b style="color:var(--green)">Loja A & B</b></p>
            <p>* = asterisco — usado em senhas e multiplicação!</p>
          </div>
          <div class="lesson-tip">Em programação, * significa multiplicar e & é o "endereço" de variáveis!</div>
        `
      },
      {
        speech: "Os parênteses () são usados na escrita e na programação!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">() PARÊNTESES</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">9</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">(</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">0</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">)</span>
            </div>
            <br>
            <p>Parênteses são usados em pares! Sempre que abrir, feche!</p>
            <p>Ex: <b style="color:var(--green)">(isto é um exemplo)</b></p>
          </div>
          <div class="lesson-tip">Em matemática: (2 + 3) × 4 = 20. Os parênteses mudam a ordem!</div>
        `
      }
    ],
    practiceKeys: ['%','&','*','(',')','!','@','#','$'],
    practiceShift: true,
    practiceTime: 50,
    practiceGoal: 15,
    challengeType: 'falling',
    challengeKeys: ['!','@','#','$','%','&','*','(',')']
  },

  // ===== FASE 4 =====
  {
    id: 4, name: 'Sinais Matemáticos', icon: '➕', type: 'math',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "Matemática e teclado juntos! Veja os sinais matemáticos!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">➕➖ OPERADORES MATEMÁTICOS</div>
            <p>Os sinais matemáticos ficam em teclas especiais:</p>
            <br>
            <div style="font-family:var(--vt);font-size:18px">
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">+</span>
                <span class="combo-result" style="font-size:18px">= Adição (SHIFT + =)</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">-</span>
                <span class="combo-result" style="font-size:18px">= Subtração (tecla - direto)</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">*</span>
                <span class="combo-result" style="font-size:18px">= Multiplicação (SHIFT+8)</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">/</span>
                <span class="combo-result" style="font-size:18px">= Divisão (tecla / direto)</span>
              </div>
            </div>
          </div>
          <div class="lesson-tip">No teclado numérico (numpad), + - * / ficam em teclas próprias!</div>
        `
      },
      {
        speech: "O sinal de igualdade e maior/menor são muito usados em programação!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">= < > COMPARAÇÃO</div>
            <div class="combo-demo">
              <span class="key-demo special">=</span>
              <span class="combo-result" style="font-size:18px">= Igual (tecla = direto)</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">&lt;</span>
              <span class="combo-result" style="font-size:18px">= Menor que</span>
            </div>
            <div class="combo-demo">
              <span class="key-demo special">&gt;</span>
              <span class="combo-result" style="font-size:18px">= Maior que (SHIFT+&lt;)</span>
            </div>
            <br>
            <p>Exemplos: <b style="color:var(--green)">5 > 3</b> e <b style="color:var(--green)">2 < 7</b></p>
          </div>
          <div class="lesson-tip">Em programação: == significa "é igual a" e != significa "é diferente de"!</div>
        `
      },
      {
        speech: "Vamos aprender sobre o hífen e o underline!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">- _ HÍFEN e UNDERLINE</div>
            <div class="combo-demo">
              <span class="key-demo special">-</span>
              <span class="combo-result" style="font-size:18px">= Hífen (direto)</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">-</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">_</span>
            </div>
            <br>
            <p>Hífen: <b style="color:var(--green)">guarda-chuva</b>, <b style="color:var(--green)">meia-noite</b></p>
            <p>Underline: <b style="color:var(--green)">nome_arquivo.txt</b></p>
          </div>
          <div class="lesson-tip">Em programação, o _ (underline) é muito comum em nomes de variáveis!</div>
        `
      }
    ],
    practiceKeys: ['-','=','+','_'],
    practiceTime: 40,
    practiceGoal: 12,
    challengeType: 'typing',
    challengeText: '1+2=3 4-1=3 5*2=10 9/3=3'
  },

  // ===== FASE 5 =====
  {
    id: 5, name: 'Pontuação', icon: '✏', type: 'punctuation',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "A pontuação é fundamental para escrever bem! Vamos aprender!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">. , ; : PONTUAÇÃO BÁSICA</div>
            <div style="font-family:var(--vt);font-size:18px">
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">.</span>
                <span class="combo-result" style="font-size:16px">Ponto final — encerra frase</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">,</span>
                <span class="combo-result" style="font-size:16px">Vírgula — pausa na frase</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">;</span>
                <span class="combo-result" style="font-size:16px">Ponto e vírgula — pausa maior</span>
              </div>
              <div class="combo-demo" style="margin:6px 0">
                <span class="key-demo special">:</span>
                <span class="combo-result" style="font-size:16px">Dois pontos — lista ou explicação</span>
              </div>
            </div>
          </div>
          <div class="lesson-tip">Ponto (.) e vírgula (,) são as mais usadas na língua portuguesa!</div>
        `
      },
      {
        speech: "Interrogação e exclamação são marcas de emoção no texto!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">? ! PERGUNTAS E EXCLAMAÇÕES</div>
            <div class="combo-demo">
              <span class="key-demo special">?</span>
              <span class="combo-result" style="font-size:18px">= Interrogação (direto)</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo">1</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">!</span>
            </div>
            <br>
            <p>Exemplos:</p>
            <p><b style="color:var(--green)">Você entendeu?</b></p>
            <p><b style="color:var(--green)">Que legal!</b></p>
          </div>
          <div class="lesson-tip">Em textos informais: usar "!!!" e "???" é permitido para dar ênfase!</div>
        `
      },
      {
        speech: "As aspas e o apóstrofo são marcas textuais importantes!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">'" ASPAS E APÓSTROFO</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">"</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">"</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">'</span>
              <span class="combo-result" style="font-size:18px">= Apóstrofo / Aspas simples</span>
            </div>
            <br>
            <p>Aspas: <b style="color:var(--green)">"Olá, mundo!"</b></p>
            <p>Em código: <b style="color:var(--green)">'texto'</b> ou <b style="color:var(--green)">"texto"</b></p>
          </div>
          <div class="lesson-tip">Aspas duplas " " são para citações. Aspas simples ' são para código!</div>
        `
      }
    ],
    practiceKeys: ['.', ',', ';', ':', '?', '!'],
    practiceTime: 40,
    practiceGoal: 15,
    challengeType: 'typing',
    challengeText: 'Olá, mundo! Como vai? Tudo bem; espero que sim.'
  },

  // ===== FASE 6 =====
  {
    id: 6, name: 'Barras e Chaves', icon: '🔧', type: 'brackets',
    minLevel: 1, isBoss: false,
    lessons: [
      {
        speech: "Agora as teclas mais avançadas! Colchetes e chaves!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">[] COLCHETES</div>
            <div class="combo-demo">
              <span class="key-demo special">[</span>
              <span class="combo-result" style="font-size:18px">= Abre colchete (direto)</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">]</span>
              <span class="combo-result" style="font-size:18px">= Fecha colchete (direto)</span>
            </div>
            <br>
            <p>Colchetes são muito usados em programação:</p>
            <p><b style="color:var(--green)">lista[0]</b> — acessa o primeiro elemento!</p>
          </div>
          <div class="lesson-tip">As teclas [ e ] ficam logo após a letra P no teclado!</div>
        `
      },
      {
        speech: "As chaves {} são essenciais em programação! Abrem blocos de código!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">{} CHAVES</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">[</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">{</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">]</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">}</span>
            </div>
            <br>
            <p>Em programação: <b style="color:var(--green)">if (x) { faça isso }</b></p>
          </div>
          <div class="lesson-tip">Chaves, colchetes e parênteses sempre devem ser usados em pares!</div>
        `
      },
      {
        speech: "As barras têm usos muito diferentes! Vejamos!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">/ \\ BARRAS</div>
            <div class="combo-demo">
              <span class="key-demo special">/</span>
              <span class="combo-result" style="font-size:18px">= Barra (slash) — divisão e sites</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">\\</span>
              <span class="combo-result" style="font-size:18px">= Barra invertida (backslash)</span>
            </div>
            <br>
            <p>Barra: <b style="color:var(--green)">www.site.com/pagina</b></p>
            <p>Barra invertida: <b style="color:var(--green)">C:\\Usuários\\Documentos</b></p>
          </div>
          <div class="lesson-tip">A barra / é usada em sites. A barra \\ é usada em caminhos do Windows!</div>
        `
      },
      {
        speech: "O pipe | e o til ~ são teclas menos conhecidas mas muito úteis!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">| ~ PIPE e TIL</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">\\</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">|</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">~</span>
              <span class="combo-result" style="font-size:18px">= Til (tecla do til + espaço)</span>
            </div>
            <br>
            <p>| (pipe): conecta comandos no terminal</p>
            <p>~ (til): usado em ã, õ e outros acentos!</p>
          </div>
          <div class="lesson-tip">Para ã: pressione ~ e depois a. Para õ: pressione ~ e depois o!</div>
        `
      }
    ],
    practiceKeys: ['[',']','/','-'],
    practiceTime: 50,
    practiceGoal: 12,
    challengeType: 'falling',
    challengeKeys: ['[',']','{','}','/','\\','|']
  },

  // ===== FASE 7 =====
  {
    id: 7, name: 'Acento e Cedilha', icon: '🇧🇷', type: 'accents',
    minLevel: 1, isBoss: false,
    lessons: [
      {
        speech: "O português tem muitos acentos! Vamos aprender a digitá-los!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">´ ACENTO AGUDO</div>
            <p>Para digitar letras com acento agudo (á, é, í, ó, ú):</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">´</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">a</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">á</span>
            </div>
            <br>
            <p>Primeiro aperte a tecla do acento (´), depois a letra!</p>
            <p>Funciona com: <b style="color:var(--green)">á é í ó ú Á É Í Ó Ú</b></p>
          </div>
          <div class="lesson-tip">A tecla ´ fica no lado direito do teclado, perto do Enter!</div>
        `
      },
      {
        speech: "O acento circunflexo cobre â, ê, ô — como um chapéu!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">^ ACENTO CIRCUNFLEXO</div>
            <div class="combo-demo">
              <span class="key-demo shift-key">SHIFT</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">´</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">a</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">â</span>
            </div>
            <br>
            <p>Primeiro: <b style="color:var(--amber)">SHIFT + ´</b> (para fazer ^)</p>
            <p>Depois: a letra que deseja acentuar!</p>
            <br>
            <p>Palavras: <b style="color:var(--green)">âncora, êxito, ônibus</b></p>
          </div>
          <div class="lesson-tip">O circunflexo (^) parece um chapéu em cima da letra!</div>
        `
      },
      {
        speech: "A cedilha ç é exclusiva da língua portuguesa! Muito importante!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">Ç CEDILHA</div>
            <p>A cedilha é uma tecla própria no teclado ABNT2!</p>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">Ç</span>
              <span class="combo-result" style="font-size:18px">= Pressione diretamente!</span>
            </div>
            <br>
            <p>Palavras: <b style="color:var(--green)">maçã, açúcar, criança</b></p>
            <br>
            <p>A tecla Ç fica ao lado da tecla L!</p>
          </div>
          <div class="lesson-tip">A cedilha só existe em português e alguns outros idiomas — somos especiais!</div>
        `
      },
      {
        speech: "O til ~ cria o ã e õ — sons únicos do português!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">~ TIL (ã, õ)</div>
            <div class="combo-demo">
              <span class="key-demo special">~</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">a</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">ã</span>
            </div>
            <br>
            <div class="combo-demo">
              <span class="key-demo special">~</span>
              <span class="combo-plus">+</span>
              <span class="key-demo special">o</span>
              <span class="combo-plus">=</span>
              <span class="combo-result">õ</span>
            </div>
            <br>
            <p>Palavras: <b style="color:var(--green)">maçã, canção, pão, limão</b></p>
          </div>
          <div class="lesson-tip">O som "ão" no final das palavras usa sempre o ã + o!</div>
        `
      }
    ],
    practiceKeys: ['á','é','ã','ç','â','ô'],
    practiceTime: 60,
    practiceGoal: 10,
    challengeType: 'typing',
    challengeText: 'maçã pão açúcar criança câmera'
  },

  // ===== FASE 8 =====
  {
    id: 8, name: 'Velocidade!', icon: '⚡', type: 'speed',
    minLevel: 1, isBoss: false,
    lessons: [
      {
        speech: "Você aprendeu muita coisa! Agora vamos trabalhar a velocidade!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">⚡ DIGITAÇÃO RÁPIDA</div>
            <p>Agora que você conhece as teclas, é hora de digitá-las com <b style="color:var(--amber)">VELOCIDADE</b>!</p>
            <br>
            <p>Dicas para digitar mais rápido:</p>
            <br>
            <div style="font-family:var(--vt);font-size:18px;line-height:2">
              ▶ Mantenha os dedos na posição correta<br>
              ▶ Não olhe para o teclado!<br>
              ▶ Pratique regularmente<br>
              ▶ Comece devagar e aumente o ritmo<br>
              ▶ Relaxe os ombros e os pulsos
            </div>
          </div>
          <div class="lesson-tip">Digitadores profissionais chegam a 100+ palavras por minuto!</div>
        `
      },
      {
        speech: "A posição das mãos é fundamental! Veja a posição correta!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🤲 POSIÇÃO DAS MÃOS</div>
            <p>Posição correta (home row):</p>
            <br>
            <div style="text-align:center;font-family:var(--vt);font-size:18px">
              <div style="margin:5px 0">Mão esquerda: <span class="key-demo special" style="font-size:11px">A</span><span class="key-demo special" style="font-size:11px">S</span><span class="key-demo special" style="font-size:11px">D</span><span class="key-demo special" style="font-size:11px">F</span></div>
              <div style="margin:5px 0">Mão direita: <span class="key-demo special" style="font-size:11px">J</span><span class="key-demo special" style="font-size:11px">K</span><span class="key-demo special" style="font-size:11px">L</span><span class="key-demo special" style="font-size:11px">Ç</span></div>
              <div style="margin:8px 0;color:var(--amber)">Polegares ficam na BARRA DE ESPAÇO!</div>
            </div>
            <br>
            <p>As saliências nas teclas F e J ajudam a posicionar!</p>
          </div>
          <div class="lesson-tip">As teclas F e J têm uma salinha (brotinho) para guiar sem olhar!</div>
        `
      },
      {
        speech: "Vamos treinar velocidade com números e símbolos misturados!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🏃 TREINO DE VELOCIDADE</div>
            <p>Nesta fase você vai digitar sequências rápidas!</p>
            <br>
            <p>Avaliação de velocidade:</p>
            <div style="font-family:var(--vt);font-size:18px;line-height:2.2">
              🐢 Menos de 20 tpm = <span style="color:#666">Iniciante</span><br>
              🐇 20-40 tpm = <span style="color:var(--green)">Básico</span><br>
              🐆 40-60 tpm = <span style="color:var(--cyan)">Intermediário</span><br>
              🦅 60-80 tpm = <span style="color:var(--amber)">Avançado</span><br>
              🚀 80+ tpm = <span style="color:var(--red)">Especialista!</span>
            </div>
          </div>
        `
      }
    ],
    practiceKeys: ['1','2','3','@','#','!','4','5','6','$','%','&'],
    practiceTime: 30,
    practiceGoal: 20,
    challengeType: 'falling',
    challengeKeys: ['1','2','@','#','!','3','4','$','%','5','6','&','*']
  },

  // ===== FASE 9 =====
  {
    id: 9, name: 'E-mails e Web', icon: '🌐', type: 'web',
    minLevel: 1, isBoss: false,
    lessons: [
      {
        speech: "Vamos aprender a digitar endereços de e-mail e sites!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">📧 ANATOMIA DO E-MAIL</div>
            <p>Um e-mail tem 3 partes:</p>
            <br>
            <div style="font-family:var(--vt);font-size:20px;text-align:center">
              <span style="color:var(--amber)">usuario</span><span style="color:var(--green)">@</span><span style="color:var(--cyan)">servidor</span><span style="color:var(--white)">.</span><span style="color:var(--red)">com</span>
            </div>
            <br>
            <div style="font-family:var(--vt);font-size:18px;line-height:2">
              <span style="color:var(--amber)">● usuario</span> = seu nome de usuário<br>
              <span style="color:var(--green)">● @</span> = "arroba" (SHIFT + 2)<br>
              <span style="color:var(--cyan)">● servidor</span> = gmail, hotmail...<br>
              <span style="color:var(--red)">● .com</span> = domínio (.com.br, .org...)
            </div>
          </div>
        `
      },
      {
        speech: "Veja como digitar um endereço de e-mail completo!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">✉ DIGITANDO UM E-MAIL</div>
            <p>Exemplo passo a passo:</p>
            <br>
            <div style="font-family:var(--vt);font-size:18px;line-height:2.5">
              1. Digite: <span style="color:var(--amber)">joao</span><br>
              2. Aperte: <span class="key-demo shift-key" style="font-size:9px">SHIFT</span>+<span class="key-demo" style="font-size:9px">2</span> para o <span style="color:var(--green)">@</span><br>
              3. Digite: <span style="color:var(--cyan)">gmail</span><br>
              4. Aperte: <span class="key-demo special" style="font-size:9px">.</span> para o ponto<br>
              5. Digite: <span style="color:var(--red)">com</span>
            </div>
            <br>
            <p>Resultado: <b style="color:var(--green)">joao@gmail.com</b></p>
          </div>
          <div class="lesson-tip">E-mails não podem ter espaços! Use . ou _ entre palavras!</div>
        `
      },
      {
        speech: "E os endereços de sites (URLs)? Veja como digitá-los!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🌐 ANATOMIA DE UM SITE (URL)</div>
            <div style="font-family:var(--vt);font-size:18px;text-align:center;margin:8px 0">
              <span style="color:var(--green-dim)">https://</span><span style="color:var(--amber)">www.</span><span style="color:var(--cyan)">google</span><span style="color:var(--white)">.</span><span style="color:var(--red)">com</span><span style="color:var(--white)">.br</span>
            </div>
            <br>
            <p>Caracteres especiais em URLs:</p>
            <div style="font-family:var(--vt);font-size:18px;line-height:2">
              <span style="color:var(--green)">/ (barra)</span> = separa páginas<br>
              <span style="color:var(--amber)">. (ponto)</span> = separa domínios<br>
              <span style="color:var(--cyan)">: (dois pontos)</span> = após https<br>
              <span style="color:var(--red)">- (hífen)</span> = em nomes de sites
            </div>
          </div>
          <div class="lesson-tip">Nunca coloque espaços em endereços de sites — use - ou %20!</div>
        `
      }
    ],
    practiceKeys: ['@','.','/',':','-','_'],
    practiceTime: 50,
    practiceGoal: 15,
    challengeType: 'typing',
    challengeText: 'joao@gmail.com http://www.escola.com.br'
  },

  // ===== FASE 10 =====
  {
    id: 10, name: 'Programação Básica', icon: '💻', type: 'code',
    minLevel: 2, isBoss: false,
    lessons: [
      {
        speech: "Programação usa MUITOS símbolos especiais! Vamos ver quais!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">💻 SÍMBOLOS DA PROGRAMAÇÃO</div>
            <p>Os mais usados em código:</p>
            <br>
            <div style="font-family:var(--vt);font-size:18px;line-height:2">
              <span style="color:var(--green)">{  }</span> Chaves — blocos de código<br>
              <span style="color:var(--cyan)">[  ]</span> Colchetes — listas e arrays<br>
              <span style="color:var(--amber)">(  )</span> Parênteses — funções<br>
              <span style="color:var(--red)">"  "</span> Aspas — textos (strings)<br>
              <span style="color:var(--white)">;</span> Ponto e vírgula — fim de linha<br>
              <span style="color:var(--green)">==</span> Dois iguais — comparação<br>
              <span style="color:var(--amber)">//</span> Barras duplas — comentário
            </div>
          </div>
        `
      },
      {
        speech: "Veja um exemplo real de código! Note todos os símbolos!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">📝 CÓDIGO REAL — JAVASCRIPT</div>
            <div style="font-family:var(--vt);font-size:17px;background:rgba(0,0,0,0.4);padding:10px;border:1px solid var(--green-dim);line-height:2">
              <span style="color:#888">// Olá Mundo em JavaScript</span><br>
              <span style="color:var(--cyan)">function</span> <span style="color:var(--amber)">ola</span><span style="color:var(--white)">(</span><span style="color:var(--red)">nome</span><span style="color:var(--white)">)</span> <span style="color:var(--white)">{</span><br>
              &nbsp;&nbsp;<span style="color:var(--cyan)">return</span> <span style="color:var(--green)">"Olá, "</span> + nome + <span style="color:var(--green)">"!"</span><span style="color:#888">;</span><br>
              <span style="color:var(--white)">}</span><br>
              <br>
              <span style="color:var(--amber)">ola</span><span style="color:var(--white)">(</span><span style="color:var(--green)">"Prof. Bit"</span><span style="color:var(--white)">)</span><span style="color:#888">;</span>
            </div>
            <br>
            <p>Conta os símbolos: (, ), {, }, ", ;, +, /</p>
          </div>
          <div class="lesson-tip">Sem os símbolos corretos, o código não funciona! São vitais!</div>
        `
      },
      {
        speech: "Parabéns! Você está pronto para o grande desafio final!",
        content: `
          <div class="lesson-card">
            <div class="lesson-card-title">🎯 PREPARE-SE PARA O BOSS!</div>
            <p>Você aprendeu:</p>
            <div style="font-family:var(--vt);font-size:18px;line-height:2">
              ✅ Fileira dos números (1-0)<br>
              ✅ Símbolos com SHIFT<br>
              ✅ Sinais matemáticos<br>
              ✅ Pontuação<br>
              ✅ Chaves e colchetes<br>
              ✅ Acentos em português<br>
              ✅ E-mails e URLs<br>
              ✅ Símbolos de programação
            </div>
            <br>
            <p style="color:var(--amber)">PRÓXIMO: O DESAFIO FINAL DO PROF. BIT!</p>
          </div>
        `
      }
    ],
    practiceKeys: ['{','}','[',']','(',')',';','"'],
    practiceTime: 45,
    practiceGoal: 15,
    challengeType: 'typing',
    challengeText: '{ } [ ] ( ) ; == // function()'
  },

  // ===== FASE 11 — BOSS =====
  {
    id: 11, name: 'BOSS FINAL!', icon: '👾', type: 'boss',
    minLevel: 0, isBoss: true,
    lessons: [
      {
        speech: "ALUNO! Esta é a BATALHA FINAL! Use tudo o que aprendeu!",
        content: `
          <div class="lesson-card" style="border-color:var(--red);box-shadow:0 0 20px rgba(255,34,34,0.3)">
            <div class="lesson-card-title" style="color:var(--red)">👾 DESAFIO SUPREMO</div>
            <p>Você enfrentará:</p>
            <div style="font-family:var(--vt);font-size:20px;line-height:2;color:var(--white)">
              🌊 ONDA 1: Números 1-0<br>
              ⚡ ONDA 2: Símbolos com Shift<br>
              🔥 ONDA 3: Tudo misturado!<br>
              💀 ONDA 4: VELOCIDADE MÁXIMA!
            </div>
            <br>
            <p style="color:var(--red)">Sem falhas! Sem erros! Apenas VELOCIDADE!</p>
          </div>
        `
      }
    ],
    practiceKeys: ['1','2','3','@','#','!','$','%','&','*','(',')','4','5','6','7','8','9','0'],
    practiceTime: 60,
    practiceGoal: 30,
    challengeType: 'boss',
    challengeKeys: ['1','@','2','#','3','$','!','4','%','5','&','6','*','7','(','8',')','9','0']
  },

  // ===== FASE 12 — BÔNUS =====
  {
    id: 12, name: 'MESTRE!', icon: '🏆', type: 'bonus',
    minLevel: 0, isBoss: false,
    lessons: [
      {
        speech: "VOCÊ VENCEU! Agora é um MESTRE DO TECLADO! Parabéns, aluno!",
        content: `
          <div class="lesson-card" style="border-color:var(--amber);text-align:center">
            <div class="lesson-card-title" style="color:var(--amber);font-size:12px">🏆 CERTIFICADO DE MESTRE 🏆</div>
            <br>
            <p style="font-family:var(--pixel);font-size:9px;color:var(--amber)">PROF. BIT CERTIFICA QUE</p>
            <p class="blink-text" style="font-size:22px;font-family:var(--vt);color:var(--white)" id="cert-name">ALUNO</p>
            <p style="font-family:var(--pixel);font-size:8px;color:var(--green)">CONCLUIU COM SUCESSO O CURSO</p>
            <p style="font-family:var(--pixel);font-size:8px;color:var(--cyan)">MESTRE DO TECLADO v2.0</p>
            <br>
            <p style="font-size:40px">⭐🏆⭐</p>
            <br>
            <p style="font-family:var(--vt);font-size:18px;color:var(--white)">Você dominou todos os números,<br>símbolos e teclas especiais!</p>
          </div>
        `
      }
    ],
    practiceKeys: ['1','@','!','#','$','%','&','*','(',')','-','=','+','_','[',']','{','}','/'],
    practiceTime: 45,
    practiceGoal: 25,
    challengeType: 'typing',
    challengeText: 'usuario@email.com #hashtag $100 (A+B)*2=C {codigo}'
  }
];

// Rank system
const RANKS = [
  { name: '🌱 NOVATO', min: 0 },
  { name: '📚 APRENDIZ', min: 100 },
  { name: '⌨ DIGITADOR', min: 300 },
  { name: '⚡ VELOZ', min: 600 },
  { name: '🔥 EXPERTO', min: 1000 },
  { name: '💎 MESTRE', min: 1500 },
  { name: '👑 LENDA', min: 2500 }
];

function getRank(score) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (score >= r.min) rank = r;
  }
  return rank;
}

const PRAISE_MESSAGES = {
  perfect: [
    "INCRÍVEL! Você é um gênio do teclado! 🌟",
    "PERFEITO! O Prof. Bit nunca viu nada igual! 🏆",
    "FANTÁSTICO! Você voou nessa fase! 🚀"
  ],
  great: [
    "EXCELENTE trabalho, aluno! Continue assim! ⭐",
    "MUITO BEM! O Prof. Bit está orgulhoso! 🎉",
    "ÓTIMO! Você dominou essa fase! 💪"
  ],
  good: [
    "BOM TRABALHO! Está progredindo bem! 👍",
    "MUITO BOM! Pratique mais para ficar perfeito! 📚",
    "PASSOU! O Prof. Bit quer mais de você! 😄"
  ],
  fail: [
    "Não desanime! O Prof. Bit acredita em você! 💙",
    "Tente de novo! A prática leva à perfeição! 🔄",
    "Continue tentando! Cada erro é aprendizado! 📖"
  ]
};

function getPraise(stars) {
  const arr = stars === 3 ? PRAISE_MESSAGES.perfect :
              stars === 2 ? PRAISE_MESSAGES.great :
              stars === 1 ? PRAISE_MESSAGES.good : PRAISE_MESSAGES.fail;
  return arr[Math.floor(Math.random() * arr.length)];
}

const BADGES = {
  perfect: '🏅 FASE PERFEITA!',
  speed: '⚡ SUPER VELOZ!',
  combo: '🔥 COMBO MESTRE!',
  noerror: '✨ SEM ERROS!',
  boss: '👾 BOSS DERROTADO!',
  master: '👑 MESTRE DO TECLADO!'
};
