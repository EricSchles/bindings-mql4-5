# bindings-mql4-5

The goal of this project is to provide [MQL4](https://www.metatrader4.com/ "Metatrader 4.") and [MQL5](https://www.metatrader5.com/ "Metatrader 5.") bindings for the [ZeroMQ](http://zeromq.org/ "ZeroMQ homepage.") networking library to an external server to create streaming pipeline with real time data. 

With ZeroMQ (http://zeromq.org/) you can:
* Connect your code in any language, on any platform.
* Carries messages across inproc, IPC, TCP, TIPC, multicast.
* Smart patterns like pub-sub, push-pull, and router-dealer.
* High-speed asynchronous I/O engines, in a tiny library.
* Backed by a large and active open source community.
* Supports every modern language and platform.
* Build any architecture: centralized, distributed, small, or large.

### INSTALL

Recursively copy the folder MQL4 for metatrader4 over the MQL4 folder or for metatrader5 recursively copy the folder MQL5 over the MQL5

### Version notes:
I'm using MetaTrader build 1000+ and ZeroMQ4.x  

* NOTE: when attaching to the chart make sure to select "Allow DLL Imports" and de-select "Confirm DLL Function Calls".
* NOTE: If you want to use ZeroMQ different of 4.x you must compile the dll again


## About string encoding

MQL strings are Win32 UNICODE strings (basically 2-byte UTF-16). In this binding all strings are converted to utf-8 strings before sending to the dll layer. The ZmqMsg supports a constructor from MQL strings, the default is _NOT_ null-terminated.

## About string encoding
