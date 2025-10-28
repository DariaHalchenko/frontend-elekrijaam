import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [activeTable, setActiveTable] = useState('arve');
  const [arved, setArved] = useState([]);
  const [asukohad, setAsukohad] = useState([]);
  const [kontaktid, setKontaktid] = useState([]);
  const [maksestaatus, setMaksestaatus] = useState([]);
  const [seadmed, setSeadmed] = useState([]);
  const [tarbijad, setTarbijad] = useState([]);

  const tableStyle = {
    border: "1px solid #ddd",
    borderCollapse: "collapse",
    width: "90%",
    margin: "20px auto",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  };
  const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    backgroundColor: "#04AA6D",
    color: "white",
    textTransform: "uppercase"
  };
  const tdStyle = { border: "1px solid #ddd", padding: "8px", textAlign: "center" };

  useEffect(() => {
    fetch("https://localhost:7039/api/Arve").then(res => res.json()).then(setArved);
    fetch("https://localhost:7039/api/Asukoht").then(res => res.json()).then(setAsukohad);
    fetch("https://localhost:7039/api/Kontaktandmed").then(res => res.json()).then(setKontaktid);
    fetch("https://localhost:7039/api/Maksestaatus").then(res => res.json()).then(setMaksestaatus);
    fetch("https://localhost:7039/api/Seadme").then(res => res.json()).then(setSeadmed);
    fetch("https://localhost:7039/api/Tarbija").then(res => res.json()).then(setTarbijad);
  }, []);

  // 🔹 Стили для кнопок навигации
  const navButton = (isActive) => ({
    padding: "10px 18px",
    marginRight: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    backgroundColor: isActive ? "#04AA6D" : "#e6e6e6",
    color: isActive ? "white" : "#333",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 4px 10px rgba(0, 128, 0, 0.3)" : "0 2px 5px rgba(0, 0, 0, 0.1)",
  });

  const navContainer = {
    margin: "20px auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px"
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <h1 style={{ marginTop: "20px", color: "#333" }}>Elektrijaam Andmehaldus</h1>

      <nav style={navContainer}>
        <button style={navButton(activeTable === 'arve')} onClick={() => setActiveTable('arve')}>Arve</button>
        <button style={navButton(activeTable === 'asukoht')} onClick={() => setActiveTable('asukoht')}>Asukoht</button>
        <button style={navButton(activeTable === 'kontaktandmed')} onClick={() => setActiveTable('kontaktandmed')}>Kontaktandmed</button>
        <button style={navButton(activeTable === 'maksestaatus')} onClick={() => setActiveTable('maksestaatus')}>Maksestaatus</button>
        <button style={navButton(activeTable === 'seadme')} onClick={() => setActiveTable('seadme')}>Seade</button>
        <button style={navButton(activeTable === 'tarbija')} onClick={() => setActiveTable('tarbija')}>Tarbija</button>
      </nav>

      {/* Arve */}
      {activeTable === 'arve' && (
        <div>
          <h2>Arve</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Kuupäev</th>
                <th style={thStyle}>Tarbimise Kogus</th>
                <th style={thStyle}>Summa</th>
                <th style={thStyle}>Maksestaatus</th>
                <th style={thStyle}>Tarbija</th>
              </tr>
            </thead>
            <tbody>
              {arved.map(a => (
                <tr key={a.id}>
                  <td style={tdStyle}>{a.id}</td>
                  <td style={tdStyle}>{new Date(a.kuupaev).toLocaleDateString()}</td>
                  <td style={tdStyle}>{a.tarbimiseKogus}</td>
                  <td style={tdStyle}>{a.summa}</td>
                  <td style={tdStyle}>{a.maksestaatus ? (a.maksestaatus.makseseisund ? "Makstud" : "Mitte makstud") : "-"}</td>
                  <td style={tdStyle}>{a.tarbija ? a.tarbija.nimi : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Asukoht */}
      {activeTable === 'asukoht' && (
        <div>
          <h2>Asukoht</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tänav</th>
                <th style={thStyle}>Maja</th>
                <th style={thStyle}>Linn</th>
                <th style={thStyle}>Postiindeks</th>
              </tr>
            </thead>
            <tbody>
              {asukohad.map(a => (
                <tr key={a.id}>
                  <td style={tdStyle}>{a.id}</td>
                  <td style={tdStyle}>{a.tanav}</td>
                  <td style={tdStyle}>{a.maja}</td>
                  <td style={tdStyle}>{a.linn}</td>
                  <td style={tdStyle}>{a.postiindeks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Kontaktandmed */}
      {activeTable === 'kontaktandmed' && (
        <div>
          <h2>Kontaktandmed</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Telefoninumber</th>
                <th style={thStyle}>Email</th>
              </tr>
            </thead>
            <tbody>
              {kontaktid.map(k => (
                <tr key={k.id}>
                  <td style={tdStyle}>{k.id}</td>
                  <td style={tdStyle}>{k.telefoninumber}</td>
                  <td style={tdStyle}>{k.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Maksestaatus */}
      {activeTable === 'maksestaatus' && (
        <div>
          <h2>Maksestaatus</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Makseseisund</th>
                <th style={thStyle}>Maksmise Tähtaeg</th>
                <th style={thStyle}>Makstud Summa</th>
                <th style={thStyle}>Maksmise Kuupäev</th>
              </tr>
            </thead>
            <tbody>
              {maksestaatus.map(m => (
                <tr key={m.id}>
                  <td style={tdStyle}>{m.id}</td>
                  <td style={tdStyle}>{m.makseseisund ? "Makstud" : "Mitte makstud"}</td>
                  <td style={tdStyle}>{new Date(m.maksmiseTahtaeg).toLocaleDateString()}</td>
                  <td style={tdStyle}>{m.makstudSumma}</td>
                  <td style={tdStyle}>{m.maksmiseKuupaev ? new Date(m.maksmiseKuupaev).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Seade */}
      {activeTable === 'seadme' && (
        <div>
          <h2>Seade</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Nimetus</th>
                <th style={thStyle}>Tootja</th>
                <th style={thStyle}>Järgmine Hooldusaeg</th>
                <th style={thStyle}>Jääkmaksumus</th>
                <th style={thStyle}>Soetusmaksumus</th>
                <th style={thStyle}>Aktiivne</th>
              </tr>
            </thead>
            <tbody>
              {seadmed.map(s => (
                <tr key={s.id}>
                  <td style={tdStyle}>{s.id}</td>
                  <td style={tdStyle}>{s.nimetus}</td>
                  <td style={tdStyle}>{s.tootja}</td>
                  <td style={tdStyle}>{new Date(s.jargmineHooldusaeg).toLocaleDateString()}</td>
                  <td style={tdStyle}>{s.jaakmaksumus}</td>
                  <td style={tdStyle}>{s.soetusmaksumus}</td>
                  <td style={tdStyle}>{s.aktiivne ? "Jah" : "Ei"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tarbija */}
      {activeTable === 'tarbija' && (
        <div>
          <h2>Tarbija</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Nimi</th>
                <th style={thStyle}>Kontaktandmed</th>
                <th style={thStyle}>Asukoht</th>
              </tr>
            </thead>
            <tbody>
              {tarbijad.map(t => (
                <tr key={t.id}>
                  <td style={tdStyle}>{t.id}</td>
                  <td style={tdStyle}>{t.nimi}</td>
                  <td style={tdStyle}>{t.kontaktandmed ? `${t.kontaktandmed.email} / ${t.kontaktandmed.telefoninumber}` : "-"}</td>
                  <td style={tdStyle}>{t.asukoht ? `${t.asukoht.tanav} ${t.asukoht.maja}, ${t.asukoht.linn}` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
