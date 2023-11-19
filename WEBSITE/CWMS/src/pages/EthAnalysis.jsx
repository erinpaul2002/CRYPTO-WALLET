/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
const EthAnalysis = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "interval": "1m",
      "width": 425,
      "isTransparent": true,
      "height": 450,
      "symbol": "BINANCE:ETHUSDT",
      "showIntervalTabs": true,
      "displayMode": "single",
      "locale": "in",
      "colorTheme": "dark"
    });
    document.body.appendChild(script);
  }, []);

  return (
    <div className="bitcoin-analysis">
      <div className="tradingview-widget-copyright">
        <a href="https://in.tradingview.com/" rel="noopener nofollow noreferrer" target="_blank">
        </a>
      </div>
    </div>
  );
};

export default EthAnalysis;

