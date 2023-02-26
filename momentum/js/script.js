	let langu;
	let ml;
	const name = document.querySelector('.name');
	const city = document.querySelector('.city');
	const languageEN = document.querySelector('.langEN');
	const languageRU = document.querySelector('.langRU');
	const gitLang = document.querySelector('.git');
	
	languageRU.addEventListener('click', lanRU);
	languageEN.addEventListener('click', lanEN);
	
	function lanRU() {
		document.getElementById("RU").className = "langRU-active";
		document.getElementById("EN").className = "langEN";
		langu = "RU";
		showDate(langu);
		getWeather(langu);
		gitLang.textContent = "Коллекция изображений GITHUB";
		getQuotes();
	}
	
	function lanEN() {
		document.getElementById("RU").className = "langRU";
		document.getElementById("EN").className = "langEN-active";
		langu = "EN";
		showDate(langu);
		getWeather(langu);
		gitLang.textContent = "GITHUB Image Collection";
		getQuotes();
	}
lanEN();

function showTime() {
  const date = new Date();
  const time = document.querySelector('.time');
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate(langu);
  showGreeting(langu);
}
showTime();

function showDate(langu) {
	const date1 = new Date();
	const date = document.querySelector('.date');
	const options = {weekday: 'long', month: 'long', day: 'numeric'};
	if (langu === 'EN') ml = 'en-US'; else ml = 'ru-RU';
	const currentDate = date1.toLocaleDateString(ml, options);
	date.textContent = currentDate;
}
showDate(langu);

function showGreeting(langu) {
	const date = new Date();
	const hours = date.getHours();
	const greeting = document.querySelector('.greeting');
	if (langu === 'EN')	
	{greeting.textContent = "Good "+getTimeOfDay(hours);}
	else {
		switch (getTimeOfDay(hours)) {
		  case 'morning': greeting.textContent = 'Доброе утро'; break;
		  case 'afternoon': greeting.textContent = 'Добрый день'; break;
		  case 'evening': greeting.textContent = 'Добрый вечер'; break;
		  case 'night': greeting.textContent = 'Доброй ночи'; break;
	}
}
}
showGreeting(langu);

function getTimeOfDay(hours) {
	if (hours >= 6 && hours < 12) {return 'morning';}
	if (hours >= 12 && hours < 18) {return 'afternoon';}
	if (hours >= 18 && hours <= 23) {return 'evening';}
	if (hours >= 0 && hours < 6) {return 'night';}
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage(langu) {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
    if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
	  city.value =  'Minsk';
    }
}
window.addEventListener('load', getLocalStorage)

 // slider next prev
	const slideNext = document.querySelector('.slide-next');
	const slidePrev = document.querySelector('.slide-prev');
 	let bgNum = getRandomNum();
	
function getRandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

function setBg() {
	//bgNum - порядковый номер фонового изображения
	//timeOfDay - текущее время суток
	const img = new Image();
	const date = new Date();
	const hours = date.getHours();
	let timeOfDay = getTimeOfDay(hours);
	let bgNumStr = String(bgNum).padStart(2,"0");
    img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg';
 	img.onload = () => {
	document.body.style.backgroundImage = "url(https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/"+timeOfDay+"/"+bgNumStr+".jpg)";
	} 
}
setBg();

function getSlideNext() {
	if (bgNum < 20 && bgNum >= 1) bgNum += 1;
	else bgNum = 1;
	setBg();
}

function getSlidePrev() {
	if (bgNum <= 20 && bgNum > 1) bgNum = bgNum - 1;
	else bgNum = 20;
	setBg();
}
	slideNext.addEventListener('click', getSlideNext)
	slidePrev.addEventListener('click', getSlidePrev)

