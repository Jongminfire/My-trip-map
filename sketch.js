var bgm;
var clickon;
var clickoff;
var splaymode;
var sspeed;
var smonth;
var sflag;

let font;
let myMap;
let canvas;
var festival;
var time = 0;
var time2 = 0;
var range = 0;      //범위 시작
var range2 = 0;     //범위 끝
var cal = 0;
var sound = 1;

var speed = 1;
var fscale = 2;      //축제 규모


var bheight = 43.3;    //버튼 높이값   

var playmode = 1;    //1=플레이, 2=일시정지, 5=월별
let ikon = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let favorite = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var fsize=0;
let dist = 0;
var reset = 0;
let all = 0;    //모든 카테고리 선택

var month = 1;
var days = 1;
var days2 = 1;
var showmodel = 0;

let flower;
let fish;
let sun1;
let sun2;
let fire;
let people;
let summer;
let gift;
let light;
let maple;
let snow;
let movie;
let music;
let local;
let culture;
let history;
let allb;
let postit;
let soundoff;
let soundon;

function preload() {
	festival = loadJSON("festival.json", gotData);
  	bgm = loadSound('Happy Life.mp3');
    font=loadFont('YunTaemin.ttf');
}

function gotData(data) {
	print(data);
	spaceData = data;
}

function mouseReleased()
{
	if (mouseX > 10 && mouseX <= 53 && mouseY < 645 && mouseY>620)
	{
		if (speed >= 0.4&& speed <= 1)
			speed -= 0.2;
		else if (speed > 0 && speed < 0.4)
			speed = -1;
		else if (speed > -15)
		{
			speed--;
			speed = round(speed);
		}
	}

	if (mouseX > 77 && mouseX < 112 && mouseY < 645 && mouseY>620)
	{
		if (speed >= 0.2 && speed < 1)
			speed += 0.2;
		else if (speed == -1)
			speed = 0.2;
		else if (speed < 15)
		{
			speed++;
			speed = round(speed);
		}
	}

	if (mouseX < 50 && mouseX>10 && mouseY < 620 && mouseY>580)                    //재생
	{
		if(sound!=0) splaymode.play();
	}

	if (mouseX < 100 && mouseX>60 && mouseY < 620 && mouseY>580)                    //일시정지
	{
		if(sound!=0) splaymode.play();
	}

	if (mouseX > 10 && mouseX <= 53 && mouseY < 635 && mouseY>620)                          //감속
	{
		if(sound!=0) sspeed.play();
	}

	if (mouseX > 77 && mouseX < 112 && mouseY < 635 && mouseY>620)                          //배속
	{
		if(sound!=0) sspeed.play();
	}
	if (mouseY < 610 && mouseY>590 && mouseIsPressed && mouseX > 120 && mouseX < 620)
	{
		if(sound!=0) splaymode.play();
	}


	if ((mouseX > 120 && mouseX < 140 && mouseY>610 && mouseY < 630) || (mouseX > 162 && mouseX < 182 && mouseY>610 && mouseY < 630) || (mouseX > 202 && mouseX < 222 && mouseY>610 && mouseY < 630) || (mouseX > 243 && mouseX < 263 && mouseY>610 && mouseY < 630) || (mouseX > 284 && mouseX < 304 && mouseY>610 && mouseY < 630) || (mouseX > 326 && mouseX < 346 && mouseY>610 && mouseY < 630) || (mouseX > 367 && mouseX < 387 && mouseY>610 && mouseY < 630) || (mouseX > 410 && mouseX < 430 && mouseY>610 && mouseY < 630) || (mouseX > 452 && mouseX < 472 && mouseY>610 && mouseY < 630) || (mouseX > 493 && mouseX < 513 && mouseY>610 && mouseY < 630) || (mouseX > 536 && mouseX < 560 && mouseY>610 && mouseY < 630) || (mouseX > 577 && mouseX < 601 && mouseY>610 && mouseY < 630))
	{
		if(sound!=0) smonth.play();
	}

	if (mouseX >= 590 && mouseX <= 625 && mouseY >= 46 && mouseY <= 80)
	{
		if (sound == 0)
		{
			bgm.loop();
			sound++
		}

		else
		{
			bgm.stop();
			sound = 0;
		}
	}
}

