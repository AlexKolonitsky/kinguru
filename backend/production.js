'use strict';

require('greenlock-express').create({
  server: 'https://acme-v02.api.letsencrypt.org/directory'
, version: 'draft-11'
, email: 'kinguru@mifort.org' 
, approvedDomains: ['kinguru.io']
, agreeTos: true                    
, configDir: '~/.config/acme/'
, communityMember: true             
, telemetry: true                   

  // Using your express app:
  // simply export it as-is, then include it here
, app: require('./index.js')

//, debug: true
}).listen(80, 443);