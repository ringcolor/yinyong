
先思考两个python脚本之间如何socket通信

比较需要注意的是，在不同语言的程序之间进行socket通信，**编码需要同时设置为UTF-8或者其他**，否者将会出现乱码

# 1.  Socket简介

## 1.1 TCP/UDP和Socket的关系
#TCP #UDP #Socket 

TCP/UDP是真正的通信方式，Socket是对他们的封装。

> TCP，传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议，由IETF的RFC 793 [1]  定义。
> TCP和UDP协议是[TCP/IP](https://baike.baidu.com/item/TCP%2FIP/214077?fromModule=lemma_inlink)协议的核心。 TCP 传输协议：TCP 协议是一TCP (Transmission Control Protocol)和UDP(User Datagram Protocol)协议属于[传输层](https://baike.baidu.com/item/%E4%BC%A0%E8%BE%93%E5%B1%82?fromModule=lemma_inlink)协议。
> https://zhuanlan.zhihu.com/p/24860273

### 1.TCP的面向连接和UDP的面向无连接
	TCP，类似打电话，需要先建立连接，确保对方在线，才能进行通信。
	UDP，类似写信，知道对方地址就行，发送，不需要管收到与否。
- 使用socket的区别：
	- 发送信息：TCP必须连接成功后才能发送(_电话接通后你说话才有意义_)，UDP直接发送就好了(_寄信知道地址就行了_)
	- 接收信息：TCP必须绑定IP和端口号监听连入，然后建立连接(_接电话_)。UDP只要绑定了IP和端口号就行(_房子在就能收到信_)
### 2.TCP的面向流连接和UDP的面向报文
- 流：数据源源不断地到达；
- 报文：数据一次性到达的。
	结合 `面向连接、面向无连接`理解
- 与socket的关系
	- Socket构建的时候都需要指定传输方式。主要就是这两种，流传输格式（_TCP_）和数据报格式（_UDP_）。
	- 传输限制。单次传输限制都存在，但流的方式可以将大块数据分割，进行多次传输，然后再将内容拼接起来，就好像数据没有被分割一样，表现就是**使用流传输(TCP)的时候我们一般不需要考虑传输限制**。而数据报的话就需要考虑单次传输大小限制了，这个根据不同的Socket实现也有所不同。
	- 传输**顺序**。TCP面向连接和流传输的方式可以保证数据到达的先后顺序。而UDP面向无连接和报文传输的方式无法保证数据到达的先后顺序，甚至到不到达都无法保证。
- 常用的其实就是基于TCP的Socket，也就是在构建Socket的时候指定使用流传输方式。而UDP除了需要注意传输限制，使用起来要简单很多。下面我们也主要分析TCP这种方式。

## 1.2 基于TCP的Socket的使用流程
1. 服务端启动一个监听用的Socket，可以称为`listener`(_listener=10086_)
2. `listener`不断的监听有没有客户端来连接自己，等待连接，对应`accept()`方法(_10086等着客户拨打这个号码_)
3. 一旦有可用连接连入(`client`)，`listener.accept()`就会返回一个Socket实例，可以称为`clientExecutor`，这个就类似和你交流的客服(_你拨打了10086，10086做出反应，给你分配了一个客服_)
4. 客户端`client`和服务端的`clientExecutor`可以进行通信了(_你和客服可以交流了_)，这里需要注意的问题是，两边的编码要一致。
![[Pasted image 20230208150012.png]]
## 1.3 通信分析
1.  可以认为调用完成`send()`，数据已经发送到对方的缓存中了。
2.  调用`receive()`从己方缓冲读数据。
3.  关于**同时双向通信**
    1.  如果使用的是**TCP**的方式，因为TCP是全双工的，可以同时双向传输。
    2.  如果使用的是**UDP**的方式，因为UDP是无连接的，甚至可以同时一对多，多对多传输，所以也就没有相关的限制。
![[Pasted image 20230208150324.png]]

# 2.  代码实例

需求分析
-   客户端在连接成功的时候，会收到服务端发送的欢迎消息。(**_服务端发消息给客户端_**)
-   然后客户端可以给服务端发送消息。(**_客户端发消息给服务端_**)
-   **服务端对来自不同客户端的消息做出反应**(_这里就直接将消息和消息来源打印出来，实际也可以根据这些信息做特殊处理_)。

## 1.  Python实例

服务端
```python
import socket
import threading
import time

# 当新的客户端连入时会调用这个方法
def on_new_connection(client_executor, addr):
    print('Accept new connection from %s:%s...' % addr)

    # 发送一个欢迎信息
    client_executor.send(bytes('Welcome'.encode('utf-8')))

    # 进入死循环，读取客户端发送的信息。
    while True:
        msg = client_executor.recv(1024).decode('utf-8')
        if(msg == 'exit'):
            print('%s:%s request close' % addr)
            break
        print('%s:%s: %s' % (addr[0], addr[1], msg))
    client_executor.close()
    print('Connection from %s:%s closed.' % addr)

# 构建Socket实例、设置端口号和监听队列大小
listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listener.bind(('192.168.5.103', 9999))
listener.listen(5)
print('Waiting for connect...')

# 进入死循环，等待新的客户端连入。一旦有客户端连入，就分配一个线程去做专门处理。然后自己继续等待。
while True:
    client_executor, addr = listener.accept()
    t = threading.Thread(target=on_new_connection, args=(client_executor, addr))
    t.start()
```

客户端
```python
import socket

# 构建一个实例，去连接服务端的监听端口。
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('192.168.5.103', 9999))

# 接收欢迎信息
msg=client.recv(1024)
print('New message from server: %s' % msg.decode('utf-8'))

# 不断获取输入，并发送给服务端。
data=""
while(data!='exit'):
    data=input()
    client.send(data.encode('utf-8'))
client.close()
```

## 2.  C#实例
服务端
```c#
using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Threading.Tasks;
using System.Text;

namespace ServerSocket
{
    class Program
    {
        static void Main(string[] args)
        {
            // 构建Socket实例、设置端口号和监听队列大小
            var listener = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            string host = "192.168.5.103";
            int port = 9999;
            listener.Bind(new IPEndPoint(IPAddress.Parse(host), port));
            listener.Listen(5);
            Console.WriteLine("Waiting for connect...");

            // 进入死循环，等待新的客户端连入。一旦有客户端连入，就分配一个Task去做专门处理。然后自己继续等待。
            while(true){
                var clientExecutor=listener.Accept();
                Task.Factory.StartNew(()=>{
                    // 获取客户端信息，C#对(ip+端口号)进行了封装。
                    var remote=clientExecutor.RemoteEndPoint;
                    Console.WriteLine("Accept new connection from {0}",remote);

                    // 发送一个欢迎消息
                    clientExecutor.Send(Encoding.UTF32.GetBytes("Welcome"));

                    // 进入死循环，读取客户端发送的信息
                    var bytes=new byte[1024];
                    while(true){
                        var count=clientExecutor.Receive(bytes);
                        var msg=Encoding.UTF32.GetString(bytes,0,count);
                        if(msg=="exit"){
                            System.Console.WriteLine("{0} request close",remote);
                            break;
                        }
                        Console.WriteLine("{0}: {1}",remote,msg);
                        Array.Clear(bytes,0,count);
                    }
                    clientExecutor.Close();
                    System.Console.WriteLine("{0} closed",remote);
                });
            }
        }
    }
}
```

客户端
```c#
using System;
using System.Threading;
using System.Text;
using System.Net;
using System.Net.Sockets;

namespace ClientSocket
{
    class Program
    {
        static void Main(string[] args)
        {
            var host="192.168.5.103";
            var port=9999;

            // 构建一个Socket实例，并连接指定的服务端。这里需要使用IPEndPoint类(ip和端口号的封装)
            Socket client=new Socket(AddressFamily.InterNetwork,SocketType.Stream,ProtocolType.Tcp);

            try
            {
                client.Connect(new IPEndPoint(IPAddress.Parse(host),port));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return;
            }

            // 接受欢迎信息
            var bytes=new byte[1024];
            var count=client.Receive(bytes);
            Console.WriteLine("New message from server: {0}",Encoding.UTF32.GetString(bytes,0,count));

            // 不断的获取输入，发送给服务端
            var input="";
            while(input!="exit"){
                input=Console.ReadLine();
                client.Send(Encoding.UTF32.GetBytes(input));
            }

            client.Close();
        }
    }
}
```

## 3.  双向同时通信（Python实例）

因为不能让同一个终端即接受输入又不断输出，所以将之前的Python代码稍作改动，做以下规定：

1.  终端只接受输入，发送消息。
2.  收到消息后写到文件里。

服务端
```python
import socket
import threading
import time

# 当新的客户端连入时会调用这个方法
def on_new_connection(client_executor, addr):
    print('Accept new connection from %s:%s...' % addr)

    # 启动一个线程进入死循环，不断接收消息。
    recy_thread=threading.Thread(target=message_receiver, args=(client_executor,addr))
    recy_thread.start()

    # 不断获取输入，并发送给服务端。
    data=""
    while(data!='exit'):
        data=input()
        client_executor.send(data.encode('utf-8'))
    client_executor.close()
    print('Connection from %s:%s closed.' % addr)

# 接收数据的线程需要处理的逻辑
def message_receiver(client_executor,addr):
    while True:
        with open('server.txt','a+') as f:
            msg = client_executor.recv(1024).decode('utf-8')
            f.writelines('%s:%s: %s \r\n' % (addr[0], addr[1], msg))

# 构建Socket实例、设置端口号和监听队列大小
listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listener.bind(('192.168.5.103', 9999))
listener.listen(5)
print('Waiting for connect...')

# 进入死循环，等待新的客户端连入。一旦有客户端连入，就分配一个线程去做专门处理。然后自己继续等待。
while True:
    client_executor, addr = listener.accept()
    t = threading.Thread(target=on_new_connection, args=(client_executor, addr))
    t.start()
```

客户端
```python
import socket
import threading

# 接收数据的线程逻辑
def message_receiver(client):
    while True:
        with open('client.txt','a+') as f:
            msg = client.recv(1024).decode('utf-8')
            f.writelines('%s: %s \r\n' % ('来自服务端的消息', msg))

# 构建一个实例，去连接服务端的监听端口。
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('192.168.5.103', 9999))

# 启动线程专门用于接收数据
recy_thread=threading.Thread(target=message_receiver, args=(client,))
recy_thread.start()

# 不断获取输入，并发送给服务端。
data=""
while(data!='exit'):
    data=input()
    client.send(data.encode('utf-8'))
client.close()
```