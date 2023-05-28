const speech = new webkitSpeechRecognition();
    speech.lang = 'ja-JP';

    const btn = document.getElementById('btn');
    const content = document.getElementById('content');

    btn.addEventListener('click' , function() {
    // 音声認識をスタート
    speech.start();
    });

    //---------------追記---------------//
    //音声自動文字起こし機能
    speech.onresult = function(e) {
      speech.stop();
      if(e.results[0].isFinal){
        var autotext =  e.results[0][0].transcript
        console.log(e);
        console.log(autotext);
        content.innerHTML += autotext;
        //入力された文字を取得したいと思います🤗
        const key = $("#key").val();
        // コンソールログを使ってkeyの中身をチェックしてみましょう🤗
        console.log(key, 'keyの中身')
        // textareaの入力箇所も取得しましょう🤗
        const value = $("#content").val();
        console.log(value, 'valueの中身')
        // ローカルストレージに保存する記述をします🤗
        localStorage.setItem(key, value)

      }
     }
    //--------------------------------//

    var voices = [];
    //事前に音声一覧を取得する
    if(window.speechSynthesis.onvoiceschanged==null){
      window.speechSynthesis.onvoiceschanged = function(){
        voices = window.speechSynthesis.getVoices();
        //音声一覧をコンソールログに出力する場合
        for(i=0;i<voices.length;i++){
          console.log(voices[i].name);
        }
      }
    }else{
      voices = window.speechSynthesis.getVoices();
      //音声一覧をコンソールログに出力する場合
      for(i=0;i<voices.length;i++){
        console.log(voices[i].name);
      }
    }
    function speech1(){
      const uttr = new SpeechSynthesisUtterance(document.getElementById("content").value);
      // 話す速度 0.0(遅い)～1.0(標準)～2.0(速い)
      uttr.rate=1.0;
      // ピッチ（声の高さ） 0.0(低め)～1.0(標準)～2.0(高め)
      uttr.pitch=3.0;
      // お話が完了したときの関数
      uttr.onend=function(){
        //alert("お話終了");
      }
    
      //日本語の音声は、以下のような値から選べる。選ばない場合はデフォルト設定
      /*
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
    
      //お話の一時停止
      //window.speechSynthesis.pause();
      //お話の再開
      //window.speechSynthesis.resume();
      //お話の終了
      //window.speechSynthesis.cancel();
    }
    window.addEventListener("load",function(){
      //ボタンを押すと「speech」関数を呼び出す
      document.getElementById("speech_button").addEventListener("click",speech1);
    });