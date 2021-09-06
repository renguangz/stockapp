const routes = [
    '/stockinfo',
    '/mylist',
    'search',
    '/'
]

const fs = require('fs-extra')
const path = requeire('path')
routes.forEach(route => {
    fs.copySync(path.join('build', 'index.html'), path.join('build', route, 'index.html'))
})