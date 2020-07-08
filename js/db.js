var dbPromised = idb.open("fb", 1, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Team added");
        askFavorite();
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }

  function check(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          console.log(id);
          return store.get(id);
        })
        .then(function(fav) {
          if (fav !== undefined) {
            resolve(true);
          }
        });
    });
  }

  function deleteFav(teamId) {
    dbPromised
      .then(function(db) {
        console.log(teamId);
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        store.delete(teamId);
        return tx.complete;
      })
      .then(function() {
        console.log("Deleted successfully");
        deleteNotif();
        getFavoriteTeams();
      });
  }

  