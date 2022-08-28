async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    alert('Failed to copy: ', err);
  }
}






document.getElementById("copyBtn").addEventListener("click", copyToClipboard);

function copyToClipboard()
{
  copy(passwordText);
  $("#copyBtn").addClass("copycol2");
  $("#inpPass").attr("placeholder" , "PASSWORD COPIED!!");
  setTimeout(function () {
    $("#copyBtn").removeClass("copycol2");
    $("#inpPass").attr("placeholder" , "PASSWORD");
  }, 1500);


}



// SAVE FUNCTION
document.getElementById("savepw").addEventListener("click", save);

function save()
{
  password = $(".inpw").val();
  chrome.storage.local.get("websites" , function(websiteList)
  {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      },function(tabs)
      {
          let tabURL = tabs[0].url;

          let domain = new URL(tabURL);
          domain = domain.hostname;

          var obj =
          {
            "domain" : domain ,
            "password" : password
          };
          var A = websiteList.websites
          A.push(obj);
          chrome.storage.local.set({"websites": A}, function() {

              });
        })
  })


  chrome.tabs.query({
      active: true,
      currentWindow: true
    },function(tabs)
    {
        let tabURL = tabs[0].url;

        let domain = new URL(tabURL);
        domain = domain.hostname;
        passwordText = password;

      $("#savedWebsite").css("display", "block");
      $("#saved2Website").css("display", "none");



        $(".domainName").text(domain);





    });



}




// RESET PASSWORD FUNCTION

document.getElementById("resetPassword").addEventListener("click", reset);

function reset()
{

  chrome.storage.local.get("websites" , function(websiteList)
  {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      },function(tabs)
      {
          let tabURL = tabs[0].url;

          let domain = new URL(tabURL);
          domain = domain.hostname;
        })
  })


  chrome.tabs.query({
      active: true,
      currentWindow: true
    },function(tabs)
    {
        let tabURL = tabs[0].url;

        let domain = new URL(tabURL);
        domain = domain.hostname;
        chrome.storage.local.get("websites" , function(websiteList) {
          websiteList.websites.forEach(
            function(website)
            {
              console.log(website);
              if(website.domain == domain)
                  {
                    console.log("panda");
                    var filteredArray = websiteList.websites.filter(function(e) { return e.domain !== domain }) // removes json object whose domain matches current domain
                    chrome.storage.local.set({'websites' : filteredArray});
                  }
            });


        $("#savedWebsite").css("display", "none");
        $("#saved2Website").css("display", "block");
        $(".domainName").text(domain);
        });




    });

}





var passwordText = "ALPHABET";







// var websites = [ ];
//
// chrome.storage.sync.set({'websites' : websites});


$("#saved2Website").css("display", "none");


chrome.tabs.query({
    active: true,
    currentWindow: true
  },function(tabs)
  {
      let tabURL = tabs[0].url;

      let domain = new URL(tabURL);
      domain = domain.hostname;

      chrome.storage.local.get("websites" , function(websiteList) {
        if (jQuery.isEmptyObject(websiteList.websites))
        {
          var websites = [];

          chrome.storage.local.set({'websites' : websites});
        }
        var flag = false;
        websiteList.websites.forEach(
          function(website)
          {
            if(website.domain == domain)
                {
                  passwordText = website.password;
                  flag = true;
                }
          });

        if(!flag)
        {
          $("#savedWebsite").css("display", "none");
          $("#saved2Website").css("display", "block");
          // $("#savedWebsite").remove();
          // $("#saved2Website").show();
        }



      });
      $(".domainName").text(domain);



  });
