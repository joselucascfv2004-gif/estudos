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
