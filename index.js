// Map from leaflet js file
var map = L.map('map').setView([51.505, -0.09], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Custom marker icon by leaflet
var myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
    
let ip;
let domain;
let api_key = "at_iDFHePDrN6LpfyVE6MbmeReF9nrxB";

    $(function () {       
        $.ajax({           
            url: "https://geo.ipify.org/api/v1",           
            data: {apiKey: api_key, ipAddress: ip},           
            success: function(data) {
            
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
    
    function getData(){
        console.log("Started getData")
        url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${api_key}&ipAddress=${ip}&domain=${domain}`;
        fetch(url).then((response)=>{
            console.log("Inside first then")
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
                    throw "Lattitude and Longitude not found for this ip address"
                }
        })
    }
    getData();
})  
   
