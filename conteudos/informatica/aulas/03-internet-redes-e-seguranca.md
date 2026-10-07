### Para que serve este assunto

Internet, redes e segurança da informação são o tema de informática **mais cobrado** nos concursos atuais, e o mais importante para a vida real: saber reconhecer um golpe, proteger senhas, fazer backup e entender o que é um site seguro evita prejuízos. Para quem vai trabalhar em banco, a segurança é ainda mais central. Esta aula explica como a internet funciona (protocolos, endereços, tipos de rede), os navegadores e o e-mail, a computação em nuvem, os malwares e golpes e as ferramentas de proteção.

### Como a internet funciona

A internet é uma **rede de redes**: milhões de computadores e redes interligados no mundo todo, que se comunicam usando um conjunto comum de regras, os **protocolos**, principalmente a pilha **TCP/IP**. Os dados viajam divididos em **pacotes**, que podem seguir caminhos diferentes e são remontados no destino.

- **URL:** o endereço de um recurso na internet: https://www.exemplo.com.br/pagina. "https" é o protocolo; "www.exemplo.com.br" é o domínio; "/pagina" é o caminho.
- **Navegador (browser):** o programa que acessa páginas (Chrome, Edge, Firefox, Safari). **Navegação anônima (privativa)** não guarda o histórico **no seu computador**, mas **não** esconde sua navegação do provedor, da empresa ou dos sites.
- **Cookies:** pequenos arquivos que os sites guardam no navegador para lembrar preferências e login (e também para rastrear o usuário).
- **Cache:** cópias de páginas guardadas para carregar mais rápido.

### Protocolos: as "línguas" da internet

- **HTTP:** páginas web. **HTTPS:** a versão **segura**, com **criptografia** (porta **443**); o cadeado no navegador.
- **DNS:** traduz **nomes** (www.exemplo.com.br) em **endereços IP**.
- **SMTP:** **envia** e-mails.
- **POP3:** **recebe** e-mails, baixando-os para o computador (em geral, apagando do servidor).
- **IMAP:** **recebe** e-mails mantendo-os **sincronizados com o servidor** (você vê as mesmas mensagens no celular e no computador).
- **FTP:** transferência de arquivos.
- **DHCP:** distribui **endereços IP automaticamente** aos aparelhos da rede.

### TCP × UDP

- **TCP:** garante que os dados cheguem **completos e em ordem** (páginas, e-mails, downloads).
- **UDP:** mais **rápido**, mas **sem garantia** de entrega (streaming ao vivo, jogos online, chamadas de voz).

### Endereços IP

- **IPv4:** **32 bits**, quatro números de 0 a 255 (ex.: 192.168.0.1). Os endereços estão se esgotando.
- **IPv6:** **128 bits**, escrito em **hexadecimal** (ex.: 2001:db8::1).

### Tipos de rede

- **Internet:** a rede mundial.
- **Intranet:** rede **privada** de uma empresa, que usa as mesmas tecnologias da internet.
- **Extranet:** parte da intranet aberta a **parceiros** (fornecedores, clientes).
- **VPN:** um "**túnel criptografado**" que permite acessar a rede da empresa de fora com segurança.

### Malwares (programas maliciosos)

- **Vírus:** precisa de um **arquivo hospedeiro** e de ser executado para se espalhar.
- **Worm:** se **espalha sozinho** pela rede, sem precisar de hospedeiro.
- **Trojan (cavalo de Troia):** **disfarçado** de programa legítimo.
- **Ransomware:** **sequestra** (criptografa) os dados e pede resgate.
- **Spyware:** espiona o usuário. **Keylogger:** registra o que é **digitado** (senhas).
- **Botnet:** rede de computadores infectados ("**zumbis**") controlados à distância.

> **Exemplo resolvido.** Os arquivos de uma empresa ficaram ilegíveis e apareceu uma mensagem pedindo pagamento em criptomoeda para devolvê-los. Que malware é esse?
> **Ransomware**. A melhor defesa é ter **backup** atualizado e fora da rede.

### Golpes

- **Phishing:** mensagem falsa (e-mail, SMS, WhatsApp) que imita uma empresa para roubar dados.
- **Pharming:** o **DNS é adulterado**: você digita o endereço certo e cai num site falso.
- **Engenharia social:** manipular a pessoa ("sou do suporte, preciso da sua senha").

Defesa: **desconfiar de urgência**, conferir o link antes de clicar e nunca passar senhas.

### Os pilares da segurança da informação

- **Confidencialidade:** só quem tem autorização acessa.
- **Integridade:** a informação não é alterada indevidamente.
- **Disponibilidade:** a informação está acessível quando necessário.
- **Autenticidade:** garante quem é o autor (assinatura digital).

Ferramentas:

- **Firewall:** **filtra o tráfego** que entra e sai da rede.
- **Antivírus:** detecta e remove malwares.
- **Autenticação em dois fatores (2FA):** além da senha, um código no celular.

### Backup

- **Completo:** copia **tudo**.
- **Incremental:** copia o que mudou desde o **último backup de qualquer tipo**. É o mais rápido de fazer e o mais trabalhoso de restaurar.
- **Diferencial:** copia o que mudou desde o **último backup completo**.
- **Regra 3-2-1:** **3** cópias, em **2** tipos de mídia, com **1** fora do local (na nuvem, por exemplo).

