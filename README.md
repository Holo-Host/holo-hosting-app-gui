# Holo Hosting App GUI

![GitHub last commit](https://img.shields.io/github/last-commit/holo-host/holo-hosting-app_GUI.svg)

**Status:** Closed-Alpha. Early development and testing.

The hosting app is a space for Hosts and App Providers to interact

**App Providers** list their apps along with their hosting preferences. This makes the app available for hosting. It registers a domain name for the app and other stuff.

**Hosts** declare their intention to host an app and record their private signed service logs here. They can also compile invoices for their app Providers.

---

## How to Run :
- Pull the https://github.com/Holo-Host/holo-hosting-app_gui repo
    - `git pull https://github.com/Holo-Host/holo-hosting-app_gui.git`
      
- Install dependencies:
    - `cd ui-src && npm install && cd ..`
  
- Spin up two agents. 
    > *Note: Below, we will walk through the steps for spinning up two agents (i.e. two dnas and two UIs).*

#

### Steps to run two DNAs:
  1. Open two terminals at @holo-hosting-app_gui

  2. Update the `start-dna-agent1` script in the `package.json`
      - Find the `start-dna-agent1` script inside the `package.json`
      - Update the **HC_N3H_PATH** to path of the n3h repo on your local device.(eg: HC_N3H_PATH=/home/lisa/n3h)

  3. In the first terminal, run agent1's DNA 
        - `npm run start-dna-agent1`

  4. Update the `start-dna-agent2` script in the `package.json` BEFORE running agent2
        - Find the `start-dna-agent2` script inside the `package.json`
        - Update the **HC_N3H_PATH** to path of the n3h repo on your local device.
        - Add the **HC_N3H_BOOTSTRAP_NODE** as provided in the networking details within the terminal when running agent1's DNA. (As shown on line #9 in the terminal snippet below.)
        - Add the **HC_N3H_IPC_URI** as provided in the networking details within the terminal when running agent1's DNA. (As shown on line #3 in the terminal snippet below.)
        
```=
(wss-connection) [i] listening at wss://127.0.0.1:41249/
Network spawned with bindings:
	 - ipc: wss://127.0.0.1:41249/
	 - p2p: []
(p2p-hackmode) [i] node-id hkaQGtTemslrK79wHSwqQONetfVxUenB-ElgD1-RnnmxguJO_VCPdK2ZPKADdIjpu0xvI1yF6HTjD132jLA3rOMWTZKVR605
(wss-server-utils) [i] loaded rsa fingerprint faqnfO4LeJSOWCvVLLjXSN+7TPQ=
(wss-connection) [i] listening at wss://192.168.0.7:42179/
(@hackmode@) [i] p2p bound wss://192.168.0.7:42179/?a=hkaQGtTemslrK79wHSwqQONetfVxUenB-ElgD1-RnnmxguJO_VCPdK2ZPKADdIjpu0xvI1yF6HTjD132jLA3rOMWTZKVR605

```

  5. In the second terminal, run agent2's DNA
        - `npm run start-dna-agent2`

# 
### Steps to run two UIs:

  1. Open two more terminals at @holo-hosting-app_gui

  3. In the second terminal, run Agent1's UI
        - Start agent1 : `npm run start-ui-agent1`
        - View agnet1 : Open at http://localhost:8800/

  4. In the second terminal, run Agent2's UI
      - Start agent2 : `npm run start-ui-agent2`
      - View agent2 : Open at http://localhost:9300/ 

#
> Tip: If you notice that the UI is not able to successfully connect to the websocket, then stop your DNA instances in the termainal and redo the 'Steps to run two DNAs.'

---

## Documentation:
**[Holo-Hosting-App ADR]():** Doc outlining the interaction between the HHA GUI and the HHA Holochain DNA.

## Built With
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Material UI](https://material-ui.com/)


## Authors
* **Lisa Jetton** - [JettTech](https://github.com/JettTech)
* **Joel Ulahanna** - [Zo-El](https://github.com/zo-el)


<!-- #### A Tip of the Hat
>Although this project is original work, its foundation was based on `react admin`.
> Visit the repo [here](https://github.com/marmelab/react-admin). -->

---
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
