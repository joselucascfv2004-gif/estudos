---
titulo: Semelhança de triângulos e teorema de Tales
provas: ENEM, Militares
descricao: Casos de semelhança, razão de semelhança, teorema de Tales, bissetriz, relações métricas no triângulo retângulo e escalas.
fonte: Questão inédita gerada por computador (gabarito calculado)
---

<!-- Arquivo GERADO por scripts/gerar-questoes.mjs a partir de scripts/geradores/. Edite o gerador, não este arquivo. -->

# Semelhança de triângulos e teorema de Tales

Casos de semelhança, razão de semelhança, teorema de Tales, bissetriz, relações métricas no triângulo retângulo e escalas.

## Resumo

- **Triângulos semelhantes:** mesma forma, tamanhos diferentes. Ângulos correspondentes iguais e lados correspondentes proporcionais (razão k).
- **Casos de semelhança:** AA (dois ângulos iguais), LAL (dois lados proporcionais e o ângulo entre eles igual), LLL (três lados proporcionais).
- **Escala:** medidas lineares (lados, alturas, perímetros) multiplicam por k; áreas por k²; volumes por k³.
- **Paralela a um lado** forma um triângulo semelhante: se DE ∥ BC, então AD/AB = AE/AC = DE/BC. A base média mede metade do lado paralelo.
- **Teorema de Tales:** um feixe de paralelas corta as transversais em segmentos proporcionais.
- **Bissetriz interna:** divide o lado oposto em partes proporcionais aos lados adjacentes (BD/DC = AB/AC).
- **Triângulo retângulo** (hipotenusa a, catetos b e c, altura h, projeções m e n): h² = m·n; b² = a·m; c² = a·n; a·h = b·c.
- **Aplicações:** sombras (raios do Sol paralelos), maquetes e plantas, alturas inacessíveis, câmara escura.

## Fácil

### 1
<!-- modelo: f13 -->
No triângulo ABC, o segmento DE é paralelo a BC, com D em AB e E em AC. Sabendo que AD = AB/3 e que BC = 12 cm, quanto mede DE?

- A) 8 cm
- B) 5 cm
- C) 4 cm
- D) 36 cm
- E) 1,33 cm

**Resposta:** C

**Explicação:** Ferramenta: triângulo semelhante "dentro". DE ∥ BC faz o triângulo ADE ser semelhante a ABC, com razão AD/AB. DE = 12 ÷ 3 = 4 cm.

### 2
<!-- modelo: f1 -->
No mesmo instante, uma pessoa de 1,5 m de altura projeta uma sombra de 0,6 m, e um prédio projeta uma sombra de 15 m. Qual é a altura do prédio?

- A) 38,1 m
- B) 37,5 m
- C) 16,5 m
- D) 6 m
- E) 18,75 m

**Resposta:** B

**Explicação:** Ferramenta: triângulos semelhantes (raios de sol paralelos). Os raios do Sol chegam paralelos, então altura e sombra formam triângulos semelhantes: a razão altura/sombra é a mesma. 1,5/0,6 = H/15 ⇒ H = 37,5 m.

### 3
<!-- modelo: f11 -->
Num triângulo retângulo de hipotenusa 20 cm, a projeção de um dos catetos sobre a hipotenusa mede 7,2 cm. Quanto mede esse cateto?

- A) 12 cm
- B) 18,7 cm
- C) 12,8 cm
- D) 13 cm
- E) 13,6 cm

**Resposta:** A

**Explicação:** Ferramenta: relação métrica c² = a · n. Cada cateto ao quadrado é a hipotenusa vezes a projeção dele sobre ela. c² = 20 · 7,2 = 144 ⇒ c = 12 cm.

### 4
<!-- modelo: f14 -->
No mesmo instante, um adulto de 1,5 m projeta uma sombra de 2 m. Qual é o comprimento da sombra de uma criança de 1,2 m?