### E-mail

- **Para (To):** destinatário principal. **Cc (com cópia):** os destinatários veem quem recebeu cópia. **Cco (com cópia oculta, Bcc):** os outros destinatários **não** veem quem recebeu em cópia oculta.
- **Responder** (só ao remetente) × **Responder a todos** × **Encaminhar** (envia a outra pessoa, com os anexos).
- **Webmail** (acessado pelo navegador, como o Gmail) × **cliente de e-mail** (programa instalado, como o Outlook ou o Thunderbird).

### Computação em nuvem

Usar programas, armazenamento e processamento **pela internet**, em servidores de outra empresa, em vez de no próprio computador.

- **SaaS (Software como Serviço):** o programa pronto, pelo navegador (Gmail, Microsoft 365, Google Docs).
- **PaaS (Plataforma como Serviço):** ambiente para desenvolver e rodar aplicações.
- **IaaS (Infraestrutura como Serviço):** servidores, armazenamento e redes virtuais "alugados".
- **Nuvem pública, privada e híbrida.**
- **Armazenamento em nuvem:** Google Drive, OneDrive, Dropbox, iCloud. Vantagens: acesso de qualquer lugar, compartilhamento, backup. Desvantagem: depende de internet e da segurança do provedor.

### Mais conceitos de segurança

- **Criptografia simétrica:** a **mesma chave** cifra e decifra (mais rápida; o problema é compartilhar a chave com segurança).
- **Criptografia assimétrica:** usa um **par de chaves**: a **pública** (que todos conhecem) e a **privada** (só do dono). O que uma cifra, só a outra decifra.
- **Assinatura digital:** o autor "assina" com sua chave **privada**, e qualquer um confere com a chave pública. Garante **autenticidade**, **integridade** e o **não repúdio** (o autor não pode negar a autoria).
- **Certificado digital:** documento eletrônico, emitido por uma **Autoridade Certificadora** (no Brasil, a cadeia da **ICP-Brasil**), que liga uma chave pública a uma pessoa ou empresa. O cadeado do HTTPS usa certificados.
- **Hash:** um "resumo" matemático que identifica um arquivo; qualquer alteração muda o hash (verifica a integridade).
- **Senhas fortes:** longas, com letras, números e símbolos, **diferentes** para cada serviço; use um **gerenciador de senhas**.
- **Atualizações** do sistema e dos programas corrigem falhas de segurança.
- **Wi-Fi público:** evitar acessar bancos e dados sensíveis sem VPN.

> **Exemplo resolvido.** Um funcionário recebe um e-mail "do banco" dizendo que sua conta será bloqueada em 2 horas se ele não clicar num link e confirmar a senha. O que fazer?
> É **phishing**: há **urgência**, pedido de **senha** e **link**. Não clicar, não responder e acessar o banco apenas pelos canais oficiais (aplicativo ou site digitado diretamente). Bancos **nunca** pedem senha por e-mail.

### Erros mais comuns

- Confundir SMTP (envia) com POP3 e IMAP (recebem).
- Achar que navegação anônima esconde tudo (só não guarda o histórico no próprio aparelho).
- Confundir vírus (precisa de hospedeiro) com worm (se espalha sozinho).
- Achar que o firewall elimina vírus (ele filtra o tráfego; quem remove malwares é o antivírus).
- Confundir backup incremental (desde o último backup de qualquer tipo) com diferencial (desde o último completo).

### Como cai na prova

As bancas perguntam a função de cada protocolo, as diferenças entre internet, intranet e extranet, o funcionamento de Cc e Cco, os modelos de nuvem, os tipos de malware a partir de descrições, golpes como phishing e pharming, os pilares da segurança, criptografia, assinatura e certificado digital, firewall e tipos de backup.

### Teste-se

1. Qual protocolo traduz nomes de sites em endereços IP?
2. Qual a diferença entre POP3 e IMAP?
3. Que malware se espalha pela rede sem precisar de um arquivo hospedeiro?
4. O que garante a assinatura digital?
5. Qual tipo de backup copia o que mudou desde o último backup completo?

> **Respostas.** 1) **DNS**. 2) O **POP3** baixa as mensagens para o computador (geralmente apagando do servidor); o **IMAP** mantém as mensagens **sincronizadas** com o servidor. 3) O **worm**. 4) **Autenticidade**, **integridade** e **não repúdio**. 5) O **diferencial**.

### Para lembrar

- HTTP/HTTPS (páginas; HTTPS criptografado, porta 443), DNS (nomes → IP), SMTP (envia), POP3 e IMAP (recebem), FTP (arquivos), DHCP (IP automático).
- TCP (confiável, em ordem) × UDP (rápido, sem garantia). IPv4 (32 bits) × IPv6 (128 bits).
- Internet, intranet (privada), extranet (parceiros), VPN (túnel criptografado).
- Malwares: vírus, worm, trojan, ransomware, spyware, keylogger, botnet. Golpes: phishing, pharming, engenharia social.
- Pilares: confidencialidade, integridade, disponibilidade, autenticidade. Firewall, antivírus, 2FA.
- Criptografia simétrica (1 chave) × assimétrica (pública + privada); assinatura e certificado digital (ICP-Brasil).
- Backup: completo, incremental, diferencial; regra 3-2-1.
