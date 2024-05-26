"use client"

import { useTranslations } from "next-intl";
import { useEffect } from "react";

// import React, { useEffect } from 'react';
// import i18next from "i18next";
// import { useTranslation } from 'react-i18next';
const CampaignMonitorForm = () => {
  // useEffect(() => {
  //   // Load Campaign Monitor scripts
  //   const webfontScript = document.createElement('div');
  //   webfontScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  //   webfontScript.async = true;

  //   const formLogicScript = document.createElement('div');
  //   formLogicScript.src = 'https://js.createsend1.com/javascript/copypastesubscribeformlogic.js';
  //   formLogicScript.async = true;

  //   document.body.appendChild(webfontScript);
  //   document.body.appendChild(formLogicScript);

  //   // Clean up function
  //   return () => {
  //     // Remove Campaign Monitor scripts
  //     document.body.removeChild(webfontScript);
  //     document.body.removeChild(formLogicScript);
  //   };
  // }, []);
  // useEffect(() => {
  //   // Load Campaign Monitor scripts
  //   const scriptContainer = document.createElement('div');
  //   scriptContainer.id = 'script-container';

  //   const webfontScript = document.createElement('script');
  //   webfontScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
  //   webfontScript.async = true;

  //   const formLogicScript = document.createElement('script');
  //   formLogicScript.src = 'https://js.createsend1.com/javascript/copypastesubscribeformlogic.js';
  //   formLogicScript.async = true;

  //   scriptContainer.appendChild(webfontScript);
  //   scriptContainer.appendChild(formLogicScript);
  //   document.body.appendChild(scriptContainer);

  //   // Clean up function
  //   return () => {
  //     // Remove the script container
  //     document.body.removeChild(scriptContainer);
  //   };
  // }, []);
  useEffect(() => {
    // Load Campaign Monitor scripts
    const webfontScript = document.createElement('script');
    webfontScript.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    webfontScript.async = true;

    const formLogicScript = document.createElement('script');
    formLogicScript.src = 'https://js.createsend1.com/javascript/copypastesubscribeformlogic.js';
    formLogicScript.async = true;

    document.body.appendChild(webfontScript);
    document.body.appendChild(formLogicScript);

    // Clean up function
    return () => {
      // Remove Campaign Monitor scripts
      //@ts-ignore
      webfontScript.parentElement.removeChild(webfontScript);
      //@ts-ignore
      formLogicScript.parentElement.removeChild(formLogicScript);
    };
  }, []);


  const t = useTranslations('footer');

  return (

    <div>
      <div className="l-center-container">
        <div className="sc-ckVGcZ jslhpj">
        </div>
        <div>
          <div className="sc-bdVaJa iIDDUy">
            <div>
              <form
                className="js-cm-form"
                id="subForm"
                action="https://www.createsend.com/t/subscribeerror?description="
                method="post"
                data-id="5B5E7037DA78A748374AD499497E309E698951CF0DE8AD20BE43F3E1E13DDA8FD133F35FED4A8A362FEB444380C3C8E2ADC28757EED7702B412E553C5E3B8C01"
              >
                <div className="sc-cSHVUG jZSLFe">
                  <div className="sc-cSHVUG kXIIFK">
                    <div className=' bg-transparent rounded-2xl border-2 border-primary-200 border-solid flex p-2 '>
                      {/* <label size="0.875rem" color="#5d5d65" className="sc-gzVnrw dEVaGV">
                      Email <span className="sc-dnqmqq iFTUZ">*</span>
                    </label> */}
                      <input
                        autoComplete="Email"
                        aria-label="Email"
                        id="fieldEmail"
                        maxLength={200}
                        name="cm-bhhykyh-bhhykyh"
                        required
                        type="email"
                        placeholder={t('subscription_placeholder')}
                        className="js-cm-email-input qa-input-email sc-gZMcBi dshyOS bg-transparent border-none border-transparent w-full placeholder-offwhite-200s placeholder:text-sm md:placeholder:text-xl placeholder-primary-200"
                      />
                      <button
                        // size="1rem"
                        color="#fff"
                        type="submit"
                        className="js-cm-submit-button sc-jWBwVP fClqPV bg-primary-300 hover:bg-primary-400 py-2 md:px-5 text-white rounded-lg px-4"
                      >
                        {t('subscription_button')}
                      </button>
                    </div>
                  </div>
                  <div className="sc-cSHVUG jZSLFe"></div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignMonitorForm;

