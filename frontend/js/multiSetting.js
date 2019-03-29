jQuery.noConflict();

setTimeout(function () {
  jQuery('#tugsMeetup').bsMultiSelect({
    selectedPanelFocusBoxShadow: '0 0 0 0 transparent',
    selectedPanelFocusBorderBottomColor: '0 0 0 .1rem rgba(255, 213, 57, 0.25)'
  });
  jQuery('#speakerIndustry').bsMultiSelect({
    selectedPanelFocusBoxShadow: '0 0 0 0 transparent',
    selectedPanelFocusBorderBottomColor: '0 0 0 .1rem rgba(255, 213, 57, 0.25)'
  });
  jQuery('#speakerExpertise').bsMultiSelect({
    selectedPanelFocusBoxShadow: '0 0 0 0 transparent',
    selectedPanelFocusBorderBottomColor: '0 0 0 .1rem rgba(255, 213, 57, 0.25)'
  });
  jQuery('#speakerMeetup').bsMultiSelect({
    selectedPanelFocusBoxShadow: '0 0 0 0 transparent',
    selectedPanelFocusBorderBottomColor: '0 0 0 .1rem rgba(255, 213, 57, 0.25)',
    selectedPanelClass: 'speaker-filtr-meetups form-control',
  });
  jQuery('#speakerJobTitle').bsMultiSelect({
    selectedPanelFocusBoxShadow: 'transparent',
    selectedPanelFocusBorderBottomColor: '0 0 0 .1rem rgba(255, 213, 57, 0.25)'
  });

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


}, 2000);