- A) 2,5 m
- B) 1,2 m
- C) 2,1 m
- D) 1,7 m
- E) 1,6 m

**Resposta:** E

**Explicação:** Ferramenta: razão sombra/altura constante. Para objetos verticais no mesmo instante, sombra/altura é a mesma. s = 1,2 · 2 / 1,5 = 1,6 m.

### 5
<!-- modelo: f8 -->
Num triângulo ABC, M e N são os pontos médios dos lados AB e AC. Se BC mede 22 cm, quanto mede MN?

- A) 22 cm
- B) 7,33 cm
- C) 11 cm
- D) 44 cm
- E) 5,5 cm

**Resposta:** C

**Explicação:** Ferramenta: base média. O segmento que liga os pontos médios de dois lados é paralelo ao terceiro e mede a metade dele (o triângulo AMN é semelhante a ABC com razão 1/2). 22 ÷ 2 = 11 cm.

### 6
<!-- modelo: f10 -->
Num triângulo retângulo, a altura relativa à hipotenusa divide-a em segmentos de 4 cm e 25 cm. Quanto mede essa altura?

- A) 100 cm
- B) 10 cm
- C) 11 cm
- D) 14,5 cm
- E) 21 cm

**Resposta:** B

**Explicação:** Ferramenta: relação métrica h² = m · n. A altura relativa à hipotenusa forma dois triângulos semelhantes; disso sai h² = m·n. h² = 4 · 25 = 100 ⇒ h = 10 cm.

### 7
<!-- modelo: f7 -->
Um triângulo tem ângulos de 40° e 70°. Outro triângulo tem ângulos de 70° e 70°. O que se pode afirmar sobre eles?

- A) só seriam semelhantes se tivessem um lado igual
- B) são congruentes (iguais)
- C) são semelhantes
- D) não são semelhantes
- E) são semelhantes só se forem retângulos

**Resposta:** C

**Explicação:** Ferramenta: caso AA. O terceiro ângulo do primeiro é 180° − 40° − 70° = 70°. Os dois têm os mesmos ângulos (40°, 70° e 70°). Dois ângulos iguais bastam para a semelhança (caso ângulo-ângulo). Não dá para dizer que são iguais, porque os tamanhos podem ser diferentes.

### 8
<!-- modelo: f6 -->
Um triângulo de área 11 cm² é ampliado de modo que todos os seus lados fiquem 2 vezes maiores. Qual é a área do triângulo ampliado?

- A) 15 cm²
- B) 44 cm²
- C) 132 cm²
- D) 22 cm²
- E) 88 cm²

**Resposta:** B

**Explicação:** Ferramenta: área cresce com k². Área é "comprimento × comprimento": se cada medida linear é multiplicada por k, a área é multiplicada por k². 11 × 2² = 44 cm².

### 9
<!-- modelo: f3 -->
Dois triângulos são semelhantes. Os lados do menor medem 8, 15 e 17; o lado do maior que corresponde ao de medida 17 mede 51. Qual é a razão de semelhança (maior ÷ menor)?

- A) 9
- B) 4
- C) 0,33
- D) 3
- E) 34

**Resposta:** D

**Explicação:** Ferramenta: razão de semelhança. Em figuras semelhantes, todas as medidas correspondentes são multiplicadas pelo mesmo número k. k = 51 ÷ 17 = 3.

### 10
<!-- modelo: f12 -->
Dois lotes vizinhos têm laterais paralelas entre si. Os fundos medem 24 m e 16 m numa rua, e a frente do primeiro lote, na outra rua, mede 30 m. Quanto mede a frente do segundo lote?

- A) 45 m
- B) 20 m
- C) 40 m
- D) 19 m
- E) 22 m

**Resposta:** B

**Explicação:** Ferramenta: teorema de Tales. As laterais paralelas cortam as duas ruas em segmentos proporcionais. 24/16 = 30/x ⇒ x = 16 · 30 / 24 = 20 m.

