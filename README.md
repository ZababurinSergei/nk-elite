## Configure emscripten SDK

### Emscripten SDK
```bash
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
```

### Emscripten SDK: Install and activate SDK latest
```bash
cd emsdk
git pull
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

### Add environment to profile
```bash
source ./emsdk_env.sh
```

## Using included scripts of free-queue library

### Build WebAssembly library to ./build  directory in root of free-queue Project
```bash
chmod +x ./mp-build.sh
./mp-build.sh
```

### Clean compiled WebAssembly library
```bash
chmod +x ./mp-clean.sh
./mp-clean.sh
```

### Build WebAssembly library and Start example free-queue Demo
```bash
chmod +x ./ep-build.sh
./ep-build.sh
```

### Start example free-queue Demo
```bash
chmod +x ./ep-start.sh
./ep-start.bat
```

### Clean compiled WebAssembly library and example of free-queue Demo
```bash
chmod +x ./ep-clean.sh
./ep-clean.sh
```







