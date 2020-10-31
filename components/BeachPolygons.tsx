import { Polygon } from "react-native-maps"
import Beaches from "../mock/beaches"
import React from "react"

export const BeachPolygons = () => {
  const polygons = Beaches.map(beach => {
    return(
      <Polygon 
        coordinates={beach.polygon}
        fillColor={"rgba(0,255,0,0.2)"}
        strokeWidth={0}
      />
    )
  })

  return(
    <>
      {polygons}
    </>
  )
}