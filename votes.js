$(document).ready(function() {
  var dataRef = new Firebase('https://mks4proj.firebaseio.com/');

  $('#submit').on('click', function() {
  //   if (e.keyCode == 13 && $('#location').val() != '') {
    var appname = $('#appname').val();
    $('#appname').val("")
    var author = $('#author').val();
    $('#author').val("");
    var link = $('#link').val();
    $('#link').val("");
    var source = $('#source').val();
    $('#source').val("");
    var descrip = $('#descrip').val();
    $('#descrip').val("");
    var locdataRef = new Firebase('https://mks4proj.firebaseio.com/'+appname.replace(/ /g, ''));
    //nameRef.set({appname : appname});
    locdataRef.child('appname').set(appname);
    locdataRef.child('author').set(author);
    locdataRef.child('link').set(link);
    locdataRef.child('descrip').set(descrip);
    locdataRef.child('source').set(source);
  });

  dataRef.on('child_added', function(snapshot) {
    var idea = snapshot.val();
    if(idea.source != undefined) {
      displayIdea(idea.appname, idea.author, idea.link, idea.source, idea.descrip)
    }
  });

  dataRef.on('child_changed', function(snapshot) {
    var idea = snapshot.val();
    if(idea.source != undefined) {
      displayIdea(idea.appname, idea.author, idea.link, idea.source, idea.descrip)
    }
  });

  function shortestCol() {
    var col1Height = $('#col_1').height();
    var col2Height = $('#col_2').height();
    var col3Height = $('#col_3').height();
    if(col1Height <= col2Height && col1Height <= col3Height){
      return 1
    }else if(col2Height <= col3Height){
      return 2
    }else {
      return 3
    }
  }

  function displayIdea(appname, author, link, source, descrip) {
    console.log(appname, author, link, source, descrip)
    finProj= [];
    console.log(source);
    console.log(String(source));
    console.log("This is the link " + link);
    console.log("This is the string link " + String(link));
    link = "http://" + String(link).replace("http://", "").replace("http://", "");
    source = "http://" + String(source).replace("http://", "").replace("http://", "");
    console.log(source);
    finProj[0] = '<div class="row idea" id="' + appname.replace(/ /g, '') + '">';
    finProj[1] = '<h2>'+appname+'</h2>';
    finProj[2] = '<p>' + descrip + '</p>';
    finProj[3] = '<h3>Author: ' + author + '</h3>';
    finProj[4] = '<h3><a href="'+link + ' ">Link</a> - <a href="'+source+' ">Source</a></h3>';
    finProj[6] = '</div>'
    $('#col_' + shortestCol()).append(finProj.join("\n"));
  };

});

