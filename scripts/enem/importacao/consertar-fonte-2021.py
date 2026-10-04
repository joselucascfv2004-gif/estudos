# Reescreve o ToUnicode das fontes com /Differences cheias de nomes /gNN (índice de glifo do Arial,
# que segue a ordem padrão Macintosh de 258 glifos) e grava uma cópia do PDF com texto legível.
import pymupdf, re, sys, json, unicodedata
MAC = '''.notdef .null nonmarkingreturn space exclam quotedbl numbersign dollar percent ampersand quotesingle parenleft parenright asterisk plus comma hyphen period slash zero one two three four five six seven eight nine colon semicolon less equal greater question at A B C D E F G H I J K L M N O P Q R S T U V W X Y Z bracketleft backslash bracketright asciicircum underscore grave a b c d e f g h i j k l m n o p q r s t u v w x y z braceleft bar braceright asciitilde Adieresis Aring Ccedilla Eacute Ntilde Odieresis Udieresis aacute agrave acircumflex adieresis atilde aring ccedilla eacute egrave ecircumflex edieresis iacute igrave icircumflex idieresis ntilde oacute ograve ocircumflex odieresis otilde uacute ugrave ucircumflex udieresis dagger degree cent sterling section bullet paragraph germandbls registered copyright trademark acute dieresis notequal AE Oslash infinity plusminus lessequal greaterequal yen mu partialdiff summation product pi integral ordfeminine ordmasculine Omega ae oslash questiondown exclamdown logicalnot radical florin approxequal Delta guillemotleft guillemotright ellipsis nonbreakingspace Agrave Atilde Otilde OE oe endash emdash quotedblleft quotedblright quoteleft quoteright divide lozenge ydieresis Ydieresis fraction currency guilsinglleft guilsinglright fi fl daggerdbl periodcentered quotesinglbase quotedblbase perthousand Acircumflex Ecircumflex Aacute Edieresis Egrave Iacute Icircumflex Idieresis Igrave Oacute Ocircumflex apple Ograve Uacute Ucircumflex Ugrave dotlessi circumflex tilde macron breve dotaccent ring cedilla hungarumlaut ogonek caron Lslash lslash Scaron scaron Zcaron zcaron brokenbar Eth eth Yacute yacute Thorn thorn minus multiply onesuperior twosuperior threesuperior onehalf onequarter threequarters franc Gbreve gbreve Idotaccent Scedilla scedilla Cacute cacute Ccaron ccaron dcroat'''.split()
# nomes -> caractere (Adobe Glyph List, só os usados)
ESP = {'space': ' ', 'exclam': '!', 'quotedbl': '"', 'numbersign': '#', 'dollar': '$', 'percent': '%', 'ampersand': '&', 'quotesingle': "'",
  'parenleft': '(', 'parenright': ')', 'asterisk': '*', 'plus': '+', 'comma': ',', 'hyphen': '-', 'period': '.', 'slash': '/', 'colon': ':',
  'semicolon': ';', 'less': '<', 'equal': '=', 'greater': '>', 'question': '?', 'at': '@', 'bracketleft': '[', 'backslash': '\\', 'bracketright': ']',
  'asciicircum': '^', 'underscore': '_', 'grave': '`', 'braceleft': '{', 'bar': '|', 'braceright': '}', 'asciitilde': '~',
  'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
  'dagger': '†', 'degree': '°', 'cent': '¢', 'sterling': '£', 'section': '§', 'bullet': '•', 'paragraph': '¶', 'germandbls': 'ß', 'registered': '®',
  'copyright': '©', 'trademark': '™', 'acute': '´', 'dieresis': '¨', 'notequal': '≠', 'AE': 'Æ', 'Oslash': 'Ø', 'infinity': '∞', 'plusminus': '±',
  'lessequal': '≤', 'greaterequal': '≥', 'yen': '¥', 'mu': 'µ', 'partialdiff': '∂', 'summation': '∑', 'product': '∏', 'pi': 'π', 'integral': '∫',
  'ordfeminine': 'ª', 'ordmasculine': 'º', 'Omega': 'Ω', 'ae': 'æ', 'oslash': 'ø', 'questiondown': '¿', 'exclamdown': '¡', 'logicalnot': '¬',
  'radical': '√', 'florin': 'ƒ', 'approxequal': '≈', 'Delta': 'Δ', 'guillemotleft': '«', 'guillemotright': '»', 'ellipsis': '…', 'nonbreakingspace': ' ',
  'OE': 'Œ', 'oe': 'œ', 'endash': '–', 'emdash': '—', 'quotedblleft': '“', 'quotedblright': '”', 'quoteleft': '‘', 'quoteright': '’', 'divide': '÷',
  'lozenge': '◊', 'fraction': '⁄', 'currency': '¤', 'guilsinglleft': '‹', 'guilsinglright': '›', 'fi': 'fi', 'fl': 'fl', 'daggerdbl': '‡',
  'periodcentered': '·', 'quotesinglbase': '‚', 'quotedblbase': '„', 'perthousand': '‰', 'dotlessi': 'ı', 'circumflex': 'ˆ', 'tilde': '˜',
  'macron': '¯', 'breve': '˘', 'dotaccent': '˙', 'ring': '˚', 'cedilla': '¸', 'hungarumlaut': '˝', 'ogonek': '˛', 'caron': 'ˇ', 'brokenbar': '¦',
  'minus': '−', 'multiply': '×', 'onesuperior': '¹', 'twosuperior': '²', 'threesuperior': '³', 'onehalf': '½', 'onequarter': '¼', 'threequarters': '¾',
  'Eth': 'Ð', 'eth': 'ð', 'Thorn': 'Þ', 'thorn': 'þ', 'Lslash': 'Ł', 'lslash': 'ł', 'franc': '₣', 'dcroat': 'đ', 'Idotaccent': 'İ'}
