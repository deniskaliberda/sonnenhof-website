/**
 * Sonnenhof Google Ads Script: Wöchentlicher Bericht
 *
 * Sendet jeden Montag eine einfache Zusammenfassung an Conny.
 *
 * Einrichtung:
 * 1. In Google Ads: Tools > Scripts > Neues Script
 * 2. Code einfügen
 * 3. Zeitplan: Wöchentlich, Montag um 09:00 Uhr
 */

var CONFIG = {
  EMAIL: 'sonnenhof@sonnenhof-herrsching.de',
  CC_EMAIL: '',  // Optional: Denis als CC
  COST_PER_LEAD_TARGET: 35  // EUR - Ziel-Kosten pro Anfrage
};

function main() {
  var account = AdsApp.currentAccount();
  var timeZone = account.getTimeZone();

  // Letzte 7 Tage
  var weekStats = account.getStatsFor('LAST_7_DAYS');
  var weekClicks = weekStats.getClicks();
  var weekCost = weekStats.getCost();
  var weekImpressions = weekStats.getImpressions();
  var weekConversions = weekStats.getConversions();
  var weekCtr = weekImpressions > 0 ? (weekClicks / weekImpressions * 100) : 0;
  var weekCostPerConversion = weekConversions > 0 ? (weekCost / weekConversions) : 0;

  // Letzter Monat zum Vergleich
  var monthStats = account.getStatsFor('THIS_MONTH');
  var monthCost = monthStats.getCost();
  var monthConversions = monthStats.getConversions();
  var monthClicks = monthStats.getClicks();

  // Kampagnen-Details
  var campaignDetails = [];
  var campaigns = AdsApp.campaigns()
    .withCondition('Status = ENABLED')
    .get();

  while (campaigns.hasNext()) {
    var campaign = campaigns.next();
    var stats = campaign.getStatsFor('LAST_7_DAYS');
    campaignDetails.push({
      name: campaign.getName(),
      clicks: stats.getClicks(),
      cost: stats.getCost(),
      conversions: stats.getConversions()
    });
  }

  // E-Mail zusammenbauen
  var subject = 'Sonnenhof Google Ads: Wochenbericht';

  var body = 'Hallo Conny,\n\n' +
    'hier ist Ihre wöchentliche Google Ads Zusammenfassung:\n\n' +
    '═══════════════════════════════════\n' +
    '  LETZTE 7 TAGE\n' +
    '═══════════════════════════════════\n\n' +
    '  Klicks:           ' + weekClicks + '\n' +
    '  Anfragen:         ' + weekConversions.toFixed(0) + '\n' +
    '  Ausgaben:         ' + weekCost.toFixed(2) + '€\n' +
    '  Klickrate (CTR):  ' + weekCtr.toFixed(1) + '%\n';

  if (weekConversions > 0) {
    body += '  Kosten/Anfrage:   ' + weekCostPerConversion.toFixed(2) + '€';
    if (weekCostPerConversion <= CONFIG.COST_PER_LEAD_TARGET) {
      body += ' (im Ziel)\n';
    } else {
      body += ' (über Ziel von ' + CONFIG.COST_PER_LEAD_TARGET + '€)\n';
    }
  }

  body += '\n═══════════════════════════════════\n' +
    '  DIESER MONAT BISHER\n' +
    '═══════════════════════════════════\n\n' +
    '  Klicks:           ' + monthClicks + '\n' +
    '  Anfragen:         ' + monthConversions.toFixed(0) + '\n' +
    '  Ausgaben:         ' + monthCost.toFixed(2) + '€\n\n';

  // Kampagnen-Aufschlüsselung
  if (campaignDetails.length > 0) {
    body += '═══════════════════════════════════\n' +
      '  KAMPAGNEN (letzte 7 Tage)\n' +
      '═══════════════════════════════════\n\n';

    for (var i = 0; i < campaignDetails.length; i++) {
      var c = campaignDetails[i];
      body += '  ' + c.name + '\n' +
        '    Klicks: ' + c.clicks +
        ' | Anfragen: ' + c.conversions.toFixed(0) +
        ' | Kosten: ' + c.cost.toFixed(2) + '€\n\n';
    }
  }

  body += '───────────────────────────────────\n' +
    'Bei Fragen melden Sie sich bei Denis.\n\n' +
    'Viele Grüße,\n' +
    'Ihr Google Ads Bericht';

  var options = {};
  if (CONFIG.CC_EMAIL) {
    options.cc = CONFIG.CC_EMAIL;
  }

  MailApp.sendEmail(CONFIG.EMAIL, subject, body, options);
  Logger.log('Wochenbericht gesendet. Klicks: ' + weekClicks +
    ', Conversions: ' + weekConversions + ', Cost: ' + weekCost.toFixed(2));
}
