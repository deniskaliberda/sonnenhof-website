/**
 * Sonnenhof Google Ads Script: Budget-Warnung
 *
 * Läuft täglich. Sendet eine E-Mail an Conny, wenn das Tagesbudget
 * überschritten wird oder die monatlichen Ausgaben ein Limit erreichen.
 *
 * Einrichtung:
 * 1. In Google Ads: Tools > Scripts > Neues Script
 * 2. Code einfügen
 * 3. Zeitplan: Täglich um 20:00 Uhr
 * 4. EMAIL und Limits anpassen
 */

var CONFIG = {
  EMAIL: 'sonnenhof@sonnenhof-herrsching.de',
  DAILY_BUDGET_ALERT: 20,    // EUR - Warnung wenn Tagesausgaben über diesem Wert
  MONTHLY_BUDGET_LIMIT: 500, // EUR - Warnung wenn Monatsausgaben über diesem Wert
  CC_EMAIL: ''               // Optional: Denis als CC
};

function main() {
  var today = new Date();
  var monthStart = Utilities.formatDate(
    new Date(today.getFullYear(), today.getMonth(), 1),
    AdsApp.currentAccount().getTimeZone(),
    'yyyyMMdd'
  );
  var todayFormatted = Utilities.formatDate(
    today,
    AdsApp.currentAccount().getTimeZone(),
    'yyyyMMdd'
  );

  // Tagesausgaben prüfen
  var todayCost = AdsApp.currentAccount()
    .getStatsFor('TODAY')
    .getCost();

  // Monatsausgaben prüfen
  var monthCost = AdsApp.currentAccount()
    .getStatsFor(monthStart, todayFormatted)
    .getCost();

  var alerts = [];

  if (todayCost > CONFIG.DAILY_BUDGET_ALERT) {
    alerts.push(
      'Tagesbudget überschritten: ' + todayCost.toFixed(2) + '€ ' +
      '(Limit: ' + CONFIG.DAILY_BUDGET_ALERT + '€)'
    );
  }

  if (monthCost > CONFIG.MONTHLY_BUDGET_LIMIT) {
    alerts.push(
      'Monatsbudget überschritten: ' + monthCost.toFixed(2) + '€ ' +
      '(Limit: ' + CONFIG.MONTHLY_BUDGET_LIMIT + '€)'
    );
  }

  if (alerts.length > 0) {
    var subject = 'Sonnenhof Google Ads: Budget-Warnung';
    var body = 'Hallo Conny,\n\n' +
      'bei Ihren Google Ads gibt es folgende Budget-Hinweise:\n\n' +
      alerts.join('\n') + '\n\n' +
      'Zusammenfassung heute:\n' +
      '- Ausgaben heute: ' + todayCost.toFixed(2) + '€\n' +
      '- Ausgaben diesen Monat: ' + monthCost.toFixed(2) + '€\n\n' +
      'Falls Sie das Budget anpassen möchten, melden Sie sich bei Denis.\n\n' +
      'Viele Grüße,\n' +
      'Ihr Google Ads Script';

    var options = {};
    if (CONFIG.CC_EMAIL) {
      options.cc = CONFIG.CC_EMAIL;
    }

    MailApp.sendEmail(CONFIG.EMAIL, subject, body, options);
    Logger.log('Budget-Warnung gesendet: ' + alerts.join(', '));
  } else {
    Logger.log('Alles im Budget. Heute: ' + todayCost.toFixed(2) +
      '€, Monat: ' + monthCost.toFixed(2) + '€');
  }
}