### 11
<!-- modelo: f17 -->
Os triângulos ABC e PQR são semelhantes, com A ↔ P, B ↔ Q e C ↔ R. Se  = 62° e B̂ = 60°, quanto mede o ângulo R̂?

- A) 58°
- B) 62°
- C) 118°
- D) 60°
- E) 90°

**Resposta:** A

**Explicação:** Ferramenta: semelhança conserva ângulos. Em triângulos semelhantes, ângulos correspondentes são iguais; R̂ corresponde a Ĉ. Ĉ = 180° − 62° − 60° = 58°.

### 12
<!-- modelo: f4 -->
Os triângulos ABC e DEF são semelhantes, com A ↔ D, B ↔ E e C ↔ F. Sabendo que AB = 9, DE = 13 e BC = 8, quanto mede EF?

- A) 104
- B) 5,54
- C) 12
- D) 11,56
- E) 12,56

**Resposta:** D

**Explicação:** Ferramenta: lados correspondentes proporcionais. AB corresponde a DE e BC corresponde a EF. 9/13 = 8/EF ⇒ EF = 8 · 13 / 9 = 11,56.

### 13
<!-- modelo: f15 -->
Uma foto de 10 cm × 15 cm será ampliada sem distorção, e o lado menor passará a medir 15 cm. Quanto medirá o lado maior?

- A) 24,5 cm
- B) 33,75 cm
- C) 22,5 cm
- D) 20 cm
- E) 9 cm

**Resposta:** C

**Explicação:** Ferramenta: ampliação sem distorção = semelhança. Os dois lados são multiplicados pelo mesmo fator. Fator 15 ÷ 10 = 1,5; 15 × 1,5 = 22,5 cm.

### 14
<!-- modelo: f9 -->
Uma maquete foi feita na escala 1 : 50. A altura de um prédio na maquete é 5 cm. Qual é a altura real do prédio?

- A) 0,25 m
- B) 25 m
- C) 250 m
- D) 3,5 m
- E) 2,5 m

**Resposta:** E

**Explicação:** Ferramenta: escala = razão de semelhança. Cada medida real é 50 vezes a da maquete. 5 cm × 50 = 250 cm = 2,5 m.

### 15
<!-- modelo: f5 -->
Um triângulo tem perímetro 36 cm. Outro triângulo, semelhante a ele, tem lados 3 vezes maiores. Qual é o perímetro do triângulo maior?

- A) 39 cm
- B) 54 cm
- C) 144 cm
- D) 324 cm
- E) 108 cm

**Resposta:** E

**Explicação:** Ferramenta: perímetro acompanha os lados. Se cada lado é multiplicado por k, a soma deles (o perímetro) também é. 36 × 3 = 108 cm.

### 16
<!-- modelo: f16 -->
Dois triângulos semelhantes têm lados correspondentes de 6 cm e 18 cm. A altura do menor, relativa a esse lado, mede 4 cm. Quanto mede a altura correspondente no maior?

- A) 72 cm
- B) 12 cm
- C) 1,33 cm
- D) 36 cm
- E) 16 cm

**Resposta:** B

**Explicação:** Ferramenta: todas as medidas lineares na mesma razão. Alturas, medianas e perímetros seguem a mesma razão dos lados. 4 × 3 = 12 cm.

### 17
<!-- modelo: f2 -->
Três retas paralelas cortam duas transversais. Na primeira transversal, os segmentos formados medem 3 cm e 6 cm. Na segunda, o segmento correspondente ao de 3 cm mede 6 cm. Quanto mede o outro?

- A) 9 cm
- B) 24 cm
- C) 3 cm
- D) 12 cm
- E) 13 cm

**Resposta:** D

**Explicação:** Ferramenta: teorema de Tales. Retas paralelas cortam as transversais em segmentos proporcionais. 3/6 = 6/x ⇒ x = 12 cm.

## Médio

