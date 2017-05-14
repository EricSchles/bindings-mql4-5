//+------------------------------------------------------------------+
//|                                                      hitback.mq5 |
//|                                         Copyright 2017, Hitback. |
//|                                           https://www.hitback.us |
//+------------------------------------------------------------------+
#property copyright "Copyright 2017, Hitback."
#property link      "https://www.hitback.us"
#property version   "1.00"
#property strict

//--- Include a class of the Standard Library
#include <Trade/Trade.mqh>
#include <Zmq/Zmq.mqh>
#include <json.mqh>

string currency = Symbol();
extern string ip_adress = "*";
extern string prefixPort = "20";

// ZMQ
Context context;
Socket socket(context,ZMQ_PUB);

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {

   MarketBookAdd(currency);
   
 // Print("using zeromq version "+getVersion());
  if( socket.bind("tcp://"+serverAdress( currency )) ) 
  {
      Print("Problem with ZMQ bind " + "tcp://"+serverAdress( currency ));
  }else{
      Print("ZMQ bind " + "tcp://"+serverAdress( currency ) + " Connected");
  }
  
   return(INIT_SUCCEEDED);
  }
//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
//--- close the DOM
   if(!MarketBookRelease(currency))
      Print("Failed to close the DOM!");
  }
  
string serverAdress(string symbol_received)
  {
     string str = "";

      if( "AUDCAD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"02";
         return str;
      }
         
      if( "AUDCHF" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"03";
         return str;
      }

      if( "EURUSD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"04";
         return str;
      }
         
      if( "AUDJPY" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"05";
         return str;
      }

      if( "AUDNZD" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"06";
         return str;
      }

      if( "CADCHF" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"07";
         return str;
      }

      if( "CADJPY" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"08";
         return str;
      }
         
      if( "CHFJPY" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"09";
         return str;
      }

      if( "EURAUD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"10";
         return str;
      }
         
      if( "EURCAD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"11";
         return str;
      }

      if( "EURCHF" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"12";
         return str;
      }
         
      if( "EURGBP" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"13";
         return str;
      }

      if( "GBPAUD" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"14";
         return str;
      }
         
      if( "GBPCAD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"15";
         return str;
      }

      if( "GBPCHF" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"16";
         return str;
      }
         
      if( "GBPJPY" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"17";
         return str;
      }

      if( "GBPNZD" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"18";
         return str;
      }

      if( "NZDCHF" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"19";
         return str;
      }
         
      if( "NZDJPY" == symbol_received  ) {
         str=ip_adress+":"+prefixPort+"20";
         return str;
      }
         
      if( "NZDUSD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"21";
         return str;
      }

      if( "EURNZD" == symbol_received) {
         str=ip_adress+":"+prefixPort+"22";
         return str;
      }

      if( "USDCAD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"23";
         return str;
      }
         
      if( "EURJPY" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"24";
         return str;
      }
         
      if( "AUDUSD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"25";
         return str;
      }

      if( "GBPUSD" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"26";
         return str;
      }

      if( "USDCHF" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"27";
         return str;
      }
         
      if( "USDJPY" == symbol_received ) {
         str=ip_adress+":"+prefixPort+"28";
         return str;
      }
      
   return(str);
  
  }
//+------------------------------------------------------------------+
//| BookEvent function                                               |
//+------------------------------------------------------------------+
void OnBookEvent(const string &symbol)
  {
  // Print("Book event for: "+symbol);
//--- select the symbol
   if(symbol==_Symbol)
     {
      //--- array of the DOM structures
      MqlBookInfo last_bookArray[];
     
      
      //--- get the book
      if(MarketBookGet(_Symbol,last_bookArray))
        {
        
         JSONArray* jaTicks = new JSONArray();

         //--- process book data
         for(int idx=0;idx<ArraySize(last_bookArray);idx++)
           {
            MqlBookInfo curr_info=last_bookArray[idx];
             jaTicks.put(idx, Serialize(last_bookArray[idx]));
           }
         
          // ZMQ send msg
            string msg = CreateSuccessResponse("book", jaTicks);  
            ZmqMsg request(msg);
            socket.send(request);
         
        }
     }
  }

string CreateSuccessResponse(string responseName, JSONValue* responseBody)
{
   JSONObject *joResponse = new JSONObject();
   joResponse.put("ErrorCode", new JSONString("0"));
      
   if (responseBody != NULL)
   {
      joResponse.put(responseName, responseBody);   
   }
   
   string result = joResponse.toString();   
   delete joResponse;   
   return result;
}

JSONObject* Serialize(MqlBookInfo& tick)
{
    JSONObject *jo = new JSONObject();
    jo.put("type", new JSONString(tick.type));
    jo.put("price", new JSONNumber(tick.price));
    jo.put("volume", new JSONNumber(tick.volume));
    return jo;
}

void SendTickData()
{
   MqlTick last_tick;
   
   if(SymbolInfoTick(currency,last_tick))
     {

       JSONObject *jo = new JSONObject();
       jo.put("time", new JSONNumber(last_tick.time));
       jo.put("bid", new JSONNumber(last_tick.bid));
       jo.put("ask", new JSONNumber(last_tick.ask));
       jo.put("last", new JSONNumber(last_tick.last));
       jo.put("volume", new JSONNumber(last_tick.volume));
         
        // ZMQ send msg
        string msg = CreateSuccessResponse("tick", jo);  
        ZmqMsg request(msg);
        socket.send(request);
        
     }
   else Print("SymbolInfoTick() failed, error = ",GetLastError());;
}
   
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
  {
 
   SendTickData();
      
  }