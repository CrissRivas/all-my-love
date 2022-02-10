import { config } from "dotenv";
config();

export default {
    mongodbURL: process.env.MONGODB_URI,
    SECRET: process.env.SECRETO,
    PASS_CORREO: process.env.PASS_CORREO,
    HOST_CORREO: process.env.HOST_CORREO,
    PORT_CORREO: process.env.PORT_CORREO,
    API_KEY_99MINUTOS: process.env.API_KEY_99MINUTOS,
    API_URL_99MINUTOS: process.env.API_URL_99MINUTOS
}