### 1
<!-- modelo: m14 -->
Os catetos de um triângulo retângulo medem 9 m e 12 m. A altura relativa à hipotenusa divide-a em dois segmentos. Quanto mede o maior deles?

- A) 3 m
- B) 9,6 m
- C) 7,5 m
- D) 5,4 m
- E) 7,2 m

**Resposta:** B

**Explicação:** Ferramenta: projeções dos catetos. Hipotenusa = 15. O maior segmento é a projeção do maior cateto: c²/a. 144/15 = 9,6 m.

### 2
<!-- modelo: m3 -->
No triângulo ABC, AB = 5, AC = 10 e BC = 9. A bissetriz do ângulo  corta BC no ponto D. Quanto mede BD?

- A) 2,5
- B) 4
- C) 3
- D) 4,5
- E) 6

**Resposta:** C

**Explicação:** Ferramenta: teorema da bissetriz interna. A bissetriz divide o lado oposto em partes proporcionais aos lados adjacentes: BD/DC = AB/AC. BD = 9 · 5/(5 + 10) = 3.

### 3
<!-- modelo: m1 -->
No triângulo ABC, DE é paralelo a BC (D em AB e E em AC). Sabendo que DB = 24, AE = 6 e EC = 8, quanto mede AD?

- A) 32
- B) 19
- C) 18
- D) 2
- E) 22

**Resposta:** C

**Explicação:** Ferramenta: Tales no triângulo. A paralela a um lado divide os outros dois em partes proporcionais: AD/DB = AE/EC. AD/24 = 6/8 ⇒ AD = 24 · 6 / 8 = 18.

### 4
<!-- modelo: m2 -->
Um quadrado tem um lado sobre a base de um triângulo e os outros dois vértices sobre os demais lados. A base do triângulo mede 6 cm e a altura relativa a ela mede 12 cm. Quanto mede o lado do quadrado?

- A) 3 cm
- B) 6 cm
- C) 5 cm
- D) 4 cm
- E) 4,5 cm

**Resposta:** D

**Explicação:** Ferramenta: triângulo menor semelhante. Acima do quadrado sobra um triângulo semelhante ao original, de base l e altura 12 − l: l/6 = (12 − l)/12. l = 6 · 12 / (6 + 12) = 4 cm.

### 5
<!-- modelo: m8 -->
Dois postes verticais têm 12 m e 6 m de altura. Um cabo liga o topo de cada poste ao pé do outro. A que altura do chão os dois cabos se cruzam?

- A) 9 m
- B) 5 m
- C) 4 m
- D) 6 m
- E) 8,49 m

**Resposta:** C

**Explicação:** Ferramenta: duas semelhanças somadas. Chamando de h a altura do cruzamento, cada cabo forma triângulos semelhantes que dão h/a + h/b = 1 (não depende da distância entre os postes). h = 12 · 6/(12 + 6) = 4 m.

### 6
<!-- modelo: m12 -->
Deitada no chão, uma pessoa vê o topo de um bastão vertical de 2 m, a 4 m dela, alinhado com o topo de uma torre a 48 m dela. Qual é a altura da torre?

- A) 24 m
- B) 27 m
- C) 12 m
- D) 26 m
- E) 0,17 m

**Resposta:** A

**Explicação:** Ferramenta: triângulos com o mesmo vértice no olho. O bastão e a torre formam com o chão dois triângulos semelhantes, com vértice comum no olho. 2/4 = H/48 ⇒ H = 24 m.

### 7
<!-- modelo: m13 -->
Num feixe de retas paralelas, uma transversal é dividida em segmentos de 3 cm e 5 cm. Em outra transversal, o segmento total entre as mesmas paralelas mede 48 cm. Quanto mede a maior das duas partes nessa transversal?

- A) 24 cm
- B) 30 cm
- C) 80 cm
- D) 43 cm
- E) 18 cm

**Resposta:** B

**Explicação:** Ferramenta: Tales com a soma. As partes estão na razão 3 : 5, então o total 48 é dividido em 8 partes iguais. Cada parte vale 6; a maior é 5 × 6 = 30 cm.

