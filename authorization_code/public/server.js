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
            url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {

              var artistArray = []
              var num = 50
              for (var i = 0; i < response.items.length; i++) {
                if (num < 15) {
                  num = 15
                }
                const artist = [response.items[i].name, num]
                artistArray[i] = artist
                num = num - 3
              }
              console.log(artistArray)

              // const buttons = document.querySelectorAll('.btn-outline-secondary');
              // buttons.forEach(button => {
              //   button.addEventListener('click', () => {
              //     //document.querySelector('.special')?.classList.remove('special');
              //     button.classList.add('special');
              //   })
              // })

              

              WordCloud.minFontSize = "50px"
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

            //   document.getElementById('short_term').addEventListener('click', function() {
            //     getTopArtists("short_term")
            //     console.log("shorting...")
            //   });

            //   document.getElementById('medium_term').addEventListener('click', function() {
            //     getTopArtists("medium_term")
            //     console.log("mediuming...")
            //   });

            //   document.getElementById('long_term').addEventListener('click', function() {
            //     getTopArtists("long_term")
            //     console.log("longing...")
            //   });

            //   document.getElementById('grunge').addEventListener('click', function() {
            //     getTopArtists(timeRange, "grunge")
            //     console.log("grunging...")
            //   });

            //   document.getElementById('rainbow').addEventListener('click', function() {
            //     getTopArtists(timeRange, "rainbow")
            //     console.log("rainbowing...")
            //   });

            //   document.getElementById('bubblegum').addEventListener('click', function() {
            //     getTopArtists(timeRange, "bubblegum")
            //     console.log("bubbleguming...")
            //   });


              // const buttons = document.querySelectorAll('.timeBtn');

              // buttons.forEach(button => {
              //   button.addEventListener('click', function() {
              //     seatFunction(button)
              //   });
              // });

              // function seatFunction(a) {
              //   buttons.forEach(button => {
              //     //button.style.background = "none";
              //     document.querySelector('.special')?.classList.remove('special')
              //     //button.classList.add('special');
              //   });
              //   a.classList.add('special')
              //   //a.style.background = "red";
              // }

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

                var defaultThemeObject = document.getElementById('rainbow')
                defaultThemeObject.style.textDecoration = "underline"
                getTopArtists("medium_term", "grunge")

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

    function updateButtonStyling(a, buttons) {
      buttons.forEach(button => {
        button.style.textDecoration = "none";
        //document.querySelector('.special')?.classList.remove('special')
        //button.classList.add('special');
      });
      //a.classList.add('special')
      //a.style.background = "red";
      a.style.textDecoration = "underline"
    }

  })();