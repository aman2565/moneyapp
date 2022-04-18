$(function() {
  $(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
});

$(document).ready( function(){
  $("#card_hide").hide();
  $("#change_email").click(function(){
    $("#card_hide").show();
    $("#collapseEmail").show();
    $("#collapseChangePassword").hide();
    $("#collapseSendPassword").hide();
    $("#collapseMaxAparts").hide();
  });
  $("#change_password").click(function(){
    $("#card_hide").show();
    $("#collapseChangePassword").show();
    $("#collapseEmail").hide();
    $("#collapseSendPassword").hide();
    $("#collapseMaxAparts").hide();
  });
  $("#send_password").click(function(){
    $("#card_hide").show();
    $("#collapseSendPassword").show();
    $("#collapseEmail").hide();
    $("#collapseChangePassword").hide();
    $("#collapseMaxAparts").hide();
  });

  $("#n_maxAparts").click(function(){
    $("#card_hide").show();
    $("#collapseMaxAparts").show();
    $("#collapseEmail").hide();
    $("#collapseSendPassword").hide();
    $("#collapseChangePassword").hide();
  });
})