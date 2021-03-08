# 585L-final-converse-mirka
585L Final Project: Blair Mirka and Rowan Converse (BEMP Groundwater and River Stage 1997 - 2017)

# Dr. Yang comments and suggestions:
* 3/2/2021 Dr. Yang suggestions bugs related to Blair's graph 
  * The error does not relate to whether yourchange the column name, it is because there are a lot of null values in your dataset, the follwoing posts might help for how to handle the null vaules
     * How do I get d3 to treat missing values as null instead of zero? https://stackoverflow.com/questions/26387359/how-do-i-get-d3-to-treat-missing-values-as-null-instead-of-zero
     * **https://bocoup.com/blog/showing-missing-data-in-line-charts** *(Dr. Yang: this post introduces five methods to hand missing data in line charts)*
     * Null Values - Parallel Coordinates http://bl.ocks.org/syntagmatic/4248862 *(Dr. Yang: check this example for how they handle missing data in a csv file)*
   * Blair, you do not need to have a seprate dropdown list for your graph, you can use the following to get a subset of rows in your csv data acorrding to the site selected by the map dropdown to udpate your graph. see the following post for how to get a subset of rows of your csv file
     * Selecting a section of data from CSV in d3.js (added by Dr. Yang) https://stackoverflow.com/questions/36314656/selecting-a-section-of-data-from-csv-in-d3-js

* 3/1/2021 (minor suggestion for your Alpha submission)
  * make the popup info more readable, you can make the header info (e.g., "Site Name:", "Established:") in your popup in **bold**.
  * like the line chart, add brief info about how to use the map, something like "use the dropdown or click on any point on the map to zoom to selected site; refresh to go back all site". unless you implemented an dropdown list option, allSites
  

* 2/28/2021
  * ~~Icon inside Leaflet control layer does not show up, check this post (need to download the icon images, create a folder called images and add the downloaded icon images in the folder): https://gis.stackexchange.com/questions/304243/icon-inside-leaflet-control-layer-does-not-display~~ resolved

  * ~~Also, the marker images seems not showing up either, this might be the same reason that you have not downloaded the marker images, please download the marker images and put it inside the images folder I mentioned in the suggestion above~~ resolved

  * for the graph, great that your group has made the intial verson of brush and zoom multiline chart (with the dual y axix) working!
    * It looks like the "Air-Temp" variable is not the variable you team proposed to use in your final project right? The Air-Temp variable should be replaced by the Depth-To-Groundwater variable? *It is displaying depth to groundwater; Blair noted an error with changing the name of the variable within the code*
    * Also, which zoom and brush example you used to create the multipline graph with brush and zoom function (this one? http://bl.ocks.org/natemiller/raw/7dec148bb6aab897e561/ the example used d3v3, but in your multi-line graph code, you used d3v4.) It seems the bottom overview graph does not seem look completely correct, as the overview graph at the botoom should contains two lines as well.
    * How do you link the csv file with the site? as I have not seen any information that can be used to link the csv files (one has depth to groundwater of the sites and one from USGS river stage) to the site in your geojson. *Needs investigating! Not sure how to do this yet*
  * Check some minor suggestions Dr. Yang edited in the file"index_DrYangEdited.html" (line 30 to 45)
  * next step:
    * ~~add the required about modal (this is very easy to do, so I suggest you finish this befor eyou submit alpha version).~~ resolved
    * need to use d3 to generate the data for each selected site to feed/update the input data for the multi-line graph, so when a user selects a site from the map dropdown list, the ling chart will be updated automatically
    * ~~the map drop down need to add code to make it actually zoom into selected site. the default is to display all sites.~~ resolved


# Potentially useful examples
## get subset of rows of data from a csv
* Selecting a section of data from CSV in d3.js (added by Dr. Yang)
https://stackoverflow.com/questions/36314656/selecting-a-section-of-data-from-csv-in-d3-js

## Multiline charts with brush and zoom

* **Multiline Brush and Zoom (v3)**
http://bl.ocks.org/natemiller/7dec148bb6aab897e561 

* **Multiline Drop Down (v4)**
https://bl.ocks.org/ProQuestionAsker/8382f70af7f4a7355827c6dc4ee8817d

## line chart with dual Y axes

* **d3.js line graph with dual Y axes**  (Added by Dr. Yang)
https://bl.ocks.org/d3noob/e34791a32a54e015f57d 


## dropdown
**Add dropdown list to filter map:**
* https://gis.stackexchange.com/questions/279574/creating-drop-down-list-to-zoom-into-selected-country-for-leaflet-maps

* https://www.fla-shop.com/howto/map-with-dropdown/
*this version uses an autocomplete instead of a dropdown

* http://www.gistechsolutions.com/leaflet/DEMO/Search/index.html

* https://stackoverflow.com/questions/23138767/dropdown-filter-in-leaflet (This user is trying to do precisely what I'm doing)

* https://stackoverflow.com/questions/44904950/apply-zoom-in-zoom-out-feature-by-clicking-dropdown-list-any-value