### 8
<!-- modelo: m6 -->
Num triângulo retângulo, a hipotenusa mede 15 cm e um cateto mede 9 cm. Qual é a projeção desse cateto sobre a hipotenusa?

- A) 2,7 cm
- B) 11,62 cm
- C) 5,4 cm
- D) 9,6 cm
- E) 4,5 cm

**Resposta:** C

**Explicação:** Ferramenta: cateto² = hipotenusa × projeção. b² = a · n ⇒ n = b²/a. n = 81/15 = 5,4 cm.

### 9
<!-- modelo: m11 -->
Um reservatório real tem 200 litros de capacidade. Uma miniatura semelhante foi feita na escala 1 : 20. Qual é a capacidade da miniatura?

- A) 2,5 mL
- B) 10.000 mL
- C) 250 mL
- D) 500 mL
- E) 25 mL

**Resposta:** E

**Explicação:** Ferramenta: volume escala com o cubo. Dividindo cada medida por 20, o volume é dividido por 20³ = 8.000. 200 L = 200.000 mL; 200.000 ÷ 8.000 = 25 mL.

### 10
<!-- modelo: m4 -->
Dois triângulos semelhantes têm áreas 9 cm² e 25 cm². Um lado do menor mede 8 cm. Quanto mede o lado correspondente do maior?

- A) 10 cm
- B) 13,33 cm
- C) 15,33 cm
- D) 22,22 cm
- E) 16 cm

**Resposta:** B

**Explicação:** Ferramenta: razão das áreas = k². k² = 25/9 ⇒ k = 5/3. Lado = 8 × 5/3 = 13,33 cm.

### 11
<!-- modelo: m16 -->
Numa câmara escura de orifício, um objeto de 1,6 m de altura está a 8 m do orifício, e a caixa tem 30 cm de profundidade. Qual é a altura da imagem formada no fundo da caixa?

- A) 0,6 cm
- B) 60 cm
- C) 42,67 cm
- D) 6 cm
- E) 150 cm

**Resposta:** D

**Explicação:** Ferramenta: semelhança de triângulos opostos pelo vértice. Os raios passam pelo orifício e formam dois triângulos semelhantes: objeto/distância = imagem/profundidade. 160 cm / 800 cm = i / 30 cm ⇒ i = 6 cm.

### 12
<!-- modelo: m5 -->
Os catetos de um triângulo retângulo medem 8 cm e 15 cm. Quanto mede a altura relativa à hipotenusa?

- A) 7,06 cm
- B) 10,95 cm
- C) 8,06 cm
- D) 11,5 cm
- E) 8,5 cm

**Resposta:** A

**Explicação:** Ferramenta: a · h = b · c. A área pode ser calculada com os catetos (b·c/2) ou com a hipotenusa e a altura (a·h/2). A hipotenusa mede 17. h = 8 · 15 / 17 = 7,06 cm.

### 13
<!-- modelo: m7 -->
Uma lâmpada está no alto de um poste de 4,5 m. Uma pessoa de 1,5 m está a 8 m do pé do poste. Qual é o comprimento da sombra da pessoa?

- A) 2,67 m
- B) 4 m
- C) 14 m
- D) 5 m
- E) 16 m

**Resposta:** B

**Explicação:** Ferramenta: semelhança com a fonte de luz. O triângulo da pessoa (altura 1,5, base s) é semelhante ao do poste (altura 4,5, base 8 + s). 1,5/s = 4,5/(8 + s) ⇒ 3s = 12 ⇒ s = 4 m.

### 14
<!-- modelo: m17 -->
Numa planta na escala 1 : 100, uma sala quadrada aparece com 11 cm de lado. Qual é a área real da sala?

- A) 123 m²
- B) 1.210 m²
- C) 242 m²
- D) 11 m²
- E) 121 m²

**Resposta:** E

