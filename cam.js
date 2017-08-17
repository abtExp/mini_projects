const video = document.getElementById('vd'),
    canv = document.getElementById('canv'),
    canv2 = document.getElementById('canv2'),
    ctx = canv.getContext('2d'),
    ctx2 = canv2.getContext('2d');

window.onload = cam;

function cam() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                width: 500,
                height: 500
            }
        })
        .then(stream => {
            video.src = URL.createObjectURL(stream);
            video.onloadedmetadata = video.play();
            setInterval(_ => {
                ctx.drawImage(video, 0, 0, 500, 500);
                draw();
            }, 100);
            // setInterval(draw, 1000);
        })
}

function draw() {
    const imgi = ctx.getImageData(0, 0, 500, 500);
    console.log(imgi.data);
    let data = imgi.data;
    console.log(data);
    data = core.clip(data, 200, 210);
    console.log(data);
    data = core.form_arr(data, 'uint8clamped');
    console.log(data);
    let img = new ImageData(data, 500, 500);
    createImageBitmap(img, 0, 0, 500, 500)
        .then(im => {
            ctx2.drawImage(im, 500, 500);
        });
}