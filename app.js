const searchInput = document.getElementById("search")
const IP = document.getElementById("ip")
const loc = document.getElementById("location")
const timeZone = document.getElementById("timezone")
const ISP = document.getElementById("isp")
const search = document.querySelector(".arrow")

function IPInit() {
  fetch("https://geo.ipify.org/api/v1?apiKey=at_crlxELqR6a2BSF7vs3gJsogT2xFp2")
    .then(res => res.json())
    .then(res => {
      setResult(
        res.ip,
        `${res.location.region}, ${res.location.city}`,
        res.location.timezone,
        res.isp
      )

      initMap(res.location.lat, res.location.lng)
      searchInput.value = res.ip
    })
}

function setResult(ip, location, timezone, isp) {
  IP.textContent = ip
  loc.textContent = location
  timeZone.textContent = "UTC " + timezone
  ISP.textContent = isp
}

let map

function initMap(lat, lng) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: +lat, lng: +lng },
    zoom: 15,
    // mapTypeControl: false,
    // streetViewControl: false,
    disableDefaultUI: true,
  })
  const image = "./images/icon-location.svg"
  new google.maps.Marker({
    position: map.getCenter(),
    icon: image,
    map: map,
  })
}

function handleSearch() {
  fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_crlxELqR6a2BSF7vs3gJsogT2xFp2&ipAddress=${searchInput.value}`
  )
    .then(res => res.json())
    .then(res => {
      if (res.code) {
        fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_crlxELqR6a2BSF7vs3gJsogT2xFp2&domain=${searchInput.value}`
        )
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              window.alert("Wrong ip or domain!")
              return
            }

            setResult(
              res.ip,
              `${res.location.region}, ${res.location.city}`,
              res.location.timezone,
              res.isp
            )
            initMap(res.location.lat, res.location.lng)
          })
        return
      }
      setResult(
        res.ip,
        `${res.location.region}, ${res.location.city}`,
        res.location.timezone,
        res.isp
      )
      initMap(res.location.lat, res.location.lng)
    })
    .catch(err => {
      console.log(err)
    })
}

IPInit()
search.addEventListener("click", handleSearch)
