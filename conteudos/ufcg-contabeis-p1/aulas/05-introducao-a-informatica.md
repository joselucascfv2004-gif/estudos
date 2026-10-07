### Para que serve este assunto

A contabilidade hoje é **digital**: escrituração eletrônica (SPED, ECD, ECF), eSocial, notas fiscais eletrônicas, sistemas contábeis na nuvem, certificado digital para assinar declarações. O contador precisa entender o básico do computador, das redes, da segurança da informação e da computação em nuvem para trabalhar com segurança e eficiência, e para proteger os dados dos clientes, como exige a LGPD.

### Hardware e software

- **Hardware:** a parte física. **Software:** os programas.
- **Software básico:** sistema operacional (Windows, Linux, macOS, Android) e drivers. Gerencia o hardware e oferece a base para os aplicativos.
- **Software aplicativo:** resolve tarefas do usuário (editor de texto, planilha, navegador, sistema contábil e fiscal).
- **Firmware:** software gravado no hardware, como o BIOS/UEFI da placa-mãe, que inicia o computador.
- **Licenças:** proprietário, livre (código aberto, como Linux e LibreOffice), freeware (gratuito) e shareware (teste).

### Arquitetura do computador

O modelo de **von Neumann**: entrada → memória ↔ CPU → saída, com programas e dados na mesma memória.

- **CPU (processador):** unidade de controle, unidade lógica e aritmética e registradores. A **cache** é uma memória pequena e rápida junto ao processador.
- **Memória principal:** **RAM** (volátil, guarda o que está em uso) e **ROM** (não volátil, guarda o firmware).
- **Armazenamento secundário:** HD (disco magnético), **SSD** (memória flash, sem partes móveis, mais rápido), pen drive, cartão de memória.
- **Periféricos:** entrada (teclado, mouse, scanner, microfone), saída (monitor, impressora, caixa de som) e entrada e saída (touchscreen, multifuncional, pen drive).
- **Unidades:** bit (0 ou 1), byte (8 bits), KB, MB, GB, TB (cada uma ≈ 1.024 vezes a anterior).

### Segurança da informação

**Pilares:** confidencialidade (só quem deve acessa), **integridade** (sem alteração indevida), **disponibilidade** (acesso quando preciso) e autenticidade (origem garantida).

**Ameaças:**

- **Vírus:** se anexa a arquivos e precisa ser executado.
- **Worm:** se espalha sozinho pela rede.
- **Cavalo de Troia:** disfarçado de programa útil.
- **Ransomware:** sequestra (criptografa) os dados e pede resgate.
- **Spyware:** espiona o usuário (keylogger captura o que se digita).
- **Phishing e engenharia social:** enganam a pessoa para obter senhas e dados.
- **DDoS:** sobrecarrega um serviço até derrubá-lo.

**Defesas:** antivírus, **firewall** (filtra conexões), atualizações, senhas longas e únicas, **autenticação em dois fatores**, desconfiança de links e anexos, e **backup**.

**Tipos de backup:**

- **Completo:** copia tudo.
- **Incremental:** copia o que mudou desde o último backup de qualquer tipo (rápido para gravar, restauração exige o completo + todos os incrementais).
- **Diferencial:** copia o que mudou desde o último completo (restauração exige o completo + o último diferencial).

**Criptografia e certificado digital.** Na criptografia assimétrica, cada pessoa tem uma chave pública e uma privada. O **certificado digital** (ICP-Brasil, tipos A1 e A3) é usado pelo contador para assinar a ECD e a ECF e para acessar o e-CAC, garantindo autenticidade e integridade.

**LGPD (Lei 13.709/2018):** dados pessoais de clientes e empregados exigem finalidade, segurança, necessidade e transparência.

### Redes e internet

