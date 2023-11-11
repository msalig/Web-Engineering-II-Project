export interface ILocationfrombackend {
  "country": string,
  "place": string,
  "lat": number,
  "lon": number
}

export interface ILocationfrombackendWithId {
  "country": string,
  "place": string,
  "lat": number,
  "lon": number
  _id: string,
  __v: string
}
