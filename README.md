# [hitback.us](https://www.hitback.us/ "Hitback")
Algorithmic trading and quantitative trading platform to develop trading robots (stock markets, forex, bitcoins and options)

###

This project provide [MQL4](https://www.metatrader4.com/ "Metatrader 4.") and [MQL5](https://www.metatrader5.com/ "Metatrader 5.") bindings for the [ZeroMQ](http://zeromq.org/ "ZeroMQ homepage.") networking library to an external server to create live streaming pipeline with real time data of ticks and order book changes. 

With ZeroMQ (http://zeromq.org/) you can:
* Connect your code in any language, on any platform.
* Carries messages across inproc, IPC, TCP, TIPC, multicast.
* Smart patterns like pub-sub, push-pull, and router-dealer.
* High-speed asynchronous I/O engines, in a tiny library.
* Backed by a large and active open source community.
* Supports every modern language and platform.
* Build any architecture: centralized, distributed, small, or large.

# Exchange side

In this example we are using just two brokers [XM](https://www.xm.com/ "XM") and [FXPRO](http://www.fxpro.com/ "fxpro") for streaming the data but you can connect to an unlimit numner of brokers at the same time.

### INSTALL

Recursively copy the folder MQL4 for metatrader4 over the MQL4 folder or for metatrader5 recursively copy the folder MQL5 over the MQL5

### Version notes:
I'm using MetaTrader build 1000+ and ZeroMQ4.x  

* NOTE: when attaching to the chart make sure to select "Allow DLL Imports" and de-select "Confirm DLL Function Calls".
* NOTE: If you want to use ZeroMQ different of 4.x you must compile the dll again
* NOTE: Precompiled DLLs of both 64bit and 32bit ZeroMQ and libsodium are provided. If you are using MT5 32bit, use the 32bit version from `Library/MT4`. The DLLs require that you have the latest Visual C++ runtime (2015). *Note* that these DLLs are compiled from official sources, without any modification. You can compile your own if you don't trust these binaries. The `libsodium.dll` is copied from the official binary release. If you want to support security mechanisms other than `curve`, or you want to use transports like OpenPGM, you need to compile your own DLL.

## About string encoding

MQL strings are Win32 UNICODE strings (basically 2-byte UTF-16). In this binding all strings are converted to utf-8 strings before sending to the dll layer. The ZmqMsg supports a constructor from MQL strings, the default is _NOT_ null-terminated.

# Server side

### INSTALL

Inside the Server folder there is a server with ZMQ that subscribe the brokers to get every tick and also the order book in real time.
Once the ZMQ receive new ticks or any change on the order book happen, it is automatically re-streamed to [Kafka](https://kafka.apache.org/ "Kafka") / [ZeroMQ](http://www.zeromq.org/ "ZeroMQ") and [PubNub](https://www.pubnub.com/ "PubNub") and you can process this data in real time.


## Install ZMQ Ubuntu 16.04

sudo apt-get install libtool pkg-config build-essential autoconf automake

sudo apt-get install libzmq-dev

### Install libsodium

git clone git://github.com/jedisct1/libsodium.git

cd libsodium

./autogen.sh

./configure && make check

sudo make install

sudo ldconfig

### Install zeromq

### latest version as of this post is 4.1.2

wget http://download.zeromq.org/zeromq-4.1.2.tar.gz

tar -xvf zeromq-4.1.2.tar.gz

cd zeromq-4.1.2

./autogen.sh

./configure && make check

sudo make install

sudo ldconfig

### Pushing Support
* PubNub
* RabbitMQ
* ZeroMQ
* Kafka


