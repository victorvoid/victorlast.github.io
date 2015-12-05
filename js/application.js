var div = document.getElementById('mensagem');
var texto = "A cada dia que passa, eu percebo que não sei nada. ಠ_ಠ'";
var typer;	
function escrever(str, el) {
var char = str.split('').reverse();
 	typer = setInterval(function () {
    if (!char.length) return clearInterval(typer);
    var next = char.pop();
    el.innerHTML += next;
}, 50);
}
escrever(texto, div);
function quemsou(){
	div.innerHTML = "";
	clearInterval(typer);
	var msgQuem = "Entusiasta em desenvolvimento Web e Mobile ♥ amo tecnologia e música instrumental, sou guitarrista e compositor. ٩(•̮̮̃•̃)۶";
	escrever(msgQuem, div);
}
function tags(){
	div.innerHTML = "";
	clearInterval(typer);
	div.innerHTML = "<ul><li><a href='/tags/#jsbemean'>#jsbemean</a></li><li><a href='/tags/#mongobemean' >#mongobemean</a></li><li><a href='/tags/#androidUdemy'>#androidUdemy</a></li><li><a href='/tags/#php'> #php</a></li><li><a href='/tags/#victorigor'>#victorigor</a></li></ul>";
}
