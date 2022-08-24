### q100_info

## installation
0. Install node modules: `npm install`
1. setup a folder `public/data` as a symlink pointing to `qScope/data` (see recommended folder structure below)

## running the program
1. Run qScope_infoscreen: `npm start`
2. Run qScope_frontend


## Recommended folder structure

```
project qScope
└───cspy
│   └───MIT CityScoPy Token Tag Decoder (modified by dunland)
└───data
|   └───outputs
|      └───output_[timestamp]
|         (simulation-specific output)
|         └───buildings_clusters_[timestamp].csv
|         (exportierte Gebäudeliste von Frontend)
|         └───simulation_parameters_[timestamp].xml
|         (xml-Datei mit allen Simulationsparametern zum Starten des headless modes)
|         └───connections
|         |       Export der Anschlussquoten
|         └───emissions
|         |      gebäudespezifische und aggregierte Quartiersemissionen
|         └───snapshot
|               von GAMA produzierte Grafiken
└───q100_abm
│   │   GAMA workspace folder
│   └───q100
│       │   Trend Model
│    	└───models
|       │    └───qscope_ABM.gaml
|       └───__data__ symlink zu data-Ordner (unten))
└───qScope_infoscreen
│       infoscreen (NodeJS/ JavaScript)
└───qScope_frontend
        projection (Python)

```

where:
- cspy: https://github.com/dunland/cspy
- data: has to be linked from Seafile server
- GAMA: https://github.com/quarree100/q100_abm
- qScope_infoscreen: https://github.com/quarree100/qScope_infoscreen
- qScope_frontend: https://github.com/quarree100/qScope_frontend
