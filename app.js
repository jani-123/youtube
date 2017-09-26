"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI"; //api de youtube
class app {
      constructor() { //variables globales
            this.videos = [],
                  this.selectedVideo = null,
                  this.searchTerm = "super junior"
      }

      init() {
            //this.videoSearch("super junior");
            this.youtubeSearch("super junior");
      }
      getImageList(videos) {
            return videos.map((video, index) => {
                  const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  const title = video.snippet.title;
                  const description = video.snippet.description;
                  const imageUrl = video.snippet.thumbnails.default.url;
                  return `<li> <img class="media-object" src=${imageUrl} />
                               <div class="datos"><p>${title}</p><p>${description}</p></div></li>`;
            });
      }
      getVideoList(video) {

            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            const title = video.snippet.title;
            const description = video.snippet.description;
            $("#descripcion").append(`<h2>${title}</h2>
            <p>${description}</p></div>`);
            return `<iframe class="embed-responsive-item" src=${url}> </iframe>`;

      }
      youtubeSearch(searchTerm) { // recibe
            console.log(searchTerm);

            YTSearch({ key: API_KEY, term: searchTerm }, data => {
                  console.log("result", data);
                  app.result = { //aplicando la api de videos
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: searchTerm
                  };
                  console.log(app.result.videos);
                  console.log("este si ", app.result.selectedVideo);
                  console.log(app.result.searchTerm);
                  let video = this.getVideoList(app.result.selectedVideo);
                  $("#videos").append(video);
                  let imgVideo = this.getImageList(app.result.videos); 
                  $("#imgvideos").append(imgVideo);
            });
      }
      videoSearch(searchTerm) {
            jQuery.getJSON("list.json", data => {
                  console.log("result", data.items);
                  app.result = {
                        videos: data.items,
                        selectedVideo: data.items[0],
                        searchTerm: searchTerm
                  };
                  let video = this.getVideoList(app.result.selectedVideo);
                  let imgVideo = this.getImageList(app.result.videos); 
                  $("#videos").append(video);
                  $("#imgvideos").append(imgVideo);
            });
      }
};
let aplicar = new app();
aplicar.init();
