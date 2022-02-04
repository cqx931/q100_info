### q100_info

## installation
0. Install node modules: `npm install`
1. setup a folder `public/data` as a symlink pointing to `qScope/data` (see recommended folder structure below)

## running the program
1. Run qScope_infoscreen: `node q100_info.js`
2. Run qScope_frontend


## Recommended folder structure

```
project qScope
└───cspy
│   └───CityScoPy LEGO Decoder
└───data
│       contains LINKS to GIS data from Seafile and api.json for SOFTWARE COMMUNICATION
└───q100_abm
│   │   GAMA workspace folder
│   └───Project_RuesdorferKamp_Network
│   │   │   Project 1: Social Agents Communication Network
│   │	└───RuesdorferKamp_Network_Model-01.gaml
│   └───Project_RuesdorferKamp_Restoration
│    	└───Restoration_Model_01.gaml
└───qScope_infoscreen
│       infoscreen (JavaScript)
└───qScope_frontend
│       projection (Python)
└───settings
        initial setup data to initialize ALL SOFTWARE COMPONENTS centrally

```
where:
- cspy: https://github.com/dunland/cspy
- data: has to be linked from server
- q100_abm: https://github.com/quarree100/q100_abm
- qScope_infoscreen: https://github.com/quarree100/qScope_infoscreen
- qScope_frontend: https://github.com/quarree100/qScope_frontend
- settings: t.b.a (currently from cspy/settings)
