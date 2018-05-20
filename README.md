# VRT Radio API mapper

Maps REST endpoints for VRT radio stations (https://services.vrt.be) to a nicer output (for use in other services, like Home Assistant REST sensor):

```json
{
  "current": {
    "artist": "LETHERETTE",
    "channel": {"code":"41"},
    "start": "2018-04-24T21:02:01.243Z",
    "stop": "2018-04-24T21:04:13.243Z",
    "title": "Turn On",
    "trackName": "LETHERETTE - Turn On",
    "type": "NOW"
  },
  "previous": {
    "artist": "DIMENSION",
    "channel": {"code":"41"},
    "start": "2018-04-24T20:51:59.914Z",
    "stop": "2018-04-24T20:56:22.914Z",
    "title": "Techno",
    "trackName": "DIMENSION - Techno",
    "type": "PREVIOUS"
  },
  "timestamp":"2018-04-24T21:02:52.234Z",
  "program": "Happy Sunday"
}
```

## Getting Started

`npm i && npm run dev` will get you right on track.
This is a very simple project which uses native JS array methods & node-fetch to transform & map output.
Best use case is to deploy it quickly to an AWS lambda and never worrying about it again.

This repo uses the @serverless framework to quickly deploy this cloud function to a provider of your choice (AWS lambda pre-configured)

Running `npm start` will:
- Mock an AWS API Gateway (trough webpack) on port 3000
- Make the cloud function available trough HTTP GET
  + Where /{channelCode} is the channel you want info for (e.g: GET http://localhost:3000/stubru)
