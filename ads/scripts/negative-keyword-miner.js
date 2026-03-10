/**
 * Sonnenhof Google Ads Script: Negative Keyword Miner
 *
 * Läuft wöchentlich. Findet Suchbegriffe mit Klicks aber ohne Conversions
 * und fügt sie automatisch als negative Keywords hinzu.
 *
 * Einrichtung:
 * 1. In Google Ads: Tools > Scripts > Neues Script
 * 2. Code einfügen
 * 3. Zeitplan: Wöchentlich, Sonntag um 22:00 Uhr
 * 4. SHARED_NEGATIVE_LIST_NAME muss dem Namen der gemeinsamen
 *    negativen Keyword-Liste in Google Ads entsprechen
 */

var CONFIG = {
  EMAIL: 'sonnenhof@sonnenhof-herrsching.de',
  LOOKBACK_DAYS: 14,           // Zeitraum für Suchbegriff-Analyse
  MIN_CLICKS: 3,               // Mindestklicks bevor ein Begriff als "schlecht" gilt
  MIN_COST: 5.00,              // EUR - Mindestkosten bevor ein Begriff geprüft wird
  MAX_CONVERSIONS: 0,          // Begriffe mit 0 Conversions werden als negativ markiert
  SHARED_NEGATIVE_LIST_NAME: 'Sonnenhof Ausschluss-Keywords',  // Name der gemeinsamen Liste
  DRY_RUN: true                // true = nur Report, false = automatisch hinzufügen
};

function main() {
  var today = new Date();
  var lookbackDate = new Date(today.getTime() - CONFIG.LOOKBACK_DAYS * 24 * 60 * 60 * 1000);

  var dateRange = Utilities.formatDate(lookbackDate, AdsApp.currentAccount().getTimeZone(), 'yyyyMMdd') +
    ',' + Utilities.formatDate(today, AdsApp.currentAccount().getTimeZone(), 'yyyyMMdd');

  // Suchbegriffe mit Klicks aber ohne Conversions finden
  var report = AdsApp.report(
    'SELECT search_term_view.search_term, campaign.name, ad_group.name, ' +
    'metrics.clicks, metrics.cost_micros, metrics.conversions ' +
    'FROM search_term_view ' +
    'WHERE segments.date BETWEEN "' +
    Utilities.formatDate(lookbackDate, AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd') +
    '" AND "' +
    Utilities.formatDate(today, AdsApp.currentAccount().getTimeZone(), 'yyyy-MM-dd') +
    '" AND metrics.clicks >= ' + CONFIG.MIN_CLICKS +
    ' AND metrics.conversions <= ' + CONFIG.MAX_CONVERSIONS
  );

  var wastedTerms = [];
  var rows = report.rows();

  while (rows.hasNext()) {
    var row = rows.next();
    var cost = row['metrics.cost_micros'] / 1000000;

    if (cost >= CONFIG.MIN_COST) {
      wastedTerms.push({
        term: row['search_term_view.search_term'],
        campaign: row['campaign.name'],
        adGroup: row['ad_group.name'],
        clicks: row['metrics.clicks'],
        cost: cost,
        conversions: row['metrics.conversions']
      });
    }
  }

  if (wastedTerms.length === 0) {
    Logger.log('Keine verschwendeten Suchbegriffe gefunden.');
    return;
  }

  // Sortiere nach Kosten (höchste zuerst)
  wastedTerms.sort(function(a, b) { return b.cost - a.cost; });

  if (!CONFIG.DRY_RUN) {
    // Negative Keywords zur gemeinsamen Liste hinzufügen
    var negativeKeywordLists = AdsApp.negativeKeywordLists()
      .withCondition('Name = "' + CONFIG.SHARED_NEGATIVE_LIST_NAME + '"')
      .get();

    if (negativeKeywordLists.hasNext()) {
      var list = negativeKeywordLists.next();
      for (var i = 0; i < wastedTerms.length; i++) {
        list.addNegativeKeyword('[' + wastedTerms[i].term + ']');
      }
      Logger.log(wastedTerms.length + ' negative Keywords hinzugefügt.');
    } else {
      Logger.log('FEHLER: Negative Keyword-Liste "' +
        CONFIG.SHARED_NEGATIVE_LIST_NAME + '" nicht gefunden!');
    }
  }

  // Report per E-Mail senden
  var subject = 'Sonnenhof Ads: ' + wastedTerms.length +
    ' verschwendete Suchbegriffe gefunden';

  var body = 'Hallo Denis,\n\n' +
    'folgende Suchbegriffe hatten Klicks (≥' + CONFIG.MIN_CLICKS +
    ') und Kosten (≥' + CONFIG.MIN_COST + '€) aber keine Anfragen:\n\n';

  var totalWaste = 0;
  for (var j = 0; j < wastedTerms.length; j++) {
    var t = wastedTerms[j];
    totalWaste += t.cost;
    body += '  "' + t.term + '"\n' +
      '    Klicks: ' + t.clicks + ' | Kosten: ' + t.cost.toFixed(2) + '€\n' +
      '    Kampagne: ' + t.campaign + ' > ' + t.adGroup + '\n\n';
  }

  body += '───────────────────────────────────\n' +
    'Gesamt verschwendet: ' + totalWaste.toFixed(2) + '€\n\n';

  if (CONFIG.DRY_RUN) {
    body += 'MODUS: Nur Report (DRY_RUN = true)\n' +
      'Um automatisch hinzuzufügen: DRY_RUN auf false setzen.\n';
  } else {
    body += 'Diese Begriffe wurden automatisch als negative Keywords hinzugefügt.\n';
  }

  MailApp.sendEmail(CONFIG.EMAIL, subject, body);
  Logger.log('Report gesendet. ' + wastedTerms.length +
    ' Begriffe gefunden, ' + totalWaste.toFixed(2) + '€ verschwendet.');
}