const mappa = new Mappa('Leaflet');
const options = {
lat: 35.527230,
lng : 127.461348,
zoom : 6.6,
style : "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

///////////////////////////////////////////////////////////////////////////////////
function setup() {
  
	clickon = loadSound('click on.mp3');
	clickoff = loadSound('click off.mp3');
	smonth = loadSound('month.mp3');
	splaymode = loadSound('playmode.mp3');
	sspeed = loadSound('speed.mp3');
	sflag = loadSound('flag.mp3');

    bgm.loop();
  
	flower = loadImage('flower.png');      //꽃
	fish = loadImage('fish.png');          //낚시
	sun2 = loadImage('sun2.png');            //해
	fire = loadImage('fire.png');            //불꽃놀이
	people = loadImage('people.png');        //인물
	summer = loadImage('summer.png');        //물
	history = loadImage('history.png');      //역사
	gift = loadImage('gift.png');            //특산물
	light = loadImage('light.png');          //연등
	maple = loadImage('maple.png');          //단풍
	snow = loadImage('snow.png');            //눈
	movie = loadImage('movie.png');          //영화
	music = loadImage('music.png');          //음악
	local = loadImage('local.png');          //지역축제
	culture = loadImage('culture.png');      //문화축제
	flag = loadImage('flag.png');            //깃발
	allb = loadImage('All.png');           //전체선택
	postit = loadImage('postit.png');        //포스트잇
	soundon = loadImage('soundon.png');       //sound on
	soundoff = loadImage('soundoff.png');     //sound off
	////////////////////////////////////////////////////
	// 위에 이미지는 지도

	img = createImg('clear.png');
	img.position(640, 200);
	img.size(200, bheight * 15);


	button1 = createImg('flower1.png');
	button1.position(640, 200);
	button1.size(200, bheight);

	button2 = createImg('fish1.png');
	button2.position(640, 200 + bheight);
	button2.size(200, bheight);

	button3 = createImg('sun1.png');
	button3.position(640, 200 + bheight * 2);
	button3.size(200, bheight);

	button4 = createImg('local1.png');
	button4.position(640, 200 + bheight * 3);
	button4.size(200, bheight);

	button5 = createImg('fire1.png');
	button5.position(640, 200 + bheight * 4);
	button5.size(200, bheight);

	button6 = createImg('people1.png');
	button6.position(640, 200 + bheight * 5);
	button6.size(200, bheight);

	button7 = createImg('summer1.png');
	button7.position(640, 200 + bheight * 6);
	button7.size(200, bheight);

	button8 = createImg('snow1.png');
	button8.position(640, 200 + bheight * 7);
	button8.size(200, bheight);

	button9 = createImg('history1.png');
	button9.position(640, 200 + bheight * 8);
	button9.size(200, bheight);

	button10 = createImg('gift1.png');
	button10.position(640, 200 + bheight * 9);
	button10.size(200, bheight);

	button11 = createImg('light1.png');
	button11.position(640, 200 + bheight * 10);
	button11.size(200, bheight);

	button12 = createImg('maple1.png');
	button12.position(640, 200 + bheight * 11);
	button12.size(200, bheight);

	button13 = createImg('movie1.png');
	button13.position(640, 200 + bheight * 12);
	button13.size(200, bheight);

	button14 = createImg('music1.png');
	button14.position(640, 200 + bheight * 13);
	button14.size(200, bheight);

	button15 = createImg('culture1.png');
	button15.position(640, 200 + bheight * 14);
	button15.size(200, bheight);


	button16 = createImg('All.png');
	button16.position(720, 170);
	button16.size(50, 30);

	button1.mousePressed(change1);
	button2.mousePressed(change2);
	button3.mousePressed(change3);
	button4.mousePressed(change4);
	button5.mousePressed(change5);
	button6.mousePressed(change6);
	button7.mousePressed(change7);
	button8.mousePressed(change8);
	button9.mousePressed(change9);
	button10.mousePressed(change10);
	button11.mousePressed(change11);
	button12.mousePressed(change12);
	button13.mousePressed(change13);
	button14.mousePressed(change14);
	button15.mousePressed(change15);
	button16.mousePressed(change16);


	/////////////////////////////////////////////////////////////////////////////
	canvas = createCanvas(640, 650);
	myMap = mappa.tileMap(options);
	myMap.overlay(canvas)


		fill(200, 100, 100);
	myMap.onChange(draw);

}


function change1()  //꽃
{
	/*
	time=0;
	playmode=2;
	showmodel=1;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200);
	img.size(200, bheight);

	if (ikon[2] == 0)
	{
		button1 = createImg('flowerX.png');
		ikon[2] = 1;
		if(sound!=0)
		if(sound!=0) clickoff.play();
	}
	else
	{
		button1 = createImg('flower1.png');
		ikon[2] = 0;
		if (sound != 0)
		if(sound!=0) clickoff.play();
	}
	button1.position(640, 200);
	button1.size(200, bheight);

	button1.mousePressed(change1);
}

function change2()  //물고기
{
	/*
	time=0;
	playmode=2;
	showmodel=2;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight);
	img.size(200, bheight);

	if (ikon[3] == 0)
	{
		button2 = createImg('fishX.png');
		ikon[3] = 1;
		if (sound != 0)
		if(sound!=0) clickoff.play();
	}
	else
	{
		button2 = createImg('fish1.png');
		ikon[3] = 0;
		if(sound!=0) clickoff.play();
	}
	button2.position(640, 200 + bheight);
	button2.size(200, bheight);

	button2.mousePressed(change2);
}

function change3()  //해1
{
	/*
	time=0;
	playmode=2;
	showmodel=3;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 2);
	img.size(200, bheight);

	if (ikon[4] == 0)
	{
		button3 = createImg('sunX.png');
		ikon[4] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button3 = createImg('sun1.png');
		ikon[4] = 0;
		if(sound!=0) clickoff.play();
	}
	button3.position(640, 200 + bheight * 2);
	button3.size(200, bheight);

	button3.mousePressed(change3);
}

function change4()  //해2
{
	/*
	time=0;
	playmode=2;
	showmodel=4;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight * 3);
	img.size(200, bheight);

	if (ikon[0] == 0)
	{
		button4 = createImg('localX.png');
		ikon[0] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button4 = createImg('local1.png');
		ikon[0] = 0;
		if(sound!=0) clickoff.play();
	}
	button4.position(640, 200 + bheight * 3);
	button4.size(200, bheight);

	button4.mousePressed(change4);
}
function change5()  //불꽃
{
	/*
	time=0;
	playmode=2;
	showmodel=5;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight * 4);
	img.size(200, bheight);

	if (ikon[5] == 0)
	{
		button5 = createImg('fireX.png');
		ikon[5] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button5 = createImg('fire1.png');
		ikon[5] = 0;
		if(sound!=0) clickoff.play();
	}
	button5.position(640, 200 + bheight * 4);
	button5.size(200, bheight);

	button5.mousePressed(change5);
}

function change6()  //사람
{
	/*
	time=0;
	playmode=2;
	showmodel=6;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight * 5);
	img.size(200, bheight);

	if (ikon[7] == 0)
	{
		button6 = createImg('peopleX.png');
		ikon[7] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button6 = createImg('people1.png');
		ikon[7] = 0;
		if(sound!=0) clickoff.play();
	}
	button6.position(640, 200 + bheight * 5);
	button6.size(200, bheight);

	button6.mousePressed(change6);

}
function change7()  //여름
{
	/*
	time=0;
	playmode=2;
	showmodel=7;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 6);
	img.size(200, bheight);

	if (ikon[8] == 0)
	{
		button7 = createImg('summerX.png');
		ikon[8] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button7 = createImg('summer1.png');
		ikon[8] = 0;
		if(sound!=0) clickoff.play();
	}
	button7.position(640, 200 + bheight * 6);
	button7.size(200, bheight);

	button7.mousePressed(change7);
}
function change8()  //눈
{
	/*
	time=0;
	playmode=2;
	showmodel=8;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 7);
	img.size(200, bheight);

	if (ikon[9] == 0)
	{
		button8 = createImg('snowX.png');
		ikon[9] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button8 = createImg('snow1.png');
		ikon[9] = 0;
		if(sound!=0) clickoff.play();
	}
	button8.position(640, 200 + bheight * 7);
	button8.size(200, bheight);

	button8.mousePressed(change8);
}
function change9()  //역사
{
	/*
	time=0;
	playmode=2;
	showmodel=9;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 8);
	img.size(200, bheight);

	if (ikon[10] == 0)
	{
		button9 = createImg('historyX.png');
		ikon[10] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button9 = createImg('history1.png');
		ikon[10] = 0;
		if(sound!=0) clickoff.play();
	}
	button9.position(640, 200 + bheight * 8);
	button9.size(200, bheight);

	button9.mousePressed(change9);
}
function change10()  //특산물
{
	/*
	time=0;
	playmode=2;
	showmodel=10;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 9);
	img.size(200, bheight);

	if (ikon[11] == 0)
	{
		button10 = createImg('giftX.png');
		ikon[11] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button10 = createImg('gift1.png');
		ikon[11] = 0;
		if(sound!=0) clickoff.play();
	}
	button10.position(640, 200 + bheight * 9);
	button10.size(200, bheight);

	button10.mousePressed(change10);
}

function change11()  //연등
{
	/*
	time=0;
	playmode=2;
	showmodel=11;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 10);
	img.size(200, bheight);

	if (ikon[12] == 0)
	{
		button11 = createImg('lightX.png');
		ikon[12] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button11 = createImg('light1.png');
		ikon[12] = 0;
		if(sound!=0) clickoff.play();
	}
	button11.position(640, 200 + bheight * 10);
	button11.size(200, bheight);

	button11.mousePressed(change11);
}

function change12()  //단풍
{
	/*
	time=0;
	playmode=2;
	showmodel=12;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 11);
	img.size(200, bheight);

	if (ikon[6] == 0)
	{
		button12 = createImg('mapleX.png');
		ikon[6] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button12 = createImg('maple1.png');
		ikon[6] = 0;
		if(sound!=0) clickoff.play();
	}
	button12.position(640, 200 + bheight * 11);
	button12.size(200, bheight);

	button12.mousePressed(change12);
}

function change13()  //영화
{
	/*
	time=0;
	playmode=2;
	showmodel=4;
	console.log(playmode, showmodel);
	*/
	img = createImg('clear.png');
	img.position(640, 200 + bheight * 12);
	img.size(200, bheight);

	if (ikon[13] == 0)
	{
		button13 = createImg('movieX.png');
		ikon[13] = 1;
		if(sound!=0) clickoff.play();
	}

	else
	{
		button13 = createImg('movie1.png');
		ikon[13] = 0;
		if(sound!=0) clickoff.play();
	}
	button13.position(640, 200 + bheight * 12);
	button13.size(200, bheight);

	button13.mousePressed(change13);
}

function change14()  //음악
{
	/*
	time=0;
	playmode=2;
	showmodel=4;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight * 13);
	img.size(200, bheight);

	if (ikon[14] == 0)
	{
		button14 = createImg('musicX.png');
		ikon[14] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button14 = createImg('music1.png');
		ikon[14] = 0;
		if(sound!=0) clickoff.play();
	}
	button14.position(640, 200 + bheight * 13);
	button14.size(200, bheight);

	button14.mousePressed(change14);
}

function change15()  //문화예술
{
	/*
	time=0;
	playmode=2;
	showmodel=4;
	console.log(playmode, showmodel);
	*/

	img = createImg('clear.png');
	img.position(640, 200 + bheight * 14);
	img.size(200, bheight);

	if (ikon[1] == 0)
	{
		button15 = createImg('cultureX.png');
		ikon[1] = 1;
		if(sound!=0) clickoff.play();

	}
	else
	{
		button15 = createImg('culture1.png');
		ikon[1] = 0;
		if(sound!=0) clickoff.play();
	}
	button15.position(640, 200 + bheight * 14);
	button15.size(200, bheight);

	button15.mousePressed(change15);
}

function change16()
{
	img = createImg('clear.png');
	img.position(720, 170);
	img.size(50, 30);

	img2 = createImg('clear.png');
	img2.position(640, 200);
	img2.size(200, bheight * 15);

	if (all == 0)
	{
		for (var l = 0;l < 15;l++)
		{
			ikon[l] = 1;
		}

		button1 = createImg('flowerX.png');
		button2 = createImg('fishX.png');
		button3 = createImg('sunX.png');
		button4 = createImg('localX.png');
		button5 = createImg('fireX.png');
		button6 = createImg('peopleX.png');
		button7 = createImg('summerX.png');
		button8 = createImg('snowX.png');
		button9 = createImg('historyX.png');
		button10 = createImg('giftX.png');
		button11 = createImg('lightX.png');
		button12 = createImg('mapleX.png');
		button13 = createImg('movieX.png');
		button14 = createImg('musicX.png');
		button15 = createImg('cultureX.png');

		all = 1;

		if(sound!=0) clickoff.play();
	}

	else if (all == 1)
	{
		for (var l = 0;l < 15;l++)
		{
			ikon[l] = 0;
		}

		button1 = createImg('flower1.png');
		button2 = createImg('fish1.png');
		button3 = createImg('sun1.png');
		button4 = createImg('local1.png');
		button5 = createImg('fire1.png');
		button6 = createImg('people1.png');
		button7 = createImg('summer1.png');
		button8 = createImg('snow1.png');
		button9 = createImg('history1.png');
		button10 = createImg('gift1.png');
		button11 = createImg('light1.png');
		button12 = createImg('maple1.png');
		button13 = createImg('movie1.png');
		button14 = createImg('music1.png');
		button15 = createImg('culture1.png');

		all = 0;

		if(sound!=0) clickoff.play();
	}

	button1.position(640, 200);
	button1.size(200, bheight);
	button2.position(640, 200 + bheight);
	button2.size(200, bheight);
	button3.position(640, 200 + bheight * 2);
	button3.size(200, bheight);
	button4.position(640, 200 + bheight * 3);
	button4.size(200, bheight);
	button5.position(640, 200 + bheight * 4);
	button5.size(200, bheight);
	button6.position(640, 200 + bheight * 5);
	button6.size(200, bheight);
	button7.position(640, 200 + bheight * 6);
	button7.size(200, bheight);
	button8.position(640, 200 + bheight * 7);
	button8.size(200, bheight);
	button9.position(640, 200 + bheight * 8);
	button9.size(200, bheight);
	button10.position(640, 200 + bheight * 9);
	button10.size(200, bheight);
	button11.position(640, 200 + bheight * 10);
	button11.size(200, bheight);
	button12.position(640, 200 + bheight * 11);
	button12.size(200, bheight);
	button13.position(640, 200 + bheight * 12);
	button13.size(200, bheight);
	button14.position(640, 200 + bheight * 13);
	button14.size(200, bheight);
	button15.position(640, 200 + bheight * 14);
	button15.size(200, bheight);

	button16 = createImg('All.png');
	button16.position(720, 170);
	button16.size(50, 30);

	button1.mousePressed(change1);
	button2.mousePressed(change2);
	button3.mousePressed(change3);
	button4.mousePressed(change4);
	button5.mousePressed(change5);
	button6.mousePressed(change6);
	button7.mousePressed(change7);
	button8.mousePressed(change8);
	button9.mousePressed(change9);
	button10.mousePressed(change10);
	button11.mousePressed(change11);
	button12.mousePressed(change12);
	button13.mousePressed(change13);
	button14.mousePressed(change14);
	button15.mousePressed(change15);
	button16.mousePressed(change16);
}


keyReleased = function() {
	if (key == ' ')
	{
		if (playmode == 1)
		{
			playmode = 2;
			showmodel = 0;
			if (sound != 0)
				if(sound!=0) splaymode.play();
		}
		else
		{
			playmode = 1;
			showmodel = 0;
			if (sound != 0)
				if(sound!=0) splaymode.play();
		}
	}

	if (key == 'a'&&favorite[9] == -1)
	{
			for (var i = 0;i < spaceData.number;i++)
			{
				const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
				var term = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
				if ((term <= 10 && spaceData.place[i].시작 < range2 / 10 && spaceData.place[i].끝 + 10 >= range / 10) || (spaceData.place[i].시작 <= range2 / 10 && spaceData.place[i].끝 >= range / 10 && term > 10))
				{
					if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
					{
						for (var z = 0;z < 10;z++)
						{
							if (favorite[0] == -1)
							{
								favorite[0] = i;
                                fsize++;
								if(sound!=0) sflag.play();
								break;
							}
							else if (favorite[z] == -1 && favorite[z - 1] != i)
							{
								favorite[z] = i;
								cal = 1;
                                fsize++;
								if(sound!=0) sflag.play();
								break;
							}
							else if (favorite[z] == i)
								break;
						}
					}
				}
			}
	}

	if (key == 'r')
	{
		for (var x = 0;x < 10;x++)
		{
			favorite[x] = -1;
		}
		if(sound!=0) splaymode.play();
		dist = 0;
        fsize=0;
		cal = 0;
	}
};

function draw() {

	clear();
	noStroke();

    dist=0;
	textFont('Helvetica');

	for (var i = 0;i < spaceData.number;i++)
	{
		var namesize = spaceData.place[i].글자수;
		const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
		var fscale1 = (spaceData.place[i].규모 + 1)*0.5;
		var term1 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
		var imgsize = 20 + fscale * 3 + term / 3;

		if (showmodel == 1)
		{


			if (spaceData.place[i].종류 == "꽃")
			{
				image(flower, a.x - (20 + fscale1 * 3 + term1 / 3), a.y - (20 + fscale1 * 3 + term1 / 3), 2 * (20 + fscale1 * 3 + term1 / 3), 2 * (20 + fscale1 * 3 + term1 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}


		else if (showmodel == 2)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale2 = (spaceData.place[i].규모 + 1)*0.5;
			var term2 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "낚시")
			{
				image(fish, a.x - (20 + fscale2 * 3 + term2 / 3), a.y - (20 + fscale2 * 3 + term2 / 3), 2 * (20 + fscale2 * 3 + term2 / 3), 2 * (20 + fscale2 * 3 + term2 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 3)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale3 = (spaceData.place[i].규모 + 1)*0.5;
			var term3 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "해")
			{
				image(sun2, a.x - (20 + fscale3 * 3 + term3 / 3), a.y - (20 + fscale3 * 3 + term3 / 3), 2 * (20 + fscale3 * 3 + term3 / 3), 2 * (20 + fscale3 * 3 + term3 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 4)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale4 = (spaceData.place[i].규모 + 1)*0.5;
			var term4 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "해2")
			{
				image(sun2, a.x - (20 + fscale4 * 3 + term4 / 3), a.y - (20 + fscale4 * 3 + term4 / 3), 2 * (20 + fscale4 * 3 + term4 / 3), 2 * (20 + fscale4 * 3 + term4 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 5)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale5 = (spaceData.place[i].규모 + 1)*0.5;
			var term5 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "불꽃")
			{
				image(fire, a.x - (20 + fscale5 * 3 + term5 / 3), a.y - (20 + fscale5 * 3 + term5 / 3), 2 * (20 + fscale5 * 3 + term5 / 3), 2 * (20 + fscale5 * 3 + term5 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 6)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale6 = (spaceData.place[i].규모 + 1)*0.5;
			var term6 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "인물")
			{
				image(people, a.x - (20 + fscale6 * 3 + term6 / 3), a.y - (20 + fscale6 * 3 + term6 / 3), 2 * (20 + fscale6 * 3 + term6 / 3), 2 * (20 + fscale6 * 3 + term6 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 7)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale7 = (spaceData.place[i].규모 + 1)*0.5;
			var term7 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "물")
			{
				image(summer, a.x - (20 + fscale7 * 3 + term7 / 3), a.y - (20 + fscale7 * 3 + term7 / 3), 2 * (20 + fscale7 * 3 + term7 / 3), 2 * (20 + fscale7 * 3 + term7 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 8)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale8 = (spaceData.place[i].규모 + 1)*0.5;
			var term8 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "눈")
			{
				image(snow, a.x - (20 + fscale8 * 3 + term8 / 3), a.y - (20 + fscale8 * 3 + term8 / 3), 2 * (20 + fscale8 * 3 + term8 / 3), 2 * (20 + fscale8 * 3 + term8 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 9)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale9 = (spaceData.place[i].규모 + 1)*0.5;
			var term9 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "역사")
			{
				image(history, a.x - (20 + fscale9 * 3 + term9 / 3), a.y - (20 + fscale9 * 3 + term9 / 3), 2 * (20 + fscale9 * 3 + term9 / 3), 2 * (20 + fscale9 * 3 + term9 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 10)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale10 = (spaceData.place[i].규모 + 1)*0.5;
			var term10 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "특산물")
			{
				image(gift, a.x - (20 + fscale10 * 3 + term10 / 3), a.y - (20 + fscale10 * 3 + term10 / 3), 2 * (20 + fscale10 * 3 + term10 / 3), 2 * (20 + fscale10 * 3 + term10 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 11)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale11 = (spaceData.place[i].규모 + 1)*0.5;
			var term11 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "연등축제")
			{
				image(light, a.x - (20 + fscale11 * 3 + term11 / 3), a.y - (20 + fscale11 * 3 + term11 / 3), 2 * (20 + fscale11 * 3 + term11 / 3), 2 * (20 + fscale11 * 3 + term11 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}

		else if (showmodel == 12)
		{
			const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);
			var fscale12 = (spaceData.place[i].규모 + 1)*0.5;
			var term12 = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;
			if (spaceData.place[i].종류 == "단풍")
			{
				image(maple, a.x - (20 + fscale12 * 3 + term12 / 3), a.y - (20 + fscale12 * 3 + term12 / 3), 2 * (20 + fscale12 * 3 + term12 / 3), 2 * (20 + fscale12 * 3 + term12 / 3));

				if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
				{
					fill(255, 255, 255, 100);
					rect(mouseX + 20, mouseY - 15, namesize*11.8, 25);
					fill(0);
					text(spaceData.place[i].이름, mouseX + 25, mouseY);
					text(term, mouseX + 25, mouseY + 10);
				}
			}
		}
	}



	if (playmode == 5)                 //playmode=5 (월별보기) 인경우
	{
		if (time == 0)                  //1월
		{
			range = 0;
			range2 = 310;
		}
		if (time == 320)      //2월
		{
			range = 310;
			range2 = 590;
		}
		if (time == 600)      //3월
		{
			range = 590;
			range2 = 900;
		}
		if (time == 910)      //4월
		{
			range = 900;
			range2 = 1200;
		}
		if (time == 1210)     //5월
		{
			range = 1200;
			range2 = 1510;
		}
		if (time == 1520)      //6월
		{
			range = 1510;
			range2 = 1810;
		}
		if (time == 1820)      //7월
		{
			range = 1810;
			range2 = 2120;
		}
		if (time == 2130)      //8월
		{
			range = 2120;
			range2 = 2430;
		}
		if (time == 2440)      //9월
		{
			range = 2430;
			range2 = 2730;
		}
		if (time == 2740)      //10월
		{
			range = 2730;
			range2 = 3040;
		}
		if (time == 3050)      //11월
		{
			range = 3040;
			range2 = 3340;
		}
		if (time == 3350)      //12월
		{
			range = 3340;
			range2 = 3650;
		}
	}

	else if (playmode != 5)
	{
		range = time;                    //playmode=5 (월별보기) 아닌경우 range=time
		range2 = time;                   //playmode=5 (월별보기) 아닌경우 range2=time
	}


	for (var i = 0; i < spaceData.number; i++)                // 데이터 그려주는 작업                 
	{
		noStroke();

		const a = myMap.latLngToPixel(spaceData.place[i].위도, spaceData.place[i].경도);

		var term = (spaceData.place[i].끝 - spaceData.place[i].시작) + 1;      //축제 기간
		var sizeMax = spaceData.place[i].시작 + term / 2;                   //축제의 중간

		fscale = (spaceData.place[i].규모 + 1)*0.5;
		var caltime = pow(time / 10, (term / 2 + 9 + (fscale - 1) * 2));
		var calsize = pow(sizeMax, (term / 2 + 9 + (fscale - 1) * 2));
		namesize = spaceData.place[i].글자수;

		let size = (myMap.zoom() - 6.5) * 7;

		if (playmode != 5)                            //월별보기 아닌경우
		{
			up = 15 + fscale * 3 + term / 3 + size * 1.5;
			down = 15 + fscale * 3 + term / 3 + size * 1.5;
		}
		else                                       //월별보기 인경우 (시간과 상관없이 사이즈표기)
		{
			up = 15 + fscale * 3 + term / 3 + size * 1.5;
			down = 15 + fscale * 3 + term / 3 + size * 1.5;
		}

		if (playmode != 5)
			small = 15 + fscale * 2 + term / 2 + size;
		else
			small = 15 + fscale * 2 + term / 2 + size;

		if (spaceData.place[i].시작 <= range2 / 10 && spaceData.place[i].끝 >= range / 10 && term > 10)
		{
			if (spaceData.place[i].종류 == "지역축제"&&ikon[0] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(local, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(local, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "문화예술" && ikon[1] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(culture, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(culture, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "꽃" && ikon[2] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(flower, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(flower, a.x - down, a.y - down, 2 * down, 2 * down);
				}

			}

			else if (spaceData.place[i].종류 == "낚시" && ikon[3] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(fish, a.x - 1.25*up, a.y - up, 2.5*up, 2 * up);
				}

				else if (time / 10 >= sizeMax)
				{
					image(fish, a.x - 1.25*down, a.y - down, 2.5*down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "해" && ikon[4] == 0)
			{

				if (time / 10 < sizeMax)
				{
					image(sun2, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(sun2, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "불꽃" && ikon[5] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(fire, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(fire, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "단풍" && ikon[6] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(maple, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(maple, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "인물" && ikon[7] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(people, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(people, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "물" && ikon[8] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(summer, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(summer, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "눈" && ikon[9] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(snow, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(snow, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}
			else if (spaceData.place[i].종류 == "역사" && ikon[10] == 0)
			{

				if (time / 10 < sizeMax)
				{
					image(history, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(history, a.x - down, a.y - down, 2 * down, 2 * down);
				}

			}

			else if (spaceData.place[i].종류 == "특산물" && ikon[11] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(gift, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(gift, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "연등축제" && ikon[12] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(light, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(light, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "영화" && ikon[13] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(movie, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(movie, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			else if (spaceData.place[i].종류 == "음악" && ikon[14] == 0)
			{
				if (time / 10 < sizeMax)
				{
					image(music, a.x - up, a.y - up, 2 * up, 2 * up);
				}
				else if (time / 10 >= sizeMax)
				{
					image(music, a.x - down, a.y - down, 2 * down, 2 * down);
				}
			}

			if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
			{
				fill(255, 255, 255, 100);
				rect(mouseX + 20, mouseY - 15, namesize*11.8, 20);
				fill(0);
				text(spaceData.place[i].이름, mouseX + 25, mouseY);
			}
		}

		if (term <= 10 && spaceData.place[i].시작 < range2 / 10 && spaceData.place[i].끝 + 10 >= range / 10)
		{
			if (spaceData.place[i].종류 == "지역축제" && ikon[0] == 0)
			{
				image(local, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "문화예술" && ikon[1] == 0)
			{
				image(culture, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "꽃" && ikon[2] == 0)
			{
				image(flower, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "낚시"&& ikon[3] == 0)
			{
				image(fish, a.x - 1.25*small, a.y - small, 2.5*small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "눈"&& ikon[9] == 0)
			{
				image(snow, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "물"&& ikon[8] == 0)
			{
				image(summer, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "단풍"&& ikon[6] == 0)
			{
				image(maple, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "해"&& ikon[4] == 0)
			{
				image(sun2, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "불꽃"&& ikon[5] == 0)
			{
				image(fire, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "역사"&& ikon[10] == 0)
			{
				image(history, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "연등축제"&& ikon[12] == 0)
			{
				image(light, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "영화"&& ikon[13] == 0)
			{
				image(movie, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "음악"&& ikon[14] == 0)
			{
				image(music, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "인물"&& ikon[7] == 0)
			{
				image(people, a.x - small, a.y - small, 2 * small, 2 * small);
			}

			else if (spaceData.place[i].종류 == "특산물"&& ikon[11] == 0)
			{
				image(gift, a.x - small, a.y - small, 2 * small, 2 * small);
			}


			if ((a.x - 15 < mouseX && a.x + 15 > mouseX) && (a.y - 15 < mouseY && a.y + 15 > mouseY))
			{
				fill(255, 255, 255, 100);
				rect(mouseX + 20, mouseY - 15, namesize*11.8, 20);
				fill(0);
				text(spaceData.place[i].이름, mouseX + 25, mouseY);
			}
		}

	}

	fill(255);
	rect(18, 580, 612, 55);          //스크롤바 흰색 네모
	fill(0);
	rect(120, 600, 500, 1);              // 스크롤 선/(time/10)

	var scroll = time / 3650 * 500;     //스크롤 x값

	if (mouseX < 50 && mouseX>10 && mouseY < 620 && mouseY>580)                    //재생
	{
		fill(220);
		rect(18, 580, 46, 40);        // 재생에 마우스 댔을 때

		if (mouseIsPressed)
		{
			fill(180);
			rect(18, 580, 46, 40);      // 재생 눌렀을 때
			playmode = 1;
			showmodel = 0;
		}
	}

	if (mouseX < 100 && mouseX>60 && mouseY < 620 && mouseY>580)                    //일시정지
	{
		fill(220);
		rect(64, 580, 48, 40);        // 일시정지에 마우스 댔을 때

		if (mouseIsPressed)
		{
			fill(180);
			rect(64, 580, 48, 40)         // 일시정지 눌렀을 때

				playmode = 2;                // 플레이모드2 (일시정지)로 설정
			showmodel = 0;
		}
	}


	fill(0);

	triangle(34, 590, 34, 610, 50, 600);     // 재생 버튼 모양

	rect(80, 590, 5, 20);                  // 일시정지 버튼 모양1
	rect(90, 590, 5, 20);                  // 일시정지 버튼 모양2

	if (mouseY < 610 && mouseY>590 && mouseIsPressed && mouseX > 120 && mouseX < 620)      //스크롤
	{
		time = (mouseX - 120)*7.3;
		ellipse(120 + scroll, 600, 15, 15);    // 스크롤 동그라미 마우스 눌렀을때 커지게
	}

	ellipse(120 + scroll, 600, 10, 10);      // 스크롤 동그라미

	if (mouseX > 10 && mouseX <= 53 && mouseY < 635 && mouseY>620)                          //감속
	{
		fill(220);
		rect(18, 620, 35, 15);

		if (mouseIsPressed)
		{
			fill(180);
			rect(18, 620, 35, 15);
		}
	}

	if (mouseX > 77 && mouseX < 112 && mouseY < 635 && mouseY>620)                          //배속
	{
		fill(220);
		rect(77, 620, 35, 15);
		if (mouseIsPressed)
		{
			fill(180);
			rect(77, 620, 35, 15);
		}
	}

	fill(0);

	if (speed < 10 && speed >= 1)            //speed 표시
	{
		text(speed, 57, 631);
		text("x", 65, 630);
	}
	else if (speed >= 10 || (speed<0 && speed>-10))
	{
		text(speed, 54, 631);
		text("x", 68, 630);
	}
	else if (speed <= -10)
	{
		text(speed, 52, 631);
		text("x", 72, 630);
	}
	else if (speed > 0 && speed < 1)
	{
		text("0.", 50, 631);
		text(round(speed * 10), 59, 631);
		text("x", 70, 630);
	}

	triangle(30, 627, 34, 630, 34, 624);     // 감속
	triangle(36, 627, 40, 630, 40, 624);
	triangle(95, 627, 91, 630, 91, 624);     // 배속
	triangle(101, 627, 97, 630, 97, 624);

	noStroke();

	// var scroll=time/3650*500;     //스크롤 x값

	if (mouseX > 120 && mouseX < 140 && mouseY>610 && mouseY < 630)       //1월버튼
	{
		fill(220);
		rect(120, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(120, 610, 20, 20);

			playmode = 5;
			time = 0;
		}
	}

	if (mouseX > 162 && mouseX < 182 && mouseY>610 && mouseY < 630)       //2월버튼
	{
		fill(220);
		rect(162, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(162, 610, 20, 20);
			playmode = 5;
			time = 320;
		}
	}
	if (mouseX > 202 && mouseX < 222 && mouseY>610 && mouseY < 630)       //3월버튼
	{
		fill(220);
		rect(202, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(202, 610, 20, 20);

			playmode = 5;
			time = 600;
		}
	}
	if (mouseX > 243 && mouseX < 263 && mouseY>610 && mouseY < 630)       //4월버튼
	{
		fill(220);
		rect(243, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(243, 610, 20, 20);

			playmode = 5;
			time = 910;
		}
	}
	if (mouseX > 284 && mouseX < 304 && mouseY>610 && mouseY < 630)       //5월버튼
	{
		fill(220);
		rect(284, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(284, 610, 20, 20);

			playmode = 5;
			time = 1210;
		}
	}
	if (mouseX > 326 && mouseX < 346 && mouseY>610 && mouseY < 630)       //6월버튼
	{
		fill(220);
		rect(326, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(326, 610, 20, 20);

			playmode = 5;
			time = 1520;
		}
	}
	if (mouseX > 367 && mouseX < 387 && mouseY>610 && mouseY < 630)       //7월버튼
	{
		fill(220);
		rect(367, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(367, 610, 20, 20);

			playmode = 5;
			time = 1820;
		}
	}

	if (mouseX > 410 && mouseX < 430 && mouseY>610 && mouseY < 630)       //8월버튼
	{
		fill(220);
		rect(410, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(410, 610, 20, 20);

			playmode = 5;
			time = 2130;
		}
	}

	if (mouseX > 452 && mouseX < 472 && mouseY>610 && mouseY < 630)       //9월버튼
	{
		fill(220);
		rect(452, 610, 20, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(452, 610, 20, 20);

			playmode = 5;
			time = 2440;
		}
	}

	if (mouseX > 493 && mouseX < 513 && mouseY>610 && mouseY < 630)       //10월버튼
	{
		fill(220);
		rect(493, 610, 24, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(493, 610, 24, 20);

			playmode = 5;
			time = 2740;
		}
	}

	if (mouseX > 536 && mouseX < 560 && mouseY>610 && mouseY < 630)       //11월버튼
	{
		fill(220);
		rect(536, 610, 24, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(536, 610, 24, 20);

			playmode = 5;
			time = 3050;
		}
	}

	if (mouseX > 577 && mouseX < 601 && mouseY>610 && mouseY < 630)       //12월버튼
	{
		fill(220);
		rect(577, 610, 24, 20);

		if (mouseIsPressed)
		{
			fill(180);
			rect(577, 610, 24, 20);

			playmode = 5;
			time = 3350;
		}
	}



	fill(0);
	text("1월", 120, 625);
	text("2월", 162, 625);
	text("3월", 202, 625);
	text("4월", 243, 625);
	text("5월", 284, 625);
	text("6월", 326, 625);
	text("7월", 367, 625);
	text("8월", 410, 625);
	text("9월", 452, 625);
	text("10월", 493, 625);
	text("11월", 536, 625);
	text("12월", 577, 625);

	if (time <= 310)                  //1월
	{
		month = 1;
		days2 = days
	}
	if (time > 310 && time <= 590)      //2월
	{
		month = 2;
		days2 = days - 31;
	}
	if (time > 590 && time <= 900)      //3월
	{
		month = 3;
		days2 = days - 59;
	}
	if (time > 900 && time <= 1200)      //4월
	{
		month = 4;
		days2 = days - 90;
	}
	if (time > 1200 && time <= 1510)     //5월
	{
		month = 5;
		days2 = days - 120;
	}
	if (time > 1510 && time <= 1810)      //6월
	{
		month = 6;
		days2 = days - 151;
	}
	if (time > 1810 && time <= 2120)      //7월
	{
		month = 7;
		days2 = days - 181;
	}
	if (time > 2120 && time <= 2430)      //8월
	{
		month = 8;
		days2 = days - 212;
	}
	if (time > 2430 && time <= 2730)      //9월
	{
		month = 9;
		days2 = days - 243;
	}
	if (time > 2730 && time <= 3040)      //10월
	{
		month = 10;
		days2 = days - 273;
	}
	if (time > 3040 && time <= 3340)      //11월
	{
		month = 11;
		days2 = days - 304;
	}
	if (time > 3340 && time <= 3650)      //12월
	{
		month = 12;
		days2 = days - 334;
	}

	fill(255);
	rect(552, 13, 78, 27);              //날짜 잘보이게 하는 네모
	fill(0);

	if (month < 10)
	{
		text(month, 565, 29);
		text("월", 575, 30);
	}

	else                             // 월 두글자 이상 (10,11,12월)이면 되면 옆으로 글자 밀어줌
	{
		text(month, 565, 29);
		text("월", 580, 30);
	}

	for (let a = 0;a < 366;a++)           // 날짜 정수로 바꾸는 함수
	{
		if (time >= 10 * a && time < 10 * (a + 1))
			days = a;
	}

	if (days2 == 0)                     // 출력용 날짜 (일)
	{
		days2 = 1;
	}


	if (playmode != 5)                  // 월별 보기가 아닌경우
	{
		text(days2, 595, 29);

		if (days2 < 10)
		{
			text("일", 602, 30);
		}
		else                             // 일 두글자 이상 (10일 이상)일때 옆으로 글자 밀어줌 
		{
			text("일", 609, 30);
		}
	}
	else                            // 월별 보기 인경우
	{
		if (month < 10)
		{
			text("전체", 592, 30);
		}
		else
			text("전체", 595, 30);
	}

	if (playmode == 1)                  //플레이모드1 (재생) 일시 time++
	{
		if (speed >= 0)
		{
			if (time <= 3650)
				time += speed;
			else                           //365일 넘어가면 날짜 1월1일로 초기화
			{
				time = 0;
				days = 1;
				days2 = 1;
			}
		}

		else                           //되감기 중일 때
		{
			time += speed;

			if (time <= 0)
			{
				time = 3650;
			}
		}
	}

	/*
	fill(255,255,255,100);
	rect(15,310,160,230);
	*/

	for (let k = 0;k < 10;k++)
	{
		if ([favorite[k]] != -1)
		{
			const a = myMap.latLngToPixel(spaceData.place[favorite[k]].위도, spaceData.place[favorite[k]].경도);
			var namesize = spaceData.place[favorite[k]].글자수*7.5;

			fill(0);
			stroke(0);

			textFont(font);

			ellipse(a.x - 2, a.y + 6, 20, 5);
			image(flag, a.x - 49, a.y - 77, 100, 100);
			strokeWeight(0);

			if (k != 0)
			{
				const b = myMap.latLngToPixel(spaceData.place[favorite[k - 1]].위도, spaceData.place[favorite[k - 1]].경도);
				let size = (myMap.zoom() - 6.5);

				strokeWeight(1 + size);
				line(a.x - 2, a.y + 6, b.x - 2, b.y + 6);
				fill(0);
				strokeWeight(0);
              
                dist=0;
			}
			}
		}

   for(let a=0;a<9;a++)
  {
    if(favorite[a]!=-1 && favorite[a+1]!=-1)
    {
    var x = cos(spaceData.place[favorite[a]].위도*3.14159 / 180) * 6400 * 2 * 3.14159 / 360 * abs(spaceData.place[favorite[a]].경도 - spaceData.place[favorite[a+1]].경도)
    var y = 111 * (abs(spaceData.place[favorite[a]].위도 -spaceData.place[favorite[a+1]].위도));
	var d = (sqrt(x*x + y*y));
	var distance = int(d);
              
    dist+=distance;
  }
  }

  
  for(let q=0; q<10; q++)
  {
    if (favorite[q] != -1)
		{
              var namesize = spaceData.place[favorite[q]].글자수*8;
     textSize(19);
		  image(postit, 5 - namesize / 2.2, 50 + q * 45, 150 + namesize, 60);
	      text(spaceData.place[favorite[q]].이름, 70 - namesize / 2.5, 50 + q * 45 + 35);
        }

	strokeWeight(0);
	fill(0);
	if (dist != 0)
	{
		textSize(22);
		image(postit, 25, 510, 123, 40);
		if (dist < 10 && dist>0)
			text(dist, 78, 534.5);
		else if (dist < 100 && dist >= 10)
			text(dist, 72, 534.5);
		else if (dist < 1000 && dist >= 100)
			text(dist, 68, 534.5);
		else
			text(dist, 58, 534.5);
		text("km", 95, 535);
	}
  }

	if (sound == 0)
	{
		image(soundoff, 590, 48, 30, 30);
	}
	else
	{
		image(soundon, 590, 46, 35, 34);
	}

	textSize(12);
}


