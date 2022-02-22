import { useRef, useState } from "react";

function Footer() {
  const [titleButton, setTitle] = useState(
    "Offri un caffè ai miei Thetan Character"
  );
  const address = useRef();
  function copyToClipboard(text) {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }
  function getBSCAddress() {
    copyToClipboard("0x2669a95Ce4301515c1ED0eF75De6F398CBCDc37B");
    setTitle("Indirizzo BSC copiato negli appunti");
    const timer = setTimeout(() => {
      setTitle("Offri un caffè ai miei Thetan Character");
      clearTimeout(timer);
    }, 1000);
  }

  return (
    <div className="footer">
      <div className="footerText">
        <strong>v 2.0.0</strong>
      </div>
      <div className="footerText">
        Questo è un servizio totalmente gratuito, senza ADs, pubblicità o altro!
        Se avete voglia di supportare il mio lavoro potete offrire un caffè ai
        miei Thetan Character
      </div>
      <button className="footerButton" onClick={() => getBSCAddress()}>
        {titleButton}
      </button>
    </div>
  );
}

export default Footer;
