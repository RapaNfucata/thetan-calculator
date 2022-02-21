/* if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
} */

var calcola = $("#bottoneCalcola");
var royal = false;
var backupGiorni = 0;
var backupPartite = 0;
var valoreTHC = 0;
var totalPlayers = 0;
var urlHero = $("#urlHero").val();

// VALORE THC //
$.get(
  "https://exchange.thetanarena.com/exchange/v1/currency/price/1",
  function (price) {
    valoreTHC = price.data;
    //console.log(valoreTHC);
    $("#priceOfTHC").html(valoreTHC);
  }
);

// TOTAL PLAYERS //
$.get(
  "https://data.thetanarena.com/thetan/v1/user/totalPlayers",
  function (price) {
    totalPlayers = String(price.data);
    var sepTotalPlayers = totalPlayers.replace(/\B(?=(?:\d{3})+(?!\d))/g, ".");

    //console.log(sepTotalPlayers);
    $("#totalPlayers").html(sepTotalPlayers);
  }
);

$("#ics").click(function () {
  $("#urlHero").val("");
  $("#urlHero").focus();
});

function isRent(data) {
  if (data.rentInfo == undefined) {
    return false;
  } else {
    return true;
  }
}
function isOwner(data) {
  if (data.sale.price.value != 0) {
    return false;
  } else {
    return true;
  }
}

function setInfo(data) {
  var decimals = Math.pow(10, data.sale.price.decimals);
  console.log(decimals);
  function toBuy() {
    // BATTAGLIE TOTALI //
    $("#battaglieTotali").val(data.heroRanking.totalBattleCapTHC);
    // BATTAGLIE BRUCIATE //
    $("#battaglieBruciate").val(data.heroRanking.battleCapTHC);
    // PREZZO //
    var prezzo = data.sale.price.value / decimals;

    $("#costoPersonaggio").val(prezzo);
    $("#buyType").html("(buy)");
  }
  function byOwner() {
    // BATTAGLIE TOTALI //
    $("#battaglieTotali").val(data.heroRanking.totalBattleCapTHC);
    // BATTAGLIE BRUCIATE //
    $("#battaglieBruciate").val(data.heroRanking.battleCapTHC);
    // PREZZO //
    var prezzo = data.lastPrice.value / decimals;

    $("#costoPersonaggio").val(prezzo);
    $("#buyType").html("(owner)");
  }
  function toRent() {
    // BATTAGLIE TOTALI //
    $("#battaglieTotali").val(data.rentInfo.rentBattles);
    // BATTAGLIE BRUCIATE //
    $("#battaglieBruciate").val(0);
    // PREZZO //
    var prezzo = data.rentInfo.cost.value / decimals;

    $("#costoPersonaggio").val(prezzo);
    $("#buyType").html("(rent)");
  }
  if (isRent(data)) {
    toRent();
  } else {
    if (isOwner(data)) {
      byOwner();
    } else {
      toBuy();
    }
  }
  // HERO NAME //
  var heroName = data.heroInfo.name;
  var skinName = data.skinInfo.name;

  $("#heroName").html(heroName);
  $("#heroSkin").html(skinName);
  // BATTAGLIE AL GIORNO //
  $("#battaglieGiorno").val(data.dailyTHCBattleConfig);
  // THC BONUS //
  $("#thcBonus").val(data.thcBonus);
  // AVATAR //
  var imgSource = "https://assets.thetanarena.com/" + data.skinInfo.imageFull;
  var avatar = "<img src=" + imgSource + " />";

  $("#avatar").html(avatar);

  console.log(data);
}

function urlHeroValidation() {
  urlHero = $("#urlHero").val();
  if (urlHero == "undefined" || urlHero == 0 || urlHero == null) {
    return false;
  } else {
    return true;
  }
}

calcola.click(function () {
  if (urlHeroValidation()) {
    // CALCOLA DAL URL
    getDataHero(function (data) {
      //console.log(data);
      setInfo(data);
      $("#urlHero").val("");
      calcolaTutto();
    });
  } else {
    // CALCOLA DAI DATI
    calcolaTutto();
  }
});

$(document).keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == "13") {
    if (urlHeroValidation()) {
      // CALCOLA DAL URL
      getDataHero(function (data) {
        //console.log(data);
        setInfo(data);
        $("#urlHero").val("");
        calcolaTutto();
      });
    } else {
      // CALCOLA DAI DATI
      calcolaTutto();
    }
  }
});

