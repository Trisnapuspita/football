const base_url = "https://api.football-data.org/v2/";

const id_liga = 2021;

const ENDPOINT_COMPETITION = `${base_url}competitions/${id_liga}/standings`

// Blok kode yang akan di panggil jika fetch berhasil
const fetchApi = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': 'd71865066d8940ce9dbadd167ab5d9a2'
        }
    })
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
function getAllStandings() {
    if('caches' in window) {
        caches.match(ENDPOINT_COMPETITION).then(function(response) {
            if(response) {
                response.json().then(function (data) {
                  let standings = "";
                  data.standings[0].table.forEach(function(standing) {
                    standings += `
                    <div class="col m4 s12">
                        <div class="card" style="background-color: #127681">
                          <a href="./team.html?id=${standing.team.id}">
                          <div class="center">
                              <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'htptps://')}" alt="picture-of-${standing.team.name}" height="120px" style="margin-top: 30px; width: auto; "/>
                          </div>
                          <div class="card-content">
                              <ul class="collection with-header">
                                  <li class="collection-header truncate" style="text-align: center; background-color: #f3c623; color: #127681; font-weight: bold;">${standing.team.name}</li>
                                  <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Won: ${standing.won}</li>
                                  <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Lost: ${standing.lost}</li>
                                  <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Draw: ${standing.draw}</li>
                                  <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Points: ${standing.points}</li>
                              </ul>
                          </div>
                        </div>
                        </a>
                    </div>`;
              });
              // Sisipkan komponen card ke dalam elemen dengan id #content
              document.getElementById("standing").innerHTML = standings;
                });
            }
        });
    }

  fetchApi(ENDPOINT_COMPETITION)
    .then(status)
    .then(json)
    .then(function(data) {
        let standings = "";
        data.standings[0].table.forEach(function(standing) {
          standings += `
          <div class="col m4 s12">
              <div class="card" style="background-color: #127681">
                <a href="./team.html?id=${standing.team.id}">
                <div class="center">
                    <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'htptps://')}" alt="picture-of-${standing.team.name}" height="120px" style="margin-top: 30px; width: auto;"/>
                </div>
                <div class="card-content">
                    <ul class="collection with-header">
                        <li class="collection-header truncate" style="text-align: center; background-color: #f3c623; color: #127681; font-weight: bold;">${standing.team.name}</li>
                        <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Won: ${standing.won}</li>
                        <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Lost: ${standing.lost}</li>
                        <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Draw: ${standing.draw}</li>
                        <li class="collection-item" style="background-color: #f3c623; color: #127681; padding-left: 20px">Points: ${standing.points}</li>
                    </ul>
                </div>
              </div>
              </a>
          </div>`;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("standing").innerHTML = standings;
    })
    .catch(error);
}

function getTeamById() {
    
    return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ('caches' in window) {
        caches.match(base_url + "teams/" + idParam).then(function(response) {
            if (response) {
                response.json().then(function (team) {
                  showTeam(team);
            });
            }
        });
        function showTeam(team) {
          let teamHTML = "";
          let teamElement = document.getElementById('body-content');
        
          team.squad.forEach(function (squad) {
            teamHTML += `
                <tr>
                  <td><img src="/images/boy.svg" style="margin-left: 10px" width="50px" \></td>
                  <td>${squad.name}</td>
                  <td>${squad.position}</td>
                </tr>
            `;
          });
        
          teamElement.innerHTML = `
                <div class="card" style="background-color: #127681;">
                  <div class="center">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="picture-of-${team.name}" height="200px" style="margin-top: 20px; width: auto;" />
                  </div>
                  <div class="card-content">
                      <a class="ct">${team.name}</a>
                      <p class="here">
                        Founded In ${team.founded} <br>
                        Colors of this club are ${team.clubColors} <br>
                        Email of this club ${team.email} <br>
                        Phone ${team.phone} <br>
                        The venue is ${team.venue} <br>
                        And address is ${team.address} <br>
                        last updated - ${team.lastUpdated} <br><br>
                      </p>
                      <a class="ct">Players</a>
                      <div>
                        <table class="centered" style="background-color: #f3c623; color: #127681; margin-top: 30px">
                          <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Name</th>
                                <th>Position</th>
                            </tr>
                          </thead>
                          <tbody id="teamHTML">
                            ${teamHTML}
                          </tbody>
                      </table>
                      </div>
                  </div>
                </div>
              `; 
                // Kirim objek team hasil parsing json agar bisa disimpan ke indexed db
                resolve(team);
        }
    }

    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function(team) {
        showTeam(team);
      })
      .catch(error => {
        console.log(error);
      })
    });
}

