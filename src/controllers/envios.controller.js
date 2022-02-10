import config from "../config";
import axios from "axios";

import Product from "../models/Produc"
import Origin from "../models/Origin"
import Artista from "../models/Artista"

export const pedido = async(req, res) => {

    try {
        const producto = await Product.findById(req.body.productoId)

        const origin = await Origin.findById(producto.origin)


        const pedido = {
            "apikey": config.API_KEY_99MINUTOS,
            "deliveryType": req.body.deliveryType,
            "packageSize": req.body.packageSize,
            "notes": req.body.notes,
            "cahsOnDelivery": false,
            "amountCash": 0,
            "SecurePackage": false,
            "amountSecure": 0,
            "receivedId": "",
            "origin": {
                "sender": origin.sender,
                "nameSender": origin.nameSender,
                "lastNameSender": origin.lastNameSender,
                "emailSender": origin.emailSender,
                "phoneSender": origin.phoneSender,
                "addressOrigin": origin.addressOrigin,
                "numberOrigin": origin.numberOrigin,
                "codePostalOrigin": origin.codePostalOrigin,
                "country": "MEX"
            },
            "destination": {
                "receiver": req.body.destination.receiver,
                "nameReceiver": req.body.destination.nameReceiver,
                "lastNameReceiver": req.body.destination.lastNameReceiver,
                "emailReceiver": req.body.destination.emailReceiver,
                "phoneReceiver": req.body.destination.phoneReceiver,
                "addressDestination": req.body.destination.addressDestination,
                "numberDestination": req.body.destination.numberDestination,
                "codePostalDestination": req.body.destination.codePostalDestination,
                "country": "MEX"
            }
        }


        const response = await axios.post(`${config.API_URL_99MINUTOS}autorization/order`, pedido, {
            headers: {
                authorization: `Bearer ${config.API_KEY_99MINUTOS}`
            }
        })

        res.status(201).json(response.data)

        // res.status(201).json(pedido)

    } catch (error) {
        res.status(501).json(error)
    }
}

export const cotizar = async(req, res) => {

    try {
        const producto = await Product.findById(req.body.productoId)

        const origin = await Origin.findById(producto.origin)


        const cot = {
            "weight": producto.envio.weight,
            "height": producto.envio.height,
            "width": producto.envio.width,
            "depth": producto.envio.depth,
            "origin": {
                "codePostal": origin.codePostalOrigin,
                "country": origin.country
            },
            "destination": {
                "codePostal": req.body.codePostal,
                "country": "MEX"
            }
        }


        const response = await axios.post(`${config.API_URL_99MINUTOS}shipping/rates`, cot, {
            headers: {
                authorization: `Bearer ${config.API_KEY_99MINUTOS}`
            }
        })

        res.status(201).json(response.data)

    } catch (error) {
        res.status(501).json(error)
    }

}