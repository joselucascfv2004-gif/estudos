### Para que serve este assunto

Informática (ou "Noções de Informática", "Tecnologia da Informação") cai em praticamente todos os concursos de nível médio: Banco do Brasil, Caixa, IBGE, Correios, tribunais, polícias. As questões são objetivas e muitas vezes "decoráveis": componentes do computador, unidades de medida, atalhos de teclado, comandos do Linux. Esta aula explica o hardware (as peças físicas), as memórias, as unidades, os periféricos e os sistemas operacionais Windows e Linux, que fazem o computador funcionar.

### Hardware, software e sistema operacional

- **Hardware:** a parte **física** (as peças que se pode tocar).
- **Software:** a parte **lógica** (os programas).
- **Sistema operacional:** o software **básico** que gerencia o hardware e serve de ponte entre ele, os programas e o usuário (Windows, Linux, macOS, Android, iOS). Ele gerencia a memória, os processos (programas em execução), os arquivos e os dispositivos.
- **Software aplicativo:** os programas de uso final (navegador, editor de texto, planilha).
- **Firmware:** software gravado no próprio hardware (como a BIOS/UEFI).
- **Software livre** (pode ser usado, estudado, modificado e distribuído, como o Linux e o LibreOffice) × **proprietário** (o Windows, o Microsoft Office). Livre não significa necessariamente gratuito, mas a maioria é.

### Hardware: as peças do computador

- **CPU (processador):** o "cérebro"; executa as instruções.
- **Memória RAM:** a memória de **trabalho**, rápida e **volátil** (apaga quando o computador desliga). Mais RAM = mais programas abertos ao mesmo tempo sem travar.
- **ROM e BIOS/UEFI:** memória **não volátil** com o programa que **inicia** o computador e verifica o hardware.
- **Armazenamento:** **HD** (disco mecânico, mais barato e lento) e **SSD** (sem partes móveis, muito mais rápido). Guardam os arquivos de forma permanente.
- **Placa-mãe:** interliga todos os componentes.

### Hierarquia de memória

Da **mais rápida** (e cara, e pequena) para a **mais lenta** (e barata, e grande):

**registradores → cache → RAM → disco (SSD/HD)**

### Unidades

- **1 byte = 8 bits.**
- 1 KB = 1 024 bytes; 1 MB = 1 024 KB; 1 GB = 1 024 MB; 1 TB = 1 024 GB.
- Velocidade de internet é medida em **bits** por segundo (**Mbps**), não em bytes.

> **Exemplo resolvido.** Uma internet de 80 Mbps baixa, no máximo, quantos megabytes por segundo?
> 80 ÷ 8 = **10 MB/s** (cada byte tem 8 bits).

### Periféricos

- **Entrada:** teclado, mouse, scanner, microfone.
- **Saída:** monitor, impressora, caixa de som.
- **Entrada e saída:** tela sensível ao toque, pendrive, impressora multifuncional, HD externo.

### Atalhos do Windows que mais caem

- **Ctrl + C / X / V:** copiar, recortar, colar.
- **Ctrl + Z:** desfazer. **Ctrl + Y:** refazer.
- **Ctrl + A:** selecionar tudo no Windows (no Word em português, selecionar tudo é **Ctrl + T**).
- **Win + E:** abre o **Explorador de Arquivos**.
- **Win + D:** mostra a **área de trabalho**.
- **Win + L:** **bloqueia** o computador.
- **Alt + Tab:** alterna entre janelas.
- **Alt + F4:** fecha a janela.
- **F2:** renomeia o arquivo.
- **Delete:** manda para a **Lixeira**. **Shift + Delete:** exclui **sem passar pela Lixeira**.

### Linux

Sistema de **código aberto** (gratuito, pode ser modificado). Comandos básicos no terminal:

- **ls:** listar arquivos;
- **cd:** mudar de pasta;
- **pwd:** mostrar a pasta atual;
- **cp:** copiar; **mv:** mover ou renomear; **rm:** remover;
- **mkdir:** criar pasta;
- **chmod:** mudar permissões;
- **sudo:** executar como administrador (**root**).

**Permissões:** **r** (ler) = 4, **w** (escrever) = 2, **x** (executar) = 1. Somam-se para o dono, o grupo e os outros.

> **Exemplo resolvido.** O que significa `chmod 754 arquivo`?
> Dono: 7 = 4 + 2 + 1 (**rwx**). Grupo: 5 = 4 + 1 (**r-x**). Outros: 4 (**r--**, só leitura).

### Sistemas de arquivos