**Explicação:** Ferramenta: converter o lado antes de elevar. O lado real é 11 × 100 = 1100 cm = 11 m. Área = 11² = 121 m².

### 15
<!-- modelo: m10 -->
Um trapézio tem bases de 10 cm e 15 cm. Pelo ponto de encontro das diagonais, traça-se um segmento paralelo às bases, de um lado ao outro. Quanto mede esse segmento?

- A) 5 cm
- B) 12 cm
- C) 13 cm
- D) 12,5 cm
- E) 12,25 cm

**Resposta:** B

**Explicação:** Ferramenta: semelhança dupla (média harmônica). Os triângulos formados pelas diagonais são semelhantes; cada metade do segmento vale ab/(a + b). Segmento = 2 · 10 · 15/(10 + 15) = 12 cm.

### 16
<!-- modelo: m9 -->
Num mapa na escala 1 : 1.000, um terreno ocupa 5 cm². Qual é a área real do terreno?

- A) 5.000 m²
- B) 0,5 m²
- C) 50 m²
- D) 750 m²
- E) 500 m²

**Resposta:** E

**Explicação:** Ferramenta: área escala com o quadrado. Cada cm do mapa vale 1.000 cm reais, então cada cm² vale 1.000² cm². 5 × 1.000.000 cm² = 5.000.000 cm² = 500 m².

### 17
<!-- modelo: m15 -->
Dois triângulos semelhantes têm perímetros de 30 cm e 45 cm. A área do menor é 80 cm². Qual é a área do maior?

- A) 90 cm²
- B) 270 cm²
- C) 120 cm²
- D) 180 cm²
- E) 95 cm²

**Resposta:** D

**Explicação:** Ferramenta: razão das áreas = (razão dos perímetros)². k = 45/30 = 1,5; as áreas ficam multiplicadas por k² = 2,25. 80 × 2,25 = 180 cm².

## Difícil

### 1
<!-- modelo: d6 -->
Os pontos médios dos lados de um triângulo de área 60 cm² são ligados, formando um triângulo menor. Qual é a área do triângulo menor?

- A) 7,5 cm²
- B) 15 cm²
- C) 30 cm²
- D) 20 cm²
- E) 45 cm²

**Resposta:** B

**Explicação:** Ferramenta: base média. Cada lado do triângulo menor é metade de um lado do original: são semelhantes com razão 1/2. Área = 60 × (1/2)² = 15 cm². (O triângulo grande fica dividido em 4 triângulos iguais.)

### 2
<!-- modelo: d7 -->
Um retângulo tem a base sobre a base de um triângulo (base 10 cm, altura 16 cm) e os outros dois vértices sobre os demais lados. Qual é a maior área possível do retângulo?

- A) 20 cm²
- B) 80 cm²
- C) 40 cm²
- D) 26 cm²
- E) 53,33 cm²

**Resposta:** C

**Explicação:** Ferramenta: semelhança + vértice da parábola. Se o retângulo tem altura y, a largura é 10(1 − y/16) (semelhança). A área 10y(1 − y/16) é máxima em y = 8. Largura 5, altura 8: área 40 cm², metade da área do triângulo.

### 3
<!-- modelo: d8 -->
Um apartamento tem 48 m² de área. Numa planta na escala 1 : 50, qual é a área que ele ocupa?

- A) 9.600 cm²
- B) 192 cm²
- C) 19,2 cm²
- D) 96 cm²
- E) 1.920 cm²

**Resposta:** B

**Explicação:** Ferramenta: área divide por e². Na escala 1 : 50, as áreas ficam divididas por 50² = 2.500. 48 m² = 480.000 cm²; ÷ 2.500 = 192 cm².

### 4
<!-- modelo: d1 -->
Um triângulo retângulo tem catetos de 6 cm e 12 cm. Um quadrado é desenhado com um vértice no ângulo reto, dois lados sobre os catetos e o vértice oposto sobre a hipotenusa. Quanto mede o lado do quadrado?

