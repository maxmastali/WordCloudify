var globalTime = "medium_term";
var globalTheme = "summer";

var globalNumberOfCustomColors = 3;

var globalFirstCustomColor = '#000000';
var globalSecondCustomColor = '#000000';
var globalThirdCustomColor = '#000000';
var globalFourthCustomColor = '#000000';
var globalFifthCustomColor = '#000000';

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

              WordCloud.minFontSize = "25px"

            if (screen.width > 780) {
              $('#word_cloud').show();
            }
            
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

              } else if (theme == "custom") {
                WordCloud(document.getElementById('word_cloud'), {
                  list: artistArray,
                  gridSize: 5,
                  weightFactor: 1,
                  color: function() {
                    switch (globalNumberOfCustomColors) {
                      case 1:
                        return ([globalFirstCustomColor])[Math.floor(Math.random() * globalNumberOfCustomColors)]
                      case 2:
                        return ([globalFirstCustomColor, globalSecondCustomColor])[Math.floor(Math.random() * globalNumberOfCustomColors)]
                      case 3:
                        return ([globalFirstCustomColor, globalSecondCustomColor, globalThirdCustomColor])[Math.floor(Math.random() * globalNumberOfCustomColors)]
                      case 4:
                        return ([globalFirstCustomColor, globalSecondCustomColor, globalThirdCustomColor, globalFourthCustomColor])[Math.floor(Math.random() * globalNumberOfCustomColors)]
                      case 5:
                        return ([globalFirstCustomColor, globalSecondCustomColor, globalThirdCustomColor, globalFourthCustomColor, globalFifthCustomColor])[Math.floor(Math.random() * globalNumberOfCustomColors)]
                    }
                  }
                });
                }

              if (screen.width < 780) {
                $('#word_cloud').hide();
                $('#word_cloud_img').hide();
              }

              sleep(800).then(() => {
                const canvas = document.getElementById('word_cloud')
                const img = canvas.toDataURL('image/png')
                $('#word_cloud').hide();
                $('#word_cloud_img').show();
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

                var defaultNumberOfCustomColorsObject = document.getElementById('3')
                defaultNumberOfCustomColorsObject.style.textDecoration = "underline"
                defaultNumberOfCustomColorsObject.style.textUnderlinePosition = "under"

                globalNumberOfCustomColors = 3;
                document.getElementById('first').style.visibility = 'visible';
                document.getElementById('second').style.visibility = 'visible';
                document.getElementById('third').style.visibility = 'visible';
                document.getElementById('fourth').style.visibility = 'hidden';
                document.getElementById('fifth').style.visibility = 'hidden';

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

    document.getElementById('logoutButton').addEventListener('click', function() {
      var newWindow = window.open("https://accounts.spotify.com/logout/");
      setTimeout(() => newWindow.close(), 1500);
      setTimeout(() => window.location.href = "https://wordcloudify.herokuapp.com/", 1500);
    });

    document.getElementById('short_term').addEventListener('click', function() {
        globalTime = "short_term"
        getTopArtists(globalTime, globalTheme)
      });

    document.getElementById('medium_term').addEventListener('click', function() {
        globalTime = "medium_term"
        getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('long_term').addEventListener('click', function() {
        globalTime = "long_term"
        getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('summer').addEventListener('click', function() {
        document.getElementById('custom-colors').style.display = 'none';
        globalTheme = "summer"
        getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('fall').addEventListener('click', function() {
        document.getElementById('custom-colors').style.display = 'none';
        globalTheme = "fall"
        getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('spring').addEventListener('click', function() {
        document.getElementById('custom-colors').style.display = 'none';
        globalTheme = "spring"
        getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('winter').addEventListener('click', function() {
      document.getElementById('custom-colors').style.display = 'none';
      globalTheme = "winter"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('custom').addEventListener('click', function() {
      document.getElementById('custom-colors').style.display = 'block';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('1').addEventListener('click', function() {
      globalNumberOfCustomColors = 1;
      document.getElementById('first').style.visibility = 'visible';
      document.getElementById('second').style.visibility = 'hidden';
      document.getElementById('third').style.visibility = 'hidden';
      document.getElementById('fourth').style.visibility = 'hidden';
      document.getElementById('fifth').style.visibility = 'hidden';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('2').addEventListener('click', function() {
      globalNumberOfCustomColors = 2;
      document.getElementById('first').style.visibility = 'visible';
      document.getElementById('second').style.visibility = 'visible';
      document.getElementById('third').style.visibility = 'hidden';
      document.getElementById('fourth').style.visibility = 'hidden';
      document.getElementById('fifth').style.visibility = 'hidden';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('3').addEventListener('click', function() {
      globalNumberOfCustomColors = 3;
      document.getElementById('first').style.visibility = 'visible';
      document.getElementById('second').style.visibility = 'visible';
      document.getElementById('third').style.visibility = 'visible';
      document.getElementById('fourth').style.visibility = 'hidden';
      document.getElementById('fifth').style.visibility = 'hidden';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('4').addEventListener('click', function() {
      globalNumberOfCustomColors = 4;
      document.getElementById('first').style.visibility = 'visible';
      document.getElementById('second').style.visibility = 'visible';
      document.getElementById('third').style.visibility = 'visible';
      document.getElementById('fourth').style.visibility = 'visible';
      document.getElementById('fifth').style.visibility = 'hidden';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('5').addEventListener('click', function() {
      globalNumberOfCustomColors = 5;
      document.getElementById('first').style.visibility = 'visible';
      document.getElementById('second').style.visibility = 'visible';
      document.getElementById('third').style.visibility = 'visible';
      document.getElementById('fourth').style.visibility = 'visible';
      document.getElementById('fifth').style.visibility = 'visible';
      globalTheme = "custom"
      getTopArtists(globalTime, globalTheme)
    });

    document.getElementById('first').addEventListener('input', function() {
      picker = document.getElementById('first');
      globalFirstCustomColor = picker.value;
      getTopArtists(globalTime, "custom");
    });

    document.getElementById('second').addEventListener('input', function() {
      picker = document.getElementById('second');
      globalSecondCustomColor = picker.value;
      getTopArtists(globalTime, globalTheme);
    });

    document.getElementById('third').addEventListener('input', function() {
      picker = document.getElementById('third');
      globalThirdCustomColor = picker.value;
      getTopArtists(globalTime, "custom");
    });

    document.getElementById('fourth').addEventListener('input', function() {
      picker = document.getElementById('fourth');
      globalFourthCustomColor = picker.value;
      getTopArtists(globalTime, "custom");
    });

    document.getElementById('fifth').addEventListener('input', function() {
      picker = document.getElementById('fifth');
      globalFifthCustomColor = picker.value;
      getTopArtists(globalTime, "custom");
    });

    const timeButtons = document.querySelectorAll('.timeBtn');
    const themeButtons = document.querySelectorAll('.themeBtn');
    const pickerButtons = document.querySelectorAll('.pickerBtn');

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

    pickerButtons.forEach(button => {
      button.addEventListener('click', function() {
        updateButtonStyling(button, pickerButtons)
      });
    });

    document.getElementById('spotifyImage').setAttribute('draggable', false);
    document.getElementById('spotifyWatermark').setAttribute('draggable', false);

    function updateButtonStyling(a, buttons) {
      buttons.forEach(button => {
        button.style.textDecoration = "none";
      });

      a.style.textDecoration = "underline"
      a.style.textUnderlinePosition = "under"
    }

    document.getElementById('download').addEventListener('click', function(e) {

      var container = document.getElementById("cloudContainer");; /* full page */
      html2canvas(container, { allowTaint: true, scale: 5 }).then(function (canvas) {

          var link = document.createElement("a");
          document.body.appendChild(link);
          link.download = "top_artists_wordcloud.jpg";
          link.href = canvas.toDataURL();
          link.target = '_blank';
          link.click();
      });
    });

  })();