- **NTFS:** padrão do Windows.
- **ext4:** padrão do Linux.
- **FAT32:** compatível com quase tudo, mas aceita arquivos de **até 4 GB**.

### Mais sobre o processador

- **Núcleos (cores):** um processador com vários núcleos executa várias tarefas ao mesmo tempo.
- **Frequência (clock):** medida em GHz; indica quantos ciclos o processador faz por segundo.
- **ULA (Unidade Lógica e Aritmética)** faz os cálculos; a **Unidade de Controle** coordena as operações; os **registradores** são as memórias internas, as mais rápidas de todas.
- **GPU (placa de vídeo):** processa imagens; muito usada em jogos e inteligência artificial.

### O Windows por dentro

- **Explorador de Arquivos:** gerencia pastas e arquivos (Win + E).
- **Lixeira:** guarda os arquivos excluídos de **discos locais**; arquivos apagados de **pendrives** e de rede geralmente **não** vão para a Lixeira.
- **Área de transferência:** guarda o que foi copiado ou recortado (Win + V mostra o histórico).
- **Gerenciador de Tarefas** (Ctrl + Shift + Esc): mostra os programas em execução e permite encerrá-los.
- **Configurações** e **Painel de Controle:** ajustes do sistema.
- **Extensões de arquivo** comuns: .docx (Word), .xlsx (Excel), .pptx (PowerPoint), .pdf, .txt, .jpg/.png (imagens), .mp3 (áudio), .mp4 (vídeo), .exe (executável), .zip (compactado).
- **Atalho** (ícone com seta): aponta para um arquivo; apagar o atalho **não** apaga o arquivo.
- Outros atalhos: **Win** (menu Iniciar), **Ctrl + Shift + Esc** (Gerenciador de Tarefas), **Print Screen** (captura de tela), **Win + Shift + S** (recorte de tela), **Ctrl + Alt + Del** (tela de segurança).

### Mais comandos do Linux

- **cat:** mostra o conteúdo de um arquivo; **grep:** procura texto; **find:** procura arquivos.
- **rmdir:** remove pasta vazia; **rm -r:** remove pasta com conteúdo.
- **chown:** muda o dono do arquivo; **ps:** lista processos; **kill:** encerra um processo.
- **man:** mostra o manual de um comando.
- O Linux diferencia **maiúsculas de minúsculas** (Arquivo.txt ≠ arquivo.txt).
- O usuário com todos os poderes é o **root**; o diretório raiz é **/**; a pasta do usuário fica em **/home**.
- **Distribuições** (versões do Linux): Ubuntu, Debian, Fedora, Linux Mint.

### Erros mais comuns

- Achar que a RAM guarda os arquivos permanentemente (ela é volátil).
- Confundir bits (velocidade de internet, Mbps) com bytes (tamanho de arquivos, MB).
- Usar Ctrl + A para "selecionar tudo" no Word em português (é Ctrl + T).
- Achar que Shift + Delete manda para a Lixeira (exclui direto).
- Esquecer a ordem rwx = 4, 2, 1 nas permissões do Linux.

### Como cai na prova

As bancas perguntam a função de cada componente, a hierarquia de memória, conversões de unidades, a classificação de periféricos, atalhos do Windows, comandos do Linux e o significado das permissões numéricas, além de conceitos de software livre e de sistemas de arquivos.

### Teste-se

1. Qual memória perde os dados quando o computador desliga?
2. Quantos bits tem 1 byte?
3. Qual atalho do Windows bloqueia o computador?
4. Qual comando do Linux mostra a pasta atual?
5. Que permissões dá o comando chmod 640?

> **Respostas.** 1) A **RAM** (volátil). 2) **8 bits**. 3) **Win + L**. 4) **pwd**. 5) Dono: 6 = **rw-** (ler e escrever); grupo: 4 = **r--** (só ler); outros: 0 = **---** (nenhuma).

### Para lembrar

- Hardware (físico) × software (lógico); sistema operacional gerencia tudo.
- CPU (processa), RAM (volátil, trabalho), ROM/BIOS (inicia), SSD/HD (armazena).
- Velocidade: registradores > cache > RAM > disco.
- 1 byte = 8 bits; K, M, G, T de 1 024 em 1 024; internet em Mbps (÷ 8 para MB/s).
- Atalhos: Ctrl + C/X/V/Z, Win + E/D/L, Alt + Tab, Alt + F4, Shift + Delete.
- Linux: ls, cd, pwd, cp, mv, rm, mkdir, chmod, sudo; r = 4, w = 2, x = 1.
