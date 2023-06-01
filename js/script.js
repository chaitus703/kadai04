const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const btn = document.getElementById('btn');
const form = document.getElementById('form')
const content = document.getElementById('content');
const talks = JSON.parse(localStorage.getItem("talks"));
const ul = document.getElementById("ul");
const lists = document.querySelectorAll("li");
const li = document.createElement("li");


$("#btn").on('click', function() {
// 音声認識をスタート
speech.start();
});
//---------------追記---------------//
//音声自動文字起こし機能
speech.onresult = function(e) {
  speech.stop();
  if(e.results[0].isFinal){
    var autotext = e.results[0][0].transcript;
    console.log(e);
    console.log(autotext);
    content.innerHTML += autotext;
    // //入力された文字を取得したいと思います🤗
    // const key = $("#key").val();
    // // コンソールログを使ってkeyの中身をチェックしてみましょう🤗
    // console.log(key, 'keyの中身')
    // // textareaの入力箇所も取得しましょう🤗
    // const value = $("#content").val();
    // console.log(value, 'valueの中身')
    // // ローカルストレージに保存する記述をします🤗
    // localStorage.setItem(key, value)
  }
  }

//--------------------------------//

var voices = [];
//事前に音声一覧を取得する
if(window.speechSynthesis.onvoiceschanged==null){
  window.speechSynthesis.onvoiceschanged = function(){
    voices = window.speechSynthesis.getVoices();
  }
}else{
  voices = window.speechSynthesis.getVoices();
  //音声一覧をコンソールログに出力する
  for(i=0;i<voices.length;i++){
    console.log(voices[i].name);
  }
}

function speech1(){
  const uttr = new SpeechSynthesisUtterance(document.getElementById("content").value);
  uttr.rate=1.0;  // 話す速度 0.0(遅い)～1.0(標準)～2.0(速い)
  uttr.pitch=3.0;  // ピッチ（声の高さ） 0.0(低め)～1.0(標準)～2.0(高め)
  // お話が完了したときの関数
  uttr.onend=function(){
    //alert("お話終了");
    add();
  }
  /*日本語の音声は、以下のような値から選べる。選ばない場合はデフォルト設定
  uttr.voice=window.speechSynthesis.getVoices().filter(
    voice => voice.name==='Microsoft Haruka Desktop - Japanese' //FireFox,Chrome
    //voice => voice.name==='Microsoft Nanami Online (Natural) - Japanese (Japan)' //Edgeのみ可
    //voice => voice.name==='Microsoft Ayumi - Japanese (Japan)' //Edge,Chromeのみ可
    //voice => voice.name==='Microsoft Haruka - Japanese (Japan)' //Edge,Chromeのみ可
    //voice => voice.name==='Microsoft Ichiro - Japanese (Japan)' //Edge,Chromeのみ可
    //voice => voice.name==='Microsoft Sayaka - Japanese (Japan)' //Edge,Chromeのみ可
    //voice => voice.name==='Google 日本語' //Chromeのみ可
  )[0];
  */
  window.speechSynthesis.cancel();
  // お話しする
  window.speechSynthesis.speak(uttr);
}
window.addEventListener("load",function(){
  //ボタンを押すと「speech」関数を呼び出す
  document.getElementById("speech_button").addEventListener("click",speech1);
});
// ーーーーーーーーーーーーーーーーーーーーーーーーーー

function add(talk){
  let talktext = content.value;
  if(talk){
    talktext = talk;
  }
  if(talktext.length > 0){
    li.innerText = talktext;
    li.classList.add("#list-group-item");
    ul.appendChild(li);
    saveData();
  }
}

function saveData(){
  let talks = [];
  lists.forEach(list=>{
    talks.push(list.innerText);
  })
  var localStorage = Storage;
  localStorage.setItem("talks", JSON.stringify(talks));
}

// ローカルストレージに保存
$("#save").on("click", function() {
  saveData();
})

// ーーーーーーーーーーーーーーーーーーーーーーーーーー
if(talks){
  talks.forEach(talk => {
    add(talk);
  })
}

// ローカルストレージから削除
// $("#clear").on("click", function(){
//   localStorage.removeItem("name"); 
//   $("#list").empty();
// })

// ーーーーーーーーーーーーーーーーーーーーーーーーーー
// for(let i = 0; i < localStorage.length; i++){
//   const key = localStorage.key(i);
//   const value = localStorage.getItem(key)
//   const html = `
//   <tr>
//      <th>${key}</th>
//      <td>${value}</td>
//   </tr>
//   `
//   $("#list").append(html)
//  }

