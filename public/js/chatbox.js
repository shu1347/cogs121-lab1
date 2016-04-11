(function($) {
  "use strict";

  var socket = io();
  $('#send_message').submit(function(e){
    e.preventDefault();

    var $user_input = $('#user_input')
    console.log($user_input.val());
    socket.emit('newsfeed', $user_input.val());
    $user_input.val('');
  })

///////////////

  $('#send_message_subway').submit(function(e){
    e.preventDefault();

    var $user_input_subway = $('#user_input_subway')
    console.log($user_input_subway.val());
    socket.emit('newsfeedSubway', $user_input_subway.val());
    $user_input_subway.val('');
  })

//////////////

  $('#send_message_lemongrass').submit(function(e){
    e.preventDefault();

    var $user_input_lemongrass = $('#user_input_lemongrass')
    console.log($user_input_lemongrass.val());
    socket.emit('newsfeedLemongrass', $user_input_lemongrass.val());
    $user_input_lemongrass.val('');
  })

//////////////

  $('#send_message_rubios').submit(function(e){
    e.preventDefault();

    var $user_input_rubios = $('#user_input_rubios')
    console.log($user_input_rubios.val());
    socket.emit('newsfeedRubios', $user_input_rubios.val());
    $user_input_rubios.val('');
  })

//////////////

  $('#send_message_starbucks').submit(function(e){
    e.preventDefault();

    var $user_input_starbucks = $('#user_input_starbucks')
    console.log($user_input_starbucks.val());
    socket.emit('newsfeedStarbucks', $user_input_starbucks.val());
    $user_input_starbucks.val('');
  })

//////////////

  $('#send_message_santorinis').submit(function(e){
    e.preventDefault();

    var $user_input_santorinis = $('#user_input_santorinis')
    console.log($user_input_santorinis.val());
    socket.emit('newsfeedSantorinis', $user_input_santorinis.val());
    $user_input_santorinis.val('');
  })

//////////////

  $('#send_message_tapex').submit(function(e){
    e.preventDefault();

    var $user_input_tapex = $('#user_input_tapex')
    console.log($user_input_tapex.val());
    socket.emit('newsfeedTapex', $user_input_tapex.val());
    $user_input_tapex.val('');
  })

//////////////

  $('#send_message_burgerking').submit(function(e){
    e.preventDefault();

    var $user_input_burgerking = $('#user_input_burgerking')
    console.log($user_input_burgerking.val());
    socket.emit('newsfeedBurgerking', $user_input_burgerking.val());
    $user_input_burgerking.val('');
  })

 $('#comment_form').submit(function(e){
    e.preventDefault();
    console.log("Hello");
    var $comment = $('#comment');
    var parent_post_id = $comment.attr("name");
    socket.emit('newComment', {"parent_post_id": parent_post_id, "comment":$comment.val()});
    $comment.val('');
  })

 ////////////////////////

  socket.on('newsfeed', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });

///////////////////

  socket.on('newsfeedSubway', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });

///////////////////

  socket.on('newsfeedLemongrass', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });

///////////////////

  socket.on('newsfeedRubios', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });


///////////////////

  socket.on('newsfeedStarbucks', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });


///////////////////

  socket.on('newsfeedSantorinis', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });


///////////////////

  socket.on('newsfeedTapex', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });

///////////////////

  socket.on('newsfeedBurgerking', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
      var result = '<div class="user">' +
        '<div class="user-image">' +
        '<img src="' + template.user.photo + '" alt="">' +
        '</div>' +
        '<div class="user-info">' +
        '<span class="username">' + template.user.username + '</span><br/>' +
        '<span class="posted">' + template.posted + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="message-content">' +
        template.message +
        '</div>';
      return result;
    }
  });

})($);