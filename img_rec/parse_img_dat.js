/* Image recognition */

var img = document.getElementById("img2");

var canvas = document.getElementById("canv");
var canv = canvas.getContext("2d");

canv.drawImage(img,0,0);

var img_dat = canv.getImageData(0,0,28,28);

console.log(img_dat);

var dat = new Vector([4,784]);
dat.arrange(img_dat.data);

var fill_arr = [];

for(var i = 0; i<784; i++){
	for(var j=0; j<4; j++){
     		fill_arr.push(dat.array[j][i]);
	}
}

var img_vect = new Vector([784,4]);
img_vect.arrange(fill_arr);
console.log(img_vect);

// PAN Application No. : U-N001668015