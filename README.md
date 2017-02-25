(WIP)

# zxp-midi
zxp midi(example)

- A example for use MIDI event in Adobe Extension Panel.
- use: nanoKONTROL2 [http://www.korg.com/us/products/computergear/nanokontrol2/](http://www.korg.com/us/products/computergear/nanokontrol2/)

# usage
0. If you Don't have `Node.js`, you have to install it.
1. Start Node.js server for 
```
$ cd server
$ npm install
$ npm start
```

2. Start gulp tasks.
```
$ cd extension
$ npm install
$ npm start
```
- In first run, you will be asked some question to make config.cson.
- `copy` task transport `dist` to `~/Library/Application Support/Adobe/CEP/extensions/` automatically.

3. start AfterEffects and open window -> extension -> AE_MIDI_SLIDER
