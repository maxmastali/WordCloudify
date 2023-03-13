

tagList = [
    ['CSS', 12], 
    ['Script', 6],
    ['Com', 8]
  ]
  
  WordCloud.minFontSize = "15px"
  WordCloud(document.getElementById('word_cloud'), { list: tagList} );
  
  console.log("testing!!")