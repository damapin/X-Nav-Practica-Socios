function formatMessages(messages,section){
  for (var i = 0; i < messages.length; i++) {
    var $currentMessage = $('<div class="timeline-message">');
    var image = document.createElement('img');
    image.src = messages[i].avatar;
    $currentMessage.append(image);
    var author = document.createElement('h4');
    author.appendChild(document.createTextNode(messages[i].author));
    $currentMessage.append(author);
    $currentMessage.append(document.createTextNode(messages[i].date));
    var title = document.createElement('h2');
    title.appendChild(document.createTextNode(messages[i].title));
    $currentMessage.append(title);
    $currentMessage.append(document.createTextNode(messages[i].content));
    section.append($currentMessage);
  }
}

$(document).ready(function () {
  $( "#tabs" ).tabs();

  var $timeline = $("#timeline");
  $.getJSON( "timeline.json", function( data ){

    var messages = data.messages;
    //var $timeline = $("#timeline");
    formatMessages(messages,$timeline);
  });

  $.getJSON("update.json", function(newData){
    if (newData !== undefined) {
      var $alertButton = $('<button class="button" id="unreadMessages">Read new messages</button>');
      $timeline.append($alertButton);
      $alertButton.click(function(){
        var messages = newData.messages;
        formatMessages(messages, $timeline);
        $alertButton.remove();
      });
    }
  });
});
