// eslint-disable-next-line no-console
function info (msg) { console.log('%c' + ' ' + msg + ' ', 'background: #222; color: #bada55') }
info('Environment: ' + process.env.NODE_ENV)

// note: (kard) raw CSS import must be avoided while no bundling is involved.
if (process.env.NODE_ENV !== 'test') {
    // require('./assets/sass/screen.scss');
}

// Note: it will show spinner at start
setTimeout(
    () => require('./hello-world'),
    1000
)
// require('./hello-world');
