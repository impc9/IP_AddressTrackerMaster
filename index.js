// Map from leaflet js file
var map = L.map('map').setView([51.505, -0.09], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Custom marker icon by leaflet
var myIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize:     [38, 50], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// var ip = " 192.168.137.1";    
let ip;
let domain;
let api_key = "at_iDFHePDrN6LpfyVE6MbmeReF9nrxB";

    $(function () {       
        $.ajax({           
            url: "https://geo.ipify.org/api/v1",           
            data: {apiKey: api_key, ipAddress: ip},           
            success: function(data) {               
                // $("body").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");    // For printing in DOM

                console.log(data)
                // console.log(data.ip)      
                // console.log(data.location.city+","+data.location.country)      
                // console.log(data.location.postalCode)      
                // console.log(data.location.timezone)      
                // console.log(data.isp) 
                // console.log(data.location.lat)
                // console.log(data.location.lng)
            
                document.getElementById("ip").innerText = data.ip   
                
                document.getElementById("location").innerText = data.location.city+","+data.location.country  

                document.getElementById("postal").innerText = data.location.postalCode   
                
                document.getElementById("timezone").innerText = "UTC " + data.location.timezone   
                
                document.getElementById("isp").innerText = data.isp   

                // Mark on the map
                L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map).bindPopup(`${data.location.city}, ${data.location.country}`).openPopup();
            }       
        });    
    });


// document.getElementById("userInput").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         regex = /^[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?/
    
//         if(regex.test(document.getElementById("userInput").value)){
//             console.log(`The string ${document.getElementById("userInput").value} matches the expression ${regex.source}`);
//             ip = document.getElementById("userInput").value;
//             domain = 0
//         }
//         else{
//             console.log(`The string ${document.getElementById("userInput").value} does not matches the expression ${regex.source}`);
//             domain = document.getElementById("userInput").value;
//             ip = 0
//         }
        
//         // console.log(ip)
//         // console.log(typeof(ip))
    
//         function getData(){
//             console.log("Started getData")
//             // url = "https://geo.ipify.org/api/v2/country?apiKey=at_iDFHePDrN6LpfyVE6MbmeReF9nrxB&ipAddress=8.8.8.8";
//             url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${api_key}&ipAddress=${ip}&domain=${domain}`;
//             fetch(url).then((response)=>{
//                 console.log("Inside first then")
//                 // return response.text();
//                 return response.json(); //send data after parsing
//             }).then((data)=>{
//                 console.log("Inside second then")
//                 console.log(data);
    
//                 document.getElementById("ip").innerText = data.ip   
                    
//                     document.getElementById("location").innerText = data.location.city+","+data.location.country  
    
//                     document.getElementById("postal").innerText = data.location.postalCode   
                    
//                     document.getElementById("timezone").innerText = "UTC " + data.location.timezone   
                    
//                     document.getElementById("isp").innerText = data.isp
    
//                     try{
//                         L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map)
//                             .bindPopup(`${data.location.city}, ${data.location.country}`)
//                             .openPopup();
//                     }
//                     catch(e){
//                         // console.log("Lattitude and Longitude not found for this ip address")
//                         throw "Lattitude and Longitude not found for this ip address"
//                     }
//             })
//         }
//         getData();
//       document.getElementById("search").click();
//     }
//   })

document.getElementById("search").addEventListener("click", ()=>{
    regex = /^[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?/
    
    if(regex.test(document.getElementById("userInput").value)){
        console.log(`The string ${document.getElementById("userInput").value} matches the expression ${regex.source}`);
        ip = document.getElementById("userInput").value;
        domain = 0
    }
    else{
        console.log(`The string ${document.getElementById("userInput").value} does not matches the expression ${regex.source}`);
        domain = document.getElementById("userInput").value;
        ip = 0
    }
    
    // console.log(ip)
    // console.log(typeof(ip))

    function getData(){
        console.log("Started getData")
        // url = "https://geo.ipify.org/api/v2/country?apiKey=at_iDFHePDrN6LpfyVE6MbmeReF9nrxB&ipAddress=8.8.8.8";
        url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${api_key}&ipAddress=${ip}&domain=${domain}`;
        fetch(url).then((response)=>{
            console.log("Inside first then")
            // return response.text();
            return response.json(); //send data after parsing
        }).then((data)=>{
            console.log("Inside second then")
            console.log(data);

            document.getElementById("ip").innerText = data.ip   
                
                document.getElementById("location").innerText = data.location.city+","+data.location.country  

                document.getElementById("postal").innerText = data.location.postalCode   
                
                document.getElementById("timezone").innerText = "UTC " + data.location.timezone   
                
                document.getElementById("isp").innerText = data.isp

                try{
                    L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map)
                        .bindPopup(`${data.location.city}, ${data.location.country}`)
                        .openPopup();
                }
                catch(e){
                    // console.log("Lattitude and Longitude not found for this ip address")
                    throw "Lattitude and Longitude not found for this ip address"
                }
        })
    }
    
    // console.log("Before running getData")
    getData();
    // console.log("After running getData")
})  
   