- A) 5 cm
- B) 4,5 cm
- C) 6 cm
- D) 4 cm
- E) 3 cm

**Resposta:** D

**Explicação:** Ferramenta: semelhança com o triângulo que sobra. O triângulo acima do quadrado é semelhante ao original: (6 − s)/s = 6/12. s = 6 · 12/(6 + 12) = 4 cm.

### 5
<!-- modelo: d3 -->
Um triângulo tem altura de 8 cm. Uma reta paralela à base divide o triângulo em duas regiões de mesma área. A que distância do vértice oposto à base passa essa reta?

- A) 2√2 cm
- B) 4 cm
- C) 4√2 cm
- D) 6 cm
- E) 4√3 cm

**Resposta:** C

**Explicação:** Ferramenta: área escala com k². O triângulo de cima é semelhante ao inteiro e deve ter metade da área: k² = 1/2 ⇒ k = 1/√2 = √2/2. Distância = 8 · √2/2 = 4√2 cm.

### 6
<!-- modelo: d13 -->
Num feixe de paralelas, uma transversal tem segmentos consecutivos de medidas x + 2 e 4x, e a outra tem os segmentos correspondentes de 12 e 24. Qual é o valor de x?

- A) 6
- B) 4
- C) 1
- D) 3
- E) 2

**Resposta:** E

**Explicação:** Ferramenta: Tales com álgebra. (x + 2)/(4x) = 12/24. Multiplique em cruz e resolva. 24(x + 2) = 12 · 4x ⇒ x = 2.

### 7
<!-- modelo: d10 -->
Para medir a largura de um rio sem atravessá-lo, um topógrafo marca na margem os pontos A e C, alinhados com uma árvore na outra margem, e monta dois triângulos semelhantes. Ele obtém: o lado menor mede 12 m e corresponde à base de 24 m do maior; o lado de 9 m do menor corresponde à largura do rio. Qual é a largura do rio?

- A) 18 m
- B) 20 m
- C) 21 m
- D) 4,5 m
- E) 32 m

**Resposta:** A

**Explicação:** Ferramenta: semelhança para medir o inacessível. Os lados correspondentes dos dois triângulos estão na mesma razão. largura/9 = 24/12 ⇒ largura = 18 m.

### 8
<!-- modelo: d14 -->
Num triângulo ABC, AB = 10, AC = 15 e BC = 20. A bissetriz interna de  encontra BC em D. Quanto mede DC?

- A) 10
- B) 13
- C) 5
- D) 8
- E) 12

**Resposta:** E

**Explicação:** Ferramenta: teorema da bissetriz interna. BD/DC = AB/AC: o lado maior fica com a parte maior. DC = 20 · 15/(10 + 15) = 12.

### 9
<!-- modelo: d2 -->
As diagonais de um trapézio dividem-no em quatro triângulos. O triângulo junto à base menor tem área 36 cm², e as bases estão na razão 3 : 4. Qual é a área do trapézio?

- A) 588 cm²
- B) 196 cm²
- C) 100 cm²
- D) 148 cm²
- E) 192 cm²

**Resposta:** B

**Explicação:** Ferramenta: triângulos semelhantes e mesma altura. O triângulo junto à base maior é semelhante ao da menor, com razão 4/3: área 36 × (4/3)² = 64. Os dois laterais têm área igual a √(36 · 64) = 48 cada. Total: 36 + 64 + 2 · 48 = 196 cm².

### 10
<!-- modelo: d4 -->
Uma pirâmide de volume 960 cm³ é cortada por um plano paralelo à base, a um terço da altura, medida a partir do vértice. Qual é o volume da pirâmide pequena que fica no topo?

- A) 35,56 cm³
- B) 106,67 cm³
- C) 320 cm³
- D) 924,44 cm³
- E) 71,11 cm³

**Resposta:** A