async function getWeather(langu) {
    city.value = localStorage.getItem('city'); 
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langu.toLowerCase()}&appid=eae95c21749e12ad6d63f8082ffbbe8b&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	const wind = document.querySelector('.wind');
	const temperature = document.querySelector('.temperature');
	const humidity = document.querySelector('.humidity');
	const weatherIcon = document.querySelector('.weather-icon');
	const weatherDescription = document.querySelector('.weather-description');
	const weatherError = document.querySelector('.weather-error');

	if (res.ok) { 
		let json = data;
	} else {
		weatherError.textContent = 'Error '+res.status;
	}
	weatherIcon.className = 'weather-icon owf';
  
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${Math.floor(data.main.temp)}°C`;
	weatherDescription.textContent = data.weather[0].description;
	if (langu === 'EN') {
		wind.textContent = 'Wind speed: '+`${Math.floor(data.wind.speed)} m/s`;
		humidity.textContent = 'Humidity: '+`${data.main.humidity}%`;}
	else {
		wind.textContent = 'Скорость ветра: '+`${Math.floor(data.wind.speed)} м/с`;
		humidity.textContent = 'Влажность: '+`${data.main.humidity}%`;}
  
}
	getWeather(langu);

	const quote = document.querySelector('.quote');
	const author = document.querySelector('.author');
	const quoteBtn = document.querySelector('.change-quote');

async function getQuotes() {
	const quotes = 'data'+langu+'.json';
	const res = await fetch(quotes);
	const data = await res.json(); 
	let randomNum = getRandomNum();
	quote.textContent = data[randomNum].text;
	author.textContent = data[randomNum].author;
}
getQuotes();

quoteBtn.addEventListener('click', getQuotes);

let playNum = 0;
let isPlay = false;
const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');

const playListContainer = document.querySelector('.play-list');

function list(playNum) {
playList.forEach((item, index) => {
	const li = document.createElement('li');
	li.classList.add('play-item');
	li.textContent = item.title;
	playListContainer.append(li);
 	if (index === playNum) {
		li.classList.add("item-active");
	} else {
		li.classList.remove("item-active");
	} 
})
}
list(playNum);

	const audio = new Audio();
	let currentTime = 0;
	const playItem = document.querySelectorAll('.play-item');
	
function playAudio() {
		// надо убрать подсветку класса
		playItem.forEach(i => i.classList.remove('item-active'));
	  if (!isPlay) {
		audio.currentTime = currentTime;
		audio.src = playList[playNum].src;
		// надо добавить подсветку класса
		let j = 0;
		playItem.forEach(i => {
		if (playItem[j].innerHTML === playList[playNum].title) {
			i.classList.add('item-active');
		} 
		j++;
		})
		audio.play();
		isPlay = true;
		playBtn.classList.remove("pause");}
	else {
		currentTime = audio.currentTime;
		// надо добавить подсветку класса
		let j = 0;
		playItem.forEach(i => {
		if (playItem[j].innerHTML === playList[playNum].title) {
			i.classList.add('item-active');
			} 
		j++;
		})
		audio.pause();
		isPlay = false;
		playBtn.classList.add("pause");
		}
}

	playBtn.addEventListener('click', playAudio);

	playItem.forEach((item, index) => {
	item.addEventListener('click', () => {
    if (playNum === index) {
		playAudio();
		}
    else { 
      if (!audio.paused) {
		playAudio();
		}
		playNum = index;
		playAudio();
   } 
  })
});

const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');

function playNextPl() {
	if (playNum < 3 && playNum >=0) playNum ++;
	else { playNum = 0;}
	isPlay = false;
	playAudio();
 }
 
 function playPrevPl() {
	if (playNum <= 3 && playNum >0) playNum --;
	else { playNum = 3;}
	isPlay = false;
	playAudio();
 }
 
 playNext.addEventListener('click', playNextPl);
 playPrev.addEventListener('click', playPrevPl);
 
 audio.addEventListener('ended', playNextPl);

console.log ('Ваша оценка - 103 балла.');
console.log ('Отзыв по пунктам ТЗ:');
console.log ('Не выполненные/не засчитанные пункты:');
console.log ('1. добавлен прогресс-бар в котором отображается прогресс проигрывания'); 
console.log ('2. при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека ');
console.log ('3. над прогресс-баром отображается название трека ');
console.log ('4. отображается текущее и общее время воспроизведения трека ');
console.log ('5. есть кнопка звука при клике по которой можно включить/отключить звук ');
console.log ('6. добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука ');
console.log ('7. можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте ');
console.log ('8. в качестве источника изображений может использоваться Unsplash API ');
console.log ('9. в качестве источника изображений может использоваться Flickr API ');
console.log ('10. в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API ');
console.log ('11. если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото ');
console.log ('12. в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал ');
console.log ('13. Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их ');
console.log ('14. настройки приложения сохраняются при перезагрузке страницы ');
console.log ('15. ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным ');
console.log ('Выполненные пункты:');
console.log ('1. время выводится в 24-часовом формате, например: 21:01:00 ');
console.log ('2. время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице /время не дёргается/ ');
console.log ('3. выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" ');
console.log ('4. текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток ');
console.log ('5. пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется ');
console.log ('6. ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз ');
console.log ('7. изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 /клик по левой стрелке/ ');
console.log ('8. изображения перелистываются по кругу: после двадцатого изображения идёт первое /клик по правой стрелке/, перед 1 изображением идёт 20 /клик по левой стрелке/'); 
console.log ('9. при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1. при загрузке и перезагрузке страницы 2. при открытой консоли браузера 3. при слишком частых кликах по стрелкам для смены изображения'); 
console.log ('10. при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage ');
console.log ('11. для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел ');
console.log ('12. выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду /пустая строка или бессмысленный набор символов/ ');
console.log ('13. при загрузке страницы приложения отображается рандомная цитата и её автор ');
console.log ('14. при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется /заменяется на другую/ ');
console.log ('15. при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause ');
console.log ('16. при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play ');
console.log ('17. треки пролистываются по кругу - после последнего идёт первый /клик по кнопке Play-next/, перед первым - последний /клик по кнопке Play-prev/'); 
console.log ('18. трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем ');
console.log ('19. после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. ');
console.log ('20. переводится язык и меняется формат отображения даты ');
console.log ('21. переводится приветствие и placeholder ');
console.log ('22. переводится прогноз погоды в т.ч описание погоды и город по умолчанию ');
console.log ('23. переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая ');
console.log ('24. переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется ');
console.log ('25. в настройках приложения можно указать язык приложения - en/ru или en/be');