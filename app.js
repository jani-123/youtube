"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI"; //api de youtube

class app {
      constructor() { //variables globales
            this.videos = [],
            this.selectedVideo = null,
            this.searchTerm = "iPhone X"
      }

      init() {
            //this.videoSearch("iPhone");
            this.youtubeSearch("super junior");// manda a la funcion yotube cancion q debe buscar
      }
      //<iframe className="embed-responsive-item" src={url}> </iframe>
      getVideoList(videos) { // funcion lista de video
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  $("#imgvideos").append(`<li> <img class="media-object" src=${imageUrl} /></li>`);
            });
      }
      getVideo(videos) { // funcion lista de video
            for(let i=0;i<videos.length;i++){
                  var a = videos.id.videosId[i];
                  
            }
            const url = `https://www.youtube.com/embed/${a}`;
            return `<div> <iframe class="embed-responsive-item" src=${url}> </iframe></div>`

      //      return videos.map((video, index) => {
      //             // const imageUrl = video.snippet.thumbnails.default.url;
      //             const url = `https://www.youtube.com/embed/${video.id.videoId}`;
      //             return `<div> <iframe class="embed-responsive-item" src=${url}> </iframe></div>`
      //             // $("#imgvideos").append(`<li> <img class="media-object" src=${imageUrl} /></li>`);
      //      });
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
                  console.log("este si ",app.result.selectedVideo);
                  console.log(app.result.searchTerm);
                  let list = this.getVideoList(app.result.videos);
                  let oneVideo = this.getVideo(app.result.selectedVideo); // manda a la funcion videolista el video encontrado
                  $("#videos").append(oneVideo);//imprime en lista la canciones
            });
      }
      videoSearch (searchTerm) {
            jQuery.getJSON("list.json", data => {
                  console.log("result", data.items);
                  app.result = {
                        videos: data.items,
                        selectedVideo: data.items[0],
                        searchTerm: searchTerm
                  };
                  let list = this.getVideoList(app.result.videos);
                  let oneVideo = this.getVideo(app.result.selectedVideo); // manda a la funcion videolista el video encontrado
                  $("#videos").append(oneVideo);
                  //$("#root").append(list);
            });
      }
};

let aplicar = new app();
aplicar.init();
