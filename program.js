///programul incepe de aici, dupa ce este selectat un fisier care va fi citit:
function process(event) {
///declaram variabilele: un vector cu care vom contoriza aparitiile fiecarei litere;
///variabile pentru a citi fisierul; initializam vectorul, cu literele in ordine
  var ch;
  var letters=33;
  var counts = {};
  var isWord=0, wordCount=0;
  var str='a\u0103\u00E2bcdefghi\u00EEjklmnopqrs\u0219\u015Ft\u021B\u0163uvwxyz';
  for (let j=0; j<str.length; j++) {
	ch=str[j];
	count = counts[ch];
///initializam contorul pentru litera respectiva;
///si adaugam cu 1, apoi o scadem cu 1;
	counts[ch] = count ? count + 1 : 1;
	counts[ch]--;
	}
///initializam citirea de fisier;
  var files = event.target.files
  var reader = new FileReader()
  reader.onload = function() {
///dupa ce citim fisierul, declaram niste contoare pentru fiecare caracter citit,
///respectiv fiecare litera citita;
    var contents = this.result;
    var total_char_count=0,char_count=0,biggest=0;
///luam fiecare caracter din fisier, folosind un subsir de marimea 1,
///ne asiguram ca este litera mica (ca sa nu il contorizam ca litera mare);
    for (let j = 0; j < contents.length; j++) {
	  ch=contents.substr(j, 1);
	  ch=ch.toLowerCase();
///comparam caracterul cu toate literele din alfabetul romanesc
///de la a la z si cu [șțăâî]: daca e din alfabet, incrementam cu 1 contorul literei;
///(exista 2 notatii pentru șț: cu virgula legata sau separata de litera)  
	  if (/[a-z]|\u0219|\u015F|\u021B|\u0163|\u0103|\u00E2|\u00EE/.test(ch)){
		  isWord=1;
///incrementam contorul literei respective cu 1;
	  counts[ch]++;
	  
///incrementam nr total de litere, daca e litera;
///si numarul de cuvinte (valide)
	  char_count++;
	  }
	  else{
		  if (isWord===1){
			  isWord=0;
			  wordCount++;
		  }
	  }
///incrementam nr total de caractere;
      total_char_count++;
    }
///afisam in consola, in ordine, fiecare contor al literelor din alfabetul romanesc
///de asemenea, generam in html si un tabel cu datele respective: numarul de afisari
///pentru fiecare litera, procentajul aparitiei literei si numarul total de caractere si de litere
///plus alte calcule pentru a obtine chestii precum eficienta, redundanta, entropia etc.
	var percentage={};
	var total_percentage=0.000,entropy=0.000,entropy_add=0.000;
	var one_equal='no';
	document.write("<html><head><link rel='stylesheet' href='style.css'></head><body style='width:320px;'><h1>Text analysis on the Romanian alphabet:</h1><br><table><tr><th>Litera</th><th>Afisari</th><th>Procent Aparitie</th><th>Cod Huffman</th></tr>");
	for (ch in counts) {
		if (biggest<=counts[ch]) biggest=counts[ch];
		percentage[ch]=counts[ch]/char_count + 0.000;
		total_percentage+=percentage[ch]
		if (percentage[ch]!=0){
			entropy+=percentage[ch]*(Math.log2(0.000+(1/percentage[ch])));}
		if (counts[ch]===0){
			letters--;}
	}
	if (total_percentage >0.99 && total_percentage <1.01) one_equal='yes';
	var lungimeMedie=(0.000+(char_count/wordCount));
	var lungimeMinima=(0.000+(entropy/Math.log2(wordCount)));
	var efficiency=0.000+(lungimeMinima/lungimeMedie);
	var redundancy=1-efficiency;
	var shannon="no";
	if (lungimeMinima<=lungimeMedie<(lungimeMinima+1)){
		shannon="yes";
	}
	
	
	
///huffman

class HuffmanNode
{
    constructor()
    {
        this.data = 0;
        this.c = '';
        this.left = this.right = null;
    }
}
	var huffcode={};
    function printCode(root,s)
    {
        if (root.left == null
            && root.right == null
            && (root.c).toLowerCase() != (root.c).toUpperCase()) {
			huffcode[root.c]=s;
            return;
        }
        printCode(root.left, s + "0");
        printCode(root.right, s + "1");
    }
	
        let n = letters;
		var charArray = [];
        var charfreq = [];
		let k=0;
		for (ch in counts){
			if (counts[ch]!=0){
			charArray[k]=ch;
			charfreq[k]=counts[ch];
			k++;
			}
		}
        let q = [];
        for (let i = 0; i < n; i++) {
            let hn = new HuffmanNode();
    
            hn.c = charArray[i];
            hn.data = charfreq[i];
    
            hn.left = null;
            hn.right = null;
            q.push(hn);
        }
        let root = null;
          q.sort(function(a,b){return a.data-b.data;});
        while (q.length > 1) {
            let x = q[0];
            q.shift();
            let y = q[0];
            q.shift();
            let f = new HuffmanNode();
            f.data = x.data + y.data;
            f.c = '-';
            f.left = x;
            f.right = y;
            root = f;
            q.push(f);
            q.sort(function(a,b){return a.data-b.data;});
        }
        printCode(root, "");
		
	
	///output
	for (ch in counts){
		document.write("<tr><td>"+ch+"</td><td>"+counts[ch]+"</td><td>"+percentage[ch]+"</td><td>"+huffcode[ch]+"</td></tr>");
	}
	document.write("<br><tr><td>char_count</td><td>"+char_count+"</td><td>total_percentage:</td><td>"+total_percentage+"</td></tr>");
	document.write("<tr><td>total_char_count</td><td>"+total_char_count+"</td><td>within <1% margin of error?</td><td>"+one_equal+"</td></tr>");
	document.write("<tr><td>letter entropy: </td><td>"+entropy+"</td><td>efficiency:</td><td>"+efficiency+"</td></tr>");
	document.write("<tr><td>average word length: </td><td>"+lungimeMedie+"</td><td>redundancy:</td><td>"+redundancy+"</td></tr>");
	document.write("<tr><td>minimum word length:</td><td>"+lungimeMinima+"</td><td>Shannon's 1st Theorem verified?</td><td>"+shannon+"</td></tr>");
	document.write("</table></body></html>");
  }
  ///pentru citirea textului, parte din executie
  reader.readAsText(files[0])
}
var input = document.querySelector('.file')
input.addEventListener('change', process, false)
