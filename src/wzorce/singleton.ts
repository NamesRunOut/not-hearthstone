import io from "socket.io-client";

export class Singleton {
    private static singleton: Singleton;
    private static socket = io(`http://${window.location.hostname}:4200`)

    private constructor() {
    }

    public static getInstance(): Singleton {
        if (!Singleton.singleton) {
            Singleton.singleton = new Singleton();
        }
        return Singleton.singleton;
    }

    getSocket() {
        return Singleton.socket
    }
}

export const socket = Singleton.getInstance().getSocket()

export default Singleton