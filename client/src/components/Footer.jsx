export const Footer = () => {
  const infoRate = (
    // <div className="mt-[64px] bg-black w-[1440px] h-[942px] gap-[16px]">
    <div className="mt-[64px] bg-white h-[942px] md:gap-[16px]">
      {/* ==============================={Main Block}=============================== */}
      <div className="flex flex-col md:flex-row gap-[64px]">
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[16.1px] capitalize inline-block">
            Personal
          </div>
          <div className="text-smi leading-[21px] inline-block">Exchange</div>
          <div className="leading-[21px] inline-block">Buy</div>
          <div className="leading-[21px] inline-block">Sell</div>
          <div className="leading-[21px] inline-block">DeFi</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          {' '}
          <div className="leading-[16.1px] capitalize inline-block">
            Company
          </div>
          <div className="text-smi leading-[21px] inline-block">About</div>
          <div className="leading-[21px] inline-block">Currencies</div>
          <div className="leading-[21px] inline-block">Our partners</div>
          <div className="text-smi leading-[21px] inline-block">Reviews</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          {' '}
          <div className="leading-[16.1px] capitalize inline-block">
            Support
          </div>
          <div className="text-smi leading-[21px] inline-block">FAQ</div>
          <div className="text-smi leading-[21px] inline-block">Helpdesk</div>
          <div className="leading-[21px] inline-block">Blog</div>
          <div className="leading-[21px] inline-block">Crash course</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="left-[739px] leading-[16.1px] capitalize inline-block">
            For partners
          </div>
          <div className="left-[739px] text-smi leading-[21px] inline-block">
            API for partners
          </div>
          <div className="left-[739px] leading-[21px] inline-block">
            Affiliate Program
          </div>
          <div className="left-[739px] text-smi leading-[21px] inline-block">
            Listings
          </div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          {' '}
          <div className="left-[906px] leading-[16.1px] capitalize inline-block">
            Legal
          </div>
          <div className="left-[906px] text-smi leading-[21px] inline-block">
            Terms of Use
          </div>
          <div className="left-[906px] text-smi leading-[21px] inline-block">
            Privacy Policy
          </div>
          {/* <div className="left-[906px] text-smi leading-[21px] inline-block">
            For competent authorities
          </div> */}
          <div className="left-[906px] text-smi leading-[21px] inline-block">
            For partners
          </div>
          <div className="left-[906px] leading-[21px] inline-block">
            AML/KYC
          </div>
        </div>
      </div>

      {/* <div className="mt-[64px] flex flex-col md:flex-row gap-[64px]">
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">Buy Bitcoin</div>
          <div className="leading-[21px] inline-block">Buy Ethereum</div>
          <div className="leading-[21px] inline-block">Buy USDT (Tether)</div>
          <div className="leading-[21px] inline-block">Buy Tron</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">Sell Bitcoin</div>
          <div className="leading-[21px] inline-block">Sell Ethereum</div>
          <div className="leading-[21px] inline-block">Sell USDT (Tether)</div>
          <div className="leading-[21px] inline-block">Sell Tron</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USD/USDT</div>
          <div className="leading-[21px] inline-block">USD/BTC</div>
          <div className="leading-[21px] inline-block">USD/ETH</div>
          <div className="leading-[21px] inline-block">USD/TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USDT/USD</div>
          <div className="leading-[21px] inline-block">USDT/BTC</div>
          <div className="leading-[21px] inline-block">USDT/ETH</div>
          <div className="leading-[21px] inline-block">USDT/TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">EUR/USDT</div>
          <div className="leading-[21px] inline-block">EUR/BTC</div>
          <div className="leading-[21px] inline-block">EUR/ETH</div>
          <div className="leading-[21px] inline-block">EUR/TRX</div>
        </div>
      </div> */}
      <div className="mt-[64px] flex flex-col md:flex-row">
        <div className="leading-[16.1px] inline-block">
          Buy and Sell Pairs
        </div>
      </div>
      <div className="mt-[24px] flex flex-col md:flex-row gap-[64px]">
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USD to USDT</div>
          <div className="leading-[21px] inline-block">USD to BTC</div>
          <div className="leading-[21px] inline-block">USD to ETH</div>
          <div className="leading-[21px] inline-block">USD to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">EUR to USDT</div>
          <div className="leading-[21px] inline-block">EUR to BTC</div>
          <div className="leading-[21px] inline-block">EUR to ETH</div>
          <div className="leading-[21px] inline-block">EUR to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USDT to USD</div>
          <div className="leading-[21px] inline-block">USDT to EUR</div>
          <div className="leading-[21px] inline-block">USDT to BTC</div>
          <div className="leading-[21px] inline-block">USDT to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">BTC to USD</div>
          <div className="leading-[21px] inline-block">BTC to EUR</div>
          <div className="leading-[21px] inline-block">BTC to USDT</div>
          <div className="leading-[21px] inline-block">BTC to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">ETH to USD</div>
          <div className="leading-[21px] inline-block">ETH to EUR</div>
          <div className="leading-[21px] inline-block">ETH to BTC</div>
          <div className="leading-[21px] inline-block">ETH to USDT</div>
        </div>
      </div>
      <div className="mt-[64px] flex flex-col md:flex-row">
        <div className="leading-[16.1px] capitalize inline-block">
          Exchange Pairs
        </div>
      </div>
      <div className="mt-[24px] flex flex-col md:flex-row gap-[64px]">
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USD to USDT</div>
          <div className="leading-[21px] inline-block">USD to BTC</div>
          <div className="leading-[21px] inline-block">USD to ETH</div>
          <div className="leading-[21px] inline-block">USD to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">EUR to USDT</div>
          <div className="leading-[21px] inline-block">EUR to BTC</div>
          <div className="leading-[21px] inline-block">EUR to ETH</div>
          <div className="leading-[21px] inline-block">EUR to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USDT to USD</div>
          <div className="leading-[21px] inline-block">USDT to EUR</div>
          <div className="leading-[21px] inline-block">USDT to BTC</div>
          <div className="leading-[21px] inline-block">USDT to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">BTC to USD</div>
          <div className="leading-[21px] inline-block">BTC to EUR</div>
          <div className="leading-[21px] inline-block">BTC to USDT</div>
          <div className="leading-[21px] inline-block">BTC to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">ETH to USD</div>
          <div className="leading-[21px] inline-block">ETH to EUR</div>
          <div className="leading-[21px] inline-block">ETH to BTC</div>
          <div className="leading-[21px] inline-block">ETH to USDT</div>
        </div>
      </div>
      <div className="mt-[64px] flex flex-col md:flex-row">
        <div className="leading-[16.1px] capitalize inline-block">
          Defi Swap Pairs
        </div>
      </div>
      <div className="mt-[24px] flex flex-col md:flex-row gap-[64px]">
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USD to USDT</div>
          <div className="leading-[21px] inline-block">USD to BTC</div>
          <div className="leading-[21px] inline-block">USD to ETH</div>
          <div className="leading-[21px] inline-block">USD to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">EUR to USDT</div>
          <div className="leading-[21px] inline-block">EUR to BTC</div>
          <div className="leading-[21px] inline-block">EUR to ETH</div>
          <div className="leading-[21px] inline-block">EUR to TRX</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">USDT to USD</div>
          <div className="leading-[21px] inline-block">USDT to EUR</div>
          <div className="leading-[21px] inline-block">USDT to BTC</div>
          <div className="leading-[21px] inline-block">USDT to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">BTC to USD</div>
          <div className="leading-[21px] inline-block">BTC to EUR</div>
          <div className="leading-[21px] inline-block">BTC to USDT</div>
          <div className="leading-[21px] inline-block">BTC to ETH</div>
        </div>
        <div className="flex flex-col gap-[16px] w-[150px]">
          <div className="leading-[21px] inline-block">ETH to USD</div>
          <div className="leading-[21px] inline-block">ETH to EUR</div>
          <div className="leading-[21px] inline-block">ETH to BTC</div>
          <div className="leading-[21px] inline-block">ETH to USDT</div>
        </div>
      </div>

      {/* ==============================={Main Block}=============================== */}

      {/* ==============================={Buy Block}=============================== */}

      {/* ==============================={Exchange Block}=============================== */}

      {/* ==============================={Exchange Pairs Block}=============================== */}

      {/* ==============================={copyright Block}=============================== */}
      <div className="mt-[16px] flex flex-row w-[150px]">
        <div className="text-smi leading-[16.1px] text-darkslategray-300 inline-block">
          © Blendery 2023
        </div>
      </div>

      {/* =======================================Footer Ends================================================= */}
    </div>
  );
  return <>{infoRate}</>;
};
