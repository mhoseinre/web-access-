
async function getSerialPermition() {
    if ("serial" in navigator) {
      // The Web Serial API is supported.
      alert("The Web Serial API is supported.");

        // Prompt user to select any serial port.
    port = await navigator.serial.requestPort();
    // Wait for the serial port to open.
   await port.open({ baudRate: 9600 });
    }
}


async function getUsbPermition() {
    
   
    const filters = [
        // { vendorId: 0x1209, productId: 0xa800 },
        // { vendorId: 0x1209, productId: 0xa850 },
        // { vendorId: 0x18d1,productId: 0x4ee2 },
        // { vendorId: 0x04e8,productId: 0x6860 },
        // { vendorId: 0x18d1,productId: 0x4ee2 },
        // { vendorId: 0x18d1, productId: 0x4ee2 },
        // { vendorId: 0x04e8,productId: 0x6860 },
        
      ];
      navigator.usb
        .requestDevice({ filters })
        .then((usbDevice) => {
          console.log(`Product name: ${usbDevice.productName}`);
        })
        .catch((e) => {
          console.error(`There is no device. ${e}`);
        });
      
       
        chrome.runtime.sendMessage("newDevice");
      
}

async function openUsbDivice( ) {
    
    navigator.usb.getDevices().then((devices) => {
        console.log(`Total devices: ${devices.length}`);
        devices.forEach((device) => {
          console.log(
            `Product name: ${device.productName}, serial number ${device.serialNumber}`,
          );
        });
      });
      
    
      
}

async function getBluetoothPermition() {
    const filters = [
    {services: ['battery_service']}
    ];

    navigator.bluetooth.requestDevice({ 
        acceptAllDevices: true,
     })
.then(device => { 
    alert("The bluetooth is connect to: "+device.name);
     // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
 })
 .then(server => { /* … */ })
.catch(error => { console.error(error); });

// function onDisconnected(event) {
//     const device = event.target;
//     console.log(`Device ${device.name} is disconnected.`);
//   }

}