- **Tipos:** LAN (local), MAN (metropolitana), WAN (longa distância). **Intranet:** rede interna com tecnologia da internet; **extranet:** parte dela aberta a parceiros.
- **Equipamentos:** switch (liga dispositivos na rede local), roteador (liga redes diferentes), modem, ponto de acesso Wi-Fi.
- **Protocolos:** **TCP/IP** (base), **HTTP/HTTPS** (páginas; HTTPS com criptografia), **DNS** (nome → endereço IP), **SMTP** (envio de e-mail), **POP3/IMAP** (recebimento; o IMAP sincroniza com o servidor), **FTP** (transferência de arquivos).
- **Endereço IP:** IPv4 (32 bits, esgotando) e IPv6 (128 bits). **URL:** endereço completo de um recurso (https://dominio/caminho).
- **Serviços:** web, e-mail, mensagens, videoconferência, armazenamento e sistemas on-line (bancos, Receita Federal, eSocial).

### Computação em nuvem

Recursos de computação oferecidos pela internet, pagos pelo uso:

- **IaaS:** infraestrutura (servidores virtuais).
- **PaaS:** plataforma para desenvolver sistemas.
- **SaaS:** software pronto (webmail, sistemas contábeis on-line, Google Drive).

Vantagens: acesso de qualquer lugar, escala sob demanda. Cuidados: dependência da internet, segurança, contratos e LGPD.

### Educação a distância

Ensino mediado por tecnologia, com **ambientes virtuais de aprendizagem** (Moodle e similares). Pode ser **síncrona** (ao vivo, ao mesmo tempo) ou **assíncrona** (videoaulas, fóruns, cada um no seu horário). Exige disciplina, gestão do tempo e participação ativa.

### Mais exemplos resolvidos

> **Exemplo resolvido.** Um escritório de contabilidade faz backup completo no domingo e incremental de segunda a sexta. Na quinta-feira, o servidor pifa. O que é preciso para restaurar?
> O backup **completo** de domingo e **todos os incrementais** de segunda, terça e quarta (até o último feito).

> **Exemplo resolvido.** Os arquivos dos clientes ficaram criptografados e apareceu um pedido de pagamento em criptomoeda. Que ameaça é essa e qual a melhor defesa?
> **Ransomware**. A melhor defesa é ter **backup** atualizado e isolado da rede, além de atualizações e cuidado com anexos.

> **Exemplo resolvido.** Um sistema contábil usado pelo navegador, pago por mensalidade, é que modelo de nuvem?
> **SaaS** (software como serviço).

### Erros mais comuns

- Achar que a RAM guarda os dados permanentemente (ela é volátil).
- Confundir backup incremental (desde o último de qualquer tipo) com diferencial (desde o último completo).
- Confundir vírus (precisa de hospedeiro e execução) com worm (se espalha sozinho).
- Achar que o firewall remove vírus (ele filtra conexões).
- Compartilhar o certificado digital ou a senha dele com outras pessoas.

### Teste-se

1. Qual a diferença entre software básico e aplicativo?
2. Quantos bits tem um byte?
3. Quais os pilares da segurança da informação?
4. Qual protocolo traduz nomes de sites em endereços IP?
5. Para que o contador usa o certificado digital?

> **Respostas.** 1) O **básico** (sistema operacional, drivers) gerencia o hardware; o **aplicativo** resolve tarefas do usuário. 2) **8**. 3) **Confidencialidade, integridade, disponibilidade** e **autenticidade**. 4) O **DNS**. 5) Para **assinar** a ECD e a ECF e acessar o **e-CAC**, garantindo autenticidade e integridade.

### Para lembrar

- Hardware × software; básico, aplicativo, firmware; licenças.
- Von Neumann; CPU, cache, RAM (volátil), ROM, HD × SSD; bit e byte.
- Segurança: CID + autenticidade; vírus, worm, trojan, ransomware, spyware, phishing, DDoS.
- Defesas: antivírus, firewall, 2FA, atualizações, backup (completo, incremental, diferencial).
- Certificado digital ICP-Brasil (A1, A3); LGPD.
- Redes: LAN, MAN, WAN; intranet, extranet; TCP/IP, HTTPS, DNS, SMTP, POP3/IMAP.
- Nuvem: IaaS, PaaS, SaaS. EAD síncrona × assíncrona.
