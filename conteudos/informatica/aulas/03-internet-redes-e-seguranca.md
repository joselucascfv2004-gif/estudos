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
