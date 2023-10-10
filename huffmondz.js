function Node(freq,letter,used,code,father){
	this.freq=freq;
	this.letter=letter;
	this.used=used;
	this.code=code;
	this.father=father;
}

let str=require('fs').readFileSync('text.txt');
str=str.toString();

let alph= new Object();

for(let i=0;i<str.length;i++){
	if (alph[str.charAt(i)])
		alph[str.charAt(i)]++
	else
		alph[str.charAt(i)]=1;
}

let tree=new Array();

for(let i in alph){
	let n = new Node(alph[i],i,0,undefined,"");
	tree.push(n);
}

let father1=(Object.keys(alph)).join('')
let alph_values=(Object.values(alph))
alph_values.sort((a, b) => b - a);
let last_maxelem=0
let last_code=""

for(let i=0;i<tree.length;i++){
	if (tree.find(a => a.used==1)!=undefined){
		k=tree.find(a => (a.freq==Math.max.apply(null,Object.values(alph_values)))&& (a.used==0))
		if (i==tree.length-1){
			k.code="1"+last_code.slice(0,-1)
			k.father=father1
		}
		else{
			k.code="1"+last_code
			father1=father1.replace(last_letter,'')
			k.father=father1
			last_letter=k.letter
		}
		k.used=1
		alph_values=alph_values.slice(1,)
		last_maxelem=k.freq
		last_code=k.code
	}
	else{
		k=tree.find(a => a.freq==Math.max.apply(null,Object.values(alph_values)))
		k.code="0"
		k.used=1
		k.father=father1
		last_letter=k.letter
		last_code=k.code
		last_maxelem=k.freq
		alph_values=alph_values.slice(1,)
	}
	
}
console.log(tree)

let res=""
for (let i=0;i<str.length;i+=1){
	res+=tree.find(a => a.letter==str[i]).code
}
const fs = require("fs");
fs.writeFile("code.txt", res, function(error){
    if(error) throw error;
});
