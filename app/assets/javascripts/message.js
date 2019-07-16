$(function(){

  function buildHTML(message) {
    var html = `<div class="main__messages__message" data-id="${message.id}">
                  <p class="main__messages__message--talker">${message.user_name}</p>
                  <p class='main__messages__message--date'>${message.created_at}</p>`;
    var cnt = message.content ? `<p class='main__messages__message--text'>${message.content}</p>` : "";
    var img = message.image_url ? `<p><img class="main__messages__message--image" src="${message.image_url}"></p>` : "";
    html += cnt + img + "</div>";
    return html;
  }

  $('#new_message').on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var result = buildHTML(data);
      $('.main__messages').append(result);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight }, 500);
      $('#message_content').val('');
      $('.main__form--form__box--label--uploader').val('');
      $('.main__form--form--submit').attr('disabled', false);
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    })
  });

  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.main__messages__message').last().data('id');
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: './api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          insertHTML += buildHTML(message);
        })
        //メッセージを追加
        $('.main__messages').append(insertHTML);
        if (messages.length > 0) {
          $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight }, 5000);
        }
      })
      .fail(function() {
        console.log('error');
      });
    };
  };

  setInterval(reloadMessages, 5000);
});