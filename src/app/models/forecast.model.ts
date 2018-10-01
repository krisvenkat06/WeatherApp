export interface IForecastResponse {
    cnt: number
    list: Array<IList>
}

interface IList{
    "co-ord": Icoords;
    weather: Array<IWeather>;
    main: IMain;
    id: string
    name: string
}

interface Icoords {
    lat: string
    lon: string
}

interface IWeather {
    id: number
    main: string
    description: string
    icon: string
}

interface IMain {
    temp: string
    temp_main: string
    temp_max: string
    humidity: string
}