// GET DELL' URL //
// URL GET= https://data.thetanarena.com/thetan/v1/hero?id=62037581911512155d651976 //
// URL ESEMPIO= https://marketplace.thetanarena.com/item/62037581911512155d651976 //
function getDataHero(success, fail, comunque) {
  var heroID = urlHero.split("/").pop();
  var url = "https://data.thetanarena.com/thetan/v1/hero?id=" + heroID;
  var heroData = {};
  $.get(url, function (hero) {
    heroData = hero.data;
  })
    .done(function () {
      success(heroData);
    })
    .fail(function () {
      alert("qualcosa è andato storto, riprova");
    });
}

// CALCOLO DEI GUADAGNI //

var divisoDue = $("#divisoDue");
var perDue = $("#perDue");

divisoDue.click(function () {
  var vittorie = Number($("#vittorie").val().replace(",", "."));
  var vittorieInput = $("#vittorie");

  vittorieInput.val(vittorie / 2);
});
perDue.click(function () {
  var vittorie = Number($("#vittorie").val().replace(",", "."));
  var vittorieInput = $("#vittorie");

  vittorieInput.val(vittorie * 2);
});

function calcolaTutto() {
  /* GET VALUE */
  var costoPersonaggio = Number($("#costoPersonaggio").val().replace(",", "."));
  var battaglieTotali = Number($("#battaglieTotali").val().replace(",", "."));
  var battaglieBruciate = Number(
    $("#battaglieBruciate").val().replace(",", ".")
  );
  var battaglieGiorno = Number($("#battaglieGiorno").val().replace(",", "."));
  var thcVittoria = 6;
  var thcBonus = Number($("#thcBonus").val().replace(",", "."));
  var giornateGioco = Number($("#giornateGioco").val().replace(",", "."));
  var battaglieFatte = Number($("#battaglieFatte").val().replace(",", "."));
  var vittorie = Number($("#vittorie").val().replace(",", "."));

  if (
    giornateGioco == "undefined" ||
    giornateGioco == 0 ||
    giornateGioco == null
  ) {
    giornateGioco = 0;
  }
  if (
    battaglieFatte == "undefined" ||
    battaglieFatte == 0 ||
    battaglieFatte == null
  ) {
    battaglieFatte = 0;
  }
  if (vittorie == "undefined" || vittorie == 0 || vittorie == null) {
    vittorie = 0;
  }
  if (
    battaglieBruciate == "undefined" ||
    battaglieBruciate == 0 ||
    battaglieBruciate == null
  ) {
    battaglieBruciate = 0;
  }
  if (thcBonus == "undefined" || thcBonus == 0 || thcBonus == null) {
    thcBonus = 0;
  }
  if (
    costoPersonaggio == "undefined" ||
    costoPersonaggio == 0 ||
    costoPersonaggio == null ||
    battaglieTotali == "undefined" ||
    battaglieTotali == 0 ||
    battaglieTotali == null ||
    battaglieGiorno == "undefined" ||
    battaglieGiorno == 0 ||
    battaglieGiorno == null ||
    thcVittoria == "undefined" ||
    thcVittoria == 0 ||
    thcVittoria == null
  ) {
    alert("compila i campi obbligatori*");
    return;
  }

  /* GET DIV */
  var battaglieAcquistoDiv = $("#battaglieAcquisto");
  var battaglieRimanentiDiv = $("#battaglieRimanenti");
  var guadagnoPotenzialeDiv = $("#guadagnoPotenziale");
  var profittoPotenzialeDiv = $("#profittoPotenziale");
  var guadagnoRealeDiv = $("#guadagnoReale");
  var profittoRealeDiv = $("#profittoReale");
  var guadagnoPotenzialeUsd = $("#guadagnoPotenzialeUSD");
  var profittoPotenzialeUsd = $("#profittoPotenzialeUSD");
  var guadagnoRealeUsd = $("#guadagnoRealeUSD");
  var profittoRealeUsd = $("#profittoRealeUSD");
  var giorniDiBattagliaDiv = $("#giorniDiBattaglia");
  var battaglieFatteDiv = $("#battaglieFatte");

  /* CALCOLI */
  /* BATTAGLIE RIMANENTI */
  var battaglieRimanentiAcquisto = battaglieTotali - battaglieBruciate;

  if (
    giornateGioco != 0 &&
    giornateGioco != backupGiorni &&
    backupPartite == Number($("#battaglieFatte").val())
  ) {
    var battagliefatteprima =
      battaglieRimanentiAcquisto -
      (battaglieRimanentiAcquisto - battaglieGiorno * giornateGioco);

    $("#battaglieFatte").val(battagliefatteprima);
    backupGiorni = Number($("#giornateGioco").val());
    backupPartite = Number($("#battaglieFatte").val());
    battaglieFatte = battagliefatteprima;
  } else {
    giornateGioco =
      Math.round((battaglieFatte / battaglieGiorno + Number.EPSILON) * 100) /
      100;
    $("#giornateGioco").val(giornateGioco);
    backupPartite = Number($("#battaglieFatte").val());
    backupGiorni = Number($("#giornateGioco").val());
    battaglieFatte = backupPartite;
  }

  var battaglieRimanenti = Math.floor(
    battaglieRimanentiAcquisto - battaglieGiorno * giornateGioco
  );
  var battaglieFatte = Math.floor(
    battaglieRimanentiAcquisto - battaglieRimanenti
  );

  var giorniDiBattaglia =
    Math.floor((battaglieRimanenti / battaglieGiorno + Number.EPSILON) * 100) /
    100;

  /* GUADAGNO POTENZIALE */
  var guadagnoPotenziale =
    (thcVittoria + thcBonus) * battaglieRimanentiAcquisto;

  var profittoPotenziale = guadagnoPotenziale - costoPersonaggio;

  /* GUADAGNO REALE */
  var partiteVinte = (thcVittoria + thcBonus) * vittorie;
  var partitePerse = battaglieFatte - vittorie;
  if (royal) {
    partitePerse = 0;
  }
  //console.log(partitePerse);
  var guadagnoReale = partiteVinte + partitePerse;

  var profittoReale = guadagnoReale - costoPersonaggio;

  if (vittorie > battaglieFatte) {
    alert(
      "è impossibile vincere più partite di quante tu ne abbia giocato! Mi spiace ma devi correggere ;)"
    );
  }
  /* CALCOLO BATTAGLIE */
  if (battaglieRimanenti < 0) battaglieRimanenti = 0;
  if (giorniDiBattaglia < 0) giorniDiBattaglia = 0;
  battaglieAcquistoDiv.html(battaglieRimanentiAcquisto + " BTL");
  battaglieRimanentiDiv.html(battaglieRimanenti + " BTL");
  battaglieFatteDiv.html(battaglieFatte + " BTL");
  giorniDiBattagliaDiv.html(giorniDiBattaglia + " DAY");
  /* GUADAGNI POTENZIALI */
  guadagnoPotenziale =
    (Math.round(guadagnoPotenziale + Number.EPSILON) * 100) / 100;
  guadagnoPotenzialeDiv.html(guadagnoPotenziale + " THC");
  profittoPotenziale =
    (Math.round(profittoPotenziale + Number.EPSILON) * 100) / 100;
  profittoPotenzialeDiv.html(profittoPotenziale + " THC");
  guadagnoPotenzialeUsd.html(
    (guadagnoPotenziale * valoreTHC).toFixed(2) + " USD"
  );
  profittoPotenzialeUsd.html(
    (profittoPotenziale * valoreTHC).toFixed(2) + " USD"
  );

  /* GUADAGNI REALI */
  guadagnoReale = (Math.round(guadagnoReale + Number.EPSILON) * 100) / 100;
  guadagnoRealeDiv.html(guadagnoReale + " THC");
  profittoReale = (Math.round(profittoReale + Number.EPSILON) * 100) / 100;
  profittoRealeDiv.html(profittoReale + " THC");
  guadagnoRealeUsd.html((guadagnoReale * valoreTHC).toFixed(2) + " USD");
  profittoRealeUsd.html((profittoReale * valoreTHC).toFixed(2) + " USD");

  //console.log(guadagnoReale);
}
var timeout;
function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
  $("#offriuncaffe").html("INDIRIZZO BSC COPIATO NEGLI APPUNTI");
}

$("#offriuncaffe").click(function () {
  copyToClipboard("0x2669a95Ce4301515c1ED0eF75De6F398CBCDc37B");
  timeout = setTimeout(changeText, 2000);
});

function changeText() {
  $("#offriuncaffe").html("Offri un caffè ai miei Thetan Character");
  clearTimeout(timeout);
}

$("#teamOrRoyal").change(function () {
  if (this.checked) {
    //console.log("ROYAL");

    $("#royal").addClass("selected");
    $("#team").removeClass("selected");

    royal = true;
  } else {

    //console.log("TEAM");
    $("#team").addClass("selected");
    $("#royal").removeClass("selected");

    royal = false;
  }
});