ACENTO = {'dieresis': '̈', 'ring': '̊', 'cedilla': '̧', 'acute': '́', 'grave': '̀', 'circumflex': '̂', 'tilde': '̃',
  'caron': '̌', 'breve': '̆', 'slash': ''}
def nome2u(n):
    if n in ESP: return ESP[n]
    if len(n) == 1 and n.isalpha(): return n
    m = re.match(r'^uni([0-9A-F]{4})$', n)
    if m: return chr(int(m.group(1), 16))
    for ac, comb in ACENTO.items():
        if n.endswith(ac) and len(n) == len(ac) + 1 and comb:
            return unicodedata.normalize('NFC', n[0] + comb)
    if n in ('Ydieresis', 'ydieresis'): return unicodedata.normalize('NFC', n[0] + '̈')
    return None
def glifo(n):
    m = re.match(r'^g(\d+)$', n)
    if m:
        k = int(m.group(1))
        # o Arial do Windows não tem "nonbreakingspace" (172) nem "apple" (210) da ordem Macintosh
        k = k + 2 if k >= 209 else k + 1 if k >= 172 else k
        return nome2u(MAC[k]) if k < len(MAC) else f'⟨g{m.group(1)}⟩'
    return nome2u(n)
semMapa = {}
def consertar(entrada, saida):
    doc = pymupdf.open(entrada)
    feitos = set()
    for p in doc:
        for f in p.get_fonts():
            x = f[0]
            if x in feitos: continue
            feitos.add(x)
            o = doc.xref_object(x)
            me = re.search(r'/Encoding (\d+) 0 R', o)
            if not me: continue
            enc = doc.xref_object(int(me.group(1)))
            md = re.search(r'/Differences \[(.*?)\]', enc, re.S)
            if not md or '/g' not in md.group(1): continue
            mapa, cod = {}, 0
            for tok in md.group(1).split():
                if tok.isdigit(): cod = int(tok); continue
                u = glifo(tok[1:])
                if u is None: semMapa.setdefault(f[3], set()).add(tok)
                else: mapa[cod] = u
                cod += 1
            linhas = ''.join(f'<{c:02x}> <{"".join(f"{ord(ch):04X}" for ch in u)}>\n' for c, u in sorted(mapa.items()))
            cmap = ('/CIDInit /ProcSet findresource begin 12 dict begin begincmap /CIDSystemInfo << /Registry (Adobe) /Ordering (UCS) /Supplement 0 >> def\n'
                    '/CMapName /Adobe-Identity-UCS def /CMapType 2 def\n1 begincodespacerange <00> <ff> endcodespacerange\n'
                    f'{len(mapa)} beginbfchar\n{linhas}endbfchar\nendcmap CMapName currentdict /CMap defineresource pop end end')
            mt = re.search(r'/ToUnicode (\d+) 0 R', o)
            if mt: doc.update_stream(int(mt.group(1)), cmap.encode())
            else:
                nx = doc.get_new_xref(); doc.update_object(nx, '<<>>'); doc.update_stream(nx, cmap.encode())
                doc.xref_set_key(x, 'ToUnicode', f'{nx} 0 R')
            print(entrada, f[3], len(mapa), 'códigos')
    doc.save(saida, garbage=1)
# uso: python3 consertar-fonte-2021.py  (pip install pymupdf; PDFs do INEP na mesma pasta)
consertar('2021_PV_impresso_D1_CD1.pdf', '2021_PV_fix_D1_CD1.pdf')
consertar('2021_PV_impresso_D2_CD5.pdf', '2021_PV_fix_D2_CD5.pdf')
print('sem mapa:', semMapa)
