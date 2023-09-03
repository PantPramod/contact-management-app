import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useQuery } from '@tanstack/react-query'


const MapComponent = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['mapData'],
        queryFn: () =>
            fetch('https://disease.sh/v3/covid-19/countries').then(
                (res) => res.json(),
            ),
    })

    if (isLoading) return "Loading......"

    if (error) return "Something Went Wrong....."


    const allMarkers = data.map((m: any) => <Marker key={m?.country} position={[m?.countryInfo?.lat
        , m?.countryInfo?.long]}>
        <Popup>
            <img
                src={m?.countryInfo?.flag}
                alt={m?.country}
                className='w-16 object-contain block mx-auto'
            />
            <p className='mt-1 text-center font-bold text-xl'>
                {m?.country}
            </p>
            <p className=''><strong>Total Cases:</strong> {m?.cases}</p>
            <p className=''><strong>Active:</strong> {m?.active}</p>
            <p className=''><strong>Deaths:</strong> {m?.deaths}</p>
            <p className=''><strong>Populations:</strong> {m?.population}</p>
        </Popup>
    </Marker>)

    return (
        <div className='w-[90%] mx-auto mt-10'>
            <MapContainer
                style={{ width: "100vw", height: "100vh" }}
                center={[20, 77]}
                zoom={4}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {allMarkers}

            </MapContainer>
        </div>
    )
}

export default MapComponent