**Explicação:** Ferramenta: volume escala com k³. A pirâmide de cima é semelhante à inteira, com razão k = 1/3. Volume = 960 × (1/3)³ = 960/27 = 35,56 cm³.

### 11
<!-- modelo: d11 -->
Um slide de 3,6 cm × 2,4 cm, a 10 cm da lente, é projetado numa tela a 3 m da lente. Qual é a área da imagem na tela?

- A) 1,56 m²
- B) 0,39 m²
- C) 0,78 m²
- D) 0,03 m²
- E) 1,8 m²

**Resposta:** C

**Explicação:** Ferramenta: ampliação linear k, área k². As medidas são ampliadas por k = 300/10 = 30. 1,08 m × 0,72 m = 0,78 m².

### 12
<!-- modelo: d5 -->
Uma criança de 1,2 m caminha a 1,5 m/s, afastando-se de um poste com uma lâmpada a 3,6 m de altura. Com que velocidade a ponta da sua sombra se move no chão?

- A) 2,25 m/s
- B) 4,5 m/s
- C) 0,5 m/s
- D) 1,5 m/s
- E) 0,75 m/s

**Resposta:** A

**Explicação:** Ferramenta: semelhança vale a cada instante. Se a criança está a x m do poste, a ponta da sombra fica a p = x · 3,6/(3,6 − 1,2) m. A posição da ponta é proporcional à da criança. v = 1,5 × 3,6/2,4 = 2,25 m/s.

### 13
<!-- modelo: d9 -->
Num triângulo retângulo, a altura relativa à hipotenusa mede 4 cm e um dos segmentos que ela determina na hipotenusa mede 2 cm. Quanto mede o maior cateto?

- A) 4,47 cm
- B) 10 cm
- C) 8,94 cm
- D) 10,94 cm
- E) 8 cm

**Resposta:** C

**Explicação:** Ferramenta: h² = m · n. 4² = 2 · n ⇒ n = 8; a hipotenusa é 2 + 8 = 10. Maior cateto: √(10 · 8) = 8,94 cm.

### 14
<!-- modelo: d12 -->
Qual destes pares de triângulos é sempre semelhante?

- A) dois triângulos retângulos quaisquer
- B) dois triângulos isósceles quaisquer
- C) dois triângulos equiláteros quaisquer
- D) dois triângulos de mesma área
- E) dois triângulos de mesmo perímetro

**Resposta:** C

**Explicação:** Ferramenta: ângulos iguais. Triângulos equiláteros têm sempre os três ângulos de 60°, então são semelhantes (caso AA). Isósceles e retângulos podem ter ângulos diferentes (um retângulo pode ter ângulos de 30° e 60°, e outro de 45° e 45°), e área ou perímetro iguais não garantem a mesma forma.

### 15
<!-- modelo: d15 -->
Um triângulo tem área 48 cm² e perímetro 18 cm. Um triângulo semelhante a ele tem área 192 cm². Qual é o perímetro do segundo?

- A) 72 cm
- B) 54 cm
- C) 20 cm
- D) 36 cm
- E) 18 cm

**Resposta:** D

**Explicação:** Ferramenta: da área para os lados. A razão das áreas é 4, então a razão dos lados (e dos perímetros) é √4 = 2. 18 × 2 = 36 cm.

### 16
<!-- modelo: d16 -->
Uma pessoa, com os olhos a 1,8 m do chão, vê o topo de uma árvore refletido num pequeno espelho no chão. O espelho está a 2,5 m da pessoa e a 30 m da árvore. Qual é a altura da árvore?

- A) 41,67 m
- B) 21,6 m
- C) 0,15 m
- D) 10,8 m
- E) 23,4 m

**Resposta:** B

**Explicação:** Ferramenta: reflexão forma triângulos semelhantes. O ângulo de incidência é igual ao de reflexão, então os triângulos pessoa-espelho e árvore-espelho são semelhantes. 1,8/2,5 = H/30 ⇒ H = 21,6 m.
