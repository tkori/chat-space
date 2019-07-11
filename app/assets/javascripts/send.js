$(function(){

  function buildHTML(message) {
    var date = new Date(message.created_at);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var days = date.getDate();
    var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    var day = weekday[date.getDay()];
    var hour = date.getHours();
    var h0 = ('0' + hour).slice(-2);
    var minute = date.getMinutes() + 1;
    var m0 = ('0' + minute).slice(-2);
    var second = date.getSeconds();
    var s0 = ('0' + second).slice(-2);
    var formatted_date = `${year}/${month}/${days}(${day}) ${h0}:${m0}:${s0}`
    var html = `<div class="main__messages__message">
                  <p class="main__messages__message--talker">${message.user.name}</p>
                  <p class='main__messages__message--date'>${formatted_date}</p>`
    var cnt = message.content ? `<p class='main__messages__message--text'>${message.content}</p>` : "";
    var img = message.image.url ? `<p><img class="main__messages__message--image" src="${message.image.url}"></p>` : "";
    html += cnt + img + "</div>"
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
      $('.main').animate({scrollTop:$('.main')[0].scrollHeight}, 200);
      $('#message_content').val('');
      $('.main__form--form--submit').attr('disabled', false);
    })
    .fail(function(){
      alert('メッセージか画像を入力してください');
    })
  });
});