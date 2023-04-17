var globalTime = "medium_term";
var globalTheme = "grunge";

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

              if (theme == "grunge") {
                WordCloud(document.getElementById('word_cloud'), {
                list: artistArray,
                gridSize: 5,
                weightFactor: 1,
                fontFamily: 'Average, Times, serif',
                color: function() {
                  return (['#d0d0d0', '#e11', '#44f'])[Math.floor(Math.random() * 3)]
                },
                backgroundColor: '#333'
              } );


                
              } else if (theme == "rainbow") {
                WordCloud(document.getElementById('word_cloud'), {
                list: artistArray,
                gridSize: 5,
                weightFactor:1,
                fontFamily: 'Finger Paint, cursive, sans-serif',
                color: '#f0f0c0',
                hover: window.drawBox,
                click: function(item) {
                  alert(item[0] + ': ' + item[1]);
                },
                backgroundColor: '#001f00'
              } );

              } else {
                WordCloud(document.getElementById('word_cloud'), {
                list: artistArray
              } );

              }

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

                var defaultThemeObject = document.getElementById('rainbow')
                defaultThemeObject.style.textDecoration = "underline"
                defaultThemeObject.style.textUnderlinePosition = "under"
                getTopArtists("medium_term", "rainbow")

                $('#login').hide();
                $('#loggedin').show();
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

    document.getElementById('grunge').addEventListener('click', function() {
        globalTheme = "grunge"
        getTopArtists(globalTime, "grunge")
        console.log("grunging...")
    });

    document.getElementById('rainbow').addEventListener('click', function() {
        globalTheme = "rainbow"
        getTopArtists(globalTime, "rainbow")
        console.log("rainbowing...")
    });

    document.getElementById('bubblegum').addEventListener('click', function() {
        globalTheme = "bubblegum"
        getTopArtists(globalTime, "bubblegum")
        console.log("bubbleguming...")

        // var c = document.getElementById("word_cloud");
        // var ctx = c.getContext("2d");
        // ctx.fillStyle = "red";
        // ctx.fillRect(0, 0, 500, 500);
        // ctx.clearRect(0, 0, 300, 500);
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
      html2canvas(container, { allowTaint: true, scale: 12 }).then(function (canvas) {

          var link = document.createElement("a");
          document.body.appendChild(link);
          link.download = "top_artists_wordcloud.jpg";
          link.href = canvas.toDataURL();
          link.target = '_blank';
          link.click();
      });


    });

  })();