"use strict";
const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";
class app {
      constructor() {
            this.videos = [],
                  this.selectedVideo = null,
                  this.searchTerm = "super junior"
      }

      init() {
            this.videoSearch("super junior");
            //this.youtubeSearch("super junior");
            this.busqueda();
      }
      getImageList(videos) {
            return videos.map((video, index) => {
                  const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  const title = video.snippet.title;
                  const description = video.snippet.description;
                  const imageUrl = video.snippet.thumbnails.default.url;
                  //$("img").click(() => this.youtubeSearch(title));
                  return `<li> <img class="media-object" src=${imageUrl} />
                               <div class="datos"><p>${title}</p><p>${description}</p></div></li>`
                  
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
      busqueda() {
            $("#basic-addon2").click((event) => {
                  event.preventDefault();
                  this.youtubeSearch($('#ingresaBusqueda').val());
                  //this.videoSearch($('#ingresaBusqueda').val());
            });
      }
      limpiar() {
            $("#videos").empty();
            $("#imgvideos").empty();
            $("#descripcion").empty();
      }
      youtubeSearch(searchTerm) { // recibe
            this.limpiar();
            YTSearch({ key: API_KEY, term: searchTerm }, data => {
                  console.log("result", data);
                  app.result = { //aplicando la api de videos
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: searchTerm
                  };
                  let video = this.getVideoList(app.result.selectedVideo);
                  $("#videos").append(video);
                  let imgVideo = this.getImageList(app.result.videos);
                  $("#imgvideos").append(imgVideo);
            });
      }
      videoSearch(searchTerm) {
            this.limpiar();
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
