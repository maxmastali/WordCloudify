var globalTime = "medium_term";
var globalTheme = "summer";

(function() {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
         hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    }

    // sleep time expects milliseconds
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    function getTopArtists(timeRange, theme) {
      $.ajax({
            url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=25`,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {

              var artistArray = []
              var num = 50
              for (var i = 0; i < response.items.length; i++) {
                if (num < 13) {
                  num = 13
                }
                const artist = [response.items[i].name, num]
                artistArray[i] = artist
                num = num - 2
              }
              console.log(artistArray)

              // const buttons = document.querySelectorAll('.btn-outline-secondary');
              // buttons.forEach(button => {
              //   button.addEventListener('click', () => {
              //     //document.querySelector('.special')?.classList.remove('special');
              //     button.classList.add('special');
              //   })
              // })

              

              WordCloud.minFontSize = "25px"
            //   WordCloud(document.getElementById('word_cloud'), {
            //     list: artistArray
            //   } );

              if (theme == "summer") {
                WordCloud(document.getElementById('word_cloud'), {
                list: artistArray,
                gridSize: 5,
                weightFactor: 1,
                color: function() {
                  return (['#f8ad00', '#f4ea00', '#00c1e3', '#70e4df', '#b5ecb7', '#d87d7d'])[Math.floor(Math.random() * 6)]
                }
              });


              } else if (theme == "fall") {
                WordCloud(document.getElementById('word_cloud'), {
                  list: artistArray,
                  gridSize: 5,
                  weightFactor: 1,
                  color: function() {
                    return (['#eb781b', '#871c0e', '#004600', '#faa943', '#753473'])[Math.floor(Math.random() * 5)]
                  }
              });

              } else if (theme == "spring") {
                WordCloud(document.getElementById('word_cloud'), {
                  list: artistArray,
                  gridSize: 5,
                  weightFactor: 1,
                  color: function() {
                    return (['#f9939d', '#69b500', '#ce5a6a', '#e3abca', '#f8d684'])[Math.floor(Math.random() * 5)]
                  }
              });

            } else if (theme == "winter") {
              WordCloud(document.getElementById('word_cloud'), {
                list: artistArray,
                gridSize: 5,
                weightFactor: 1,
                color: function() {
                  return (['#ad7cbd', '#214562', '#7d8cb5', '#7f828a', '#9ec6e8'])[Math.floor(Math.random() * 5)]
                }
              });

              }

              sleep(150).then(() => {
                const canvas = document.getElementById('word_cloud')
                const img = canvas.toDataURL('image/png')
                document.getElementById('word_cloud_img').src = img
              });

              $('#login').hide();
              $('#loggedin').show();
            }
        });
    }

    var params = getHashParams();

    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

    if (error) {
      alert('There was an error during the authentication');
    } else {
      if (access_token) {

        $.ajax({

            url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term',
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                var defaultTimeObject = document.getElementById('medium_term')
                defaultTimeObject.style.textDecoration = "underline"
                defaultTimeObject.style.textUnderlinePosition = "under"

                var defaultThemeObject = document.getElementById('summer')
                defaultThemeObject.style.textDecoration = "underline"
                defaultThemeObject.style.textUnderlinePosition = "under"
                getTopArtists("medium_term", "summer")

                sleep(1000).then(() => {
                  var wordCloudImage = document.getElementById('word_cloud_img')
                  wordCloudImage.style.display = "inline"
                });



                $('#login').hide();
                $('#loggedin').show();
                $('#logoutButton').show();
            }
        });
      } else {
          // render initial screen
          $('#login').show();
          $('#loggedin').hide();
      }
    }
    document.getElementById('short_term').addEventListener('click', function() {
        globalTime = "short_term"
        getTopArtists(globalTime, globalTheme)
        console.log("shorting...")
      });

    document.getElementById('medium_term').addEventListener('click', function() {
        globalTime = "medium_term"
        getTopArtists(globalTime, globalTheme)
        console.log("mediuming...")
    });

    document.getElementById('long_term').addEventListener('click', function() {
        globalTime = "long_term"
        getTopArtists(globalTime, globalTheme)
        console.log("longing...")
    });

    document.getElementById('summer').addEventListener('click', function() {
        globalTheme = "summer"
        getTopArtists(globalTime, "summer")
        console.log("summering...")
    });

    document.getElementById('fall').addEventListener('click', function() {
        globalTheme = "fall"
        getTopArtists(globalTime, "fall")
        console.log("falling...")
    });

    document.getElementById('spring').addEventListener('click', function() {
        globalTheme = "spring"
        getTopArtists(globalTime, "spring")
        console.log("springing...")
    });

    document.getElementById('winter').addEventListener('click', function() {
      globalTheme = "winter"
      getTopArtists(globalTime, "winter")
      console.log("wintering...")
  });

    const timeButtons = document.querySelectorAll('.timeBtn');
    const themeButtons = document.querySelectorAll('.themeBtn');

    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            updateButtonStyling(button, timeButtons)
        });
    });

    themeButtons.forEach(button => {
      button.addEventListener('click', function() {
        updateButtonStyling(button, themeButtons)
      });
    });


    // var canvas = document.getElementById('layer2')
    // if (canvas.getContext) {
    //   var layout = canvas.getContext('2d');
    //   var image = new Image();
    //   image.src = "./Spotify_Logo_CMYK_Black.png";
    //   image.onload = function() {
    //   layout.drawImage(image, 0, 0, 100, 30);
    // }
    // }

    document.getElementById('spotifyImage').setAttribute('draggable', false);
    document.getElementById('spotifyWatermark').setAttribute('draggable', false);

    function updateButtonStyling(a, buttons) {
      buttons.forEach(button => {
        button.style.textDecoration = "none";
        //document.querySelector('.special')?.classList.remove('special')
        //button.classList.add('special');
      });
      //a.classList.add('special')
      //a.style.background = "red";
      a.style.textDecoration = "underline"
      a.style.textUnderlinePosition = "under"
    }

    document.getElementById('download').addEventListener('click', function(e) {
      // let canvas = document.getElementById('cloudContainer')

      // // Convert our canvas to a data URL
      // let canvasUrl = canvas.toDataURL();
      // // Create an anchor, and set the href value to our data URL
      // const createEl = document.createElement('a');
      // createEl.href = canvasUrl;
  
      // // This is the name of our downloaded file
      // createEl.download = "top-artists-wordcloud";
  
      // // Click the download button, causing a download, and then remove it
      // createEl.click();
      // createEl.remove();


      var container = document.getElementById("cloudContainer");; /* full page */
      html2canvas(container, { allowTaint: true, scale: 5 }).then(function (canvas) {

          var link = document.createElement("a");
          document.body.appendChild(link);
          link.download = "top_artists_wordcloud.jpg";
          link.href = canvas.toDataURL();
          link.target = '_blank';
          link.click();
      });


      // const image = document.getElementById("cloudContainer")
      // var imgPath = image.getAttribute('src');
      // var fileName = "top_artists_wordcloud";

      // saveAs(imgPath, fileName);
    });

  })();