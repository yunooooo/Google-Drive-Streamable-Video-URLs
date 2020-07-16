(function($) {
  $(function() {
    var $shareLink = $('#sharelink'),
	  $apiKey = $('#apikey'),
      $downloadLink = $('#downloadlink'),
      $copyButton = $('#copylinkbtn'),
      clipboard;
	
	$('#sharelink, #apikey').on('input', function() {
		var link = $shareLink.val();
		var apiKey = $apiKey.val();
		var fileId = link.replace(/(.)+([a-zA-Z0-9\-\_]{33})+(.+)/, "$2");
		var beginURL = 'https://api.googleapps.com/drive/v3/files/';
		var midStr = '/?key=';
		var endURL = '&alt=media';
		f = beginURL.concat(fileId, midStr, apiKey, endURL);
      if(f.length == 130) {
        $downloadLink.val(f);
        $copyButton.removeAttr('disabled');
      } else {
        $downloadLink.val('');
        $copyButton.attr('disabled', 'disabled');
      }
    });

    $downloadLink.on('click', function() {
      $downloadLink.select();
    });

    clipboard = new Clipboard('#copylinkbtn');
    clipboard.on('success', function(e) {
      $.notify({
        icon: 'glyphicon glyphicon-ok-circle',
        title: 'Link copied to clipboard:',
        message: e.text,
        url: e.text,
        target: '_blank'
      }, {
        // settings
        type: "success",
        placement: {
          from: "top",
          align: "center"
        }
      });

      // $.notify(e.text + " copied to clipboard.");

      e.clearSelection();
    });

  });
})(jQuery);