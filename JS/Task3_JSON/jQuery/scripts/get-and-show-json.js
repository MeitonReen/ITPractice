($ => {
  getSuperHeroes("https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json")
    .then(heroesJson => {
      populateHeader($('header'), heroesJson);
      showHeroes($('section'), heroesJson);
    });
  
  async function getSuperHeroes(url) {
    let response = await fetch(url);
    return await response.json();
  }
  function populateHeader(htmlElem, jsonObj) {
    htmlElem.append($("<h1>").text(jsonObj["squadName"]))
      .append($("<p>").text('Hometown: ' + jsonObj['homeTown'] + ' // Formed: ' + jsonObj['formed']));
  }
  function showHeroes(htmlElem, jsonObj) {
    htmlElem.append(jsonObj['members'].map(hero => 
      $("<article>").append($("<h2>").text(hero.name))
        .append($("<p>").text('Secret identity: ' + hero.secretIdentity))
          .append($("<p>").text('Age: ' + hero.age))
            .append($("<p>").text('Superpowers:'))
              .append($("<ul>").append(
                hero.powers.map(power => $("<li>").text(power))
              ))
      ));
  }
})(jQuery)

