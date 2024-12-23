// Create a Ticker Tape widget
function createTickerTape(containerId) {
    const container = document.getElementById(containerId);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        symbols: [
            {proName: 'NASDAQ:TSLA', description: ''},
            {proName: 'NASDAQ:AAPL', description: ''},
            {proName: 'NASDAQ:NVDA', description: ''},
            {proName: 'NASDAQ:MSFT', description: ''},
            {proName: 'NASDAQ:AMZN', description: ''},
            {proName: 'NASDAQ:GOOGL', description: ''},
            {proName: 'NASDAQ:META', description: ''},
            {proName: 'NYSE:BRK.B', description: ''},
            {proName: 'NYSE:LLY', description: ''},
            {proName: 'NYSE:UNH', description: ''},
            {proName: 'NYSE:V', description: ''},
            {proName: 'NYSE:WMT', description: ''},
        ],
        showSymbolLogo: true,
        colorTheme: 'light',
        isTransparent: false,
        displayMode: 'adaptive',
        locale: 'en',
    });
    container.appendChild(script);
}

createTickerTape('ticker-tape');

// Dynamically create a widget
function createWidget(type, config, containerId) {
    const container = document.getElementById(containerId);
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${type}.js`;
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.appendChild(script);
}

// Dynamically create sections with specific sizes
function createSection(id, title, height = 'auto', spanColumns = 2) {
    const section = document.createElement('section');
    section.id = id;
    section.style.gridColumn = `span ${spanColumns}`;
    section.style.height = height;

    section.innerHTML = `
        <div class="tradingview-widget-container"></div>
    `;
    return section;
}

// Add sections to the main content
const mainContent = document.getElementById('main-content');

const sections = [
    {id: 'symbol-info', title: 'Symbol Info', height: 'auto', span: 2},
    {id: 'advanced-chart', title: 'Advanced Chart', height: '500px', span: 2},
    {id: 'company-profile', title: 'Company Profile', height: '390px', span: 2},
    {id: 'fundamental-data', title: 'Fundamental Data', height: '490px', span: 2},
    {id: 'technical-analysis', title: 'Technical Analysis', height: '425px', span: 1},
    {id: 'top-stories', title: 'Top Stories', height: '425px', span: 1},
];

sections.forEach(({id, title, height, span}) => {
    mainContent.appendChild(createSection(id, title, height, span));
});

// Configure widgets for each section
const symbol = 'NASDAQ:AAPL';

createWidget('symbol-info', {
    symbol,
    width: '100%',
    locale: 'en',
    colorTheme: 'light',
    isTransparent: true,
}, 'symbol-info');

createWidget('advanced-chart', {
    autosize: true,
    symbol,
    interval: 'D',
    timezone: 'Etc/UTC',
    theme: 'light',
    style: '1',
    locale: 'en',
    allow_symbol_change: true,
}, 'advanced-chart');

createWidget('symbol-profile', {
    symbol,
    width: '100%',
    height: '100%',
    colorTheme: 'light',
    isTransparent: true,
    locale: 'en',
}, 'company-profile');

createWidget('financials', {
    symbol,
    width: '100%',
    height: '100%',
    colorTheme: 'light',
    isTransparent: true,
    displayMode: 'adaptive',
}, 'fundamental-data');

createWidget('technical-analysis', {
    interval: '15m',
    symbol,
    width: '100%',
    height: '100%',
    colorTheme: 'light',
    isTransparent: true,
    showIntervalTabs: true,
}, 'technical-analysis');

createWidget('timeline', {
    feedMode: 'symbol',
    symbol,
    width: '100%',
    height: '100%',
    colorTheme: 'light',
    isTransparent: true,
}, 'top-stories');
