# Introduction
Plugin that read values from [SmartMeter SDM120](https://stromzähler.eu/Stromzaehler/Wechselstromzaehler/fuer-Hutschiene-geeicht/SDM120-Modbus-MID-1-Phasen-Zweirichtungs-WSZ-fuer-Hutschiene).

> [!IMPORTANT]  
> This plugin requires [mbusd](https://github.com/3cky/mbusd) to work.<br />
> mbusd is a bridge between RS485 & Ethernet Modbus.

# Installation
1) Create a new plugin over the OpenHaus backend HTTP API
2) Mount the plugin source code folder into the backend
3) run `npm install`

# Development
Add plugin item via HTTP API:<br />
[PUT] `http://{{HOST}}:{{PORT}}/api/plugins/`
```json
{
   "name":"SmartMeter SDM120",
   "version": "1.0.0",
   "intents":[
      "devices",
      "endpoints",
      "store"
   ],
   "uuid": "9b4a3cc6-b66a-46a6-8c7c-ca23027919ed"
}
```

Mount the source code into the backend plugins folder
```sh
sudo mount --bind ~/projects/OpenHaus/plugins/oh-plg-smartmeter-sdm120/ ~/projects/OpenHaus/backend/plugins/9b4a3cc6-b66a-46a6-8c7c-ca23027919ed/
```

# Usage
1) Install plugin
2) A dummy device with ip `127.5.5.5` gets added
3) Change the IP address to the real on
4) Change modbus slave ID
5) [OPTIONAL] Configure polling interval

> [!NOTE]  
> Manual configuration required<br />
> See "Usage" above, change IP & Modbus ID