function showTeam(team) {
  let teamHTML = "";
  let teamElement = document.getElementById('body-content');

  team.squad.forEach(function (squad) {
    teamHTML += `
        <tr>
          <td><img src="/images/boy.svg" style="margin-left: 10px" width="50px" \></td>
          <td>${squad.name}</td>
          <td>${squad.position}</td>
        </tr>
    `;
  });

  teamElement.innerHTML = `
        <div class="card" style="background-color: #127681;">
          <div class="center">
            <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="picture-of-${team.name}" height="200px" style="margin-top: 20px; width: auto;" />
          </div>
          <div class="card-content">
              <a class="ct">${team.name}</a>
              <p class="here">
                Founded In ${team.founded} <br>
                Colors of this club are ${team.clubColors} <br>
                Email of this club ${team.email} <br>
                Phone ${team.phone} <br>
                The venue is ${team.venue} <br>
                And address is ${team.address} <br>
                last updated - ${team.lastUpdated} <br><br>
              </p>
              <a class="ct">Players</a>
              <div>
                <table class="centered" style="background-color: #f3c623; color: #127681; margin-top: 30px">
                  <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Name</th>
                        <th>Position</th>
                    </tr>
                  </thead>
                  <tbody id="teamHTML">
                    ${teamHTML}
                  </tbody>
              </table>
              </div>
          </div>
        </div>
      `; 
        // Kirim objek team hasil parsing json agar bisa disimpan ke indexed db
        resolve(team);
}

function getFavoriteTeams() {
    getAll().then(function(teams) {
      // Menyusun komponen card artikel secara dinamis
      let teamHTML = "";
      teams.forEach(function(team) {
        teamHTML += `
        <div class="col m4 s12">
            <div class="card center" style="background-color: #127681">
              <a href="./team.html?id=${team.id}">
                <img src="${team.crestUrl.replace(/^http:\/\//i, 'htptps://')}" alt="picture-of-${team.name}" width="100%" height="120px" style="margin-top: 10px; width: auto;">
              </a>
                <ul class="collection with-header">
                  <li class="collection-header truncate" style="background-color: #f3c623; color: #127681; font-weight: bold;">${team.name}</li>
                  <li class="collection-item" style="background-color: #f3c623;">
                    <a onclick="deleteFav(${team.id})" class="btn btn-small red" style="text-transform: capitalize">Delete From Favorite</a>
                  </li>
                </ul>
            </div>
        </div>`;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById('teams').innerHTML = teamHTML;
        });

      }

function getFavoriteTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    getById(idParam).then(function(team) {
      let teamHTML = "";
      let teamElement = document.getElementById('body-content');
    
      team.squad.forEach(function (squad) {
        teamHTML += `
            <tr>
              <td><img src="/images/boy.svg" style="margin-left: 10px" width="50px" \></td>
              <td>${squad.name}</td>
              <td>${squad.position}</td>
            </tr>
        `;
      });
    
      teamElement.innerHTML = `
            <div class="card" style="background-color: #127681;color: #">
              <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="picture-of-${team.name}" height="200px" style="margin-top: 20px" />
              </div>
              <div class="card-content">
                  <a class="ct">${team.name}</a>
                  <p class="here">
                    Founded In ${team.founded} <br>
                    Colors of this club are ${team.clubColors} <br>
                    Email of this club ${team.email} <br>
                    Phone ${team.phone} <br>
                    The venue is ${team.venue} <br>
                    And address is ${team.address} <br>
                    last updated - ${team.lastUpdated} <br><br>
                  </p>
                  <a class="ct">Players</a>
                  <div>
                    <table class="centered" style="background-color: #f3c623; color: #127681; margin-top: 30px">
                      <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Name</th>
                            <th>Position</th>
                        </tr>
                      </thead>
                      <tbody id="teamHTML">
                        ${teamHTML}
                      </tbody>
                  </table>
                  </div>
              </div>
            </div>
          `; 
            // Kirim objek team hasil parsing json agar bisa disimpan ke indexed db
            resolve(team);
    });

}

