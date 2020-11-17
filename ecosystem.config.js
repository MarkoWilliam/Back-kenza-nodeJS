module.exports = {
    apps: [{
        script: 'app.js',
        watch: '.'
    }, {
        script: './service-worker/',
        watch: ['./service-worker']
    }],

    deploy: {
        production: {
            user: 'app@kenza.re',
            host: '185.22.109.100',
            ref: 'origin/master',
            repo: 'https://github.com/MarkoWilliam/Back-kenza-nodeJS.git',
            path: '/back_node',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
        }
    }
};