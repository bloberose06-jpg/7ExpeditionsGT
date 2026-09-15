
'use client';

import Script from 'next/script';

export default function TripAdvisorWidget() {
  return (
    <div className="flex justify-center my-6 min-h-[120px]">
      {/* Contenedor oficial de TripAdvisor */}
      <div id="TA_selfserveprop301" className="TA_selfserveprop">
        <ul id="jbR81Uey" className="TA_links tq7GZOuIFrU">
          <li id="oFBmme" className="LjXRSXgsRG">
            <a 
              target="_blank" 
              rel="noopener noreferrer" 
              href="https://www.tripadvisor.com/Attraction_Review-g295366-d34516424-Reviews-7_Expeditions_Guatemala-Antigua_Sacatepequez_Department.html"
            >
              <img 
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg" 
                alt="TripAdvisor"
              />
            </a>
          </li>
        </ul>
      </div>

      {/* Script optimizado para React/Next.js */}
      <Script 
        src="https://www.jscache.com/wejs?wtype=selfserveprop&uniq=301&locationId=34516424&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&iswide=false&border=true&display_version=2" 
        strategy="lazyOnload" 
      />
    </div>
  );
}
