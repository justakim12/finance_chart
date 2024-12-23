
function createWidget(type, config, containerId) {
    const container = document.getElementById(containerId);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${type}.js`;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);
}

// Dynamically create sections for each symbol
function createSymbolSections(symbol) {
    const symbolContainer = document.createElement('div');
    symbolContainer.className = 'symbol-container';

    const sections = [
        {id: `${symbol}-symbol-info`, title: 'Symbol Info', height: 'auto', span: 2},
        {id: `${symbol}-advanced-chart`, title: 'Advanced Chart', height: '500px', span: 2},
        {id: `${symbol}-technical-analysis`, title: 'Technical Analysis', height: '425px', span: 1},
        {id: `${symbol}-top-stories`, title: 'Top Stories', height: '425px', span: 2},
    ];

    sections.forEach(({id, title, height, span}) => {
        const section = document.createElement('section');
        section.id = id;
        section.style.gridColumn = `span ${span}`;
        section.style.height = height;

        section.innerHTML = `
            <div class="tradingview-widget-container" id="${id}-widget-container"></div>
        `;
        symbolContainer.appendChild(section);
    });

    return symbolContainer;
}

// Add widgets for each symbol
const mainContent = document.getElementById('main-content');
const symbols = ['NASDAQ:TSLA', 'NASDAQ:AAPL', 'NASDAQ:NVDA', 'NASDAQ:MSFT', 'FRED:SP500', 'TVC:US10Y', 'KRX:035420'];

symbols.forEach((symbol) => {
    // Create sections for the current symbol
    const symbolSections = createSymbolSections(symbol);
    mainContent.appendChild(symbolSections);

    // Configure widgets for the current symbol
    createWidget('symbol-info', {
        symbol,
        width: '100%',
        locale: 'en',
        colorTheme: 'light',
        isTransparent: true,
    }, `${symbol}-symbol-info`);

    createWidget('advanced-chart', {
        autosize: true,
        symbol,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '2',
        locale: 'en',
        allow_symbol_change: true,
        studies: [
            "STD;SMA"
        ],
    }, `${symbol}-advanced-chart`);

    createWidget('technical-analysis', {
        interval: '1D',
        symbol,
        width: '100%',
        height: '100%',
        colorTheme: 'light',
        isTransparent: true,
        showIntervalTabs: true,
    }, `${symbol}-technical-analysis`);

    createWidget('timeline', {
        feedMode: 'symbol',
        symbol,
        width: '100%',
        height: '100%',
        colorTheme: 'light',
        isTransparent: true,
    }, `${symbol}-top-stories`);
});
