/**
 * SAARVICE — zentrale Konfiguration.
 *
 * Alles, was von einem externen Dienst abhängt, steht hier. Kein Suchen im Code.
 * Im Demo-/Vorab-Modus vergibt die Seite lokal deinen Stammtisch-Pass (#SV-2026-XXXX)
 * und bietet 1-Klick Double-Opt-In per E-Mail sowie WhatsApp-Sharing an.
 */
window.SAARVICE_CONFIG = {
  signupEndpoint: null,
  counterEndpoint: null,
  analytics: {
    provider: null,
    options: {}
  },
  contact: {
    booking: 'booking@saarvice.de',
    press: 'presse@saarvice.de'
  }
};
